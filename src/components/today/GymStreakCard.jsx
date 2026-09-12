import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const GymStreakCard = () => {
  const { data, completeGymWorkout, setShowGymStreakModal } = useLifeOS();
  const gymStreak = data.gymStreak || {
    currentStreak: 12,
    bestStreak: 16,
    totalWorkouts: 48,
    lastCompletedDate: '',
    activeChallengeId: 'c30',
    challenges: [],
    weeklyHistory: []
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const isCompletedToday = gymStreak.lastCompletedDate === todayStr;

  const activeChallenge = gymStreak.challenges?.find(
    (c) => c.id === gymStreak.activeChallengeId
  ) || gymStreak.challenges?.[2] || {
    name: '30-Day Gym Streak',
    durationDays: 30,
    daysCompleted: 12,
    badge: 'Gym Warrior',
    xpReward: 1000
  };

  const daysRemaining = Math.max(0, activeChallenge.durationDays - activeChallenge.daysCompleted);
  const progressPct = Math.min(100, Math.round((activeChallenge.daysCompleted / activeChallenge.durationDays) * 100));

  // Quick Workout logging state
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [workoutType, setWorkoutType] = useState('Push (Chest & Triceps)');
  const [duration, setDuration] = useState('50');
  const [calories, setCalories] = useState('380');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleComplete = (e) => {
    e?.preventDefault();
    completeGymWorkout({
      type: workoutType,
      durationMin: duration,
      calories: calories
    });
    setShowQuickForm(false);
    setToastMessage(isCompletedToday ? 'Extra workout session logged! Total workouts updated.' : 'Awesome job! Workout logged & gym streak updated! 🔥');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <section className="bg-gradient-to-br from-[#19350c] via-[#061f00] to-[#001d25] text-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(25,53,12,0.18)] border border-white/10 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-amber-400 shadow-inner">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              fitness_center
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline-sm text-base font-bold text-white tracking-tight">Gym Streak Challenge</h3>
              <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active
              </span>
            </div>
            <p className="text-[11px] text-white/70">Gamified workout consistency & discipline</p>
          </div>
        </div>

        <button
          onClick={() => setShowGymStreakModal(true)}
          className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10"
        >
          <span>Challenges</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      {/* Core Metrics: Streak, Best, Total Workouts */}
      <div className="relative z-10 grid grid-cols-3 gap-2.5 mb-4">
        {/* Current Streak */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-1 text-amber-400 mb-1">
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/80">Streak</span>
          </div>
          <span className="font-mono-data text-2xl font-bold text-white tracking-tight">
            {gymStreak.currentStreak} <span className="text-xs font-normal text-white/60">days</span>
          </span>
        </div>

        {/* Best Streak */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-1 text-yellow-300 mb-1">
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              military_tech
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/80">Best</span>
          </div>
          <span className="font-mono-data text-2xl font-bold text-white tracking-tight">
            {gymStreak.bestStreak} <span className="text-xs font-normal text-white/60">days</span>
          </span>
        </div>

        {/* Total Workouts */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-1 text-teal-300 mb-1">
            <span className="material-symbols-outlined text-base">exercise</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/80">Total</span>
          </div>
          <span className="font-mono-data text-2xl font-bold text-white tracking-tight">
            {gymStreak.totalWorkouts} <span className="text-xs font-normal text-white/60">sessions</span>
          </span>
        </div>
      </div>

      {/* 📅 Weekly Progress Calendar */}
      <div className="relative z-10 bg-white/5 rounded-2xl p-3 border border-white/10 mb-4">
        <div className="flex justify-between items-center mb-2 text-xs font-bold text-white/80">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-400">calendar_month</span>
            Weekly Workout Calendar
          </span>
          <span className="text-[11px] font-mono-data text-emerald-300">
            {gymStreak.weeklyHistory?.filter(d => d.completed).length || 5}/7 Days Hit
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center">
          {gymStreak.weeklyHistory?.map((item, idx) => {
            const isTodayDay = idx === 5; // Saturday in demo
            return (
              <div
                key={idx}
                className={`py-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                  item.completed
                    ? 'bg-emerald-500/25 border border-emerald-400/50 text-emerald-300'
                    : isTodayDay
                    ? 'bg-white/15 border-2 border-amber-400 text-white shadow-sm'
                    : 'bg-white/5 border border-white/5 text-white/40'
                }`}
                title={`${item.day}: ${item.completed ? item.workoutType || 'Completed' : 'Rest / Pending'}`}
              >
                <span className="text-[10px] font-bold uppercase">{item.day}</span>
                <span className="material-symbols-outlined text-[15px] mt-0.5" style={item.completed ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {item.completed ? 'check_circle' : isTodayDay ? 'radio_button_unchecked' : 'remove'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🎯 Current Challenge & Motivational Progress */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 block mb-0.5">
              Current Challenge
            </span>
            <h4 className="font-headline-sm text-sm md:text-base font-bold text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-amber-400 text-base">trophy</span>
              {activeChallenge.name}
            </h4>
          </div>
          <span className="text-xs font-mono-data font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
            {activeChallenge.daysCompleted}/{activeChallenge.durationDays} Days ({progressPct}%)
          </span>
        </div>

        {/* Challenge Progress Bar */}
        <div className="w-full bg-black/40 rounded-full h-2.5 overflow-hidden mb-2.5 border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>

        {/* Motivational Dynamic Quote */}
        <p className="text-xs text-white/85 italic leading-relaxed">
          {daysRemaining > 0 ? (
            <>
              “Keep going! <strong className="text-amber-300 not-italic">{daysRemaining} more days</strong> to complete the {activeChallenge.name} and unlock the <strong>{activeChallenge.badge}</strong> badge.”
            </>
          ) : (
            <>
              “🏆 Incredible achievement! You conquered the {activeChallenge.name}! Reward badge unlocked.”
            </>
          )}
        </p>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="relative z-20 mb-3 p-3 bg-emerald-500/30 border border-emerald-400 text-emerald-100 rounded-xl text-xs font-bold text-center animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* Quick Logging Drawer or Complete Workout Trigger */}
      {showQuickForm ? (
        <form onSubmit={handleComplete} className="relative z-10 bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/20 space-y-3 animate-in fade-in">
          <div className="flex justify-between items-center">
            <h5 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Log Workout Details</h5>
            <button
              type="button"
              onClick={() => setShowQuickForm(false)}
              className="text-white/60 hover:text-white"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-white/80 mb-1">Workout Type / Routine</label>
            <select
              value={workoutType}
              onChange={(e) => setWorkoutType(e.target.value)}
              className="w-full bg-white/10 text-white rounded-xl px-3 py-2 text-xs border border-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            >
              <option value="Push (Chest & Triceps)" className="text-black">Push (Chest, Shoulders & Triceps)</option>
              <option value="Pull (Back & Biceps)" className="text-black">Pull (Back & Biceps)</option>
              <option value="Legs & Glutes" className="text-black">Legs & Glutes Power</option>
              <option value="Full Body Circuit" className="text-black">Full Body Functional Circuit</option>
              <option value="5K Run & Core" className="text-black">Cardio / 5K Outdoor Run</option>
              <option value="HIIT & Conditioning" className="text-black">High Intensity Interval Training (HIIT)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-white/80 mb-1">Duration (mins)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-white/10 text-white rounded-xl px-3 py-1.5 text-xs border border-white/20 font-mono-data focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-white/80 mb-1">Est. Calories</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full bg-white/10 text-white rounded-xl px-3 py-1.5 text-xs border border-white/20 font-mono-data focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-[#061f00] font-bold rounded-xl text-xs shadow-md hover:opacity-90 active:scale-98"
            >
              Save & Confirm Workout
            </button>
            <button
              type="button"
              onClick={() => setShowQuickForm(false)}
              className="px-3 py-2.5 bg-white/10 text-white/80 text-xs font-bold rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="relative z-10 flex gap-2">
          <button
            onClick={() => setShowQuickForm(true)}
            className={`flex-1 py-3.5 rounded-2xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 ${
              isCompletedToday
                ? 'bg-white/15 text-emerald-300 border border-emerald-400/40 hover:bg-white/20'
                : 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-[#061f00] hover:shadow-emerald-500/20'
            }`}
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isCompletedToday ? 'task_alt' : 'fitness_center'}
            </span>
            <span>
              {isCompletedToday ? 'Completed Today ✓ (Log Extra +)' : 'Complete Workout (+35 XP)'}
            </span>
          </button>

          <button
            onClick={() => setShowGymStreakModal(true)}
            className="px-3.5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white/90 hover:text-white transition-colors"
            title="View all 5 Challenges & Milestones"
          >
            <span className="material-symbols-outlined text-xl">emoji_events</span>
          </button>
        </div>
      )}
    </section>
  );
};
