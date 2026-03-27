import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  MapPin, 
  Calendar, 
  Star, 
  Share2, 
  Heart, 
  Navigation, 
  Clock, 
  Zap,
  CheckCircle2,
  Bookmark,
  Camera,
  Info
} from 'lucide-react';
import { GuluLogo } from '../components/GuluLogo';

const cases = [
  {
    id: '1',
    title: "川西秘境：折多山与贡嘎雪山之约",
    description: "探索高原之美，体验极致驾驶。从小鹏超充站出发，无惧高海拔挑战，直抵雪山之巅。",
    image: "https://picsum.photos/seed/sichuan/1200/600",
    distance: "1200km",
    days: "5天",
    rating: "4.9",
    tag: "极致探险",
    summary: "这段旅程不仅是对车辆性能的考验，更是对心灵的洗礼。从成都出发，一路向西，海拔逐渐升高，景色也愈发壮丽。折多山的云海、贡嘎雪山的日落，每一刻都值得铭记。",
    waypoints: [
      { name: "成都", type: "start", desc: "出发点，满电出发" },
      { name: "雅安", type: "charge", desc: "快充补能，品尝雅鱼" },
      { name: "康定", type: "stay", desc: "情歌故乡，海拔适应" },
      { name: "折多山", type: "attraction", desc: "康巴第一关，云海奇观" },
      { name: "新都桥", type: "stay", desc: "摄影家的天堂" },
      { name: "贡嘎观景台", type: "end", desc: "直面蜀山之王" }
    ]
  },
  {
    id: '2',
    title: "独库公路：文明自驾，守护天山净土",
    description: "穿越壮丽天山，领略四季奇观。新疆文旅厅呼吁广大车主文明出行，不留垃圾，让大美新疆美景永驻。",
    image: "https://picsum.photos/seed/xinjiang/1200/600",
    distance: "560km",
    days: "3天",
    rating: "5.0",
    tag: "文明出行",
    summary: "独库公路，被誉为中国最美公路之一。一日历四季，十里不同天。在这里，我们不仅是风景的观赏者，更是环境的守护者。请带走垃圾，留下美好。",
    waypoints: [
      { name: "独山子", type: "start", desc: "公路起点" },
      { name: "乔尔玛", type: "attraction", desc: "烈士陵园，致敬筑路英雄" },
      { name: "那拉提", type: "stay", desc: "空中草原" },
      { name: "巴音布鲁克", type: "attraction", desc: "九曲十八弯日落" },
      { name: "库车", type: "end", desc: "终点，大峡谷奇观" }
    ]
  }
];

export const RoadbookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  
  const roadbook = cases.find(c => c.id === id) || cases[0];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[60vh] relative overflow-hidden">
        <img 
          src={roadbook.image} 
          alt={roadbook.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-6 right-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              {roadbook.tag}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {roadbook.title}
          </h1>
          <div className="flex items-center gap-6 text-white/80 text-sm font-medium">
            <div className="flex items-center gap-1.5">
              <Navigation className="w-4 h-4" />
              {roadbook.distance}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {roadbook.days}
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              {roadbook.rating}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center p-1.5">
                <GuluLogo className="w-full h-full text-primary" />
              </div>
              路书总结
            </h2>
            <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/10">
              <p className="text-lg text-foreground/80 leading-relaxed italic font-serif">
                "{roadbook.summary}"
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              行程轨迹
            </h2>
            <div className="space-y-0 relative">
              {roadbook.waypoints.map((point, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-12 pb-10 last:pb-0 group"
                >
                  {/* Timeline Line */}
                  <div className="absolute left-[15px] top-4 bottom-0 w-px bg-black/5 group-last:hidden" />
                  
                  <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 border-white shadow-sm transition-transform group-hover:scale-110
                    ${point.type === 'start' ? 'bg-black' : 
                      point.type === 'end' ? 'bg-black' : 
                      point.type === 'charge' ? 'bg-primary' : 'bg-primary/40'}
                  `}>
                    {point.type === 'start' && <Navigation className="w-4 h-4 text-white" />}
                    {point.type === 'end' && <MapPin className="w-4 h-4 text-white" />}
                    {point.type === 'charge' && <Zap className="w-4 h-4 text-white" />}
                    {point.type === 'attraction' && <Camera className="w-4 h-4 text-white" />}
                    {point.type === 'stay' && <Info className="w-4 h-4 text-white" />}
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-black/5 hover:border-primary/20 transition-all hover:shadow-lg hover:shadow-black/5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold">{point.name}</h3>
                      {point.type === 'charge' && (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          5个可用快充
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-[#F9F9F9] p-8 rounded-[32px] border border-black/5">
              <h3 className="text-xl font-bold mb-6">自驾建议</h3>
              <ul className="space-y-4">
                {[
                  "高海拔地区注意防晒与保暖",
                  "建议携带便携式充电枪",
                  "部分路段信号较弱，请提前下载离线地图",
                  "文明自驾，垃圾随车带走"
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/70 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-primary transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3">
              <Navigation className="w-5 h-5" />
              规划同款
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
