import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { PomodoroModal } from './PomodoroModal';
import { CollegeEventsModal } from './CollegeEventsModal';
import { StudentAcademicModal } from './StudentAcademicModal';

export const TrackHub = () => {
  const { data, setQuickLogModal, toggleRoutine, setShowGymStreakModal } = useLifeOS();

  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showCollegeEvents, setShowCollegeEvents] = useState(false);
  const [showStudentHub, setShowStudentHub] = useState(false);
  const [activeRoutineTab, setActiveRoutineTab] = useState('morning');

  const habitsDone = data.habits.filter(h => h.completed).length;
  const habitsTotal = data.habits.length;

  return (
    <div className="px-container-margin py-4 flex flex-col gap-4 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Title */}
      <div>
        <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-primary tracking-tight">Track Hub</h2>
        <p className="text-xs md:text-sm text-on-surface-variant">Log your daily metrics to maintain your life operating system.</p>
      </div>

      {/* Featured Campus & Academic Highlights Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* College Events Card */}
        <div
          onClick={() => setShowCollegeEvents(true)}
          className="group bg-surface-container-lowest rounded-2xl border border-surface-variant overflow-hidden p-4 shadow-sm hover:shadow-organic transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">celebration</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-base font-bold text-primary">College Events</h3>
                <p className="text-[11px] text-on-surface-variant">Campus Mahotsavs & Cultural Expos</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded-full">
              3 Events
            </span>
          </div>

          <div className="flex gap-2 mb-2 overflow-hidden rounded-xl h-20">
            <img
              src="/college_assets/ganpati.jpg"
              alt="Ganesh Mahotsav"
              className="w-1/2 h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/college_assets/ganpati_visarjan.jpg"
              alt="Dhol Tasha Procession"
              className="w-1/2 h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-surface-variant/40 text-xs">
            <span className="text-on-surface-variant">Next: Ganesh Chaturthi (Sept 14)</span>
            <span className="font-bold text-secondary group-hover:translate-x-1 transition-transform">Explore →</span>
          </div>
        </div>

        {/* Student Academic LMS Card */}
        <div
          onClick={() => setShowStudentHub(true)}
          className="group bg-surface-container-lowest rounded-2xl border border-surface-variant overflow-hidden p-4 shadow-sm hover:shadow-organic transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">school</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-base font-bold text-primary">Student Academic Hub</h3>
                <p className="text-[11px] text-on-surface-variant">Coursework, Notes & Attendance</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-secondary bg-secondary-fixed px-2 py-0.5 rounded-full">
              86.4% Attd
            </span>
          </div>

          <div className="flex gap-2 mb-2 overflow-hidden rounded-xl h-20">
            <img
              src="/college_assets/student_dashboard.png"
              alt="Student LMS Dashboard"
              className="w-1/2 h-full object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/college_assets/study_material_notes.png"
              alt="Study Notes Preview"
              className="w-1/2 h-full object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-surface-variant/40 text-xs">
            <span className="text-on-surface-variant">3 Enrolled Subjects • 2 Pending Labs</span>
            <span className="font-bold text-secondary group-hover:translate-x-1 transition-transform">Open Hub →</span>
          </div>
        </div>
      </div>

      {/* Grid of Tracking Modules */}
      <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mt-1">
        All Tracking Domains
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-card-gap">
        {/* Card 1: Habits */}
        <button
          onClick={() => setQuickLogModal('study')}
          className="flex flex-col bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.04)] hover:shadow-organic hover:-translate-y-0.5 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">fact_check</span>
          </div>
          <h4 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mb-0.5">Habits</h4>
          <p className="font-mono-data text-xs text-secondary font-bold">{habitsDone}/{habitsTotal} done</p>
        </button>

        {/* Card 2: Goals */}
        <button
          onClick={() => setQuickLogModal('study')}
          className="flex flex-col bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.04)] hover:shadow-organic hover:-translate-y-0.5 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
          </div>
          <h4 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mb-0.5">Goals</h4>
          <p className="font-mono-data text-xs text-primary font-bold">{data.goals.length} active (68%)</p>
        </button>

        {/* Card 3: Study & Learning */}
        <button
          onClick={() => setShowStudentHub(true)}
          className="flex flex-col bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.04)] hover:shadow-organic hover:-translate-y-0.5 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">menu_book</span>
          </div>
          <h4 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mb-0.5">Study</h4>
          <p className="font-mono-data text-xs text-secondary font-bold">{data.study.totalHoursToday}h logged</p>
        </button>

        {/* Card 4: Focus / Pomodoro */}
        <button
          onClick={() => setShowPomodoro(true)}
          className="flex flex-col bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.04)] hover:shadow-organic hover:-translate-y-0.5 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">bolt</span>
          </div>
          <h4 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mb-0.5">Focus Timer</h4>
          <p className="font-mono-data text-xs text-amber-800 font-bold">25m Pomodoro</p>
        </button>

        {/* Card 5: Gym Streak & Fitness */}
        <button
          onClick={() => setShowGymStreakModal(true)}
          className="flex flex-col bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.04)] hover:shadow-organic hover:-translate-y-0.5 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">fitness_center</span>
          </div>
          <h4 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mb-0.5">Gym Streak</h4>
          <p className="font-mono-data text-xs text-secondary font-bold">🔥 {data.gymStreak?.currentStreak || 12}d • {data.fitness.stepsToday} steps</p>
        </button>

        {/* Card 6: Sleep */}
        <button
          onClick={() => setQuickLogModal('sleep')}
          className="flex flex-col bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.04)] hover:shadow-organic hover:-translate-y-0.5 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">bedtime</span>
          </div>
          <h4 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mb-0.5">Sleep</h4>
          <p className="font-mono-data text-xs text-secondary font-bold">{data.sleep.durationHours}h ({data.sleep.qualityScore}%)</p>
        </button>

        {/* Card 7: Mood & Mental */}
        <button
          onClick={() => setQuickLogModal('mood')}
          className="flex flex-col bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.04)] hover:shadow-organic hover:-translate-y-0.5 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">mood</span>
          </div>
          <h4 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mb-0.5">Mood & Mind</h4>
          <p className="font-mono-data text-xs text-secondary font-bold">{data.mood.label}</p>
        </button>

        {/* Card 8: Food & Nutrition */}
        <button
          onClick={() => setQuickLogModal('food')}
          className="flex flex-col bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.04)] hover:shadow-organic hover:-translate-y-0.5 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">restaurant</span>
          </div>
          <h4 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mb-0.5">Nutrition</h4>
          <p className="font-mono-data text-xs text-secondary font-bold">{data.nutrition.caloriesToday} kcal</p>
        </button>

        {/* Card 9: Digital Life */}
        <button
          onClick={() => setQuickLogModal('screen')}
          className="flex flex-col bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.04)] hover:shadow-organic hover:-translate-y-0.5 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">devices</span>
          </div>
          <h4 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mb-0.5">Digital Life</h4>
          <p className="font-mono-data text-xs text-secondary font-bold">{data.digital.screenTimeMin}m screen</p>
        </button>

        {/* Card 10: Money */}
        <button
          onClick={() => setQuickLogModal('expense')}
          className="flex flex-col bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.04)] hover:shadow-organic hover:-translate-y-0.5 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">payments</span>
          </div>
          <h4 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mb-0.5">Money & Budget</h4>
          <p className="font-mono-data text-xs text-emerald-800 font-bold">₹{data.money.spentThisMonth} spent</p>
        </button>

        {/* Card 11: Music */}
        <div className="flex flex-col bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.04)] text-left group">
          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-xl">headphones</span>
          </div>
          <h4 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mb-0.5">Music</h4>
          <p className="font-mono-data text-xs text-purple-800 font-bold">{data.music.listeningMinToday}m today</p>
        </div>

        {/* Card 12: Water Intake */}
        <button
          onClick={() => setQuickLogModal('water')}
          className="flex flex-col bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(25,53,12,0.04)] hover:shadow-organic hover:-translate-y-0.5 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">water_drop</span>
          </div>
          <h4 className="font-headline-sm text-sm md:text-base font-bold text-on-surface mb-0.5">Hydration</h4>
          <p className="font-mono-data text-xs text-blue-800 font-bold">{data.fitness.waterLiters}L / 3.0L</p>
        </button>
      </div>

      {/* Routine Checklists */}
      <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-variant mt-2">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">checklist</span>
            <h3 className="font-headline-md text-base font-bold text-on-background">Daily Routine Checklists</h3>
          </div>
          <div className="flex bg-surface-container rounded-lg p-0.5">
            <button
              onClick={() => setActiveRoutineTab('morning')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeRoutineTab === 'morning' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant'
              }`}
            >
              Morning
            </button>
            <button
              onClick={() => setActiveRoutineTab('evening')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeRoutineTab === 'evening' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant'
              }`}
            >
              Evening
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          {data.routine[activeRoutineTab].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 p-2 hover:bg-surface-container/60 rounded-lg cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleRoutine(activeRoutineTab, item.id)}
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary bg-transparent"
              />
              <span className={`text-xs md:text-sm font-medium ${item.done ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>
                {item.text}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Modals */}
      <PomodoroModal isOpen={showPomodoro} onClose={() => setShowPomodoro(false)} />
      <CollegeEventsModal isOpen={showCollegeEvents} onClose={() => setShowCollegeEvents(false)} />
      <StudentAcademicModal isOpen={showStudentHub} onClose={() => setShowStudentHub(false)} />
    </div>
  );
};
