import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { ProcessedConstellation } from '../types';
import { processConstellation, generateBackgroundStars } from '../utils/astronomy';
import { CONSTELLATIONS } from '../data/constellations';
import { ConstellationGroup } from './ConstellationGroup';
import { UIOverlay } from './UIOverlay';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

// Keyboard controls logic hook
const useKeyboardControls = () => {
    const [keys, setKeys] = useState({ 
        w: false, s: false, 
        plus: false, minus: false,
        left: false, right: false, up: false, down: false
    });
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'w' || e.key === 'W') setKeys(k => ({ ...k, w: true }));
            if (e.key === 's' || e.key === 'S') setKeys(k => ({ ...k, s: true }));
            if (e.key === '+' || e.key === '=') setKeys(k => ({ ...k, plus: true }));
            if (e.key === '-' || e.key === '_') setKeys(k => ({ ...k, minus: true }));
            if (e.key === 'ArrowLeft') setKeys(k => ({ ...k, left: true }));
            if (e.key === 'ArrowRight') setKeys(k => ({ ...k, right: true }));
            if (e.key === 'ArrowUp') setKeys(k => ({ ...k, up: true }));
            if (e.key === 'ArrowDown') setKeys(k => ({ ...k, down: true }));
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'w' || e.key === 'W') setKeys(k => ({ ...k, w: false }));
            if (e.key === 's' || e.key === 'S') setKeys(k => ({ ...k, s: false }));
            if (e.key === '+' || e.key === '=') setKeys(k => ({ ...k, plus: false }));
            if (e.key === '-' || e.key === '_') setKeys(k => ({ ...k, minus: false }));
            if (e.key === 'ArrowLeft') setKeys(k => ({ ...k, left: false }));
            if (e.key === 'ArrowRight') setKeys(k => ({ ...k, right: false }));
            if (e.key === 'ArrowUp') setKeys(k => ({ ...k, up: false }));
            if (e.key === 'ArrowDown') setKeys(k => ({ ...k, down: false }));
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return keys;
};

interface SceneControllerProps {
    controlsRef: React.RefObject<OrbitControlsImpl | null>;
    selectedId: string | null;
    constellations: ProcessedConstellation[];
}

const SceneController: React.FC<SceneControllerProps> = ({ controlsRef, selectedId, constellations }) => {
    const { camera } = useThree();
    const keys = useKeyboardControls();
    const zoomSpeed = 0.5;
    const rotSpeed = 0.02;
    
    const animationTarget = useRef<THREE.Vector3 | null>(null);

    // Trigger animation when selectedId changes
    useEffect(() => {
        if (selectedId) {
            const targetC = constellations.find(c => c.id === selectedId);
            if (targetC) {
                // Calculate target position relative to origin
                // Maintain current distance, just change angle
                const currentDist = camera.position.length();
                // We want to look at the constellation center, but from the origin-side or outside?
                // Standard view: Camera is outside sphere, looking at origin. 
                // We want the constellation to be centered.
                // So camera must be aligned with constellation vector.
                const targetPos = targetC.center.clone().normalize().multiplyScalar(currentDist);
                animationTarget.current = targetPos;
            }
        }
    }, [selectedId, constellations, camera]);

    useFrame((state, delta) => {
        // Manual Camera Animation
        if (animationTarget.current) {
            const currentPos = camera.position;
            // Interpolate
            currentPos.lerp(animationTarget.current, 4 * delta);
            // Ensure we stay on sphere surface (maintain radius)
            const dist = currentPos.length();
            const targetDist = animationTarget.current.length(); // Actually this might change if user zooms during anim, but keeping simple for now
            
            // Fix float drift
            if (Math.abs(dist - targetDist) > 0.1) {
                // currentPos.setLength(targetDist); // Optional: strictly enforce distance
            }

            // Stop animation when close
            if (currentPos.distanceTo(animationTarget.current) < 0.5) {
                animationTarget.current = null;
            }
            
            if (controlsRef.current) {
                controlsRef.current.update();
            }
        }

        // Keyboard Zoom Logic
        const zoomIn = keys.w || keys.plus;
        const zoomOut = keys.s || keys.minus;

        if (zoomIn || zoomOut) {
            // Cancel auto-animation if user intervenes manually
            animationTarget.current = null;

            const direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
            const distance = camera.position.length();
            
            if (zoomIn && distance > 10) {
                 camera.position.addScaledVector(direction, zoomSpeed);
            }
            if (zoomOut && distance < 150) {
                 camera.position.addScaledVector(direction, -zoomSpeed);
            }
        }

        // Keyboard Rotation Logic
        if (controlsRef.current) {
            let rotated = false;
            if (keys.left) { controlsRef.current.setAzimuthalAngle(controlsRef.current.getAzimuthalAngle() + rotSpeed); rotated = true; }
            if (keys.right) { controlsRef.current.setAzimuthalAngle(controlsRef.current.getAzimuthalAngle() - rotSpeed); rotated = true; }
            if (keys.up) { controlsRef.current.setPolarAngle(controlsRef.current.getPolarAngle() - rotSpeed); rotated = true; }
            if (keys.down) { controlsRef.current.setPolarAngle(controlsRef.current.getPolarAngle() + rotSpeed); rotated = true; }
            
            if (rotated) {
                animationTarget.current = null; // Cancel auto-anim
                controlsRef.current.update();
            }
        }
    });
    return null;
};

const BackgroundStars = () => {
    const count = 4000;
    const positions = useMemo(() => generateBackgroundStars(count), []);
    
    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.12}
                color="#e0efff"
                transparent
                opacity={0.5}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </points>
    );
};

export const StarMapScene: React.FC = () => {
  const [hoveredConstellation, setHoveredConstellation] = useState<string | null>(null);
  const [selectedConstellation, setSelectedConstellation] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const controlsRef = useRef<OrbitControlsImpl>(null);
  
  const processedConstellations: ProcessedConstellation[] = useMemo(() => {
    return CONSTELLATIONS.map(processConstellation);
  }, []);

  const handleConstellationSelect = (id: string | null) => {
      setSelectedConstellation(id);
  };

  const toggleLanguage = () => {
      setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="w-full h-screen bg-black cursor-crosshair">
      <Canvas 
        camera={{ position: [0, 20, 90], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }}
      >
        <color attach="background" args={['#020409']} />
        
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Enhanced distant stars */}
        <Stars radius={200} depth={60} count={6000} factor={5} saturation={0.5} fade speed={0.5} />
        <BackgroundStars />
        
        <SceneController 
            controlsRef={controlsRef} 
            selectedId={selectedConstellation}
            constellations={processedConstellations}
        />
        
        <OrbitControls 
            ref={controlsRef}
            enableZoom={false} 
            enablePan={false} 
            rotateSpeed={0.4} 
            minDistance={10} 
            maxDistance={150}
            autoRotate={!hoveredConstellation && !selectedConstellation}
            autoRotateSpeed={0.3}
            dampingFactor={0.05}
            enableDamping
        />

        <group>
           {processedConstellations.map((c) => (
             <ConstellationGroup 
                key={c.id} 
                data={c} 
                onHover={setHoveredConstellation}
                isActive={hoveredConstellation === c.id || selectedConstellation === c.id}
                language={language}
             />
           ))}
        </group>

        <UIOverlay 
            constellations={processedConstellations} 
            hoveredId={hoveredConstellation}
            selectedId={selectedConstellation}
            onSelect={handleConstellationSelect}
            language={language}
            onToggleLanguage={toggleLanguage}
        />
      </Canvas>
    </div>
  );
};