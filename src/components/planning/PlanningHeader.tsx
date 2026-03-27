import React from 'react';
import { Calendar, MapPin, ChevronLeft, Share2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlanningHeaderProps {
  command?: string;
}

export const PlanningHeader = ({ command = "枕山而眠，听洱海呼吸，在晨曦中与苍山对白。" }: PlanningHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full px-8 py-5 bg-white border-b border-black/5 flex items-center justify-between shadow-sm z-10">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-foreground/60" />
        </button>
        
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-foreground tracking-tight">大理丽江深度游</h2>
          <div className="w-px h-5 bg-black/10" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">2026.03.25 - 03.30</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">广州 - 云南</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {command && (
          <div className="flex items-center gap-2 px-6 py-2.5 bg-primary/5 rounded-2xl border border-primary/10 shadow-[0_4px_12px_rgba(var(--primary),0.05)]">
            <Sparkles className="w-3.5 h-3.5 text-primary/60" />
            <span className="text-xs font-medium text-primary/80 italic tracking-wide">
              {command}
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 border border-black/10 rounded-full text-sm font-bold hover:bg-black/5 transition-all flex items-center gap-2.5">
            <Share2 className="w-4 h-4" />
            分享路书
          </button>
        </div>
      </div>
    </div>
  );
};
