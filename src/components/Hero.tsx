import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { AIDialogueBox } from './AIDialogueBox';

export const Hero = () => {
  return (
    <section 
      className="relative w-full overflow-hidden flex flex-col"
      style={{ minHeight: 'calc(100vh - 64px)' }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="flex-1" />
      
      <div className="relative z-10 flex flex-col items-center w-full px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h1 className="font-serif text-[52px] md:text-[72px] font-bold leading-[1.1] text-foreground tracking-tight">
            咕噜咕噜，
            <span className="relative inline-block">
              <span className="text-amber-500 italic px-2 relative z-10">快乐</span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.8, ease: "circOut" }}
                className="absolute bottom-2 left-0 h-[30%] bg-amber-200/40 -z-0 rounded-sm"
              />
              <motion.span 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute -top-2 -right-4"
              >
                <Sparkles className="w-6 h-6 text-amber-400 fill-amber-400/20" />
              </motion.span>
            </span>
            满途
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-center text-base md:text-xl text-muted-foreground max-w-[700px] leading-relaxed font-body"
        >
          咕噜路书，陪你探索每一段充满惊喜的电车旅程，让自驾更简单
        </motion.p>

        {/* AI Dialogue Box Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 w-full max-w-[800px]"
        >
          <div 
            className="rounded-2xl p-1"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: 'var(--shadow-dashboard)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <AIDialogueBox />
          </div>
        </motion.div>
      </div>
      
      {/* Adaptive Spacer */}
      <div className="flex-1" />

      {/* Bottom Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative z-10 flex flex-col items-center pb-12"
      >
        <div className="relative flex items-center justify-center w-14 h-14">
          <motion.div
            animate={{ 
              y: [0, 12, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="w-10 h-10 text-white stroke-[2]" />
          </motion.div>
          
          {/* Pulse ring */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};
