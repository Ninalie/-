import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, CheckCircle2, Clock, ArrowRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Roadbook {
  id: string;
  title: string;
  route: string;
  dateRange: string;
  days: number;
  type: 'planned' | 'checked-in' | 'favorite';
  image: string;
  stops: number;
  distance: string;
}

const mockRoadbooks: Roadbook[] = [
  {
    id: '1',
    title: '大理丽江深度游',
    route: '广州 - 云南',
    dateRange: '2026.03.25 - 03.30',
    days: 6,
    type: 'planned',
    image: 'https://images.unsplash.com/photo-1542361345-89ce1f116658?auto=format&fit=crop&q=80&w=400&h=250',
    stops: 12,
    distance: '1850km'
  },
  {
    id: '2',
    title: '顺德美食特种兵',
    route: '广州 - 佛山',
    dateRange: '2026.03.20 - 03.21',
    days: 2,
    type: 'checked-in',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400&h=250',
    stops: 8,
    distance: '60km'
  },
  {
    id: '3',
    title: '川西小环线',
    route: '成都 - 康定',
    dateRange: '2026.04.15 - 04.22',
    days: 8,
    type: 'planned',
    image: 'https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?auto=format&fit=crop&q=80&w=400&h=250',
    stops: 15,
    distance: '1200km'
  },
  {
    id: '4',
    title: '海南环岛自驾',
    dateRange: '2026.02.10 - 02.20',
    days: 11,
    route: '海口 - 三亚',
    type: 'checked-in',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400&h=250',
    stops: 20,
    distance: '800km'
  },
  {
    id: '5',
    title: '莫干山周末小憩',
    dateRange: '2026.03.10 - 03.12',
    days: 3,
    route: '上海 - 湖州',
    type: 'checked-in',
    image: 'https://images.unsplash.com/photo-1536250853075-e8504ee040b9?auto=format&fit=crop&q=80&w=400&h=250',
    stops: 5,
    distance: '200km'
  },
  {
    id: '6',
    title: '川西秘境：折多山与贡嘎雪山之约',
    route: '成都 - 贡嘎',
    dateRange: '收藏于 2026.03.27',
    days: 5,
    type: 'favorite',
    image: 'https://images.unsplash.com/photo-1542361345-89ce1f116658?auto=format&fit=crop&q=80&w=400&h=250',
    stops: 6,
    distance: '1200km'
  },
  {
    id: '7',
    title: '独库公路：文明自驾',
    route: '独山子 - 库车',
    dateRange: '收藏于 2026.03.26',
    days: 3,
    type: 'favorite',
    image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=400&h=250',
    stops: 5,
    distance: '560km'
  }
];

export const AllRoadbooksPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'planned' | 'checked-in' | 'favorite'>('all');
  const navigate = useNavigate();

  const filteredRoadbooks = mockRoadbooks.filter(rb => 
    activeTab === 'all' ? true : rb.type === activeTab
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground">全部路书</h1>
            <p className="text-muted-foreground mt-2">管理你的每一次智驾旅程</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-black/5 w-fit shadow-sm">
          {[
            { id: 'all', label: '全部' },
            { id: 'planned', label: '计划中' },
            { id: 'checked-in', label: '已打卡' },
            { id: 'favorite', label: '收藏' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-muted-foreground hover:bg-black/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoadbooks.map((rb, idx) => (
            <motion.div
              key={rb.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-[32px] border border-black/5 overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 cursor-pointer"
              onClick={() => rb.type === 'favorite' ? navigate(`/roadbook/${rb.id === '6' ? '1' : '2'}`) : navigate('/planning')}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={rb.image} 
                  alt={rb.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-foreground text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    {rb.type === 'planned' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                    {rb.type === 'checked-in' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                    {rb.type === 'favorite' && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                    {rb.type === 'planned' ? '计划中' : rb.type === 'checked-in' ? '已打卡' : '收藏'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{rb.title}</h3>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{rb.dateRange}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{rb.route}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-black/5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">自驾天数</span>
                    <span className="text-xs font-bold">{rb.days}天</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">途径点</span>
                    <span className="text-xs font-bold">{rb.stops}个</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">里程</span>
                    <span className="text-xs font-bold">{rb.distance}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
