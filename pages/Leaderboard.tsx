
import React from 'react';
/* Added missing MessageSquare, CheckCircle, and Code icons to the import list */
import { Trophy, Medal, Star, User, Zap, ChevronRight, MessageSquare, CheckCircle, Code } from 'lucide-react';
import { useGamification } from '../App';

const Leaderboard = () => {
  const { stats } = useGamification();

  // Mock data for "Classmates" - In a real app, this would come from a backend.
  const classmates = [
    { name: 'Alex Johnson', points: 2450, level: 5, avatar: 'A', isMe: false },
    { name: 'Priya Sharma', points: 2100, level: 5, avatar: 'P', isMe: false },
    { name: 'David Chen', points: 1850, level: 4, avatar: 'D', isMe: false },
    { name: 'Sarah Miller', points: 1520, level: 4, avatar: 'S', isMe: false },
  ];

  // Insert current user into the list and sort
  const allUsers = [...classmates, { name: 'You (EDUVA User)', points: stats.points, level: stats.level, avatar: 'U', isMe: true }]
    .sort((a, b) => b.points - a.points);

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-theme-accent opacity-5 blur-[120px] pointer-events-none"></div>
        <div className="inline-flex items-center justify-center p-6 glass rounded-[2.5rem] mb-8 shadow-xl">
          <Trophy size={64} className="text-yellow-500 animate-pulse" />
        </div>
        <h1 className="text-6xl font-black mb-4 text-theme-text tracking-tighter">Study Leaderboard</h1>
        <p className="text-xl text-theme-muted font-medium">Track your growth compared to top EDUVA learners.</p>
      </div>

      <div className="glass rounded-[3.5rem] overflow-hidden shadow-2xl border-none transition-all">
        <div className="bg-theme-accent text-theme-bg p-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Medal size={32} className="text-white fill-white/20" />
            <h2 className="text-3xl font-black">Global Rankings</h2>
          </div>
          <div className="text-xs font-black uppercase tracking-[0.2em] opacity-50">Live Stats</div>
        </div>

        <div className="p-6 sm:p-12 space-y-6">
          {allUsers.map((user, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-8 rounded-[2rem] transition-all relative overflow-hidden group ${
                user.isMe 
                  ? 'bg-theme-accent text-theme-bg scale-105 shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-10' 
                  : 'glass hover:bg-theme-accent/5 hover:translate-x-2'
              }`}
            >
              <div className="flex items-center gap-8">
                <span className={`text-4xl font-black w-12 text-center transition-colors ${
                  user.isMe ? 'text-white' :
                  index === 0 ? 'text-yellow-500' : 
                  index === 1 ? 'text-theme-muted' : 
                  index === 2 ? 'text-orange-500' : 'text-theme-muted/30'
                }`}>
                  {index + 1}
                </span>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner transition-all ${
                  user.isMe ? 'bg-white/20 text-white' : 'glass bg-theme-accent/5 text-theme-text group-hover:bg-theme-accent group-hover:text-theme-bg'
                }`}>
                  {user.avatar}
                </div>
                <div>
                  <h3 className="font-black text-2xl tracking-tight">{user.name}</h3>
                  <div className={`flex items-center gap-2 mt-1 text-sm font-bold opacity-70 uppercase tracking-widest`}>
                    Level {user.level} Tutor
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Star size={20} className={user.isMe ? 'text-white fill-white' : 'text-yellow-500 fill-yellow-500'} />
                    <span className="text-3xl font-black tracking-tighter">{user.points.toLocaleString()}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Total Points</span>
                </div>
                {!user.isMe && <ChevronRight size={20} className="text-theme-muted/30 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 glass p-12 rounded-[3rem] border-dashed border-2 border-theme-border text-center">
        <h3 className="text-2xl font-black mb-8 text-theme-text tracking-tight">Earn points & climb the ranks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="p-8 glass bg-theme-accent/5 rounded-[2rem] hover:bg-theme-accent hover:text-theme-bg transition-all group shadow-sm">
            <MessageSquare size={32} className="mx-auto mb-4 text-theme-accent group-hover:text-theme-bg transition-colors" />
            <h4 className="text-xs font-black uppercase tracking-widest opacity-50 mb-1">Doubt Queries</h4>
            <p className="text-4xl font-black tracking-tighter">+10 <span className="text-xs font-bold uppercase tracking-widest">pts</span></p>
          </div>
          <div className="p-8 glass bg-theme-accent/5 rounded-[2rem] hover:bg-theme-accent hover:text-theme-bg transition-all group shadow-sm">
            <CheckCircle size={32} className="mx-auto mb-4 text-theme-accent group-hover:text-theme-bg transition-colors" />
            <h4 className="text-xs font-black uppercase tracking-widest opacity-50 mb-1">Practice Sets</h4>
            <p className="text-4xl font-black tracking-tighter">+50 <span className="text-xs font-bold uppercase tracking-widest">pts</span></p>
          </div>
          <div className="p-8 glass bg-theme-accent/5 rounded-[2rem] hover:bg-theme-accent hover:text-theme-bg transition-all group shadow-sm">
            <Code size={32} className="mx-auto mb-4 text-theme-accent group-hover:text-theme-bg transition-colors" />
            <h4 className="text-xs font-black uppercase tracking-widest opacity-50 mb-1">Code Debug</h4>
            <p className="text-4xl font-black tracking-tighter">+30 <span className="text-xs font-bold uppercase tracking-widest">pts</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
