import React, { useMemo, useState, useRef } from 'react';
import { Vector3 } from 'three';
import { Line, Html, Billboard } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { ProcessedConstellation } from '../types';

interface Props {
  data: ProcessedConstellation;
  onHover: (id: string | null) => void;
  isActive: boolean;
  language: 'en' | 'zh';
}

export const ConstellationGroup: React.FC<Props> = ({ data, onHover, isActive, language }) => {
  const [internalHover, setInternalHover] = useState(false);
  const groupRef = useRef<any>(null);

  // Convert connections to points for the Line component
  const linePoints = useMemo(() => {
    const points: Vector3[] = [];
    data.connections.forEach(([startIdx, endIdx]) => {
      points.push(data.stars[startIdx].position);
      points.push(data.stars[endIdx].position);
    });
    return points;
  }, [data]);

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setInternalHover(true);
    onHover(data.id);
  };

  const handlePointerOut = (e: any) => {
    setInternalHover(false);
    onHover(null);
  };

  const isHighlighted = isActive || internalHover;
  const opacity = isHighlighted ? 0.8 : 0.05;
  const lineWidth = isHighlighted ? 2 : 0.5;
  const lineColor = isHighlighted ? '#4deeea' : '#ffffff'; // Cyan when active

  return (
    <group ref={groupRef}>
      {/* Interaction Hit Volume: Invisible sphere to detect mouse over the general area */}
      <mesh 
        position={data.center} 
        onPointerOver={handlePointerOver} 
        onPointerOut={handlePointerOut}
        visible={false} 
      >
        <sphereGeometry args={[data.radius, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Render Stars */}
      {data.stars.map((star) => (
        <mesh 
          key={star.id} 
          position={star.position}
        >
          <sphereGeometry args={[isHighlighted ? 0.6 : 0.3, 16, 16]} />
          <meshStandardMaterial 
            color={star.color || 'white'} 
            emissive={star.color || 'white'}
            emissiveIntensity={isHighlighted ? 3 : 0.8}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Render Connections */}
      <Line
        points={linePoints}
        color={lineColor}
        lineWidth={lineWidth}
        transparent
        opacity={opacity}
        segments
        dashed={false}
      />

      {/* Constellation Label */}
      {isHighlighted && (
        <Billboard position={[data.center.x, data.center.y - data.radius * 0.2, data.center.z]}>
            <Html 
                transform 
                sprite 
                style={{ pointerEvents: 'none' }}
                distanceFactor={15}
                zIndexRange={[100, 0]}
            >
                <div className="flex flex-col items-center justify-center pointer-events-none select-none">
                    <div className="bg-black/60 backdrop-blur-md border border-cyan-500/50 px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                        <h1 className="text-cyan-300 font-bold text-lg whitespace-nowrap font-mono tracking-wider">
                        {language === 'zh' ? data.nameZh : data.name}
                        </h1>
                        <span className="text-xs text-cyan-100/70 italic block text-center">
                        {data.latinName}
                        </span>
                    </div>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
                </div>
            </Html>
        </Billboard>
      )}
    </group>
  );
};