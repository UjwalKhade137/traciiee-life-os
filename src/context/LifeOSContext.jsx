import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUserData } from '../utils/initialData';
import confetti from 'canvas-confetti';

const LifeOSContext = createContext();
const STORAGE_KEY = 'traciiee_life_os_v1';

export const LifeOSProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved state', e);
    }
    return initialUserData;
  });

  const [activeTab, setActiveTab] = useState('today');
  const [activeSubView, setActiveSubView] = useState(null); // 'college_events' | 'academic_hub' | 'pomodoro' | 'all_habits' | 'all_goals' | null
  const [quickLogModal, setQuickLogModal] = useState(null); // 'study' | 'workout' | 'sleep' | 'mood' | 'water' | 'food' | 'screen' | 'expense' | null
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showLifeWrapped, setShowLifeWrapped] = useState(false);
  const [showGymStreakModal, setShowGymStreakModal] = useState(false);
  const [deviceFrameMode, setDeviceFrameMode] = useState('phone'); // 'phone' | 'fluid'

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error persisting state', e);
    }
  }, [data]);

  // Recalculate composite Life Score
  const recalculateLifeScore = (currentData = data) => {
    const habitsCount = currentData.habits.length || 1;
    const habitsDone = currentData.habits.filter(h => h.completed).length;
    const habitPct = (habitsDone / habitsCount) * 100;

    const sleepScore = Math.min(100, Math.round((currentData.sleep.durationHours / 8) * 100));
    const studyScore = Math.min(100, Math.round((currentData.study.totalHoursToday / 4) * 100));
    const fitnessScore = Math.min(100, Math.round((currentData.fitness.stepsToday / currentData.fitness.stepsTarget) * 100));
    const screenScore = currentData.digital.screenTimeMin <= currentData.digital.screenTimeLimitMin ? 90 : 60;
    const goalsScore = Math.round(currentData.goals.reduce((acc, g) => acc + g.progress, 0) / (currentData.goals.length || 1));

    const composite = Math.round(
      habitPct * 0.25 +
      sleepScore * 0.20 +
      studyScore * 0.20 +
      fitnessScore * 0.15 +
      goalsScore * 0.10 +
      screenScore * 0.10
    );

    return {
      current: composite,
      breakdown: {
        study: studyScore,
        health: fitnessScore,
        sleep: sleepScore,
        productivity: habitPct,
        goals: goalsScore,
        digital: screenScore
      }
    };
  };

  const awardXP = (amount, reason = '') => {
    setData(prev => {
      const newXp = prev.gamification.xp + amount;
      let newLevel = prev.gamification.level;
      let newNextLevelXp = prev.gamification.nextLevelXp;
      let leveledUp = false;

      if (newXp >= newNextLevelXp) {
        newLevel += 1;
        newNextLevelXp += 2500;
        leveledUp = true;
      }

      if (leveledUp) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch (err) {}
      }

      return {
        ...prev,
        gamification: {
          ...prev.gamification,
          xp: newXp,
          level: newLevel,
          nextLevelXp: newNextLevelXp
        }
      };
    });
  };

  const logActivity = (activityType, xpAmount = 15) => {
    setData(prev => {
      const todayStr = new Date().toISOString().split('T')[0];
      const isNewDay = prev.profile.lastLoggedDate !== todayStr;
      const updatedStreak = isNewDay ? prev.profile.streak + 1 : prev.profile.streak;
      const updatedBest = Math.max(updatedStreak, prev.profile.bestStreak);

      return {
        ...prev,
        profile: {
          ...prev.profile,
          streak: updatedStreak,
          bestStreak: updatedBest,
          lastLoggedDate: todayStr
        }
      };
    });
    awardXP(xpAmount, activityType);
  };

  const continueAsGuest = () => {
    setData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        accountType: 'trial',
        name: prev.profile.name || 'Guest Explorer'
      }
    }));
  };

  const upgradeToFullAccount = (email, password, name) => {
    setData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        accountType: 'full',
        email: email,
        name: name || prev.profile.name
      }
    }));
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
    setShowUpgradeModal(false);
  };

  const toggleHabit = (habitId) => {
    setData(prev => {
      const updatedHabits = prev.habits.map(h => {
        if (h.id === habitId) {
          const nextState = !h.completed;
          return {
            ...h,
            completed: nextState,
            streak: nextState ? h.streak + 1 : Math.max(0, h.streak - 1)
          };
        }
        return h;
      });

      const updated = {
        ...prev,
        habits: updatedHabits
      };
      const score = recalculateLifeScore(updated);
      return {
        ...updated,
        lifeScore: {
          ...prev.lifeScore,
          current: score.current,
          breakdown: score.breakdown
        }
      };
    });
    logActivity('Habit check', 10);
  };

  const addHabit = (newHabit) => {
    setData(prev => ({
      ...prev,
      habits: [
        ...prev.habits,
        {
          id: 'h-' + Date.now(),
          name: newHabit.name,
          category: newHabit.category || 'General',
          completed: false,
          streak: 0,
          target: newHabit.target || 'Daily',
          icon: newHabit.icon || 'check_circle'
        }
      ]
    }));
    awardXP(25, 'Created new habit');
  };

  const updateGoalProgress = (goalId, newProgress) => {
    setData(prev => {
      const updatedGoals = prev.goals.map(g => {
        if (g.id === goalId) {
          const clamped = Math.min(100, Math.max(0, newProgress));
          return {
            ...g,
            progress: clamped,
            status: clamped >= 100 ? 'Completed' : clamped > 50 ? 'On Track' : 'In Progress'
          };
        }
        return g;
      });
      return {
        ...prev,
        goals: updatedGoals
      };
    });
    logActivity('Goal updated', 20);
  };

  const addGoal = (goal) => {
    setData(prev => ({
      ...prev,
      goals: [
        ...prev.goals,
        {
          id: 'g-' + Date.now(),
          title: goal.title,
          category: goal.category || 'Personal',
          progress: 0,
          targetDate: goal.targetDate || '2026-12-31',
          status: 'In Progress',
          icon: goal.icon || 'flag',
          milestones: goal.milestones || [{ title: 'Kickoff milestone', done: false }]
        }
      ]
    }));
    awardXP(50, 'Created new goal');
  };

  const quickLogStudy = (hours, subjectName) => {
    setData(prev => ({
      ...prev,
      study: {
        ...prev.study,
        totalHoursToday: prev.study.totalHoursToday + Number(hours)
      }
    }));
    logActivity('Study logged', 20);
    setQuickLogModal(null);
  };

  const quickLogWorkout = (type, durationMin, calories) => {
    setData(prev => ({
      ...prev,
      fitness: {
        ...prev.fitness,
        workouts: [
          {
            id: 'w-' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            type,
            durationMin: Number(durationMin),
            calories: Number(calories)
          },
          ...prev.fitness.workouts
        ]
      }
    }));
    logActivity('Workout completed', 30);
    setQuickLogModal(null);
  };

  const completeGymWorkout = (workoutData = {}) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Yesterday date string
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Day of week index for Mon-Sun: Mon=0, Tue=1, ..., Sun=6
    const dayOfWeek = today.getDay();
    const historyIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    let reachedMilestone = false;
    let milestoneBadge = '';

    setData(prev => {
      const currentGym = prev.gymStreak || initialUserData.gymStreak;
      const alreadyCompletedToday = currentGym.lastCompletedDate === todayStr;

      let newStreak = currentGym.currentStreak;
      if (!alreadyCompletedToday) {
        if (currentGym.lastCompletedDate === yesterdayStr) {
          newStreak = currentGym.currentStreak + 1;
        } else {
          newStreak = 1;
        }
      }

      const newBestStreak = Math.max(currentGym.bestStreak || 0, newStreak);
      const newTotalWorkouts = (currentGym.totalWorkouts || 0) + 1;

      // Update weekly calendar
      const updatedWeekly = (currentGym.weeklyHistory || initialUserData.gymStreak.weeklyHistory).map((w, idx) => {
        if (idx === historyIndex) {
          return {
            ...w,
            completed: true,
            date: todayStr,
            workoutType: workoutData.type || 'Gym Workout'
          };
        }
        return w;
      });

      // Update challenges
      const updatedChallenges = currentGym.challenges.map(ch => {
        const isCurrentActive = ch.id === currentGym.activeChallengeId;
        const nextDaysCompleted = !alreadyCompletedToday
          ? Math.min(ch.durationDays, ch.daysCompleted + 1)
          : ch.daysCompleted;
        const isNowCompleted = nextDaysCompleted >= ch.durationDays;

        if (isCurrentActive && isNowCompleted && !ch.completed) {
          reachedMilestone = true;
          milestoneBadge = ch.badge;
        }

        return {
          ...ch,
          daysCompleted: nextDaysCompleted,
          completed: isNowCompleted || ch.completed
        };
      });

      // Also append to fitness workouts
      const newSession = {
        id: 'w-' + Date.now(),
        date: todayStr,
        type: workoutData.type || 'Gym Workout',
        durationMin: Number(workoutData.durationMin) || 50,
        calories: Number(workoutData.calories) || 380,
        notes: workoutData.notes || ''
      };

      const updatedFitnessWorkouts = [newSession, ...(prev.fitness?.workouts || [])];

      return {
        ...prev,
        fitness: {
          ...prev.fitness,
          stepsToday: (prev.fitness?.stepsToday || 6840) + 2000,
          workouts: updatedFitnessWorkouts
        },
        gymStreak: {
          ...currentGym,
          currentStreak: newStreak,
          bestStreak: newBestStreak,
          totalWorkouts: newTotalWorkouts,
          lastCompletedDate: todayStr,
          challenges: updatedChallenges,
          weeklyHistory: updatedWeekly
        }
      };
    });

    logActivity('Workout completed', 35);

    if (reachedMilestone) {
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const setActiveGymChallenge = (challengeId) => {
    setData(prev => ({
      ...prev,
      gymStreak: {
        ...(prev.gymStreak || initialUserData.gymStreak),
        activeChallengeId: challengeId
      }
    }));
  };

  const quickLogSleep = (hours, quality) => {
    setData(prev => ({
      ...prev,
      sleep: {
        ...prev.sleep,
        durationHours: Number(hours),
        qualityScore: Number(quality)
      }
    }));
    logActivity('Sleep recorded', 15);
    setQuickLogModal(null);
  };

  const quickLogMood = (score, label, gratitude) => {
    setData(prev => ({
      ...prev,
      mood: {
        ...prev.mood,
        score: Number(score),
        label: label || prev.mood.label,
        gratitude: gratitude || prev.mood.gratitude
      }
    }));
    logActivity('Mood check-in', 10);
    setQuickLogModal(null);
  };

  const quickLogWater = (liters) => {
    setData(prev => ({
      ...prev,
      fitness: {
        ...prev.fitness,
        waterLiters: Math.round((prev.fitness.waterLiters + Number(liters)) * 10) / 10
      }
    }));
    logActivity('Water tracked', 5);
    setQuickLogModal(null);
  };

  const quickLogFood = (mealType, desc, cal, clean) => {
    setData(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        caloriesToday: prev.nutrition.caloriesToday + Number(cal),
        meals: [
          ...prev.nutrition.meals,
          { type: mealType, title: desc, cal: Number(cal), clean }
        ]
      }
    }));
    logActivity('Meal logged', 10);
    setQuickLogModal(null);
  };

  const quickLogScreen = (minutes) => {
    setData(prev => ({
      ...prev,
      digital: {
        ...prev.digital,
        screenTimeMin: prev.digital.screenTimeMin + Number(minutes)
      }
    }));
    logActivity('Screen time updated', 5);
    setQuickLogModal(null);
  };

  const quickLogExpense = (title, amount, category) => {
    setData(prev => ({
      ...prev,
      money: {
        ...prev.money,
        spentThisMonth: prev.money.spentThisMonth + Number(amount),
        expenses: [
          {
            id: 'ex-' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            title,
            amount: Number(amount),
            category: category || 'General'
          },
          ...prev.money.expenses
        ]
      }
    }));
    logActivity('Expense tracked', 10);
    setQuickLogModal(null);
  };

  const saveJournal = (journalEntry) => {
    setData(prev => ({
      ...prev,
      journal: {
        ...prev.journal,
        todayEntry: {
          ...prev.journal.todayEntry,
          ...journalEntry
        },
        archive: [
          {
            id: 'j-' + Date.now(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            title: journalEntry.title || 'Daily Reflection',
            text: journalEntry.text,
            mood: prev.mood.label
          },
          ...prev.journal.archive
        ]
      }
    }));
    logActivity('Journal saved', 25);
  };

  const toggleRoutine = (type, itemId) => {
    setData(prev => ({
      ...prev,
      routine: {
        ...prev.routine,
        [type]: prev.routine[type].map(item =>
          item.id === itemId ? { ...item, done: !item.done } : item
        )
      }
    }));
    logActivity('Routine step', 5);
  };

  const toggleEventRSVP = (eventId) => {
    setData(prev => ({
      ...prev,
      collegeEvents: prev.collegeEvents.map(ev =>
        ev.id === eventId ? { ...ev, rsvp: !ev.rsvp } : ev
      )
    }));
  };

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const generateAIInsight = async () => {
    if (data.aiInsights.remainingQuotaToday <= 0) {
      return;
    }

    setIsGeneratingAI(true);

    try {
      const apiKey = data.aiInsights.apiKey;
      let generatedInsight = null;

      if (apiKey && apiKey.trim().length > 10) {
        const compactPayload = {
          streak: data.profile.streak,
          lifeScore: data.lifeScore.current,
          avgSleep: data.sleep.durationHours,
          studyHours: data.study.totalHoursToday,
          steps: data.fitness.stepsToday,
          screenMin: data.digital.screenTimeMin,
          mood: data.mood.label
        };

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are Traciiee Life OS analyst. Analyze this user data: ${JSON.stringify(
                        compactPayload
                      )}. Provide a 2-sentence cross-domain actionable insight and correlation. Format response as JSON with: {"title": "...", "summary": "...", "focusAvg": "...", "sleepAvg": "..."}. Free tier compliant only.`
                    }
                  ]
                }
              ]
            })
          }
        );

        if (response.ok) {
          const resData = await response.json();
          const text = resData.candidates?.[0]?.content?.parts?.[0]?.text;
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            generatedInsight = JSON.parse(jsonMatch[0]);
          }
        }
      }

      if (!generatedInsight) {
        await new Promise(r => setTimeout(r, 1200));
        const insightsPool = [
          {
            title: 'Circadian Peak & Focus Multiplier',
            summary: `With ${data.sleep.durationHours}h sleep recorded and ${data.study.totalHoursToday}h study logged, your cognitive endurance peaks during 90-minute morning focus sprints. Maintaining sub-45m evening screen time keeps this cycle optimal.`,
            sleepAvg: `${data.sleep.durationHours}h`,
            focusAvg: '92% Peak'
          },
          {
            title: 'Hydration & Stamina Alignment',
            summary: `Drinking ${data.fitness.waterLiters}L water correlates with 14% higher workout stamina. Keep water intake balanced with your study blocks to avoid mid-afternoon energy slumps.`,
            sleepAvg: 'High Energy',
            focusAvg: `${data.fitness.waterLiters}L Hydration`
          },
          {
            title: 'Daily Streak Momentum',
            summary: `Your ${data.profile.streak}-day streak is actively driving consistent habit adherence. Users with 10+ day streaks achieve their quarterly targets 2.8x faster.`,
            sleepAvg: `${data.profile.streak} Days`,
            focusAvg: 'Top 5%'
          }
        ];
        generatedInsight = insightsPool[Math.floor(Math.random() * insightsPool.length)];
      }

      setData(prev => {
        const nextQuota = Math.max(0, prev.aiInsights.remainingQuotaToday - 1);
        return {
          ...prev,
          aiInsights: {
            ...prev.aiInsights,
            remainingQuotaToday: nextQuota,
            isQuotaExhausted: nextQuota === 0,
            lastGenerated: 'Just now',
            insights: [
              {
                id: 'ai-' + Date.now(),
                title: generatedInsight.title || 'Personal Intelligence Report',
                summary: generatedInsight.summary,
                sleepAvg: generatedInsight.sleepAvg || 'Optimal',
                focusAvg: generatedInsight.focusAvg || '90%',
                trend: 'positive'
              },
              ...prev.aiInsights.insights.slice(0, 4)
            ]
          }
        };
      });
      awardXP(20, 'AI Insight Synthesized');
    } catch (err) {
      console.error('Error running AI insight generation', err);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const setApiKey = (key) => {
    setData(prev => ({
      ...prev,
      aiInsights: {
        ...prev.aiInsights,
        apiKey: key
      }
    }));
  };

  const useStreakFreeze = () => {
    if (data.profile.streakFreezes > 0) {
      setData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          streakFreezes: prev.profile.streakFreezes - 1,
          streakProtected: true
        }
      }));
    }
  };

  const exportDataJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `traciiee_life_os_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportDataCSV = () => {
    let csv = 'Module,Key,Value,Date\n';
    csv += `Streak,Current,${data.profile.streak},${data.profile.lastLoggedDate}\n`;
    csv += `LifeScore,Current,${data.lifeScore.current},${new Date().toISOString().split('T')[0]}\n`;
    data.habits.forEach(h => {
      csv += `Habits,"${h.name}",Completed: ${h.completed} | Streak: ${h.streak},Today\n`;
    });
    data.goals.forEach(g => {
      csv += `Goals,"${g.title}",${g.progress}%,Target: ${g.targetDate}\n`;
    });
    data.fitness.workouts.forEach(w => {
      csv += `Workouts,"${w.type}",${w.durationMin}m | ${w.calories}cal,${w.date}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `traciiee_metrics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const resetAllData = () => {
    if (window.confirm('Reset all Traciiee data back to defaults?')) {
      localStorage.removeItem(STORAGE_KEY);
      setData(initialUserData);
    }
  };

  return (
    <LifeOSContext.Provider
      value={{
        data,
        setData,
        activeTab,
        setActiveTab,
        activeSubView,
        setActiveSubView,
        quickLogModal,
        setQuickLogModal,
        showUpgradeModal,
        setShowUpgradeModal,
        showLifeWrapped,
        setShowLifeWrapped,
        showGymStreakModal,
        setShowGymStreakModal,
        deviceFrameMode,
        setDeviceFrameMode,
        continueAsGuest,
        upgradeToFullAccount,
        toggleHabit,
        addHabit,
        updateGoalProgress,
        addGoal,
        quickLogStudy,
        quickLogWorkout,
        completeGymWorkout,
        setActiveGymChallenge,
        quickLogSleep,
        quickLogMood,
        quickLogWater,
        quickLogFood,
        quickLogScreen,
        quickLogExpense,
        saveJournal,
        toggleRoutine,
        toggleEventRSVP,
        generateAIInsight,
        isGeneratingAI,
        setApiKey,
        useStreakFreeze,
        exportDataJSON,
        exportDataCSV,
        resetAllData,
        awardXP
      }}
    >
      {children}
    </LifeOSContext.Provider>
  );
};

export const useLifeOS = () => {
  const context = useContext(LifeOSContext);
  if (!context) {
    throw new Error('useLifeOS must be used within a LifeOSProvider');
  }
  return context;
};
