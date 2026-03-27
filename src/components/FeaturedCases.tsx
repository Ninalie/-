import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cases = [
  {
    id: '1',
    title: "川西秘境：折多山与贡嘎雪山之约",
    description: "探索高原之美，体验极致驾驶。从小鹏超充站出发，无惧高海拔挑战，直抵雪山之巅。",
    image: "https://picsum.photos/seed/sichuan/800/1000",
    distance: "1200km",
    days: "5天",
    rating: "4.9",
    tag: "极致探险"
  },
  {
    id: '2',
    title: "独库公路：文明自驾，守护天山净土",
    description: "穿越壮丽天山，领略四季奇观。新疆文旅厅呼吁广大车主文明出行，不留垃圾，让大美新疆美景永驻。",
    image: "https://picsum.photos/seed/xinjiang/800/1000",
    distance: "560km",
    days: "3天",
    rating: "5.0",
    tag: "文明出行",
    url: "https://www.jfdaily.com/sgh/detail?id=807624"
  },
  {
    id: '3',
    title: "海南环岛：椰风海韵，醉美海岸线",
    description: "漫步碧海蓝天，享受悠闲时光。全岛充电网络覆盖，开启纯电环岛新篇章，海风拂面。",
    image: "https://picsum.photos/seed/hainan/800/1000",
    distance: "850km",
    days: "4天",
    rating: "4.8",
    tag: "休闲度假"
  },
  {
    id: '4',
    title: "带上毛孩子：大理洱海宠物友好自驾",
    description: "带上心爱的宠物，在洱海边漫步。精选宠物友好酒店与餐厅，让旅程不再孤单，充满欢笑。",
    image: "https://picsum.photos/seed/pet/800/1000",
    distance: "450km",
    days: "3天",
    rating: "4.9",
    tag: "宠物友好"
  },
  {
    id: '5',
    title: "莫干山：竹林深处，智驾避暑之旅",
    description: "逃离城市喧嚣，躲进万亩竹海。智能辅助驾驶让山路不再疲惫，尽享清凉夏日与静谧时光。",
    image: "https://picsum.photos/seed/bamboo/800/1000",
    distance: "220km",
    days: "2天",
    rating: "4.7",
    tag: "避暑胜地"
  },
  {
    id: '6',
    title: "呼伦贝尔：驰骋草原，追逐风的足迹",
    description: "在一望无际的草原上尽情驰骋。感受游牧文化，体验露营乐趣，在星空下畅谈人生理想。",
    image: "https://picsum.photos/seed/grassland/800/1000",
    distance: "1500km",
    days: "7天",
    rating: "5.0",
    tag: "草原风光"
  }
];

export const FeaturedCases = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full py-24 px-6 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold text-sm tracking-widest uppercase mb-3"
            >
              精选路书
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              优秀路书案例
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-md text-lg leading-relaxed"
          >
            参考其他车主的真实自驾经验，获取灵感，开启您的下一次智能出行。
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col cursor-pointer"
              onClick={() => item.url ? window.open(item.url, '_blank') : navigate(`/roadbook/${item.id}`)}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] mb-4 shadow-lg shadow-black/5">
                <img
                  src={item.image.replace('800/1000', '800/500')}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="px-3 py-1 bg-white/90 backdrop-blur-md text-black text-[9px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                    {item.tag}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 flex justify-between items-center text-white">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1 text-[8px] opacity-70 uppercase tracking-widest font-bold">
                      <MapPin className="w-2.5 h-2.5" />
                      距离
                    </div>
                    <div className="text-xs font-bold">{item.distance}</div>
                  </div>
                  <div className="w-px h-6 bg-white/20" />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1 text-[8px] opacity-70 uppercase tracking-widest font-bold">
                      <Calendar className="w-2.5 h-2.5" />
                      时长
                    </div>
                    <div className="text-xs font-bold">{item.days}</div>
                  </div>
                  <div className="w-px h-6 bg-white/20" />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1 text-[8px] opacity-70 uppercase tracking-widest font-bold">
                      <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                      评分
                    </div>
                    <div className="text-xs font-bold">{item.rating}</div>
                  </div>
                </div>
              </div>

              <div className="px-1">
                <h3 className="text-lg font-bold mb-1.5 group-hover:text-primary transition-colors flex items-center justify-between">
                  {item.title}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <button className="px-10 py-4 bg-black text-white rounded-full font-bold hover:bg-primary transition-all shadow-lg shadow-black/10 flex items-center gap-3 group">
            查看更多精品路书
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
