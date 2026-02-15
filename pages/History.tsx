
import React from 'react';
import { History as HistoryIcon, Clock, ChevronRight, FileText, Code, CheckCircle, MessageSquare, Award, Star, Sparkles } from 'lucide-react';
import { DoubtRecord, UserStats, Badge } from '../types';

const TypeIcon = ({ type }: { type: DoubtRecord['type'] }) => {
  switch(type) {
    case 'chat': return <MessageSquare size={16} />;
    case 'code': return <Code size={16} />;
    case 'practice': return <CheckCircle size={16} />;
    case 'explanation': return <FileText size={16} />;
    default: return <FileText size={16} />;
  }
};

const BadgeCard = ({ badge }: { badge: Badge }) => {
  return (
    <div className={`relative group p-6 glass rounded-3xl transition-all duration-500 ${badge.unlocked ? 'badge-pop border-theme-accent/30 shadow-xl' : 'opacity-40 grayscale blur-[0.5px]'}`}>
      {badge.unlocked && (
        <div className="absolute -top-2 -right-2 bg-theme-accent text-theme-bg p-1.5 rounded-full z-10 shadow-lg">
          <Sparkles size={12} className="fill-current" />
        </div>
      )}
      
      <div className={`w-20 h-20 mx-auto flex items-center justify-center text-4xl mb-4 rounded-2xl transition-all duration-700 ${badge.unlocked ? 'bg-theme-accent/10 badge-glow' : 'bg-gray-100 dark:bg-zinc-800'}`}>
        {badge.icon}
      </div>
      
      <div className="text-center">
        <h4 className={`font-black text-lg ${badge.unlocked ? 'text-theme-text' : 'text-theme-muted'}`}>
          {badge.name}
        </h4>
        <p className="text-[10px] font-bold text-theme-muted uppercase tracking-widest mt-1">
          {badge.unlocked ? 'Unlocked Achievement' : 'Locked achievement'}
        </p>
        <p className="text-xs text-theme-muted mt-3 line-clamp-2 italic font-medium">
          {badge.description}
        </p>
      </div>
    </div>
  );
};

const HistoryPage = ({ history, stats }: { history: DoubtRecord[], stats: UserStats }) => {
  const unlockedBadges = stats.badges.filter(b => b.unlocked);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="glass bg-theme-accent text-theme-bg p-8 rounded-[2.5rem] shadow-xl transition-all border-transparent">
          <span className="text-xs font-black uppercase tracking-widest opacity-60">Study Level</span>
          <h2 className="text-5xl font-black mt-2">Lvl {stats.level}</h2>
          <div className="mt-6 h-3 w-full bg-white/20 rounded-full overflow-hidden border border-white/10">
            <div className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-1000" style={{ width: `${(stats.points % 500) / 5}%` }}></div>
          </div>
          <p className="text-[10px] font-bold mt-3 opacity-60">PROGRESS TO NEXT LEVEL</p>
        </div>
        
        <div className="glass p-8 rounded-[2.5rem] shadow-lg flex flex-col justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-theme-muted">Achievements</span>
          <div className="flex items-end gap-3 mt-4">
            <h2 className="text-5xl font-black text-theme-text">{unlockedBadges.length}</h2>
            <Award className="text-yellow-500 mb-1" size={32} />
          </div>
          <p className="text-xs font-bold text-theme-muted mt-4">UNLOCKED BADGES</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] shadow-lg flex flex-col justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-theme-muted">Total Points</span>
          <div className="flex items-end gap-3 mt-4">
            <h2 className="text-5xl font-black text-theme-text">{stats.points.toLocaleString()}</h2>
            <Star className="text-yellow-500 fill-yellow-500 mb-1" size={32} />
          </div>
          <p className="text-xs font-bold text-theme-muted mt-4">LIFETIME KNOWLEDGE POINTS</p>
        </div>
      </div>

      {/* Badges Section */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 glass rounded-2xl text-theme-text">
            <Award size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-theme-text tracking-tight">Your Achievements</h2>
            <p className="text-sm text-theme-muted font-medium">Badges you've earned through your learning journey.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="mb-12 flex items-center gap-4">
        <div className="p-4 glass rounded-3xl text-theme-text">
          <HistoryIcon size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-theme-text">Your Learning History</h1>
          <p className="text-theme-muted font-medium italic">Re-visiting doubts strengthens memory.</p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-32 glass rounded-[3rem] border-dashed border-2 border-theme-border">
          <Clock size={80} className="mx-auto mb-6 text-theme-muted/20" />
          <h3 className="text-2xl font-black text-theme-text mb-2">Clean Slate!</h3>
          <p className="text-theme-muted font-medium">Ask your first doubt to start your journey.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((item) => (
            <details key={item.id} className="group glass rounded-3xl hover:border-theme-accent/50 transition-all overflow-hidden shadow-sm">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl glass-dark bg-theme-accent/10 text-theme-text flex items-center justify-center">
                    <TypeIcon type={item.type} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl line-clamp-1 text-theme-text">{item.question}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-theme-accent text-theme-bg rounded-full">
                        {item.subject}
                      </span>
                      <span className="text-[10px] font-bold text-theme-muted flex items-center gap-1.5 uppercase">
                        <Clock size={12} />
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={24} className="text-theme-muted group-open:rotate-90 transition-transform" />
              </summary>
              <div className="p-8 pt-0 animate-in slide-in-from-top-4 duration-300">
                <div className="glass-dark bg-theme-accent/5 p-8 rounded-[2rem] border border-theme-border/50">
                  <div className="prose prose-sm dark:prose-invert max-w-none text-theme-text whitespace-pre-wrap leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
