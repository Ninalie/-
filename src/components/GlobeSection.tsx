import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Sparkles } from 'lucide-react';

export const GlobeSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3" />
            <span>智能轨迹探索</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            每一段旅程 <br />
            <span className="text-primary italic">都有属于你的轨迹</span>
          </h2>
          
          <p className="text-muted-foreground max-w-xl text-sm md:text-base leading-relaxed">
            咕噜路书 (GuluDrive) 为你规划最合理的电车出行路线，实时监控充电桩状态，让你的自驾之旅无忧无虑。
          </p>
        </div>

        {/* Main Map Visualization */}
        <div className="relative w-full max-w-5xl mx-auto h-[400px] flex items-center justify-center">
          {/* Map Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=80" 
              alt="Map Background" 
              className="w-full h-full object-cover rounded-3xl grayscale brightness-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
          </div>

          {/* Trajectory Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 400">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(var(--primary), 0.1)" />
                <stop offset="50%" stopColor="rgba(var(--primary), 0.6)" />
                <stop offset="100%" stopColor="rgba(var(--primary), 0.1)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 150 250 Q 300 100 500 200 T 850 150"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeDasharray="8 8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Animated Glow Point */}
            <motion.circle
              r="4"
              fill="rgb(var(--primary))"
              initial={{ offset: 0 }}
              animate={{ offset: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <animateMotion
                path="M 150 250 Q 300 100 500 200 T 850 150"
                dur="3s"
                repeatCount="indefinite"
              />
            </motion.circle>
          </svg>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { label: '覆盖城市', value: '300+', icon: MapPin },
            { label: '充电桩数据', value: '50万+', icon: Navigation },
            { label: '规划路线', value: '100万+', icon: Sparkles },
            { label: '用户好评', value: '99%', icon: Sparkles }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
                <stat.icon className="w-5 h-5 text-primary/60" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
