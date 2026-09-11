import React, { useState, useEffect } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const PomodoroModal = ({ isOpen, onClose }) => {
  const { awardXP } = useLifeOS();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' (25m) | 'short' (5m) | 'long' (15m)
  const [completedSessions, setCompletedSessions] = useState(3);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'focus') {
        setCompletedSessions(prev => prev + 1);
        awardXP(30, 'Pomodoro focus sprint completed');
        alert('🎉 Focus session completed! Great job. Take a 5-minute break.');
        setMode('short');
        setTimeLeft(5 * 60);
      } else {
        alert('Break ended! Ready to focus again?');
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const setTimerMode = (newMode, durationMinutes) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(durationMinutes * 60);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#fafaf3] w-full max-w-sm rounded-3xl border border-surface-variant p-6 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center justify-center gap-1.5 mb-3">
          <span className="material-symbols-outlined text-secondary text-2xl">timer</span>
          <h3 className="font-headline-sm text-lg font-bold text-primary">Focus / Pomodoro</h3>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-surface-container rounded-full p-1 max-w-xs mx-auto mb-6">
          <button
            onClick={() => setTimerMode('focus', 25)}
            className={`flex-1 py-1 text-xs font-bold rounded-full transition-all ${
              mode === 'focus' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant'
            }`}
          >
            Focus 25m
          </button>
          <button
            onClick={() => setTimerMode('short', 5)}
            className={`flex-1 py-1 text-xs font-bold rounded-full transition-all ${
              mode === 'short' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant'
            }`}
          >
            Break 5m
          </button>
          <button
            onClick={() => setTimerMode('long', 15)}
            className={`flex-1 py-1 text-xs font-bold rounded-full transition-all ${
              mode === 'long' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant'
            }`}
          >
            Long 15m
          </button>
        </div>

        {/* Big Countdown Display */}
        <div className="my-6">
          <span className="font-mono-data text-6xl font-bold tracking-tight text-primary">
            {formattedTime}
          </span>
          <p className="text-xs text-on-surface-variant mt-2">
            Completed Today: <strong className="text-secondary font-mono-data text-sm">{completedSessions} blocks</strong> (75m deep work)
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 ${
              isRunning ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {isRunning ? 'Pause Timer' : 'Start Focus'}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(mode === 'focus' ? 25 * 60 : mode === 'short' ? 5 * 60 : 15 * 60);
            }}
            className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            title="Reset"
          >
            <span className="material-symbols-outlined text-xl">restart_alt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
