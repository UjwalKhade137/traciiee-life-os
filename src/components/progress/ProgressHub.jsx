import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const ProgressHub = () => {
  const { data, awardXP } = useLifeOS();
  const { gamification, lifeScore } = data;

  const [selectedDay, setSelectedDay] = useState(null);

  // Generate calendar days for current month (September)
  const daysInMonth = 30;
  const calendarCells = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    // Generate realistic historical life score for the heatmap
    const baseScore = 70 + ((dayNum * 7) % 25);
    const isToday = dayNum === 11;
    return {
      day: dayNum,
      score: isToday ? lifeScore.current : baseScore,
      isToday,
      status: (isToday ? lifeScore.current : baseScore) >= 80 ? 'high' : (isToday ? lifeScore.current : baseScore) >= 65 ? 'med' : 'low'
    };
  });

  const getHeatmapColor = (status, isToday) => {
    if (isToday) return 'bg-[#19350c] ring-2 ring-emerald-500 text-white font-bold';
    if (status === 'high') return 'bg-[#add198] text-[#19350c]';
    if (status === 'med') return 'bg-[#c9edb2] text-[#062100]';
    return 'bg-[#e8e9e2] text-on-surface-variant';
  };

  return (
    <div className="px-container-margin py-4 flex flex-col gap-4 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Top: Level & XP Card */}
      <section className="glass-card rounded-2xl p-5 flex flex-col gap-2.5 shadow-sm border border-surface-variant">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-xl font-bold text-primary">Level {gamification.level}</h2>
              <span className="text-[11px] font-bold uppercase tracking-wider text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded-full">
                {gamification.title}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">Keep logging daily metrics to level up</p>
          </div>
          <div className="text-right">
            <span className="font-mono-data text-sm font-bold text-primary">
              {gamification.xp.toLocaleString()} XP
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              {' '}/ {gamification.nextLevelXp.toLocaleString()} XP
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${(gamification.xp / gamification.nextLevelXp) * 100}%` }}
          ></div>
        </div>
      </section>

      {/* Section 1: Achievements Gallery */}
      <section className="space-y-2.5">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-md text-base font-bold text-primary">Achievements & Badges</h3>
          <span className="text-xs font-mono-data font-bold text-on-surface-variant">
            {gamification.achievements.filter(a => a.unlocked).length}/{gamification.achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {gamification.achievements.map((ach) => (
            <div
              key={ach.id}
              className={`rounded-2xl p-3.5 flex flex-col items-center justify-center text-center border transition-all ${
                ach.unlocked
                  ? 'bg-surface-container-lowest border-surface-variant shadow-xs hover:shadow-organic'
                  : 'bg-surface-container/40 border-dashed border-outline-variant/50 opacity-60 grayscale'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 shadow-xs ${
                  ach.unlocked
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-variant text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {ach.icon}
                </span>
              </div>
              <span className="font-headline-sm text-xs font-bold text-on-surface line-clamp-1">
                {ach.title}
              </span>
              <span className="text-[10px] text-on-surface-variant mt-0.5">
                {ach.unlocked ? `Unlocked ${ach.unlockedDate}` : ach.progress || 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Challenge Mode */}
      <section className="space-y-2.5">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-md text-base font-bold text-primary">Challenge Mode</h3>
          <span className="text-xs font-bold text-secondary">Active Quests</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {gamification.challenges.map((ch) => {
            const pct = Math.round((ch.daysCompleted / ch.targetDays) * 100);
            return (
              <div
                key={ch.id}
                className="bg-surface-container-lowest p-3.5 rounded-2xl border border-surface-variant shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-on-surface line-clamp-1">{ch.title}</span>
                    <span className="text-[10px] font-mono-data font-bold text-primary bg-primary-fixed px-2 py-0.2 rounded-full">
                      +{ch.xpReward} XP
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-on-surface-variant mb-1.5">
                    <span>{ch.daysCompleted} of {ch.targetDays} days</span>
                    <span className="font-mono-data font-bold">{pct}%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Life Calendar Heatmap */}
      <section className="space-y-2.5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-headline-md text-base font-bold text-primary">Life Calendar</h3>
            <p className="text-xs text-on-surface-variant">Daily Life Score quality heatmap</p>
          </div>
          <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
            September 2026
          </span>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-variant shadow-xs">
          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-[10px] font-bold text-on-surface-variant">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>

          {/* Grid of days */}
          <div className="grid grid-cols-7 gap-1.5">
            {calendarCells.map((cell) => (
              <button
                key={cell.day}
                onClick={() => setSelectedDay(cell)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-transform hover:scale-105 ${getHeatmapColor(
                  cell.status,
                  cell.isToday
                )}`}
                title={`Sept ${cell.day}: Score ${cell.score}/100`}
              >
                <span className="font-mono-data text-[11px]">{cell.day}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 mt-3 text-[10px] text-on-surface-variant">
            <span>Low</span>
            <span className="w-3 h-3 rounded-xs bg-[#e8e9e2]"></span>
            <span className="w-3 h-3 rounded-xs bg-[#c9edb2]"></span>
            <span className="w-3 h-3 rounded-xs bg-[#add198]"></span>
            <span className="w-3 h-3 rounded-xs bg-[#19350c]"></span>
            <span>High Score</span>
          </div>
        </div>
      </section>

      {/* Section 4: Personal Records */}
      <section className="space-y-2.5">
        <h3 className="font-headline-md text-base font-bold text-primary">Personal Records</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {gamification.personalRecords.map((rec, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-3 rounded-2xl border border-surface-variant shadow-xs"
            >
              <div className="flex items-center gap-1.5 text-secondary mb-1">
                <span className="material-symbols-outlined text-base">{rec.icon}</span>
                <span className="text-[11px] font-bold text-on-surface-variant truncate">{rec.metric}</span>
              </div>
              <p className="font-mono-data text-sm font-bold text-primary">{rec.value}</p>
              <span className="text-[10px] text-on-surface-variant/80">{rec.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Day Log Detail Modal */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#fafaf3] w-full max-w-sm rounded-3xl border border-surface-variant p-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedDay(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h4 className="font-headline-sm text-base font-bold text-primary mb-1">
              September {selectedDay.day}, 2026
            </h4>
            <p className="text-xs text-on-surface-variant mb-4">Daily Life OS Snapshot</p>

            <div className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-variant/50 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-on-surface">Day Life Score:</span>
                <span className="font-mono-data font-bold text-primary text-sm">{selectedDay.score} / 100</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Active Streak:</span>
                <span className="font-mono-data font-bold text-on-surface">Active</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Quality Rating:</span>
                <span className="font-bold text-secondary capitalize">{selectedDay.status} Performance</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedDay(null)}
              className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl mt-4"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
