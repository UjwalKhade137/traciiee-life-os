import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const GymStreakModal = () => {
  const {
    data,
    showGymStreakModal,
    setShowGymStreakModal,
    completeGymWorkout,
    setActiveGymChallenge
  } = useLifeOS();

  const gymStreak = data.gymStreak || {
    currentStreak: 12,
    bestStreak: 16,
    totalWorkouts: 48,
    lastCompletedDate: '',
    activeChallengeId: 'c30',
    challenges: [],
    weeklyHistory: []
  };

  const [activeTab, setActiveTab] = useState('challenges'); // 'challenges' | 'log' | 'history'
  const [workoutType, setWorkoutType] = useState('Push (Chest, Shoulders & Triceps)');
  const [duration, setDuration] = useState('50');
  const [calories, setCalories] = useState('380');
  const [notes, setNotes] = useState('');
  const [logSuccess, setLogSuccess] = useState('');

  if (!showGymStreakModal) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const isCompletedToday = gymStreak.lastCompletedDate === todayStr;

  const handleLogWorkout = (e) => {
    e.preventDefault();
    completeGymWorkout({
      type: workoutType,
      durationMin: duration,
      calories: calories,
      notes: notes
    });
    setLogSuccess(isCompletedToday ? 'Session recorded! Total sessions updated (streak already counted today).' : 'Workout completed! Streak incremented & challenges updated! 🔥');
    setNotes('');
    setTimeout(() => {
      setLogSuccess('');
      setActiveTab('challenges');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#fafaf3] w-full max-w-2xl rounded-3xl border border-surface-variant shadow-2xl p-5 md:p-6 max-h-[90vh] overflow-y-auto relative flex flex-col justify-between">
        
        {/* Close Button */}
        <button
          onClick={() => setShowGymStreakModal(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div>
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#19350c] to-[#3e6566] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-xl font-bold text-primary">Gym Streak Challenge Hub</h2>
                <span className="text-[10px] font-mono-data font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  🔥 {gymStreak.currentStreak} Day Streak
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Best: {gymStreak.bestStreak}d • {gymStreak.totalWorkouts} Total Completed Workouts
              </p>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex bg-surface-container rounded-xl p-1 gap-1 mb-4">
            <button
              onClick={() => setActiveTab('challenges')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'challenges' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-sm">emoji_events</span>
              Streak Challenges ({gymStreak.challenges?.length || 5})
            </button>
            <button
              onClick={() => setActiveTab('log')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'log' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-sm">add_task</span>
              Log Workout
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'history' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-sm">history</span>
              Workout Logs
            </button>
          </div>

          {/* TAB 1: STREAK CHALLENGES */}
          {activeTab === 'challenges' && (
            <div className="space-y-3">
              <p className="text-xs text-on-surface-variant">
                Select your active streak challenge. Progress increments with each daily completed gym session.
              </p>

              {gymStreak.challenges?.map((ch) => {
                const isActive = ch.id === gymStreak.activeChallengeId;
                const progressPct = Math.min(100, Math.round((ch.daysCompleted / ch.durationDays) * 100));
                const remaining = Math.max(0, ch.durationDays - ch.daysCompleted);

                return (
                  <div
                    key={ch.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#fafaf3] to-[#f4f4ed] border-primary shadow-sm ring-1 ring-primary/30'
                        : 'bg-surface-container-lowest border-surface-variant/70 hover:border-outline-variant'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isActive ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'
                        }`}>
                          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {ch.icon}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-headline-sm text-sm md:text-base font-bold text-primary">
                              {ch.name}
                            </h4>
                            {isActive && (
                              <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary text-white">
                                Active Quest
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-on-surface-variant">
                            Reward: <strong className="text-secondary">{ch.badge} Badge</strong> (+{ch.xpReward} XP)
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono-data text-xs md:text-sm font-bold text-primary">
                          {ch.daysCompleted} / {ch.durationDays} Days
                        </span>
                        <span className="text-[10px] text-on-surface-variant block">
                          {remaining === 0 ? '✓ Completed' : `${remaining} days left`}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden mb-3">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          progressPct >= 100 ? 'bg-emerald-600' : isActive ? 'bg-primary' : 'bg-secondary'
                        }`}
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>

                    {/* Footer Action */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-on-surface-variant text-[11px] italic">
                        {ch.badgeDesc}
                      </span>
                      {isActive ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">check</span>
                          Currently Tracking
                        </span>
                      ) : (
                        <button
                          onClick={() => setActiveGymChallenge(ch.id)}
                          className="px-3 py-1.5 bg-surface-container hover:bg-surface-variant font-bold text-primary rounded-lg transition-colors"
                        >
                          Set as Active Challenge
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: LOG WORKOUT FORM */}
          {activeTab === 'log' && (
            <form onSubmit={handleLogWorkout} className="space-y-3.5 bg-surface-container-lowest p-4 rounded-2xl border border-surface-variant">
              {logSuccess && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold text-center">
                  {logSuccess}
                </div>
              )}

              {isCompletedToday && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-700 text-sm">info</span>
                  <span>
                    You have already marked today's workout! Logging another session will increase your total workouts and log details without double-counting the daily streak.
                  </span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Workout / Routine Split</label>
                <select
                  value={workoutType}
                  onChange={(e) => setWorkoutType(e.target.value)}
                  className="w-full bg-surface-container rounded-xl px-3 py-2.5 text-xs border-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Push (Chest, Shoulders & Triceps)">Push (Chest, Shoulders & Triceps)</option>
                  <option value="Pull (Back & Biceps)">Pull (Back & Biceps)</option>
                  <option value="Legs & Glutes Power">Legs & Glutes Power</option>
                  <option value="Full Body Functional Circuit">Full Body Functional Circuit</option>
                  <option value="5K Outdoor Run & Core">Cardio / 5K Outdoor Run</option>
                  <option value="High Intensity Interval Training (HIIT)">High Intensity Interval Training (HIIT)</option>
                  <option value="Recovery Mobility & Stretching">Recovery Mobility & Active Stretching</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">Session Duration (mins)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-surface-container rounded-xl px-3 py-2 text-xs border-none focus:ring-1 focus:ring-primary font-mono-data"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">Calories Burned</label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="w-full bg-surface-container rounded-xl px-3 py-2 text-xs border-none focus:ring-1 focus:ring-primary font-mono-data"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Notes / Personal Records</label>
                <input
                  type="text"
                  placeholder="e.g. Incline Bench 32kg 4x8, felt strong energy"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-surface-container rounded-xl px-3 py-2 text-xs border-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white font-bold rounded-xl text-xs shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Confirm Workout Completion (+35 XP)</span>
              </button>
            </form>
          )}

          {/* TAB 3: WORKOUT HISTORY TIMELINE */}
          {activeTab === 'history' && (
            <div className="space-y-2.5 max-h-[360px] overflow-y-auto">
              {data.fitness?.workouts?.map((w) => (
                <div
                  key={w.id}
                  className="p-3 bg-surface-container-lowest rounded-xl border border-surface-variant flex justify-between items-center text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-base">fitness_center</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-primary">{w.type}</h5>
                      <p className="text-[11px] text-on-surface-variant">
                        {w.date} • {w.notes || 'Full routine completed'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono-data">
                    <span className="font-bold text-secondary">{w.durationMin} mins</span>
                    <span className="text-[10px] text-on-surface-variant block">{w.calories} kcal</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Close */}
        <div className="pt-4 mt-4 border-t border-surface-variant/40 flex justify-end">
          <button
            onClick={() => setShowGymStreakModal(false)}
            className="px-5 py-2 bg-surface-container text-on-surface hover:bg-surface-variant text-xs font-bold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
