import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const OnboardingView = ({ onComplete }) => {
  const { continueAsGuest, setShowUpgradeModal } = useLifeOS();

  const handleGuestEntry = () => {
    continueAsGuest();
    onComplete();
  };

  const handleCreateAccount = () => {
    setShowUpgradeModal(true);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-[#fafaf3] flex flex-col justify-between p-6 max-w-md mx-auto text-center animate-in fade-in duration-300">
      {/* Brand Hero */}
      <div className="my-auto py-8">
        <div className="w-20 h-20 rounded-3xl bg-primary text-on-primary flex items-center justify-center mx-auto mb-6 shadow-organic shadow-primary/20">
          <span className="material-symbols-outlined text-4xl text-primary-fixed">
            all_inclusive
          </span>
        </div>

        <h1 className="font-headline-lg text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">
          Traciiee
        </h1>
        <p className="font-display-lg text-base text-secondary font-medium mb-4 italic">
          My Personal Life Operating System
        </p>

        <p className="text-xs text-on-surface-variant max-w-xs mx-auto leading-relaxed">
          100% private personal analytics. Track your study, fitness, sleep, mood, routine, and life score — all in one unified dashboard.
        </p>

        <div className="grid grid-cols-3 gap-2 mt-8 max-w-xs mx-auto text-left">
          <div className="bg-surface-container p-2.5 rounded-xl text-center">
            <span className="material-symbols-outlined text-primary text-lg">lock</span>
            <p className="text-[10px] font-bold text-on-surface mt-1">100% Private</p>
          </div>
          <div className="bg-surface-container p-2.5 rounded-xl text-center">
            <span className="material-symbols-outlined text-secondary text-lg">bolt</span>
            <p className="text-[10px] font-bold text-on-surface mt-1">Zero Friction</p>
          </div>
          <div className="bg-surface-container p-2.5 rounded-xl text-center">
            <span className="material-symbols-outlined text-emerald-700 text-lg">auto_awesome</span>
            <p className="text-[10px] font-bold text-on-surface mt-1">Free-Tier AI</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 w-full pb-6">
        <button
          onClick={handleGuestEntry}
          className="w-full py-3.5 bg-primary text-on-primary font-bold rounded-2xl text-sm shadow-organic hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <span>Continue as Guest (Trial)</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>

        <button
          onClick={handleCreateAccount}
          className="w-full py-3 bg-surface-container border border-surface-variant text-primary font-bold rounded-2xl text-sm hover:bg-surface-variant transition-all active:scale-98"
        >
          Create Permanent Account
        </button>

        <p className="text-[11px] text-on-surface-variant mt-3">
          Already have an account?{' '}
          <button
            onClick={handleCreateAccount}
            className="text-primary font-bold underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};
