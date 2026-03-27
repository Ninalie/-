import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Car, Battery, Zap, DollarSign, 
  ChevronDown, ArrowUp, Plus,
  Check, Calendar as CalendarIcon, MapPin, Navigation, Sparkles,
  ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon,
  X
} from 'lucide-react';

// --- Custom Calendar Component ---
const CustomCalendar = ({ value, onSelect }: { value: string, onSelect: (date: string) => void }) => {
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
  const [viewDate, setViewDate] = useState(new Date(currentDate));

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const formatDate = (d: number) => {
    const date = new Date(year, month, d);
    return date.toISOString().split('T')[0];
  };

  const isSelected = (d: number) => value === formatDate(d);
  const isToday = (d: number) => {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
  };

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="p-4 w-64 bg-white select-none">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-foreground">{year}年{month + 1}月</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </div>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-1 hover:bg-black/5 rounded-full transition-colors">
            <ChevronLeftIcon className="w-4 h-4 text-foreground/60" />
          </button>
          <button onClick={nextMonth} className="p-1 hover:bg-black/5 rounded-full transition-colors">
            <ChevronRightIcon className="w-4 h-4 text-foreground/60" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-muted-foreground/40 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: days }).map((_, i) => {
          const d = i + 1;
          const selected = isSelected(d);
          const today = isToday(d);
          return (
            <button
              key={d}
              onClick={() => onSelect(formatDate(d))}
              className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-all
                ${selected 
                  ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20' 
                  : today 
                    ? 'text-primary font-bold bg-primary/5' 
                    : 'text-foreground hover:bg-black/5'
                }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
        <button 
          onClick={() => onSelect('')}
          className="text-[11px] font-bold text-primary hover:opacity-80 transition-opacity"
        >
          清除
        </button>
        <button 
          onClick={() => onSelect(new Date().toISOString().split('T')[0])}
          className="text-[11px] font-bold text-primary hover:opacity-80 transition-opacity"
        >
          今天
        </button>
      </div>
    </div>
  );
};

interface SelectorProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  options?: string[];
  onSelect: (val: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  className?: string;
  dropdownWidth?: string;
}

const SelectorPill = ({ icon, label, value, options, onSelect, isOpen, onToggle, children, className, dropdownWidth }: SelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button 
        onClick={onToggle}
        className={className || `flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-[11px] font-medium whitespace-nowrap
          ${isOpen 
            ? 'bg-primary/10 border-primary/30 text-primary shadow-sm' 
            : 'bg-white border-black/5 text-muted-foreground hover:bg-black/5 hover:border-black/10'
          }`}
      >
        {icon && <span className="opacity-80">{icon}</span>}
        <span>{value || label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary opacity-100' : 'opacity-40'}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute bottom-full left-0 mb-2 ${dropdownWidth || 'w-48'} bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden z-[100] py-1`}
          >
            <div className="px-4 py-2 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider border-b border-black/5 mb-1 bg-black/[0.01]">
              {label}
            </div>
            {children ? children : (
              options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onSelect(opt);
                    onToggle();
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs hover:bg-black/5 flex items-center justify-between transition-colors"
                >
                  <span className={value === opt ? 'text-primary font-bold' : 'text-foreground'}>{opt}</span>
                  {value === opt && <Check className="w-3 h-3 text-primary" />}
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AIDialogueBox = () => {
  const navigate = useNavigate();
  const [isPlanning, setIsPlanning] = useState(false);
  const [activeSelector, setActiveSelector] = useState<string | null>(null);
  
  const [selections, setSelections] = useState(() => {
    const saved = localStorage.getItem('trip_defaults');
    const defaults = {
      car: '小鹏 G6 755超长续航',
      soc: '100%',
      charge: '只充快充',
      departureDate: '',
      arrivalDate: '',
      from: '',
      to: '',
      via: '',
      preference: ''
    };
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed, departureDate: '', arrivalDate: '', from: '', to: '', via: '', preference: '' };
      } catch (e) {
        return defaults;
      }
    }
    return defaults;
  });

  useEffect(() => {
    const defaultsToSave = {
      car: selections.car,
      soc: selections.soc,
      charge: selections.charge
    };
    localStorage.setItem('trip_defaults', JSON.stringify(defaultsToSave));
  }, [selections.car, selections.soc, selections.charge]);

  const [citySearch, setCitySearch] = useState('');
  const [viaSearch, setViaSearch] = useState('');
  const [carSearch, setCarSearch] = useState('');

  const cities = ['广州', '深圳', '珠海', '佛山', '中山', '江门', '大理', '丽江', '昆明', '成都', '重庆', '上海', '杭州', '北京'];
  const viaRecommendations = ['嘉兴、湖州', '无锡、常州', '桂林、阳朔', '南宁、百色'];
  const carOptions = ['小鹏 G6 755超长续航', '小鹏 G9 702 Pro', '小鹏 P7i 702 Max', '小鹏 X9 702 超长续航'];

  const filteredCities = cities.filter(c => c.includes(citySearch));
  const filteredVia = [...viaRecommendations, '直达'].filter(v => v.includes(viaSearch));
  const filteredCars = carOptions.filter(c => c.toLowerCase().includes(carSearch.toLowerCase()));

  const handleStartPlanning = () => {
    if (!selections.departureDate || !selections.arrivalDate || !selections.from || !selections.to) {
      return;
    }
    setIsPlanning(true);
    setTimeout(() => {
      navigate('/planning');
    }, 4000);
  };

  const carRanges: Record<string, number> = {
    '小鹏 G6 755超长续航': 755,
    '小鹏 G9 702 Pro': 702,
    '小鹏 P7i 702 Max': 702,
    '小鹏 X9 702 超长续航': 702
  };

  const calculateRange = (car: string, soc: string) => {
    const baseRange = carRanges[car] || 755;
    const percentage = parseInt(soc) / 100;
    return Math.round(baseRange * percentage);
  };

  const displaySOC = `${selections.soc} (约 ${calculateRange(selections.car, selections.soc)}km)`;

  const toggleSelector = (id: string) => {
    setActiveSelector(activeSelector === id ? null : id);
    setCitySearch('');
    setViaSearch('');
    setCarSearch('');
  };

  const updateSelection = (key: keyof typeof selections, val: string) => {
    setSelections(prev => ({ ...prev, [key]: val }));
  };

  const inlineSelectorClass = "inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/5 rounded-lg border border-transparent text-foreground/80 text-xs hover:bg-black/10 transition-colors font-bold align-baseline";

  return (
    <div className="flex flex-col w-full bg-white rounded-3xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-visible min-h-[180px] relative justify-center items-center">
      <AnimatePresence mode="wait">
        {!isPlanning ? (
          <motion.div 
            key="input-area"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex flex-col"
          >
            {/* Structured Input Area */}
            <div className="p-8 pb-4 flex-1">
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-3 text-sm md:text-base text-foreground font-medium leading-relaxed">
                <span className="text-foreground/40 shrink-0">我想在</span>
                <SelectorPill 
                  label="出发日期" 
                  value={selections.departureDate}
                  onSelect={(v) => updateSelection('departureDate', v)}
                  isOpen={activeSelector === 'departureDate'}
                  onToggle={() => toggleSelector('departureDate')}
                  className={inlineSelectorClass}
                  dropdownWidth="w-auto"
                >
                  <CustomCalendar 
                    value={selections.departureDate}
                    onSelect={(v) => {
                      updateSelection('departureDate', v);
                      toggleSelector('departureDate');
                    }}
                  />
                </SelectorPill>
                <span className="text-foreground/40 shrink-0">出发，</span>
                
                <SelectorPill 
                  label="到达日期" 
                  value={selections.arrivalDate}
                  onSelect={(v) => updateSelection('arrivalDate', v)}
                  isOpen={activeSelector === 'arrivalDate'}
                  onToggle={() => toggleSelector('arrivalDate')}
                  className={inlineSelectorClass}
                  dropdownWidth="w-auto"
                >
                  <CustomCalendar 
                    value={selections.arrivalDate}
                    onSelect={(v) => {
                      updateSelection('arrivalDate', v);
                      toggleSelector('arrivalDate');
                    }}
                  />
                </SelectorPill>
                <span className="text-foreground/40 shrink-0">到达，</span>
                
                <span className="text-foreground/40 shrink-0">从</span>
                <SelectorPill 
                  label="起点" 
                  value={selections.from}
                  onSelect={(v) => updateSelection('from', v)}
                  isOpen={activeSelector === 'from'}
                  onToggle={() => toggleSelector('from')}
                  className={inlineSelectorClass}
                >
                  <div className="p-2 flex flex-col gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="搜索城市..."
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        className="w-full pl-7 pr-2 py-1.5 text-xs bg-black/5 rounded-lg outline-none"
                      />
                    </div>
                    <div className="max-h-40 overflow-y-auto custom-scrollbar">
                      {filteredCities.map(city => (
                        <button
                          key={city}
                          onClick={() => {
                            updateSelection('from', city);
                            toggleSelector('from');
                          }}
                          className="w-full text-left px-2 py-1.5 text-xs hover:bg-black/5 rounded transition-colors"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </SelectorPill>
                
                <span className="text-foreground/40 shrink-0">到</span>
                <SelectorPill 
                  label="终点" 
                  value={selections.to}
                  onSelect={(v) => updateSelection('to', v)}
                  isOpen={activeSelector === 'to'}
                  onToggle={() => toggleSelector('to')}
                  className={inlineSelectorClass}
                >
                  <div className="p-2 flex flex-col gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="搜索城市..."
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        className="w-full pl-7 pr-2 py-1.5 text-xs bg-black/5 rounded-lg outline-none"
                      />
                    </div>
                    <div className="max-h-40 overflow-y-auto custom-scrollbar">
                      {filteredCities.map(city => (
                        <button
                          key={city}
                          onClick={() => {
                            updateSelection('to', city);
                            toggleSelector('to');
                          }}
                          className="w-full text-left px-2 py-1.5 text-xs hover:bg-black/5 rounded transition-colors"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </SelectorPill>
                
                <span className="text-foreground/40 shrink-0">，途径</span>
                <SelectorPill 
                  label="途径地" 
                  value={selections.via}
                  onSelect={(v) => updateSelection('via', v)}
                  isOpen={activeSelector === 'via'}
                  onToggle={() => toggleSelector('via')}
                  className={inlineSelectorClass}
                >
                  <div className="p-2 flex flex-col gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="搜索或选择推荐..."
                        value={viaSearch}
                        onChange={(e) => setViaSearch(e.target.value)}
                        className="w-full pl-7 pr-2 py-1.5 text-xs bg-black/5 rounded-lg outline-none"
                      />
                    </div>
                    <div className="px-2 py-1 text-[9px] font-bold text-muted-foreground/50 uppercase tracking-wider">智能推荐</div>
                    <div className="max-h-40 overflow-y-auto custom-scrollbar">
                      {filteredVia.map(v => (
                        <button
                          key={v}
                          onClick={() => {
                            updateSelection('via', v);
                            toggleSelector('via');
                          }}
                          className="w-full text-left px-2 py-1.5 text-xs hover:bg-black/5 rounded transition-colors flex items-center justify-between"
                        >
                          <span>{v}</span>
                          {v !== '直达' && <Sparkles className="w-2.5 h-2.5 text-primary/40" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </SelectorPill>
                
                <span className="text-foreground/40 shrink-0">，我的偏好是</span>
                <SelectorPill 
                  label="偏好" 
                  value={selections.preference}
                  options={['只要厕所', '美食优先', '美食+顺便逛景点']}
                  onSelect={(v) => updateSelection('preference', v)}
                  isOpen={activeSelector === 'preference'}
                  onToggle={() => toggleSelector('preference')}
                  className={inlineSelectorClass}
                />
                
                <div className="flex-1 min-w-[120px] flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="输入更多规划需求" 
                    className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-foreground/30 font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="px-6 py-5 flex items-center justify-between gap-4 bg-black/[0.01] border-t border-black/5 rounded-b-3xl">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <SelectorPill 
                  icon={<Car className="w-3.5 h-3.5" />} 
                  label="车型 (必选)" 
                  value={selections.car}
                  onSelect={(v) => updateSelection('car', v)}
                  isOpen={activeSelector === 'car'}
                  onToggle={() => toggleSelector('car')}
                  dropdownWidth="w-64"
                  className={`flex items-center gap-1.5 px-1 py-1 transition-all text-[11px] font-bold whitespace-nowrap border-b border-transparent
                    ${selections.car ? 'text-foreground border-black/10' : 'text-muted-foreground hover:text-foreground hover:border-black/20'}`}
                >
                  <div className="p-2 flex flex-col gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="搜索车型..."
                        value={carSearch}
                        onChange={(e) => setCarSearch(e.target.value)}
                        className="w-full pl-7 pr-2 py-1.5 text-xs bg-black/5 rounded-lg outline-none"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto custom-scrollbar">
                      {filteredCars.map(car => (
                        <button
                          key={car}
                          onClick={() => {
                            updateSelection('car', car);
                            toggleSelector('car');
                          }}
                          className="w-full text-left px-2 py-2 text-xs hover:bg-black/5 rounded-lg transition-colors flex items-center justify-between"
                        >
                          <span className={selections.car === car ? 'text-primary font-bold' : 'text-foreground'}>{car}</span>
                          {selections.car === car && <Check className="w-3 h-3 text-primary" />}
                        </button>
                      ))}
                      {filteredCars.length === 0 && (
                        <div className="px-2 py-4 text-center text-[10px] text-muted-foreground">未找到相关车型</div>
                      )}
                    </div>
                  </div>
                </SelectorPill>
                <SelectorPill 
                  icon={<Battery className="w-3.5 h-3.5" />} 
                  label="电量 (必选)" 
                  value={displaySOC}
                  onSelect={(v) => updateSelection('soc', v)}
                  isOpen={activeSelector === 'soc'}
                  onToggle={() => toggleSelector('soc')}
                  className={`flex items-center gap-1.5 px-1 py-1 transition-all text-[11px] font-bold whitespace-nowrap border-b border-transparent
                    ${selections.soc ? 'text-foreground border-black/10' : 'text-muted-foreground hover:text-foreground hover:border-black/20'}`}
                >
                  <div className="px-4 py-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-foreground">当前电量</span>
                      <span className="text-xs font-bold text-primary">{displaySOC}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={parseInt(selections.soc)}
                      onChange={(e) => updateSelection('soc', `${e.target.value}%`)}
                      className="w-full h-1.5 bg-black/5 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[9px] text-muted-foreground font-medium">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </SelectorPill>
                <SelectorPill 
                  icon={<Zap className="w-3.5 h-3.5" />} 
                  label="充电" 
                  value={selections.charge}
                  options={['只充快充', '接受慢充', '必须品牌超充']}
                  onSelect={(v) => updateSelection('charge', v)}
                  isOpen={activeSelector === 'charge'}
                  onToggle={() => toggleSelector('charge')}
                  className={`flex items-center gap-1.5 px-1 py-1 transition-all text-[11px] font-bold whitespace-nowrap border-b border-transparent
                    ${selections.charge ? 'text-foreground border-black/10' : 'text-muted-foreground hover:text-foreground hover:border-black/20'}`}
                />
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={handleStartPlanning}
                  disabled={!selections.car || !selections.soc || !selections.departureDate || !selections.arrivalDate || !selections.from || !selections.to}
                  className="h-10 px-6 rounded-xl bg-primary text-white flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 whitespace-nowrap disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  <span className="text-sm font-bold">开始规划</span>
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="planning-animation"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            {/* Tech Ball Animation */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Outer Glow */}
              <motion.div 
                className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Concentric Circles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute border border-primary/10 rounded-full backdrop-blur-[2px]"
                  initial={{ width: 0, height: 0, opacity: 0 }}
                  animate={{ 
                    width: [80 + i * 40, 100 + i * 40, 80 + i * 40],
                    height: [80 + i * 40, 100 + i * 40, 80 + i * 40],
                    opacity: [0.05, 0.2, 0.05],
                    rotate: i % 2 === 0 ? 360 : -360
                  }}
                  transition={{ 
                    duration: 5 + i, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              ))}
              
              {/* Core Sphere */}
              <motion.div 
                className="relative w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]"
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    'inset 0 0 20px rgba(255,255,255,0.2), 0 0 30px rgba(var(--primary), 0.1)',
                    'inset 0 0 30px rgba(255,255,255,0.3), 0 0 50px rgba(var(--primary), 0.2)',
                    'inset 0 0 20px rgba(255,255,255,0.2), 0 0 30px rgba(var(--primary), 0.1)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-primary/40 animate-pulse" />
              </motion.div>

              {/* Spiritual Particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/40 rounded-full"
                  initial={{ 
                    x: Math.cos(i * 18 * Math.PI / 180) * 60,
                    y: Math.sin(i * 18 * Math.PI / 180) * 60,
                    opacity: 0.1
                  }}
                  animate={{
                    x: Math.cos((i * 18 + 360) * Math.PI / 180) * (60 + Math.random() * 40),
                    y: Math.sin((i * 18 + 360) * Math.PI / 180) * (60 + Math.random() * 40),
                    opacity: [0.1, 0.6, 0.1],
                    scale: [0.5, 1.2, 0.5]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}

              {/* Orbiting Ring */}
              <motion.div 
                className="absolute w-32 h-32 border-t border-primary/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Shimmer Text */}
            <motion.div 
              className="mt-12 relative overflow-hidden px-8 py-3 rounded-full bg-black/[0.02] border border-black/[0.05]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-xs font-bold tracking-[0.4em] text-primary/40 uppercase">
                路书生成中...
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
