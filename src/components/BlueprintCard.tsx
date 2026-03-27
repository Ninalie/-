import React from 'react';
import { MAX_RADIUS, MAX_SHADOWS } from '../lib/design-tokens';
import { cn } from '../lib/utils';

interface BlueprintCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  variant?: 'cyan' | 'purple' | 'magenta';
}

export const BlueprintCard: React.FC<BlueprintCardProps> = ({ 
  title, 
  description, 
  icon, 
  className = '',
  variant = 'cyan'
}) => {
  return (
    <div 
      className={cn(
        "bg-max-muted text-max-fg p-8 border-4 border-max-fg relative overflow-hidden group",
        className
      )}
      style={{ 
        borderRadius: MAX_RADIUS.card,
        boxShadow: MAX_SHADOWS[variant]
      }}
    >
      {/* Scanning Line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="w-full h-2 bg-gradient-to-b from-transparent via-max-cyan to-transparent animate-scan" />
      </div>

      {/* HUD Annotations */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-max-cyan rounded-full animate-pulse" />
        <div className="font-display text-xs text-max-cyan uppercase tracking-widest">
          系统就绪
        </div>
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-max-fg/40">
        小鹏OS V5.0 | NPG已激活
      </div>

      <div className="relative z-10">
        <div className={cn(
          "w-16 h-16 border-4 flex items-center justify-center mb-6 rotate-3 bg-max-bg",
          variant === 'cyan' ? "border-max-cyan text-max-cyan" : 
          variant === 'purple' ? "border-max-purple text-max-purple" : 
          "border-max-magenta text-max-magenta"
        )}>
          {icon}
        </div>
        <h3 className="font-heading text-4xl mb-4 text-shadow-stack">{title}</h3>
        <p className="text-max-fg/80 font-sans text-xl leading-relaxed">{description}</p>
      </div>
      
      {/* Decorative corner lines */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-max-fg/20" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-max-fg/20" />
    </div>
  );
};
