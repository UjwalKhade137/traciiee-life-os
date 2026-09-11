import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const MeHub = () => {
  const {
    data,
    setShowUpgradeModal,
    setShowLifeWrapped,
    useStreakFreeze,
    exportDataJSON,
    exportDataCSV,
    resetAllData,
    setApiKey
  } = useLifeOS();

  const { profile, journal, aiInsights } = data;
  const [customKey, setCustomKey] = useState(aiInsights.apiKey || '');
  const [keySaved, setKeySaved] = useState(false);
  const [streakReminder, setStreakReminder] = useState(true);
  const [journalSearch, setJournalSearch] = useState('');

  const filteredJournal = journal.archive.filter(
    (j) =>
      j.title.toLowerCase().includes(journalSearch.toLowerCase()) ||
      j.text.toLowerCase().includes(journalSearch.toLowerCase())
  );

  const handleKeySave = (e) => {
    e.preventDefault();
    setApiKey(customKey.trim());
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  // Sample photo diary items from public assets
  const photoTimeline = [
    { date: 'Sept 10', src: '/college_assets/ganpati.jpg', caption: 'Campus Festivity' },
    { date: 'Sept 08', src: '/college_assets/student_dashboard.png', caption: 'Milestone Sprint' },
    { date: 'Sept 04', src: '/college_assets/ganpati_visarjan.jpg', caption: 'Dhol Tasha Squad' },
    { date: 'Sept 01', src: '/college_assets/student_events_academichub.png', caption: 'Hackathon Kickoff' },
  ];

  return (
    <div className="px-container-margin py-4 flex flex-col gap-4 max-w-3xl mx-auto animate-in fade-in duration-200">
      {/* Profile Overview Card */}
      <section className="glass-card rounded-2xl p-5 border border-surface-variant shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-primary-container shadow-sm"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
          }}
        />

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="font-headline-sm text-xl font-bold text-primary">{profile.name}</h2>
            <span
              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full inline-block ${
                profile.accountType === 'trial'
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-emerald-100 text-emerald-900'
              }`}
            >
              {profile.accountType === 'trial' ? 'Guest Trial Account' : 'Permanent Account'}
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">
            {profile.email ? profile.email : 'Local-first on-device profile • 100% Private'}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-on-surface">
            <div>
              <span className="font-mono-data font-bold text-primary">{profile.streak} Days</span>
              <p className="text-[10px] text-on-surface-variant">Streak</p>
            </div>
            <div className="w-px h-6 bg-surface-variant"></div>
            <div>
              <span className="font-mono-data font-bold text-secondary">{data.gamification.xp}</span>
              <p className="text-[10px] text-on-surface-variant">Total XP</p>
            </div>
            <div className="w-px h-6 bg-surface-variant"></div>
            <div>
              <span className="font-mono-data font-bold text-on-surface">{data.gamification.achievements.filter(a => a.unlocked).length}</span>
              <p className="text-[10px] text-on-surface-variant">Badges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trial Account Upgrade Callout (PRD §5.0) */}
      {profile.accountType === 'trial' && (
        <section className="bg-gradient-to-r from-[#19350c] to-[#3e6566] text-white rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-emerald-300 text-lg">cloud_sync</span>
              <h4 className="font-headline-sm text-sm font-bold">Upgrade Trial → Permanent Account</h4>
            </div>
            <p className="text-xs text-white/80 max-w-md">
              Attach an email to preserve your {profile.streak}-day streak and {data.gamification.xp} XP across device restarts. Zero data loss.
            </p>
          </div>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-white text-primary font-bold text-xs px-4 py-2 rounded-xl hover:bg-white/90 transition-all shadow-sm whitespace-nowrap active:scale-95"
          >
            Create Permanent Account
          </button>
        </section>
      )}

      {/* Life Wrapped Banner */}
      <section
        onClick={() => setShowLifeWrapped(true)}
        className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-4 shadow-xs hover:shadow-organic transition-all cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-xl">auto_videocam</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-sm font-bold text-primary">View Life Wrapped 2026</h4>
            <p className="text-xs text-on-surface-variant">Spotify-style recap of your study, sleep, streak & milestones</p>
          </div>
        </div>
        <span className="text-xs font-bold text-secondary group-hover:translate-x-1 transition-transform">
          Watch Recap →
        </span>
      </section>

      {/* Streak Freeze Management */}
      <section className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-4 shadow-xs">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-xl">ac_unit</span>
            <h4 className="font-headline-sm text-sm font-bold text-on-background">Streak Freeze Protection</h4>
          </div>
          <span className="font-mono-data text-xs font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full">
            {profile.streakFreezes} / 2 Freezes Available
          </span>
        </div>
        <p className="text-xs text-on-surface-variant mb-3">
          Protects your {profile.streak}-day streak against a single missed logging day. Resets automatically each month.
        </p>
        <button
          onClick={useStreakFreeze}
          disabled={profile.streakFreezes <= 0}
          className="px-4 py-1.5 text-xs font-bold rounded-lg bg-surface-container text-on-surface hover:bg-surface-variant disabled:opacity-40 transition-colors"
        >
          Equip Streak Freeze
        </button>
      </section>

      {/* Daily Photo Diary Timeline */}
      <section className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-4 shadow-xs">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-xl">photo_library</span>
            <h4 className="font-headline-sm text-sm font-bold text-on-background">Daily Photo Diary</h4>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">September 2026</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {photoTimeline.map((item, idx) => (
            <div key={idx} className="relative rounded-xl overflow-hidden h-28 bg-surface-container group">
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                <span className="text-[10px] font-bold text-white/90">{item.date}</span>
                <span className="text-[10px] font-semibold truncate text-white/80">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journal Archive */}
      <section className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-4 shadow-xs">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">auto_stories</span>
            <h4 className="font-headline-sm text-sm font-bold text-on-background">Journal & Memories Archive</h4>
          </div>
          <span className="text-xs font-mono-data text-on-surface-variant font-bold">
            {journal.archive.length} entries
          </span>
        </div>

        <input
          type="text"
          placeholder="Search past memories or reflections..."
          value={journalSearch}
          onChange={(e) => setJournalSearch(e.target.value)}
          className="w-full bg-surface-container rounded-lg px-3 py-2 text-xs border-none focus:ring-1 focus:ring-primary mb-3"
        />

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {filteredJournal.map((entry) => (
            <div
              key={entry.id}
              className="p-3 bg-surface-container-low rounded-xl border border-surface-variant/40 text-xs"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-primary">{entry.title}</span>
                <span className="font-mono-data text-[10px] text-on-surface-variant">{entry.date}</span>
              </div>
              <p className="text-on-surface-variant line-clamp-2">{entry.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Free-Tier Gemini API Settings */}
      <section className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-secondary text-xl">key</span>
          <h4 className="font-headline-sm text-sm font-bold text-on-background">AI Insights Configuration</h4>
        </div>
        <p className="text-xs text-on-surface-variant mb-3">
          Traciiee runs on the <strong>Google Gemini Free Tier</strong> (or local on-device analyzer). Zero paid APIs, no automatic billing ever.
        </p>

        <form onSubmit={handleKeySave} className="flex gap-2">
          <input
            type="password"
            placeholder="Optional Gemini Free API Key (AIzaSy...)"
            value={customKey}
            onChange={(e) => setCustomKey(e.target.value)}
            className="flex-1 bg-surface-container rounded-lg px-3 py-2 text-xs border-none focus:ring-1 focus:ring-primary font-mono-data"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-xs"
          >
            Save Key
          </button>
        </form>
        {keySaved && (
          <p className="text-[11px] text-emerald-700 font-bold mt-1.5">✓ API Key saved locally on device!</p>
        )}
      </section>

      {/* Data Export & Backup (PRD §9) */}
      <section className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary text-xl">download</span>
          <h4 className="font-headline-sm text-sm font-bold text-on-background">Your Data, Your Life (Export)</h4>
        </div>
        <p className="text-xs text-on-surface-variant mb-3">
          100% data ownership. Export your complete logs in open JSON or CSV format anytime.
        </p>

        <div className="flex gap-3">
          <button
            onClick={exportDataJSON}
            className="flex-1 py-2.5 bg-surface-container text-on-surface hover:bg-surface-variant text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base">code</span>
            Export JSON
          </button>
          <button
            onClick={exportDataCSV}
            className="flex-1 py-2.5 bg-surface-container text-on-surface hover:bg-surface-variant text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base">table_chart</span>
            Export CSV
          </button>
        </div>
      </section>

      {/* Preferences & Reset */}
      <section className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-4 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface">Streak Breaking Alert</span>
            <p className="text-[11px] text-on-surface-variant">Gentle reminder at 8:00 PM if nothing logged today</p>
          </div>
          <input
            type="checkbox"
            checked={streakReminder}
            onChange={(e) => setStreakReminder(e.target.checked)}
            className="w-4 h-4 rounded text-primary focus:ring-primary"
          />
        </div>

        <div className="pt-2 border-t border-surface-variant/40 flex justify-between items-center">
          <span className="text-[11px] text-on-surface-variant">Version 1.2 • Build 2026.09</span>
          <button
            onClick={resetAllData}
            className="text-xs font-bold text-error hover:underline"
          >
            Reset All Data to Default
          </button>
        </div>
      </section>
    </div>
  );
};
