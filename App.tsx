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
  Zap
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
import { DoubtRecord, UserStats, Badge } from './types';

interface GamificationContextType {
  stats: UserStats;
  addPoints: (amount: number, category: 'doubt' | 'practice' | 'code') => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) throw new Error('useGamification must be used within provider');
  return context;
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
    <nav className="bg-white border-b border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter">EDUVA</span>
              <div className="h-5 w-px bg-gray-300 mx-2 hidden sm:block"></div>
              <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold">{stats.points} pts</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium flex items-center gap-2 transition-colors ${
                  activePath === item.path 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
             <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                <Zap size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-[10px] font-bold">{stats.points}</span>
              </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-black hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium flex items-center gap-3 ${
                  activePath === item.path ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'
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
  { id: '4', name: 'dedicated', icon: '🔥', description: 'Completed 5 practice sets', unlocked: false, criteria: 'practice_5' },
];

const App = () => {
  const [history, setHistory] = useState<DoubtRecord[]>([]);
  const [stats, setStats] = useState<UserStats>({
    points: 0,
    level: 1,
    badges: INITIAL_BADGES,
    doubtCount: 0,
    practiceCount: 0,
    codeCount: 0
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem('eduva_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    
    const savedStats = localStorage.getItem('eduva_stats');
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  useEffect(() => {
    localStorage.setItem('eduva_stats', JSON.stringify(stats));
  }, [stats]);

  const addPoints = (amount: number, category: 'doubt' | 'practice' | 'code') => {
    setStats(prev => {
      const newPoints = prev.points + amount;
      const newLevel = Math.floor(newPoints / 500) + 1;
      
      let newDoubtCount = prev.doubtCount;
      let newPracticeCount = prev.practiceCount;
      let newCodeCount = prev.codeCount;

      if (category === 'doubt') newDoubtCount++;
      if (category === 'practice') newPracticeCount++;
      if (category === 'code') newCodeCount++;

      const newBadges = prev.badges.map(badge => {
        if (badge.unlocked) return badge;
        if (badge.criteria === 'doubt_5' && newDoubtCount >= 5) return { ...badge, unlocked: true };
        if (badge.criteria === 'code_3' && newCodeCount >= 3) return { ...badge, unlocked: true };
        if (badge.criteria === 'practice_5' && newPracticeCount >= 5) return { ...badge, unlocked: true };
        return badge;
      });

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        doubtCount: newDoubtCount,
        practiceCount: newPracticeCount,
        codeCount: newCodeCount,
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
    <GamificationContext.Provider value={{ stats, addPoints }}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
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
          <footer className="border-t border-gray-100 py-8 bg-white text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} EDUVA – Simple. Smart. Student-Centric.</p>
          </footer>
        </div>
      </Router>
    </GamificationContext.Provider>
  );
};

export default App;
