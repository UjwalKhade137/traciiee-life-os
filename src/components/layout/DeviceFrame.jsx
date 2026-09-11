import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const DeviceFrame = ({ children }) => {
  const { deviceFrameMode, setDeviceFrameMode, data } = useLifeOS();

  return (
    <div className="min-h-screen bg-[#eeeee7] text-on-background flex flex-col items-center justify-start lg:py-6 transition-colors duration-300">
      {/* Floating control bar for desktop view */}
      <div className="hidden lg:flex items-center gap-3 mb-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-surface-variant shadow-organic">
        <span className="text-xs font-bold text-primary flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Traciiee Mobile OS (v1.2)
        </span>
        <div className="h-4 w-px bg-surface-variant"></div>
        <button
          onClick={() => setDeviceFrameMode('phone')}
          className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
            deviceFrameMode === 'phone'
              ? 'bg-primary text-white shadow-sm'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Mobile Frame
        </button>
        <button
          onClick={() => setDeviceFrameMode('fluid')}
          className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
            deviceFrameMode === 'fluid'
              ? 'bg-primary text-white shadow-sm'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Fluid Fullscreen
        </button>
      </div>

      {/* Frame Container */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceFrameMode === 'phone'
            ? 'max-w-[430px] lg:rounded-[44px] lg:border-[10px] lg:border-[#1a1c18] lg:shadow-[0_25px_60px_rgba(0,0,0,0.22)] relative overflow-hidden bg-[#fafaf3] min-h-[920px]'
            : 'max-w-4xl bg-[#fafaf3] lg:rounded-2xl lg:shadow-organic overflow-hidden'
        }`}
      >
        {/* Simulated iOS Status Bar on Mobile Frame */}
        {deviceFrameMode === 'phone' && (
          <div className="hidden lg:flex justify-between items-center px-7 pt-3 pb-1 text-xs text-on-surface select-none bg-[#fafaf3] z-50">
            <span className="font-mono-data font-bold text-[13px]">9:41</span>
            {/* Dynamic Island Cutout */}
            <div className="w-24 h-4 bg-[#1a1c18] rounded-full mx-auto flex items-center justify-end px-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[14px]">wifi</span>
              <span className="material-symbols-outlined text-[15px]">battery_full</span>
            </div>
          </div>
        )}

        {/* Content View */}
        <div className="min-h-screen pb-24 relative flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};
