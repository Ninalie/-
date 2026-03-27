import React from 'react';
import { Users, Dog, Battery, Coffee } from 'lucide-react';
import { MAX_RADIUS } from '../lib/design-tokens';
import { cn } from '../lib/utils';

interface TripConfigProps {
  config: any;
  onChange: (newConfig: any) => void;
}

export const TripConfig: React.FC<TripConfigProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-10 font-sans">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="flex items-center gap-3 font-heading text-2xl text-max-cyan">
            <Users size={28} /> 出行人数
          </label>
          <select 
            value={config.people}
            onChange={(e) => onChange({ ...config, people: e.target.value })}
            className="w-full p-4 border-4 border-max-fg bg-max-bg text-max-fg text-xl font-bold focus:ring-4 focus:ring-max-magenta outline-none"
            style={{ borderRadius: MAX_RADIUS.button }}
          >
            <option value="1">1人 (极客之旅)</option>
            <option value="2">2人 (浪漫智驾)</option>
            <option value="4">4人 (家庭探索)</option>
          </select>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 font-heading text-2xl text-max-magenta">
            <Dog size={28} /> 携带宠物
          </label>
          <div className="flex gap-4">
            <button 
              onClick={() => onChange({ ...config, hasPet: true })}
              className={cn(
                "flex-1 py-4 border-4 border-max-fg text-xl font-display transition-all",
                config.hasPet ? 'bg-max-magenta text-max-bg shadow-[4px_4px_0_var(--color-max-fg)]' : 'bg-max-bg text-max-fg'
              )}
              style={{ borderRadius: MAX_RADIUS.button }}
            >
              是
            </button>
            <button 
              onClick={() => onChange({ ...config, hasPet: false })}
              className={cn(
                "flex-1 py-4 border-4 border-max-fg text-xl font-display transition-all",
                !config.hasPet ? 'bg-max-fg text-max-bg shadow-[4px_4px_0_var(--color-max-magenta)]' : 'bg-max-bg text-max-fg'
              )}
              style={{ borderRadius: MAX_RADIUS.button }}
            >
              否
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <label className="flex items-center gap-3 font-heading text-2xl text-max-yellow">
          <Battery size={28} /> 当前续航 (km)
        </label>
        <input 
          type="range" 
          min="50" max="700" step="10"
          value={config.range}
          onChange={(e) => onChange({ ...config, range: e.target.value })}
          className="w-full h-6 bg-max-muted rounded-full appearance-none cursor-pointer accent-max-yellow border-2 border-max-fg"
        />
        <div className="flex justify-between font-display text-xl">
          <span className="text-max-fg/40">50KM</span>
          <span className="text-max-yellow text-4xl text-shadow-stack">{config.range}KM</span>
          <span className="text-max-fg/40">700KM</span>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3 font-heading text-2xl text-max-orange">
          <Coffee size={28} /> 休息偏好
        </label>
        <div className="flex flex-wrap gap-4">
          {['每2小时', '看心情', '特种兵'].map(pref => (
            <button
              key={pref}
              onClick={() => onChange({ ...config, restPref: pref })}
              className={cn(
                "px-8 py-2 border-4 border-max-fg text-lg font-bold transition-all",
                config.restPref === pref ? 'bg-max-orange text-max-bg shadow-[4px_4px_0_var(--color-max-fg)]' : 'bg-max-bg text-max-fg'
              )}
              style={{ borderRadius: MAX_RADIUS.button }}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
