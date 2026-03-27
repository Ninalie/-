import React from 'react';

export const DashboardPreview = () => {
  return (
    <div className="w-full h-[500px] bg-white/80 rounded-xl overflow-hidden flex flex-col select-none pointer-events-none">
      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-40 border-r border-border p-4 space-y-4 hidden md:block">
          <div className="space-y-2">
            <div className="h-2 w-12 bg-muted rounded" />
            <div className="h-2 w-16 bg-muted rounded" />
          </div>
          <div className="space-y-2 pt-4">
            <div className="h-2 w-14 bg-accent/20 rounded" />
            <div className="h-2 w-10 bg-muted rounded" />
            <div className="h-2 w-12 bg-muted rounded" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6 overflow-hidden">
          {/* Header Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 border border-border rounded-lg space-y-2">
                <div className="h-2 w-12 bg-muted rounded" />
                <div className="h-4 w-16 bg-foreground/10 rounded" />
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="flex-1 border border-border rounded-xl p-4 flex flex-col space-y-4 min-h-0">
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 bg-muted rounded" />
              <div className="flex gap-2">
                <div className="h-4 w-8 bg-muted rounded" />
                <div className="h-4 w-8 bg-muted rounded" />
              </div>
            </div>
            
            <div className="flex-1 relative">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="50" x2="400" y2="50" stroke="currentColor" className="text-border" strokeWidth="0.5" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" className="text-border" strokeWidth="0.5" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="currentColor" className="text-border" strokeWidth="0.5" />
                
                {/* Area Gradient */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Cubic Bezier Path */}
                <path
                  d="M0,160 C50,160 80,40 150,60 C220,80 280,180 400,100 L400,200 L0,200 Z"
                  fill="url(#chartGradient)"
                />
                <path
                  d="M0,160 C50,160 80,40 150,60 C220,80 280,180 400,100"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="2"
                />
                
                {/* Data Points */}
                <circle cx="150" cy="60" r="3" fill="hsl(var(--accent))" />
                <circle cx="400" cy="100" r="3" fill="hsl(var(--accent))" />
              </svg>
            </div>
          </div>

          {/* Table-like list */}
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted" />
                  <div className="h-2 w-24 bg-muted rounded" />
                </div>
                <div className="h-2 w-12 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom status bar */}
      <div className="h-8 border-t border-border bg-muted/30 flex items-center px-4 justify-between text-[10px] text-muted-foreground uppercase tracking-wider">
        <div className="flex gap-4">
          <span>系统运行中</span>
          <span>v2.4.0</span>
        </div>
        <div className="flex gap-4">
          <span>延迟: 12ms</span>
          <span>在线率: 99.9%</span>
        </div>
      </div>
    </div>
  );
};
