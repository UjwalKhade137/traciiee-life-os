import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const QuickLogModal = () => {
  const {
    quickLogModal,
    setQuickLogModal,
    quickLogStudy,
    quickLogWorkout,
    quickLogSleep,
    quickLogMood,
    quickLogWater,
    quickLogFood,
    quickLogScreen,
    quickLogExpense,
    data
  } = useLifeOS();

  // Field states
  const [studyHours, setStudyHours] = useState('1.5');
  const [studySubject, setStudySubject] = useState('Computer Networks');

  const [workoutType, setWorkoutType] = useState('Weight Training');
  const [workoutDuration, setWorkoutDuration] = useState('45');
  const [workoutCalories, setWorkoutCalories] = useState('320');

  const [sleepHours, setSleepHours] = useState('7.5');
  const [sleepQuality, setSleepQuality] = useState('85');

  const [moodScore, setMoodScore] = useState('8');
  const [moodLabel, setMoodLabel] = useState('Focused & Steady');
  const [gratitudeText, setGratitudeText] = useState('');

  const [waterAmount, setWaterAmount] = useState('0.5');

  const [mealType, setMealType] = useState('Lunch');
  const [foodDesc, setFoodDesc] = useState('');
  const [foodCalories, setFoodCalories] = useState('550');
  const [isCleanMeal, setIsCleanMeal] = useState(true);

  const [screenMin, setScreenMin] = useState('30');

  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Food');

  if (!quickLogModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
      <div className="bg-[#fafaf3] w-full max-w-lg rounded-t-3xl border-t border-surface-variant p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-surface-variant/40">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">
                {quickLogModal === 'study' && 'menu_book'}
                {quickLogModal === 'workout' && 'fitness_center'}
                {quickLogModal === 'sleep' && 'bedtime'}
                {quickLogModal === 'mood' && 'mood'}
                {quickLogModal === 'water' && 'water_drop'}
                {quickLogModal === 'food' && 'restaurant'}
                {quickLogModal === 'screen' && 'devices'}
                {quickLogModal === 'expense' && 'payments'}
              </span>
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-primary capitalize">
              Quick Log: {quickLogModal}
            </h3>
          </div>
          <button
            onClick={() => setQuickLogModal(null)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* STUDY */}
        {quickLogModal === 'study' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Subject / Module</label>
              <select
                value={studySubject}
                onChange={(e) => setStudySubject(e.target.value)}
                className="w-full bg-surface-container rounded-lg px-3 py-2.5 text-sm border-none focus:ring-1 focus:ring-primary"
              >
                {data.study.subjects.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
                <option value="General Study">General Study / Reading</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Duration (Hours)</label>
              <div className="flex items-center gap-2">
                {['0.5', '1.0', '1.5', '2.0', '3.0'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setStudyHours(val)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      studyHours === val ? 'bg-primary text-white shadow-sm' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {val}h
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => quickLogStudy(studyHours, studySubject)}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary/90 mt-2"
            >
              Save Study Session (+20 XP)
            </button>
          </div>
        )}

        {/* WORKOUT */}
        {quickLogModal === 'workout' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Activity Type</label>
              <input
                type="text"
                value={workoutType}
                onChange={(e) => setWorkoutType(e.target.value)}
                placeholder="e.g. Weight Training / 5K Run / HIIT"
                className="w-full bg-surface-container rounded-lg px-3 py-2.5 text-sm border-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Duration (mins)</label>
                <input
                  type="number"
                  value={workoutDuration}
                  onChange={(e) => setWorkoutDuration(e.target.value)}
                  className="w-full bg-surface-container rounded-lg px-3 py-2 text-sm border-none focus:ring-1 focus:ring-primary font-mono-data"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Est. Calories</label>
                <input
                  type="number"
                  value={workoutCalories}
                  onChange={(e) => setWorkoutCalories(e.target.value)}
                  className="w-full bg-surface-container rounded-lg px-3 py-2 text-sm border-none focus:ring-1 focus:ring-primary font-mono-data"
                />
              </div>
            </div>
            <button
              onClick={() => quickLogWorkout(workoutType, workoutDuration, workoutCalories)}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary/90 mt-2"
            >
              Log Workout (+30 XP)
            </button>
          </div>
        )}

        {/* SLEEP */}
        {quickLogModal === 'sleep' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">
                Sleep Duration: <span className="font-mono-data font-bold text-primary">{sleepHours} Hours</span>
              </label>
              <input
                type="range"
                min="4"
                max="11"
                step="0.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">
                Rest Quality Rating: <span className="font-mono-data font-bold text-secondary">{sleepQuality}%</span>
              </label>
              <input
                type="range"
                min="40"
                max="100"
                step="5"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(e.target.value)}
                className="w-full accent-secondary"
              />
            </div>
            <button
              onClick={() => quickLogSleep(sleepHours, sleepQuality)}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary/90 mt-2"
            >
              Save Sleep Log (+15 XP)
            </button>
          </div>
        )}

        {/* MOOD */}
        {quickLogModal === 'mood' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-2">How are you feeling?</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { score: '10', label: 'Energized', icon: 'sentiment_very_satisfied' },
                  { score: '8', label: 'Focused', icon: 'sentiment_satisfied' },
                  { score: '6', label: 'Calm', icon: 'sentiment_neutral' },
                  { score: '4', label: 'Tired', icon: 'sentiment_dissatisfied' }
                ].map(item => (
                  <button
                    key={item.score}
                    type="button"
                    onClick={() => {
                      setMoodScore(item.score);
                      setMoodLabel(item.label);
                    }}
                    className={`flex flex-col items-center p-2.5 rounded-xl border transition-all ${
                      moodScore === item.score
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-surface-container border-transparent text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                    <span className="text-[11px] font-bold mt-1">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Quick Gratitude Note</label>
              <input
                type="text"
                value={gratitudeText}
                onChange={(e) => setGratitudeText(e.target.value)}
                placeholder="What brought you peace or joy today?"
                className="w-full bg-surface-container rounded-lg px-3 py-2.5 text-sm border-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => quickLogMood(moodScore, moodLabel, gratitudeText)}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary/90 mt-2"
            >
              Record Mood Check-in (+10 XP)
            </button>
          </div>
        )}

        {/* WATER */}
        {quickLogModal === 'water' && (
          <div className="space-y-4 text-center">
            <div className="py-2">
              <span className="material-symbols-outlined text-5xl text-secondary animate-bounce">water_drop</span>
              <p className="text-xs text-on-surface-variant mt-2">
                Current today: <strong className="font-mono-data text-primary text-base">{data.fitness.waterLiters}L</strong> / 3.0L Target
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['0.25', '0.5', '1.0'].map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setWaterAmount(amt)}
                  className={`py-2.5 font-mono-data font-bold rounded-xl border text-sm transition-all ${
                    waterAmount === amt ? 'bg-secondary text-white border-secondary shadow-sm' : 'bg-surface-container text-on-surface-variant border-transparent'
                  }`}
                >
                  +{amt}L
                </button>
              ))}
            </div>
            <button
              onClick={() => quickLogWater(waterAmount)}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary/90 mt-2"
            >
              Add +{waterAmount}L Water (+5 XP)
            </button>
          </div>
        )}

        {/* FOOD */}
        {quickLogModal === 'food' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map(meal => (
                <button
                  key={meal}
                  type="button"
                  onClick={() => setMealType(meal)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    mealType === meal ? 'bg-primary text-white shadow-sm' : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Meal Description</label>
              <input
                type="text"
                value={foodDesc}
                onChange={(e) => setFoodDesc(e.target.value)}
                placeholder="e.g. Oatmeal with chia seeds & whey protein"
                className="w-full bg-surface-container rounded-lg px-3 py-2 text-sm border-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Est. Calories</label>
                <input
                  type="number"
                  value={foodCalories}
                  onChange={(e) => setFoodCalories(e.target.value)}
                  className="w-full bg-surface-container rounded-lg px-3 py-2 text-sm border-none focus:ring-1 focus:ring-primary font-mono-data"
                />
              </div>
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCleanMeal}
                  onChange={(e) => setIsCleanMeal(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-xs font-bold text-on-surface">Whole / Clean Food</span>
              </label>
            </div>
            <button
              onClick={() => quickLogFood(mealType, foodDesc || `${mealType} meal`, foodCalories, isCleanMeal)}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary/90 mt-2"
            >
              Log Meal (+10 XP)
            </button>
          </div>
        )}

        {/* SCREEN */}
        {quickLogModal === 'screen' && (
          <div className="space-y-4">
            <p className="text-xs text-on-surface-variant">
              Current screen time today: <strong className="font-mono-data text-primary">{Math.floor(data.digital.screenTimeMin / 60)}h {data.digital.screenTimeMin % 60}m</strong>
            </p>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-2">Add Active Minutes</label>
              <div className="grid grid-cols-4 gap-2">
                {['15', '30', '45', '60'].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setScreenMin(m)}
                    className={`py-2 text-xs font-mono-data font-bold rounded-lg transition-all ${
                      screenMin === m ? 'bg-primary text-white shadow-sm' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    +{m}m
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => quickLogScreen(screenMin)}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary/90 mt-2"
            >
              Update Screen Log (+5 XP)
            </button>
          </div>
        )}

        {/* EXPENSE */}
        {quickLogModal === 'expense' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Expense Title</label>
              <input
                type="text"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                placeholder="e.g. Reference Textbook / Campus Coffee"
                className="w-full bg-surface-container rounded-lg px-3 py-2 text-sm border-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="250"
                  className="w-full bg-surface-container rounded-lg px-3 py-2 text-sm border-none focus:ring-1 focus:ring-primary font-mono-data"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Category</label>
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="w-full bg-surface-container rounded-lg px-3 py-2 text-sm border-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Academic">Academic</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => {
                if (!expenseAmount) return alert('Enter amount');
                quickLogExpense(expenseTitle || 'Miscellaneous', expenseAmount, expenseCategory);
              }}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary/90 mt-2"
            >
              Add Expense (+10 XP)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
