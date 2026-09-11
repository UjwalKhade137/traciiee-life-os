import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useLifeOS();

  const navItems = [
    { id: 'today', label: 'Today', icon: 'home' },
    { id: 'track', label: 'Track', icon: 'add_circle' },
    { id: 'insights', label: 'Insights', icon: 'analytics' },
    { id: 'progress', label: 'Progress', icon: 'trending_up' },
    { id: 'me', label: 'Me', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#fafaf3]/95 backdrop-blur-md border-t border-surface-variant/50 px-3 pb-safe pt-2 md:pb-3 shadow-[0_-4px_20px_rgba(25,53,12,0.06)]">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-200 py-1 px-3 rounded-full ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm scale-100'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/50'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className={`text-[10px] font-bold tracking-tight uppercase mt-0.5 ${isActive ? 'text-primary-fixed' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
