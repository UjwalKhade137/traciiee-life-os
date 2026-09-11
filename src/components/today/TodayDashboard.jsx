import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const TodayDashboard = () => {
  const {
    data,
    toggleHabit,
    addHabit,
    setQuickLogModal,
    saveJournal,
    setShowUpgradeModal,
    setActiveTab
  } = useLifeOS();

  const { profile, lifeScore, habits, goals, aiInsights, journal } = data;

  const [journalText, setJournalText] = useState(journal.todayEntry.text || '');
  const [wentWell, setWentWell] = useState(journal.todayEntry.wentWell || '');
  const [wentWrong, setWentWrong] = useState(journal.todayEntry.wentWrong || '');
  const [learned, setLearned] = useState(journal.todayEntry.learned || '');
  const [showFullJournalPrompt, setShowFullJournalPrompt] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [newHabitName, setNewHabitName] = useState('');
  const [showAddHabit, setShowAddHabit] = useState(false);

  const handleSaveJournal = (e) => {
    e.preventDefault();
    saveJournal({
      text: journalText,
      wentWell,
      wentWrong,
      learned
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleAddHabitSubmit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit({ name: newHabitName.trim(), category: 'Custom' });
    setNewHabitName('');
    setShowAddHabit(false);
  };

  const quickLogItems = [
    { id: 'study', label: 'Study', icon: 'menu_book' },
    { id: 'workout', label: 'Workout', icon: 'fitness_center' },
    { id: 'sleep', label: 'Sleep', icon: 'bedtime' },
    { id: 'mood', label: 'Mood', icon: 'mood' },
    { id: 'water', label: 'Water', icon: 'water_drop' },
    { id: 'food', label: 'Food', icon: 'restaurant' },
    { id: 'screen', label: 'Screen', icon: 'devices' },
    { id: 'expense', label: 'Expense', icon: 'payments' },
  ];

  return (
    <div className="px-container-margin py-4 flex flex-col gap-4 max-w-3xl mx-auto animate-in fade-in duration-200">
      {/* Trial Mode Alert Banner */}
      {profile.accountType === 'trial' && (
        <div 
          onClick={() => setShowUpgradeModal(true)}
          className="bg-secondary-container/60 border border-secondary/30 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-secondary-container/80 transition-all shadow-sm group"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-secondary text-lg">verified_user</span>
            <div>
              <p className="text-xs font-bold text-on-secondary-container">
                Guest Trial Active • Zero Signup Friction
              </p>
              <p className="text-[11px] text-on-secondary-container/80">
                Data saved on-device. Tap anytime to attach an email with zero loss.
              </p>
            </div>
          </div>
          <span className="font-label-caps text-[11px] font-bold text-secondary bg-white px-2.5 py-1 rounded-full shadow-xs group-hover:scale-105 transition-transform">
            Save Data →
          </span>
        </div>
      )}

      {/* Greeting & AI Teaser */}
      <section className="flex flex-col gap-1.5">
        <h2 className="font-display-lg text-2xl md:text-3xl font-bold text-on-background tracking-tight">
          Good morning, {profile.name} 👋
        </h2>
        <div 
          onClick={() => setActiveTab('insights')}
          className="bg-surface-container-low rounded-xl p-3 flex items-start gap-2.5 border border-surface-variant cursor-pointer hover:border-secondary transition-all shadow-[0_4px_20px_rgba(25,53,12,0.03)] group"
        >
          <span className="material-symbols-outlined text-secondary text-lg mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
          <div className="flex-1">
            <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
              {aiInsights.insights[0]?.summary || "You're 15% more productive when you sleep 7+ hours."}
            </p>
          </div>
          <span className="text-[11px] font-bold text-secondary flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            Insights →
          </span>
        </div>
      </section>

      {/* Top Metrics Bento */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Life Score Card */}
        <div 
          onClick={() => setActiveTab('insights')}
          className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.06)] border border-surface-variant flex flex-col justify-between min-h-[140px] cursor-pointer hover:shadow-organic transition-all"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-base font-bold text-on-background">Life Score</h3>
            <span className="text-[10px] uppercase font-bold tracking-wider text-secondary bg-secondary-fixed/40 px-2 py-0.5 rounded-full">
              Optimal
            </span>
          </div>
          
          <div className="flex items-end justify-between mt-3">
            <div>
              <span className="font-display-lg text-4xl font-bold text-primary font-mono-data">
                {lifeScore.current}
              </span>
              <span className="text-sm font-semibold text-on-surface-variant ml-1">/100</span>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Composite daily wellbeing</p>
            </div>

            {/* Mini Sparkline */}
            <div className="flex items-end gap-1.5 h-12 pb-1">
              {lifeScore.history7Days.map((h, i) => {
                const heightPct = Math.round((h.score / 100) * 100);
                const isLast = i === lifeScore.history7Days.length - 1;
                return (
                  <div key={h.day} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-3 rounded-t-xs transition-all ${
                        isLast ? 'bg-primary' : 'bg-secondary-container'
                      }`}
                      style={{ height: `${heightPct * 0.4}px` }}
                      title={`${h.day}: ${h.score}/100`}
                    ></div>
                    <span className="text-[9px] font-bold text-on-surface-variant/70">{h.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Goals Progress Card */}
        <div 
          onClick={() => setActiveTab('track')}
          className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.06)] border border-surface-variant flex flex-col justify-between min-h-[140px] cursor-pointer hover:shadow-organic transition-all"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-headline-sm text-base font-bold text-on-background">Active Goals</h3>
            <span className="text-[10px] font-bold text-on-surface-variant hover:text-primary">
              View All ({goals.length}) →
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {goals.slice(0, 2).map((g) => (
              <div key={g.id}>
                <div className="flex justify-between text-xs font-bold text-on-surface mb-1">
                  <span className="truncate pr-2">{g.title}</span>
                  <span className="font-mono-data text-primary text-[11px]">{g.progress}%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      g.category === 'Study' ? 'bg-primary' : 'bg-secondary'
                    }`}
                    style={{ width: `${g.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Habits Today Checklist */}
      <section className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.06)] border border-surface-variant">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-headline-md text-base font-bold text-on-background">Habits Today</h3>
            <span className="font-mono-data text-xs px-2 py-0.5 rounded-full bg-surface-container font-bold text-primary">
              {habits.filter(h => h.completed).length}/{habits.length}
            </span>
          </div>
          <button
            onClick={() => setShowAddHabit(!showAddHabit)}
            className="text-xs font-bold text-secondary hover:text-primary flex items-center gap-0.5"
          >
            <span className="material-symbols-outlined text-sm">{showAddHabit ? 'remove' : 'add'}</span>
            {showAddHabit ? 'Cancel' : 'New Habit'}
          </button>
        </div>

        {showAddHabit && (
          <form onSubmit={handleAddHabitSubmit} className="flex gap-2 mb-3 animate-in fade-in">
            <input
              type="text"
              placeholder="e.g. Read 20 mins / Cold shower"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              className="flex-1 bg-surface-container rounded-lg px-3 py-1.5 text-xs border-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-xs"
            >
              Add
            </button>
          </form>
        )}

        <div className="flex flex-col gap-1.5">
          {habits.map((habit) => (
            <label
              key={habit.id}
              className="flex items-center justify-between p-2 hover:bg-surface-container/60 rounded-lg cursor-pointer transition-colors group select-none"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={habit.completed}
                  onChange={() => toggleHabit(habit.id)}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container bg-transparent cursor-pointer"
                />
                <span
                  className={`text-xs md:text-sm font-medium transition-colors ${
                    habit.completed
                      ? 'line-through text-on-surface-variant opacity-60'
                      : 'text-on-background group-hover:text-primary'
                  }`}
                >
                  {habit.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono-data text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                  🔥 {habit.streak}d
                </span>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Quick Log Grid */}
      <section className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.06)] border border-surface-variant">
        <h3 className="font-headline-md text-base font-bold text-on-background mb-3">Quick Log</h3>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {quickLogItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setQuickLogModal(item.id)}
              className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl hover:bg-surface-container transition-all group active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors shadow-xs">
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>
              <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Today's Journal & Reflection */}
      <section className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.06)] border border-surface-variant flex flex-col gap-2.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">edit_note</span>
            <h3 className="font-headline-md text-base font-bold text-on-background">Today's Journal</h3>
          </div>
          <button
            onClick={() => setShowFullJournalPrompt(!showFullJournalPrompt)}
            className="text-[11px] font-bold text-secondary hover:text-primary transition-colors"
          >
            {showFullJournalPrompt ? 'Compact' : 'Reflection Prompts +'}
          </button>
        </div>

        <form onSubmit={handleSaveJournal} className="space-y-2">
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            className="w-full bg-surface-container rounded-lg p-3 border-none focus:ring-1 focus:ring-secondary text-xs md:text-sm text-on-background resize-none min-h-[90px]"
            placeholder="What's on your mind today? Key wins, thoughts, or reflections..."
          ></textarea>

          {showFullJournalPrompt && (
            <div className="space-y-2 pt-1 animate-in fade-in">
              <div>
                <label className="block text-[11px] font-bold text-emerald-800 mb-0.5">🌟 What went well today?</label>
                <input
                  type="text"
                  value={wentWell}
                  onChange={(e) => setWentWell(e.target.value)}
                  placeholder="Key accomplishments or joyful moments"
                  className="w-full bg-surface-container rounded-lg px-3 py-1.5 text-xs border-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-amber-800 mb-0.5">⚠️ What could have gone better?</label>
                <input
                  type="text"
                  value={wentWrong}
                  onChange={(e) => setWentWrong(e.target.value)}
                  placeholder="Distractions, missed timings, or obstacles"
                  className="w-full bg-surface-container rounded-lg px-3 py-1.5 text-xs border-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-secondary mb-0.5">💡 What did I learn?</label>
                <input
                  type="text"
                  value={learned}
                  onChange={(e) => setLearned(e.target.value)}
                  placeholder="Insight or takeaway for tomorrow"
                  className="w-full bg-surface-container rounded-lg px-3 py-1.5 text-xs border-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-1">
            <span className="text-[11px] text-on-surface-variant">
              {savedSuccess ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span> Saved & +25 XP awarded!
                </span>
              ) : (
                'Auto-saved locally on-device'
              )}
            </span>
            <button
              type="submit"
              className="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-all shadow-xs active:scale-95"
            >
              Save Log
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
