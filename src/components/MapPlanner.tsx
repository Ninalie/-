import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Zap, Utensils, Dog, Tent, Navigation } from 'lucide-react';
import { MAX_RADIUS } from '../lib/design-tokens';
import { DopamineButton } from './DopamineButton';
import { cn } from '../lib/utils';

interface Point {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'start' | 'end' | 'food' | 'charge' | 'view' | 'pet';
}

const MOCK_POINTS: Point[] = [
  { id: '1', x: 100, y: 100, label: '出发地', type: 'start' },
  { id: '2', x: 300, y: 150, label: '小鹏S4超充', type: 'charge' },
  { id: '3', x: 200, y: 300, label: '宠物草坪', type: 'pet' },
  { id: '4', x: 500, y: 200, label: '地道美食', type: 'food' },
  { id: '5', x: 450, y: 400, label: '露营基地', type: 'view' },
  { id: '6', x: 700, y: 350, label: '目的地', type: 'end' },
];

export const MapPlanner: React.FC<{ onRouteComplete: (route: Point[]) => void }> = ({ onRouteComplete }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handlePointClick = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedPoints = selectedIds.map(id => MOCK_POINTS.find(p => p.id === id)!);

  return (
    <div className="relative w-full h-[600px] bg-max-bg border-8 border-max-magenta rounded-3xl overflow-hidden shadow-hard-stack">
      {/* Background Patterns */}
      <div className="absolute inset-0 pattern-dots opacity-20" />
      <div className="absolute inset-0 pattern-stripes opacity-10" />
      
      {/* SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {selectedPoints.length > 1 && selectedPoints.map((p, i) => {
          if (i === 0) return null;
          const prev = selectedPoints[i - 1];
          const isNGP = i % 2 === 0;
          return (
            <g key={`line-group-${prev.id}-${p.id}`}>
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                x1={prev.x} y1={prev.y}
                x2={p.x} y2={p.y}
                stroke={isNGP ? "#00F5D4" : "#FF3AF2"}
                strokeWidth={isNGP ? "12" : "4"}
                strokeLinecap="round"
                className={isNGP ? "tech-glow-blue" : ""}
                strokeDasharray={isNGP ? "none" : "12 12"}
              />
              {isNGP && (
                <text 
                  x={(prev.x + p.x) / 2} 
                  y={(prev.y + p.y) / 2 - 20} 
                  className="font-display text-xl fill-max-cyan"
                  textAnchor="middle"
                >
                  NGP_TURBO
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Points */}
      {MOCK_POINTS.map((point, index) => {
        const accents = ['magenta', 'cyan', 'yellow', 'orange', 'purple'] as const;
        const color = accents[index % 5];
        const isSelected = selectedIds.includes(point.id);

        return (
          <div key={point.id} className="absolute" style={{ left: point.x, top: point.y }}>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-max-${color} rounded-full opacity-20`} 
            />
            
            <motion.button
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handlePointClick(point.id)}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 z-20 p-4 border-4 transition-all duration-300 rounded-2xl",
                isSelected 
                  ? `bg-max-${color} text-max-bg border-max-fg scale-125 shadow-[0_0_30px_rgba(255,255,255,0.5)]` 
                  : `bg-max-muted border-max-${color} text-max-fg`
              )}
            >
              {point.type === 'start' && <Navigation size={24} />}
              {point.type === 'charge' && <Zap size={24} />}
              {point.type === 'food' && <Utensils size={24} />}
              {point.type === 'pet' && <Dog size={24} />}
              {point.type === 'view' && <Tent size={24} />}
              {point.type === 'end' && <MapPin size={24} />}
              
              <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <span className={cn(
                  "whitespace-nowrap font-heading text-xl px-2 py-1 rounded-lg border-2",
                  isSelected ? "bg-max-fg text-max-bg border-max-bg" : "bg-max-bg text-max-fg border-max-muted"
                )}>
                  {point.label}
                </span>
                {isSelected && (
                  <span className="font-mono text-xs text-max-yellow mt-1 bg-max-bg px-1">
                    LAT:{point.x} LON:{point.y}
                  </span>
                )}
              </div>
            </motion.button>
          </div>
        );
      })}

      {/* HUD Elements */}
      <div className="absolute top-4 left-4 font-display text-max-magenta text-2xl animate-pulse">
        XPENG_RADAR_ACTIVE
      </div>
      
      {selectedIds.length > 0 && (
        <div className="absolute bottom-8 right-8">
          <DopamineButton onClick={() => onRouteComplete(selectedPoints)} size="lg">
            出发！ ({selectedIds.length})
          </DopamineButton>
        </div>
      )}
    </div>
  );
};
