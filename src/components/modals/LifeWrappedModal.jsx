import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const LifeWrappedModal = () => {
  const { showLifeWrapped, setShowLifeWrapped, data } = useLifeOS();
  const [slide, setSlide] = useState(0);

  if (!showLifeWrapped) return null;

  const slides = [
    {
      title: 'Your Month in Focus',
      subtitle: 'Traciiee Wrapped • September 2026',
      heroMetric: `${data.lifeScore.current}/100`,
      heroLabel: 'Average Life Score',
      description: 'You maintained consistent circadian balance, high study output, and sustained momentum.',
      bgColor: 'from-[#061f00] to-[#19350c]'
    },
    {
      title: 'Deep Work & Academics',
      subtitle: 'Brainpower Unleashed',
      heroMetric: '74.5 Hours',
      heroLabel: 'Total Study & Focus Logged',
      description: 'Top Subject: Computer Networks. Completed 2 major laboratory assignments ahead of schedule.',
      bgColor: 'from-[#19350c] to-[#3e6566]'
    },
    {
      title: 'Consistency & Streak',
      subtitle: 'Unbroken Discipline',
      heroMetric: `${data.profile.streak} Days`,
      heroLabel: 'Active Streak Record',
      description: 'You logged your habits every single day without needing a streak freeze.',
      bgColor: 'from-[#001d25] to-[#00343f]'
    },
    {
      title: 'Soundtrack to Productivity',
      subtitle: 'Sonic Flow State',
      heroMetric: `${data.music.listeningMinToday * 20} mins`,
      heroLabel: 'Instrumental & Lo-Fi Minutes',
      description: 'Your top playlist boosted study focus endurance by +24%.',
      bgColor: 'from-[#2e1065] to-[#4c1d95]'
    }
  ];

  const current = slides[slide];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col justify-between h-[560px] bg-gradient-to-b text-white border border-white/10"
        style={{
          background: slide === 0
            ? 'linear-gradient(180deg, #061f00 0%, #19350c 100%)'
            : slide === 1
            ? 'linear-gradient(180deg, #19350c 0%, #3e6566 100%)'
            : slide === 2
            ? 'linear-gradient(180deg, #001d25 0%, #00343f 100%)'
            : 'linear-gradient(180deg, #2e1065 0%, #4c1d95 100%)'
        }}
      >
        {/* Top bar with story progress indicators */}
        <div className="p-4 flex flex-col gap-3">
          <div className="flex gap-1.5 w-full">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i <= slide ? 'bg-white' : 'bg-white/30'
                }`}
              ></div>
            ))}
          </div>
          <div className="flex justify-between items-center text-xs opacity-80">
            <span className="font-bold tracking-wider uppercase text-[10px]">Traciiee Life Wrapped</span>
            <button
              onClick={() => {
                setSlide(0);
                setShowLifeWrapped(false);
              }}
              className="text-white hover:opacity-100"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Slide Content */}
        <div className="px-6 flex flex-col items-center text-center justify-center flex-1 my-auto animate-in zoom-in-95 duration-300">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-300 mb-2">
            {current.subtitle}
          </span>
          <h2 className="font-headline-lg text-2xl font-bold mb-6">
            {current.title}
          </h2>

          <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 w-full mb-6 shadow-xl">
            <div className="font-mono-data text-4xl font-bold text-emerald-200 mb-1">
              {current.heroMetric}
            </div>
            <div className="text-xs font-semibold text-white/80">
              {current.heroLabel}
            </div>
          </div>

          <p className="text-xs text-white/85 leading-relaxed max-w-xs">
            {current.description}
          </p>
        </div>

        {/* Bottom Navigation */}
        <div className="p-5 flex justify-between items-center border-t border-white/10">
          <button
            onClick={() => setSlide(prev => Math.max(0, prev - 1))}
            disabled={slide === 0}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg ${slide === 0 ? 'opacity-30' : 'hover:bg-white/10'}`}
          >
            Previous
          </button>

          {slide < slides.length - 1 ? (
            <button
              onClick={() => setSlide(prev => prev + 1)}
              className="bg-white text-primary font-bold text-xs px-5 py-2 rounded-full shadow-md hover:bg-white/90"
            >
              Next Story →
            </button>
          ) : (
            <button
              onClick={() => {
                alert('Private Life Wrapped image exported to downloads!');
                setShowLifeWrapped(false);
              }}
              className="bg-emerald-400 text-black font-bold text-xs px-5 py-2 rounded-full shadow-md hover:bg-emerald-300"
            >
              Export Card 📸
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
