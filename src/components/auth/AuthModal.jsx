import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const AuthModal = () => {
  const { data, showUpgradeModal, setShowUpgradeModal, upgradeToFullAccount } = useLifeOS();
  const [email, setEmail] = useState(data.profile.email || '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(data.profile.name || 'Shreyas');
  const [mode, setMode] = useState('upgrade'); // 'upgrade' | 'login'
  const [successMsg, setSuccessMsg] = useState('');

  if (!showUpgradeModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in your email and password');
      return;
    }
    upgradeToFullAccount(email, password, name);
    setSuccessMsg('Account upgraded successfully! All your streaks, XP, and logs are safe.');
    setTimeout(() => {
      setSuccessMsg('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#fafaf3] w-full max-w-md rounded-2xl border border-surface-variant p-6 shadow-2xl relative">
        <button
          onClick={() => setShowUpgradeModal(false)}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-xl font-bold text-primary">
              {data.profile.accountType === 'trial' ? 'Save Data / Create Account' : 'Account Settings'}
            </h2>
            <p className="text-xs text-on-surface-variant">Permanent local-first profile backup</p>
          </div>
        </div>

        {data.profile.accountType === 'trial' && (
          <div className="bg-secondary-container/40 border border-secondary/20 rounded-xl p-3 mb-5">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-secondary text-sm mt-0.5">info</span>
              <p className="text-xs text-on-secondary-container leading-relaxed">
                You are currently in <strong>Trial Mode</strong>. Upgrading secures your <strong>{data.profile.streak}-day streak</strong>, <strong>{data.gamification.xp} XP</strong>, and all tracking logs with zero data loss.
              </p>
            </div>
          </div>
        )}

        {successMsg ? (
          <div className="bg-emerald-100 text-emerald-800 p-4 rounded-xl text-sm font-medium text-center">
            {successMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Shreyas"
                className="w-full bg-surface-container rounded-lg px-3 py-2.5 text-sm border-none focus:ring-2 focus:ring-primary text-on-surface"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shreyas@example.com"
                className="w-full bg-surface-container rounded-lg px-3 py-2.5 text-sm border-none focus:ring-2 focus:ring-primary text-on-surface"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container rounded-lg px-3 py-2.5 text-sm border-none focus:ring-2 focus:ring-primary text-on-surface"
                required
              />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl text-sm hover:bg-primary/90 transition-all shadow-md active:scale-98"
              >
                {data.profile.accountType === 'trial' ? 'Upgrade to Permanent Account' : 'Update Credentials'}
              </button>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-2.5 text-xs text-on-surface-variant hover:text-primary font-medium transition-colors"
              >
                Continue using Trial (Keep Local Only)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
