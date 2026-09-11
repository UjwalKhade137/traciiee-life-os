import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const TopHeader = () => {
  const { data, setShowUpgradeModal, deviceFrameMode, setDeviceFrameMode } = useLifeOS();
  const { profile, lifeScore } = data;

  return (
    <header className="sticky top-0 z-40 bg-[#fafaf3]/95 backdrop-blur-md border-b border-surface-variant/40 px-container-margin py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Left: Avatar & App Name */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary-container shadow-sm"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
              }}
            />
            {profile.accountType === 'trial' && (
              <span 
                onClick={() => setShowUpgradeModal(true)}
                title="Guest Mode - Click to Save Account"
                className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full cursor-pointer hover:bg-amber-600 shadow-sm animate-pulse"
              >
                GUEST
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-headline-sm text-lg font-bold text-primary tracking-tight">Traciiee</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">OS</span>
            </div>
            <p className="text-[11px] text-on-surface-variant font-medium">Life Operating System</p>
          </div>
        </div>

        {/* Right: Streak & Life Score Badges + Frame Switcher */}
        <div className="flex items-center gap-2">
          {/* Streak Flame Badge */}
          <div 
            title={`Active Daily Streak: ${profile.streak} Days. Best: ${profile.bestStreak} Days.`}
            className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-full border border-surface-variant/60 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px] text-[#e65100]" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            <span className="font-mono-data text-xs font-bold text-on-surface">
              {profile.streak}d
            </span>
          </div>

          {/* Life Score Pill */}
          <div 
            title="Composite Life Score out of 100"
            className="flex items-center gap-1 bg-primary text-on-primary px-2.5 py-1 rounded-full shadow-sm"
          >
            <span className="text-[11px] font-medium opacity-80">Score</span>
            <span className="font-mono-data text-xs font-bold text-primary-fixed">
              {lifeScore.current}
            </span>
          </div>

          {/* Device Frame Viewport Toggle (Desktop helper) */}
          <button
            onClick={() => setDeviceFrameMode(prev => prev === 'phone' ? 'fluid' : 'phone')}
            title={deviceFrameMode === 'phone' ? 'Switch to Fluid Desktop View' : 'Switch to Simulated Mobile Frame'}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-surface-container hover:bg-surface-variant text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {deviceFrameMode === 'phone' ? 'fullscreen' : 'smartphone'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
