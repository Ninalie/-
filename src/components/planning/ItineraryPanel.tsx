import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Camera, MapPin, Navigation, ChevronDown, Info, Trash2 } from 'lucide-react';

interface WaypointItemProps {
  time: string;
  title: string;
  type: 'start' | 'end' | 'charge' | 'poi';
  description?: string;
  isCharging?: boolean;
  chargerCount?: number;
}

const WaypointItem: React.FC<WaypointItemProps> = ({ 
  time, 
  title, 
  type, 
  description, 
  isCharging,
  chargerCount
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [note, setNote] = useState(description || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleNoteClick = () => {
    setIsEditingNote(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setIsEditingNote(false);
  };

  return (
    <div className="relative pl-10 group pb-8 last:pb-0">
      {/* Timeline Line */}
      <div className="absolute left-4 top-4 bottom-0 w-px bg-black/5 group-last:hidden" />
      
      {/* Icon */}
      <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 border-white shadow-sm transition-transform group-hover:scale-110 ${
        type === 'start' ? 'bg-black' :
        type === 'end' ? 'bg-black' :
        type === 'charge' ? 'bg-primary' :
        'bg-primary/40'
      }`}>
        {type === 'start' && <Navigation className="w-4 h-4 text-white" />}
        {type === 'end' && <MapPin className="w-4 h-4 text-white" />}
        {type === 'charge' && <Zap className="w-4 h-4 text-white" />}
        {type === 'poi' && <Camera className="w-4 h-4 text-white" />}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-muted-foreground">{time}</span>
          {isCharging && (
            <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              {chargerCount || 3}个可用快充
            </span>
          )}
        </div>
        <h4 className="text-sm font-bold text-foreground">{title}</h4>
        
        {isEditingNote ? (
          <textarea
            ref={textareaRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={handleBlur}
            className="mt-1 text-xs text-foreground/70 bg-black/5 p-2 rounded-lg outline-none border border-primary/20 w-full resize-none min-h-[60px]"
          />
        ) : (
          <div 
            onClick={handleNoteClick}
            className="mt-1 text-xs text-muted-foreground leading-relaxed cursor-text hover:text-foreground/70 transition-colors"
          >
            {note || '添加备注...'}
          </div>
        )}

        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
          <button 
            className="p-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all shadow-sm"
            title="查看详情"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          <button 
            className="p-1.5 bg-black/5 text-muted-foreground rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm"
            title="移除"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ItineraryPanel = () => {
  const [activeDay, setActiveDay] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const days = [
    { id: 1, date: '3月25日', title: '广州 - 昆明' },
    { id: 2, date: '3月26日', title: '昆明 - 大理' },
    { id: 3, date: '3月27日', title: '大理深度游' },
    { id: 4, date: '3月28日', title: '大理 - 丽江' },
    { id: 5, date: '3月29日', title: '丽江古城' },
    { id: 6, date: '3月30日', title: '丽江 - 广州' },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      // Find the day that is most visible in the viewport
      let currentDayId = 1;
      let minDistance = Infinity;

      days.forEach((day) => {
        const element = document.getElementById(`day-${day.id}`);
        if (element) {
          const distance = Math.abs(element.offsetTop - 24 - scrollTop);
          if (distance < minDistance) {
            minDistance = distance;
            currentDayId = day.id;
          }
        }
      });

      setActiveDay(currentDayId);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [days]);

  const scrollToDay = (dayId: number) => {
    setActiveDay(dayId);
    const element = document.getElementById(`day-${dayId}`);
    if (element && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      isScrollingRef.current = true;
      
      container.scrollTo({
        top: element.offsetTop - 24,
        behavior: 'smooth'
      });

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  return (
    <div className="w-full h-full bg-white border-l border-black/5 flex flex-col shadow-[-4px_0_20px_rgba(0,0,0,0.02)]">
      {/* Panel Title */}
      <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between bg-white">
        <h3 className="text-lg font-bold text-foreground">路书行程</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-muted-foreground bg-black/5 px-2 py-1 rounded uppercase tracking-wider">6天行程</span>
        </div>
      </div>

      {/* Day Selector */}
      <div className="px-6 py-4 border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => scrollToDay(day.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeDay === day.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-black/5 text-muted-foreground hover:bg-black/10'
              }`}
            >
              Day {day.id}
            </button>
          ))}
        </div>
      </div>

      {/* Itinerary List */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-10 custom-scrollbar relative"
      >
        {days.map((day) => (
          <div key={day.id} id={`day-${day.id}`} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {day.id}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{day.title}</h3>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{day.date}</p>
                </div>
              </div>
              <div className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded">
                约 450km
              </div>
            </div>

            <div className="space-y-4 relative">
              <WaypointItem 
                time="09:00" 
                title="广州出发" 
                type="start"
                description="满电出发，预计行驶 3 小时到达首个休息点"
              />
              <WaypointItem 
                time="12:30" 
                title="阳江服务区" 
                type="charge"
                description="充电 30 分钟，顺便午餐。推荐：服务区特色濑粉"
                isCharging
                chargerCount={5}
              />
              <WaypointItem 
                time="15:00" 
                title="茂名露天矿生态公园" 
                type="poi"
                description="这里的湖水非常蓝，适合带狗狗跑跑"
              />
              <WaypointItem 
                time="18:30" 
                title="湛江市中心酒店" 
                type="end"
                description="第一天行程结束，酒店有地下充电桩"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="p-6 border-t border-black/5 bg-black/[0.02]">
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground font-bold uppercase whitespace-nowrap">总里程</span>
            <span className="text-sm font-bold">1,850 km</span>
          </div>
          <div className="w-px h-4 bg-black/10" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground font-bold uppercase whitespace-nowrap">预计充电</span>
            <span className="text-sm font-bold">8 次</span>
          </div>
        </div>
        <button className="w-full bg-black text-white py-3 rounded-2xl font-bold shadow-lg shadow-black/10 hover:bg-primary hover:shadow-xl hover:-translate-y-0.5 transition-all">
          发送到爱车
        </button>
      </div>
    </div>
  );
};
