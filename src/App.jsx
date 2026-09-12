import React, { useState } from 'react';
import { LifeOSProvider, useLifeOS } from './context/LifeOSContext';
import { DeviceFrame } from './components/layout/DeviceFrame';
import { TopHeader } from './components/layout/TopHeader';
import { BottomNav } from './components/layout/BottomNav';
import { TodayDashboard } from './components/today/TodayDashboard';
import { TrackHub } from './components/track/TrackHub';
import { InsightsHub } from './components/insights/InsightsHub';
import { ProgressHub } from './components/progress/ProgressHub';
import { MeHub } from './components/me/MeHub';
import { QuickLogModal } from './components/modals/QuickLogModal';
import { AuthModal } from './components/auth/AuthModal';
import { LifeWrappedModal } from './components/modals/LifeWrappedModal';
import { GymStreakModal } from './components/modals/GymStreakModal';
import { OnboardingView } from './components/auth/OnboardingView';

const MainShell = () => {
  const { activeTab } = useLifeOS();
  const [hasEntered, setHasEntered] = useState(() => {
    return localStorage.getItem('traciiee_entered') === 'true';
  });

  const handleEnterApp = () => {
    localStorage.setItem('traciiee_entered', 'true');
    setHasEntered(true);
  };

  if (!hasEntered) {
    return <OnboardingView onComplete={handleEnterApp} />;
  }

  return (
    <DeviceFrame>
      <TopHeader />

      <main className="flex-1 pb-4">
        {activeTab === 'today' && <TodayDashboard />}
        {activeTab === 'track' && <TrackHub />}
        {activeTab === 'insights' && <InsightsHub />}
        {activeTab === 'progress' && <ProgressHub />}
        {activeTab === 'me' && <MeHub />}
      </main>

      <BottomNav />
      <QuickLogModal />
      <AuthModal />
      <LifeWrappedModal />
      <GymStreakModal />
    </DeviceFrame>
  );
};

export default function App() {
  return (
    <LifeOSProvider>
      <MainShell />
    </LifeOSProvider>
  );
}
