import React, { useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { Html } from '@react-three/drei';
import { ProcessedConstellation } from '../types';
import { ArrowUp, ZoomIn, Move, MousePointer2, Compass, Navigation, ScanLine, List, X, ChevronRight, RotateCcw, ArrowLeft } from 'lucide-react';

interface GuideArrowProps {
  target: Vector3;
  label: string;
  isActive: boolean;
}

const GuideArrow: React.FC<GuideArrowProps> = ({ target, label, isActive }) => {
  const { camera, size } = useThree();
  const [pos, setPos] = useState<{ x: number; y: number; rotation: number; visible: boolean }>({ x: 0, y: 0, rotation: 0, visible: false });

  useFrame(() => {
    const tempV = target.clone();
    tempV.project(camera);

    const isBehind = tempV.z > 1;
    const isOnScreen = tempV.x >= -0.9 && tempV.x <= 0.9 && tempV.y >= -0.9 && tempV.y <= 0.9 && !isBehind;

    if (isOnScreen) {
        setPos(p => ({ ...p, visible: false }));
        return;
    }

    let x = tempV.x;
    let y = tempV.y;

    if (isBehind) {
        x = -x;
        y = -y;
    }

    const pad = 0.85;
    let screenX = x;
    let screenY = y;

    if (Math.abs(x) > Math.abs(y)) {
        screenX = x > 0 ? pad : -pad;
        screenY = x > 0 ? y / x * pad : y / x * -pad;
    } else {
        screenY = y > 0 ? pad : -pad;
        screenX = y > 0 ? x / y * pad : x / y * -pad;
    }

    const angle = Math.atan2(y, x);
    const rotation = angle + Math.PI / 2;
    
    const w = size.width / 2;
    const h = size.height / 2;

    setPos({
        x: (screenX * w) + w,
        y: (-screenY * h) + h,
        rotation,
        visible: true
    });
  });

  if (!pos.visible) return null;

  return (
    <Html fullscreen style={{ pointerEvents: 'none' }} zIndexRange={[100, 0]}>
        <div 
            className="absolute pointer-events-none flex flex-col items-center justify-center transition-all duration-300"
            style={{ 
                left: pos.x, 
                top: pos.y, 
                transform: 'translate(-50%, -50%)',
                opacity: isActive ? 1 : 0.6,
                zIndex: isActive ? 20 : 10
            }}
        >
            <div 
                className={`p-2 rounded-full border shadow-lg transition-colors duration-300 ${isActive ? 'bg-cyan-600 border-cyan-300 shadow-cyan-500/50' : 'bg-gray-900/80 border-gray-600'}`}
                style={{ transform: `rotate(${pos.rotation}rad)` }}
            >
                <ArrowUp size={24} className={isActive ? "text-white" : "text-gray-400"} />
            </div>
            <span className={`mt-1 text-[10px] font-mono uppercase tracking-wider whitespace-nowrap bg-black/80 px-2 py-0.5 rounded border ${isActive ? 'text-cyan-300 border-cyan-900' : 'text-gray-400 border-gray-800'}`}>
                {label}
            </span>
        </div>
    </Html>
  );
};

interface OverlayProps {
  constellations: ProcessedConstellation[];
  hoveredId: string | null;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  language: 'en' | 'zh';
  onToggleLanguage: () => void;
}

const TRANSLATIONS = {
    en: {
        constellations: "Constellations",
        atlasTitle: "Star Atlas",
        selectPrompt: "Select a constellation to navigate",
        navSystems: "Navigation Systems",
        orbit: "Orbit",
        drag: "LMB Drag",
        identify: "Identify",
        hover: "Hover",
        zoom: "Zoom",
        scroll: "Scroll / W S",
        deepSpace: "Deep Space Atlas",
        sysOnline: "SYS: ONLINE",
        targetAcquired: "TARGET ACQUIRED",
        scanning: "SCANNING",
        data: "DATA",
        directions: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
        exitView: "Exit View",
        stopTracking: "Stop Tracking",
        backToAtlas: "Back to Atlas"
    },
    zh: {
        constellations: "星座列表",
        atlasTitle: "星空图谱",
        selectPrompt: "选择星座以进行导航",
        navSystems: "导航系统",
        orbit: "旋转视角",
        drag: "左键拖拽",
        identify: "识别星座",
        hover: "悬停",
        zoom: "缩放视图",
        scroll: "滚轮 / W S",
        deepSpace: "深空探测图谱",
        sysOnline: "系统: 在线",
        targetAcquired: "目标已锁定",
        scanning: "扫描中",
        data: "数据",
        directions: ['北', '东北', '东', '东南', '南', '西南', '西', '西北'],
        exitView: "退出并关闭",
        stopTracking: "退出视角",
        backToAtlas: "返回图谱"
    }
};

export const UIOverlay: React.FC<OverlayProps> = ({ constellations, hoveredId, selectedId, onSelect, language, onToggleLanguage }) => {
    const { camera } = useThree();
    const [compassHeading, setCompassHeading] = useState(0);
    const [isListOpen, setIsListOpen] = useState(false);

    const t = TRANSLATIONS[language];

    useFrame(() => {
        const dir = new Vector3();
        camera.getWorldDirection(dir);
        const angle = Math.atan2(dir.x, dir.z);
        let deg = angle * (180 / Math.PI);
        if (deg < 0) deg += 360;
        setCompassHeading(deg);
    });

    const getDirectionLabel = (deg: number) => {
        const idx = Math.round(deg / 45) % 8;
        return t.directions[idx];
    };

    const activeId = selectedId || hoveredId;

  return (
    <>
        {/* Static UI Elements */}
        <Html fullscreen className="pointer-events-none z-10">
            {/* Central Reticle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
                <ScanLine size={40} className="text-cyan-500" />
            </div>

            {/* Compass / Top Center */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-cyan-400 font-mono font-bold text-lg shadow-lg">
                    <Navigation size={16} style={{ transform: `rotate(${360 - compassHeading}deg)` }} />
                    <span>{Math.round(compassHeading)}° {getDirectionLabel(compassHeading)}</span>
                </div>
                
                {/* Floating Exit Button (Main Screen) */}
                {selectedId && (
                     <button 
                        onClick={() => onSelect(null)}
                        className="mt-4 pointer-events-auto flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 px-4 py-1.5 rounded-full text-red-200 backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-4"
                     >
                        <RotateCcw size={14} />
                        <span className="text-xs font-bold tracking-wider uppercase">{t.stopTracking}</span>
                     </button>
                )}
            </div>

            {/* Top Right Controls */}
            <div className="absolute top-8 right-8 pointer-events-auto flex gap-3 z-20">
                <button
                    onClick={onToggleLanguage}
                    className="group flex items-center justify-center w-10 h-10 rounded-lg border backdrop-blur-md transition-all duration-300 bg-black/60 border-white/20 text-gray-300 hover:bg-white/10"
                >
                    <span className="text-xs font-bold">{language === 'en' ? 'EN' : '中'}</span>
                </button>

                <button 
                    onClick={() => setIsListOpen(!isListOpen)}
                    className={`group flex items-center gap-2 px-4 py-2 rounded-lg border backdrop-blur-md transition-all duration-300 ${isListOpen ? 'bg-cyan-900/80 border-cyan-500 text-cyan-100' : 'bg-black/60 border-white/20 text-gray-300 hover:bg-white/10'}`}
                >
                    <span className="uppercase tracking-wider text-xs font-bold hidden sm:block">{t.constellations}</span>
                    {isListOpen ? <X size={20} /> : <List size={20} />}
                </button>
            </div>

            {/* Side Panel / Right */}
            <div className={`absolute top-0 right-0 h-full w-80 bg-black/85 backdrop-blur-xl border-l border-white/10 transition-transform duration-500 ease-in-out pointer-events-auto transform ${isListOpen ? 'translate-x-0' : 'translate-x-full'} z-10`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="mt-20 mb-6 border-b border-white/10 pb-4">
                         {selectedId ? (
                             <button 
                                onClick={() => {
                                    onSelect(null);
                                    setIsListOpen(false);
                                }}
                                className="w-full flex items-center gap-2 text-cyan-400 hover:text-cyan-300 hover:bg-white/5 p-2 -ml-2 rounded transition-colors group"
                             >
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
                                <span className="font-bold tracking-widest uppercase">{t.exitView}</span>
                             </button>
                         ) : (
                            <>
                                <h2 className="text-cyan-400 font-bold text-xl tracking-widest uppercase">{t.atlasTitle}</h2>
                                <p className="text-gray-500 text-xs mt-1">{t.selectPrompt}</p>
                            </>
                         )}
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {constellations.map(c => (
                            <button
                                key={c.id}
                                onClick={() => onSelect(c.id)}
                                className={`w-full text-left group relative p-3 rounded-lg border transition-all duration-200 ${selectedId === c.id ? 'bg-cyan-900/40 border-cyan-500/50' : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className={`font-bold font-mono ${selectedId === c.id ? 'text-cyan-300' : 'text-gray-200'}`}>
                                            {language === 'zh' ? c.nameZh : c.name}
                                        </div>
                                        <div className="text-xs text-gray-500 italic">{c.latinName}</div>
                                    </div>
                                    {selectedId === c.id && <ChevronRight size={16} className="text-cyan-400" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Controls / Bottom Left */}
            <div className="absolute bottom-8 left-8 pointer-events-auto select-none hidden md:block">
                <div className="bg-black/60 backdrop-blur-md p-5 rounded-xl border border-cyan-900/50 shadow-2xl">
                    <h3 className="text-cyan-400 font-bold mb-3 uppercase tracking-widest text-xs flex items-center gap-2">
                        <Compass size={14} /> {t.navSystems}
                    </h3>
                    <div className="space-y-3 text-xs font-mono text-gray-300">
                        <div className="flex items-center justify-between gap-6">
                            <span className="flex items-center gap-2"><Move size={14} className="text-cyan-600"/> {t.orbit}</span>
                            <span className="bg-white/10 px-2 py-0.5 rounded text-white/70">{t.drag}</span>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <span className="flex items-center gap-2"><MousePointer2 size={14} className="text-cyan-600"/> {t.identify}</span>
                            <span className="bg-white/10 px-2 py-0.5 rounded text-white/70">{t.hover}</span>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <span className="flex items-center gap-2"><ZoomIn size={14} className="text-cyan-600"/> {t.zoom}</span>
                            <span className="bg-white/10 px-2 py-0.5 rounded text-white/70">{t.scroll}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Title / Top Left */}
            <div className="absolute top-8 left-8 pointer-events-none select-none">
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-5xl font-thin tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                        ASTRO<span className="font-bold text-cyan-400">GUIDE</span>
                    </h1>
                    <div className="flex items-center gap-3 mt-1">
                        <div className="h-[2px] w-8 bg-cyan-500"></div>
                        <p className="text-[10px] md:text-xs text-cyan-200/80 uppercase tracking-[0.3em]">{t.deepSpace}</p>
                    </div>
                </div>
            </div>
            
            {/* Status Bar / Bottom Right */}
            <div className="absolute bottom-8 right-8 text-right font-mono text-[10px] text-gray-500 hidden sm:block">
                <div>{t.sysOnline}</div>
                <div>{t.data}: <span className={activeId ? "text-cyan-400" : "text-gray-600"}>{activeId ? t.targetAcquired : t.scanning}</span></div>
            </div>
        </Html>

        {/* Dynamic Guides */}
        {constellations.map(c => (
            <GuideArrow 
                key={c.id} 
                target={c.center} 
                label={language === 'zh' ? c.nameZh : c.name} 
                isActive={c.id === activeId}
            />
        ))}
    </>
  );
};