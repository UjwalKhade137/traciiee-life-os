export const initialUserData = {
  profile: {
    name: 'Shreyas',
    email: '',
    accountType: 'trial', // 'trial' | 'full'
    avatar: '/college_assets/shreyas.jpg',
    joinedDate: '2026-08-30',
    streak: 12,
    bestStreak: 18,
    streakFreezes: 2,
    streakProtected: true,
    lastLoggedDate: '2026-09-11'
  },
  lifeScore: {
    current: 84,
    history7Days: [
      { day: 'Sat', score: 74 },
      { day: 'Sun', score: 76 },
      { day: 'Mon', score: 79 },
      { day: 'Tue', score: 81 },
      { day: 'Wed', score: 83 },
      { day: 'Thu', score: 86 },
      { day: 'Fri', score: 84 }
    ],
    breakdown: {
      study: 88,
      health: 72,
      sleep: 54,
      productivity: 85,
      goals: 78,
      digital: 70
    }
  },
  habits: [
    { id: 'h1', name: 'Drink 2.5L Water', category: 'Health', completed: true, streak: 12, target: '2.5L', icon: 'water_drop' },
    { id: 'h2', name: 'Meditate 10 mins', category: 'Mindfulness', completed: false, streak: 8, target: '10m', icon: 'self_improvement' },
    { id: 'h3', name: 'Read 30 pages', category: 'Study', completed: true, streak: 14, target: '30p', icon: 'menu_book' },
    { id: 'h4', name: 'Deep Work Session', category: 'Productivity', completed: false, streak: 5, target: '2h', icon: 'bolt' },
    { id: 'h5', name: 'Evening Routine Checklist', category: 'Routine', completed: true, streak: 10, target: 'Daily', icon: 'bedtime' }
  ],
  goals: [
    { 
      id: 'g1', 
      title: 'Complete Data Science Certification', 
      category: 'Study', 
      progress: 68, 
      targetDate: '2026-09-28', 
      status: 'On Track', 
      icon: 'school',
      milestones: [
        { title: 'Phase 1: Pandas & NumPy', done: true },
        { title: 'Phase 2: Scikit-learn', done: true },
        { title: 'Phase 3: Deep Learning Capstone', done: false },
        { title: 'Final Certification Exam', done: false }
      ]
    },
    { 
      id: 'g2', 
      title: 'Run 100 km this Quarter', 
      category: 'Fitness', 
      progress: 45, 
      current: 45, 
      target: 100, 
      unit: 'km', 
      targetDate: '2026-10-31', 
      status: 'In Progress', 
      icon: 'directions_run',
      milestones: [
        { title: 'First 25km milestone', done: true },
        { title: 'Halfway 50km marker', done: false },
        { title: '75km push', done: false },
        { title: '100km completion', done: false }
      ]
    },
    { 
      id: 'g3', 
      title: 'Read 20 Books in 2026', 
      category: 'Learning', 
      progress: 70, 
      current: 14, 
      target: 20, 
      unit: 'books', 
      targetDate: '2026-12-31', 
      status: 'Ahead of Pace', 
      icon: 'menu_book',
      milestones: [
        { title: 'Book 5 milestone', done: true },
        { title: 'Book 10 milestone', done: true },
        { title: 'Book 15 milestone', done: false },
        { title: 'Book 20 finale', done: false }
      ]
    },
    { 
      id: 'g4', 
      title: 'Emergency Fund Savings (₹50,000)', 
      category: 'Money', 
      progress: 80, 
      current: 40000, 
      target: 50000, 
      unit: '₹', 
      targetDate: '2026-10-15', 
      status: 'Almost There', 
      icon: 'savings',
      milestones: [
        { title: 'Save ₹20,000', done: true },
        { title: 'Save ₹35,000', done: true },
        { title: 'Save ₹50,000 target', done: false }
      ]
    }
  ],
  study: {
    totalHoursToday: 3.5,
    streakDays: 14,
    subjects: [
      { id: 'sub1', name: 'Computer Networks', hours: 18.5, topicsDone: 14, totalTopics: 20, examDate: 'Sept 24' },
      { id: 'sub2', name: 'Cloud & DevOps', hours: 22.0, topicsDone: 16, totalTopics: 18, examDate: 'Sept 29' },
      { id: 'sub3', name: 'Machine Learning', hours: 31.0, topicsDone: 21, totalTopics: 25, examDate: 'Oct 05' }
    ],
    assignments: [
      { id: 'as1', title: 'Socket Programming Lab 4', subject: 'Computer Networks', dueDate: 'Sept 15, 2026', status: 'In Progress' },
      { id: 'as2', title: 'Docker Microservices Pipeline', subject: 'Cloud & DevOps', dueDate: 'Sept 18, 2026', status: 'Pending' }
    ]
  },
  collegeEvents: [
    {
      id: 'ev1',
      title: 'Ganesh Chaturthi Campus Mahotsav',
      date: 'Sept 14, 2026',
      time: '10:00 AM',
      venue: 'Main Auditorium & Quadrangle',
      image: '/college_assets/ganpati.jpg',
      tag: 'Cultural Celebration',
      rsvp: true,
      desc: 'Annual traditional invocation, student choir performance, and cultural exhibition.'
    },
    {
      id: 'ev2',
      title: 'Grand Dhol-Tasha Visarjan Procession',
      date: 'Sept 18, 2026',
      time: '4:00 PM',
      venue: 'Campus North Boulevard',
      image: '/college_assets/ganpati_visarjan.jpg',
      tag: 'Campus Pride',
      rsvp: true,
      desc: 'High-energy rhythmic dhol-tasha squad performance celebrating student unity.'
    },
    {
      id: 'ev3',
      title: 'Annual Tech Hackathon & Project Expo',
      date: 'Oct 02, 2026',
      time: '9:00 AM',
      venue: 'Innovation & Incubation Hub',
      image: '/college_assets/student_events_academichub.png',
      tag: 'Academic Hackathon',
      rsvp: true,
      desc: '36-hour hackathon with industry mentors, cash awards, and campus prototype displays.'
    }
  ],
  academicAssets: {
    dashboardPreview: '/college_assets/student_dashboard.png',
    notesPreview: '/college_assets/study_material_notes.png',
    attendancePreview: '/college_assets/attendance_marking_academichub.png',
    quizPreview: '/college_assets/quiz_center_academichub.png'
  },
  fitness: {
    stepsToday: 6840,
    stepsTarget: 10000,
    waterLiters: 2.2,
    waterTarget: 3.0,
    weightKg: 72.4,
    workouts: [
      { id: 'w1', date: '2026-09-10', type: 'Weight Training (Chest/Triceps)', durationMin: 55, calories: 420 },
      { id: 'w2', date: '2026-09-08', type: 'Morning Outdoor 5K Run', durationMin: 28, calories: 310 }
    ]
  },
  sleep: {
    durationHours: 7.2,
    qualityScore: 82,
    consistencyScore: 88,
    bedtime: '23:30',
    waketime: '06:45',
    history: [
      { day: 'Mon', hours: 7.5 },
      { day: 'Tue', hours: 6.8 },
      { day: 'Wed', hours: 7.0 },
      { day: 'Thu', hours: 8.0 },
      { day: 'Fri', hours: 7.2 }
    ]
  },
  mood: {
    score: 8,
    energy: 7,
    stress: 3,
    label: 'Calm & Productive',
    gratitude: 'Grateful for crisp morning air and unbroken study momentum.'
  },
  nutrition: {
    caloriesToday: 1850,
    calorieTarget: 2200,
    proteinGrams: 110,
    proteinTarget: 130,
    meals: [
      { type: 'Breakfast', title: 'Oats, Whey & Banana', cal: 450, clean: true },
      { type: 'Lunch', title: 'Brown Rice, Paneer Curry & Dal', cal: 680, clean: true },
      { type: 'Snack', title: 'Roasted Almonds & Green Tea', cal: 180, clean: true },
      { type: 'Dinner', title: 'Grilled Tofu Salad & Soup', cal: 540, clean: true }
    ]
  },
  digital: {
    screenTimeMin: 205,
    screenTimeLimitMin: 240,
    pickups: 38,
    breakdown: [
      { name: 'Study / IDE', pct: 55 },
      { name: 'Productivity Apps', pct: 20 },
      { name: 'Social Media', pct: 15 },
      { name: 'Media / Other', pct: 10 }
    ]
  },
  money: {
    monthlyBudget: 25000,
    spentThisMonth: 11450,
    expenses: [
      { id: 'ex1', date: '2026-09-10', title: 'Textbook & Lab Notebook', amount: 850, category: 'Academic' },
      { id: 'ex2', date: '2026-09-09', title: 'Healthy Grocery Haul', amount: 1420, category: 'Food' },
      { id: 'ex3', date: '2026-09-06', title: 'Metro Transit Card Pass', amount: 500, category: 'Transport' }
    ]
  },
  routine: {
    morning: [
      { id: 'rm1', text: 'Wake up at 6:45 AM', done: true },
      { id: 'rm2', text: '500ml water + Electrolytes', done: true },
      { id: 'rm3', text: '10 min stretch & breathwork', done: true },
      { id: 'rm4', text: 'Review top 3 priorities', done: true }
    ],
    evening: [
      { id: 're1', text: 'Review completed tasks', done: true },
      { id: 're2', text: 'Digital screen shutdown 45m before bed', done: false },
      { id: 're3', text: 'Daily reflection entry in Traciiee', done: true }
    ]
  },
  music: {
    listeningMinToday: 74,
    topGenre: 'Lo-Fi Instrumental & Ambient',
    topArtist: 'Ludovico Einaudi / Chillhop Music',
    correlationNote: 'Focus output increases +24% during instrumental sessions over 45 minutes.'
  },
  journal: {
    todayEntry: {
      text: "Productive morning session on Machine Learning. Stayed hydrated and hit my 6,000 steps mark before evening. Feeling balanced and clear-headed.",
      wentWell: "Crushed focus timer with 0 distractions during deep work.",
      wentWrong: "Delayed dinner slightly due to coding flow.",
      learned: "Consistent micro-habits compound into massive peace of mind.",
      priorityTomorrow: "Finalize Socket Programming assignment and 5k run."
    },
    archive: [
      { id: 'j1', date: '2026-09-10', title: 'Momentum & Flow', text: 'Great synergy between morning run and subsequent focus block. Hit personal best on bench press.', mood: 'Energetic' },
      { id: 'j2', date: '2026-09-09', title: 'Cultural Vibes', text: 'Campus Ganesh celebrations were vibrant. Reconnected with old batchmates.', mood: 'Happy' },
      { id: 'j3', date: '2026-09-08', title: 'Deep Work Reset', text: 'Completed cloud architecture diagram. Slept deeply after 8pm screen detox.', mood: 'Reflective' }
    ]
  },
  gamification: {
    level: 14,
    title: 'Focus Master',
    xp: 8450,
    nextLevelXp: 10000,
    achievements: [
      { id: 'ac1', title: '12-Day Streak', category: 'Consistency', icon: 'local_fire_department', unlocked: true, unlockedDate: 'Sept 11, 2026', desc: 'Maintain an app-wide daily logging streak of 12+ days' },
      { id: 'ac2', title: 'Bookworm', category: 'Reading', icon: 'menu_book', unlocked: true, unlockedDate: 'Sept 04, 2026', desc: 'Read over 5 complete books in a quarter' },
      { id: 'ac3', title: 'Early Bird', category: 'Circadian', icon: 'bedtime', unlocked: true, unlockedDate: 'Aug 29, 2026', desc: 'Wake up before 7:00 AM for 5 consecutive days' },
      { id: 'ac4', title: 'Marathoner', category: 'Endurance', icon: 'directions_run', unlocked: true, unlockedDate: 'Sept 08, 2026', desc: 'Log 42km of cumulative running' },
      { id: 'ac5', title: 'Zen Master', category: 'Mindfulness', icon: 'self_improvement', unlocked: false, progress: '7.5 / 10 hrs', desc: 'Accumulate 10+ hours of mindfulness and meditation' },
      { id: 'ac6', title: 'Hydro Homie', category: 'Hydration', icon: 'water_drop', unlocked: true, unlockedDate: 'Sept 06, 2026', desc: 'Hit 2.5L water target for 7 consecutive days' },
      { id: 'ac7', title: 'Detox Champion', category: 'Digital', icon: 'phonelink_off', unlocked: true, unlockedDate: 'Sept 02, 2026', desc: 'Complete 3 phone-free focus deep blocks' },
      { id: 'ac8', title: 'Goal Crusher', category: 'Achievement', icon: 'trophy', unlocked: false, progress: '2 / 3 goals', desc: 'Complete 3 quarterly major goals' }
    ],
    challenges: [
      { id: 'ch1', title: '30-Day Study Streak', category: 'Study', daysCompleted: 14, targetDays: 30, xpReward: 500, active: true },
      { id: 'ch2', title: '14-Day Workout Discipline', category: 'Fitness', daysCompleted: 9, targetDays: 14, xpReward: 350, active: true },
      { id: 'ch3', title: '7-Day Screen Time Under 3.5h', category: 'Digital', daysCompleted: 5, targetDays: 7, xpReward: 250, active: true },
      { id: 'ch4', title: 'Read 100 Pages in 5 Days', category: 'Reading', daysCompleted: 70, targetDays: 100, xpReward: 200, active: true }
    ],
    personalRecords: [
      { metric: 'Longest Daily Streak', value: '18 Days', date: 'August 2026', icon: 'local_fire_department' },
      { metric: 'Highest Life Score', value: '91 / 100', date: 'Aug 22, 2026', icon: 'star' },
      { metric: 'Longest Study Session', value: '4h 15m', date: 'Sept 05, 2026', icon: 'schedule' },
      { metric: 'Most Daily Steps', value: '14,280 Steps', date: 'Aug 18, 2026', icon: 'directions_walk' },
      { metric: 'Best Sleep Quality', value: '94%', date: 'Sept 01, 2026', icon: 'bedtime' },
      { metric: 'Lowest Screen Time', value: '1h 12m', date: 'Aug 29, 2026', icon: 'phonelink_ring' }
    ]
  },
  aiInsights: {
    apiKey: '',
    remainingQuotaToday: 9,
    maxDailyQuota: 10,
    quotaResetsIn: '14h 20m',
    isQuotaExhausted: false,
    lastGenerated: 'Today at 8:30 AM',
    insights: [
      {
        id: 'ai-1',
        title: 'Sleep-Focus Multiplier',
        summary: "Your study efficiency peaks when you achieve 7.5+ hours of sleep. Over the last week, a 15% drop in sleep duration correlated with a 22% decrease in focused study hours. Shifting your deep work blocks to morning sessions (9:00 AM - 11:30 AM) consistently produces your highest retention.",
        sleepAvg: '7h 12m',
        focusAvg: '88%',
        trend: 'positive'
      },
      {
        id: 'ai-2',
        title: 'Screen Curfew Correlation',
        summary: "Putting away digital screens 45 minutes before sleep directly boosted your deep sleep consistency by +18%. Your digital detox challenge is directly accelerating your cognitive recovery.",
        sleepAvg: '+18% Rest',
        focusAvg: '45m Curfew',
        trend: 'positive'
      }
    ]
  }
};
