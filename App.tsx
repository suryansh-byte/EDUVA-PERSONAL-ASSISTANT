
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  MessageSquare, 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Code, 
  History, 
  HelpCircle,
  Menu,
  X,
  Trophy,
  Award,
  Zap,
  Palette,
  Check,
  Star,
  ArrowUp
} from 'lucide-react';

import Home from './pages/Home';
import Chat from './pages/Chat';
import SubjectSelection from './pages/SubjectSelection';
import Explanation from './pages/Explanation';
import Practice from './pages/Practice';
import CodeHelp from './pages/CodeHelp';
import HistoryPage from './pages/History';
import About from './pages/About';
import Leaderboard from './pages/Leaderboard';
import { DoubtRecord, UserStats, Badge, ThemeType } from './types';

interface GamificationContextType {
  stats: UserStats;
  addPoints: (amount: number, category: 'doubt' | 'practice' | 'code', subject?: string) => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) throw new Error('useGamification must be used within provider');
  return context;
};

const ThemeSelector = () => {
  const { theme, setTheme } = useGamification();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { id: ThemeType; name: string; color: string }[] = [
    { id: 'light', name: 'Light', color: 'bg-white' },
    { id: 'midnight', name: 'Midnight', color: 'bg-zinc-900' },
    { id: 'sepia', name: 'Sepia', color: 'bg-[#fdf6e3]' },
    { id: 'ocean', name: 'Ocean', color: 'bg-slate-900' },
    { id: 'forest', name: 'Forest', color: 'bg-emerald-950' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-theme-card transition-colors flex items-center gap-2"
        title="Change Theme"
      >
        <Palette size={20} className="text-theme-text" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-48 glass rounded-2xl shadow-2xl z-[101] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-3 border-b border-theme-border">
              <span className="text-xs font-black uppercase tracking-widest text-theme-muted">Select Theme</span>
            </div>
            <div className="p-2 space-y-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    theme === t.id 
                      ? 'bg-theme-accent text-theme-bg' 
                      : 'hover:bg-theme-card text-theme-text'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border border-theme-border ${t.color}`}></div>
                    <span className="text-sm font-medium">{t.name}</span>
                  </div>
                  {theme === t.id && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { stats } = useGamification();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Ask Doubt', path: '/chat', icon: MessageSquare },
    { name: 'Subjects', path: '/subjects', icon: BookOpen },
    { name: 'Explanation', path: '/explanation', icon: FileText },
    { name: 'Practice', path: '/practice', icon: CheckCircle },
    { name: 'Code Help', path: '/code', icon: Code },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'History', path: '/history', icon: History },
  ];

  const activePath = location.pathname;

  return (
    <nav className="glass border-b border-theme-border sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter text-theme-text">EDUVA</span>
              <div className="h-5 w-px bg-theme-border mx-2 hidden sm:block"></div>
              <div className="hidden sm:flex items-center gap-2 glass px-3 py-1 rounded-full">
                <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-theme-text">{stats.points} pts</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium flex items-center gap-2 rounded-lg transition-all ${
                  activePath === item.path 
                    ? 'bg-theme-accent text-theme-bg' 
                    : 'text-theme-muted hover:text-theme-text hover:bg-theme-card'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
            <ThemeSelector />
          </div>

          <div className="flex items-center md:hidden gap-4">
            <ThemeSelector />
             <div className="flex items-center gap-1 glass px-2 py-1 rounded-full">
                <Zap size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-[10px] font-bold text-theme-text">{stats.points}</span>
              </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-theme-text hover:bg-theme-card rounded-lg focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-b border-theme-border animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium flex items-center gap-3 rounded-xl transition-all ${
                  activePath === item.path ? 'bg-theme-accent text-theme-bg' : 'text-theme-text hover:bg-theme-card'
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const INITIAL_BADGES: Badge[] = [
  { id: '1', name: 'Curious Mind', icon: '🧠', description: 'Asked your first 5 doubts', unlocked: false, criteria: 'doubt_5' },
  { id: '2', name: 'Math Whiz', icon: '📐', description: 'Solved 3 mathematics doubts', unlocked: false, criteria: 'math_3' },
  { id: '3', name: 'Code Master', icon: '💻', description: 'Debugged 3 code snippets', unlocked: false, criteria: 'code_3' },
  { id: '4', name: 'Dedicated', icon: '🔥', description: 'Completed 5 practice sets', unlocked: false, criteria: 'practice_5' },
];

const App = () => {
  const [history, setHistory] = useState<DoubtRecord[]>([]);
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('eduva_theme_v2') as ThemeType) || 'light';
    }
    return 'light';
  });
  
  const [levelUpNotif, setLevelUpNotif] = useState<number | null>(null);

  const [stats, setStats] = useState<UserStats>({
    points: 0,
    level: 1,
    badges: INITIAL_BADGES,
    doubtCount: 0,
    practiceCount: 0,
    codeCount: 0,
    subjectCounts: {}
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem('eduva_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    
    const savedStats = localStorage.getItem('eduva_stats_v2');
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  useEffect(() => {
    localStorage.setItem('eduva_stats_v2', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'midnight' || theme === 'ocean' || theme === 'forest') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('eduva_theme_v2', theme);
  }, [theme]);

  const addPoints = (amount: number, category: 'doubt' | 'practice' | 'code', subject?: string) => {
    setStats(prev => {
      const newPoints = prev.points + amount;
      const newLevel = Math.floor(newPoints / 500) + 1;
      
      if (newLevel > prev.level) {
        setLevelUpNotif(newLevel);
        setTimeout(() => setLevelUpNotif(null), 5000);
      }

      let newDoubtCount = prev.doubtCount;
      let newPracticeCount = prev.practiceCount;
      let newCodeCount = prev.codeCount;
      const newSubjectCounts = { ...prev.subjectCounts };

      if (category === 'doubt') {
        newDoubtCount++;
        if (subject) {
          newSubjectCounts[subject] = (newSubjectCounts[subject] || 0) + 1;
        }
      }
      if (category === 'practice') newPracticeCount++;
      if (category === 'code') newCodeCount++;

      const newBadges = prev.badges.map(badge => {
        if (badge.unlocked) return badge;
        if (badge.criteria === 'doubt_5' && newDoubtCount >= 5) return { ...badge, unlocked: true };
        if (badge.criteria === 'code_3' && newCodeCount >= 3) return { ...badge, unlocked: true };
        if (badge.criteria === 'practice_5' && newPracticeCount >= 5) return { ...badge, unlocked: true };
        if (badge.criteria === 'math_3' && (newSubjectCounts['Mathematics'] || 0) >= 3) return { ...badge, unlocked: true };
        return badge;
      });

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        doubtCount: newDoubtCount,
        practiceCount: newPracticeCount,
        codeCount: newCodeCount,
        subjectCounts: newSubjectCounts,
        badges: newBadges
      };
    });
  };

  const saveDoubt = (record: Omit<DoubtRecord, 'id' | 'timestamp'>) => {
    const newRecord: DoubtRecord = {
      ...record,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    const updated = [newRecord, ...history].slice(0, 50);
    setHistory(updated);
    localStorage.setItem('eduva_history', JSON.stringify(updated));
  };

  return (
    <GamificationContext.Provider value={{ stats, addPoints, theme, setTheme }}>
      <Router>
        <div className="min-h-screen flex flex-col transition-colors duration-300">
          <Navbar />
          
          {/* Level Up Notification */}
          {levelUpNotif && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 duration-500">
              <div className="glass bg-theme-accent text-theme-bg px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-4 border-none">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <ArrowUp size={32} className="animate-bounce" />
                </div>
                <div>
                  <h4 className="text-2xl font-black">Level Up!</h4>
                  <p className="font-bold opacity-80">You've reached Level {levelUpNotif}</p>
                </div>
              </div>
            </div>
          )}

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat saveDoubt={saveDoubt} />} />
              <Route path="/subjects" element={<SubjectSelection />} />
              <Route path="/explanation" element={<Explanation saveDoubt={saveDoubt} />} />
              <Route path="/practice" element={<Practice saveDoubt={saveDoubt} />} />
              <Route path="/code" element={<CodeHelp saveDoubt={saveDoubt} />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/history" element={<HistoryPage history={history} stats={stats} />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <footer className="border-t border-theme-border py-8 text-center text-sm text-theme-muted transition-colors">
            <p>© {new Date().getFullYear()} EDUVA – Simple. Smart. Student-Centric.</p>
          </footer>
        </div>
      </Router>
    </GamificationContext.Provider>
  );
};

export default App;
