import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Zap, Utensils, Camera, Home, Plus, Star } from 'lucide-react';
import { LocationItem } from '../../pages/PlanningPage';

interface MapPanelProps {
  items: LocationItem[];
  hoveredItemId: string | null;
  onHover: (id: string | null) => void;
  activeFilter: string;
}

export const MapPanel = ({ items, hoveredItemId, onHover, activeFilter }: MapPanelProps) => {
  const [selectedMapItem, setSelectedMapItem] = React.useState<LocationItem | null>(null);

  const getIcon = (type: string, isHovered: boolean) => {
    const className = `w-4 h-4 transition-colors ${isHovered ? 'text-white' : 'text-foreground'}`;
    switch (type) {
      case 'charge': return <Zap className={className} />;
      case 'dining': return <Utensils className={className} />;
      case 'attraction': return <Camera className={className} />;
      case 'accommodation': return <Home className={className} />;
      default: return <MapPin className={className} />;
    }
  };

  // Realistic route points simulation
  const routePoints = React.useMemo(() => [
    { x: 10, y: 10 }, { x: 15, y: 12 }, { x: 20, y: 18 }, { x: 25, y: 25 },
    { x: 30, y: 22 }, { x: 35, y: 28 }, { x: 40, y: 35 }, { x: 45, y: 32 },
    { x: 50, y: 40 }, { x: 55, y: 45 }, { x: 60, y: 42 }, { x: 65, y: 50 },
    { x: 70, y: 55 }, { x: 75, y: 52 }, { x: 80, y: 60 }, { x: 85, y: 65 },
    { x: 90, y: 62 }, { x: 95, y: 70 }
  ], []);

  const renderMarker = (item: LocationItem, index: number) => {
    // Distribute markers along the route
    const point = routePoints[Math.min(index * 3 + 2, routePoints.length - 1)];
    const top = `${point.y}%`;
    const left = `${point.x}%`;
    const isHovered = hoveredItemId === item.id;

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="absolute cursor-pointer group z-10"
        style={{ top, left }}
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={() => onHover(null)}
        onClick={() => setSelectedMapItem(item)}
      >
        <div className="flex flex-col items-center relative">
          {/* Hover Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className="absolute bottom-full mb-4 w-48 bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden z-50 shadow-2xl border border-black/5"
              >
                <div className="h-20 w-full overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-foreground truncate pr-2">{item.name}</span>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-2 h-2 text-green-500 fill-current" />
                      <span className="text-[8px] font-bold">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-[9px] text-muted-foreground line-clamp-1">{item.description}</p>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white/95" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all duration-300 ${
            isHovered || selectedMapItem?.id === item.id
              ? 'bg-primary scale-125 z-40' 
              : 'bg-white'
          }`}>
            {getIcon(item.type, isHovered || selectedMapItem?.id === item.id)}
          </div>
          {(isHovered || selectedMapItem?.id === item.id) && (
             <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1 shadow-sm" />
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full h-full bg-[#E5E7EB] relative overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-black/10" />
          ))}
        </div>
      </div>

      {/* Route Line Mock */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d={`M ${routePoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
          fill="none"
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d={`M ${routePoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_2px_rgba(var(--color-primary-rgb),0.4)]"
        />
      </svg>

      {/* Start/End Markers */}
      <div className="absolute top-[10%] left-[10%] flex flex-col items-center z-20">
        <div className="px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full mb-1 uppercase tracking-wider shadow-sm">广州</div>
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <Navigation className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="absolute bottom-[30%] right-[5%] flex flex-col items-center z-20">
        <div className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full mb-1 uppercase tracking-wider shadow-sm">云南</div>
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <MapPin className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Dynamic Markers */}
      <AnimatePresence>
        {items.map((item, index) => renderMarker(item, index))}
      </AnimatePresence>

      {/* Map Popup */}
      <AnimatePresence>
        {selectedMapItem && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 w-72 bg-white rounded-3xl shadow-2xl border border-black/5 overflow-hidden z-50"
          >
            <div className="relative h-28">
              <img 
                src={selectedMapItem.image} 
                alt={selectedMapItem.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelectedMapItem(null)}
                className="absolute top-2 right-2 p-1.5 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
              >
                <Plus className="w-4 h-4 rotate-45" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-sm font-bold text-foreground">{selectedMapItem.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-green-500 fill-current" />
                  <span className="text-[10px] font-bold">{selectedMapItem.rating}</span>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mb-3 leading-relaxed">{selectedMapItem.description}</p>
              
              <div className="space-y-2 mb-4">
                <h4 className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">车主评价</h4>
                <div className="bg-black/5 p-2.5 rounded-xl">
                  <p className="text-[9px] text-foreground/70 italic leading-relaxed">
                    “ 环境非常好，充电桩空闲，推荐路过休息。 ”
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="w-3 h-3 rounded-full bg-primary/20" />
                    <span className="text-[8px] font-bold text-muted-foreground">小鹏车主 · 广州</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-2 rounded-xl font-bold text-xs shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
                查看详情
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Controls */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-black/5 transition-colors border border-black/5">
          <Plus className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-black/5 transition-colors border border-black/5">
          <div className="w-5 h-0.5 bg-foreground" />
        </button>
      </div>

      <div className="absolute top-6 right-6">
        <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-2xl border border-black/5 shadow-lg flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-wider">推荐路线</span>
          </div>
          <div className="w-px h-4 bg-black/10" />
          <span className="text-xs font-bold">约 1450km · 18小时</span>
        </div>
      </div>
    </div>
  );
};
