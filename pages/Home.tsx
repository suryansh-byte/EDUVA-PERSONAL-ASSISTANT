
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Cpu, Search, Star } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-8 glass rounded-[2.5rem] hover:border-theme-accent transition-all group hover:translate-y-[-4px] shadow-sm hover:shadow-xl">
    <div className="w-14 h-14 glass-dark bg-theme-accent text-theme-bg rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-black mb-3 text-theme-text">{title}</h3>
    <p className="text-theme-muted leading-relaxed font-medium">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-theme-accent opacity-5 blur-[100px] pointer-events-none"></div>
        <h1 className="text-7xl sm:text-8xl font-black tracking-tighter mb-8 text-theme-text animate-in fade-in slide-in-from-bottom-8 duration-700">
          Learn <span className="underline decoration-8 decoration-theme-accent/30">Better</span>.
        </h1>
        <p className="text-xl sm:text-2xl text-theme-muted max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
          EDUVA is your personal AI study companion. Instant doubts clearing, deep conceptual explanations, and intelligent practice.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/chat"
            className="w-full sm:w-auto px-10 py-5 bg-theme-accent text-theme-bg text-xl font-black rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl hover:shadow-theme-accent/20 active:scale-95"
          >
            Ask Your Doubt <ArrowRight size={24} />
          </Link>
          <Link
            to="/subjects"
            className="w-full sm:w-auto px-10 py-5 glass text-theme-text text-xl font-black rounded-full hover:bg-theme-accent hover:text-theme-bg transition-all shadow-lg active:scale-95"
          >
            Explore Subjects
          </Link>
        </div>
      </div>

      {/* Problems Solved */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
        <FeatureCard 
          icon={Search}
          title="Instant Clarity"
          description="Stuck on a tricky problem? Get human-like explanations and clear your doubts in seconds."
        />
        <FeatureCard 
          icon={BookOpen}
          title="Deep Learning"
          description="We go beyond basic answers, providing step-by-step logic and real-world examples for every topic."
        />
        <FeatureCard 
          icon={Cpu}
          title="Smart Debug"
          description="Identify coding errors and logic flaws instantly. Perfect for C, Java, and Python learners."
        />
      </div>

      {/* Glassy CTA Section */}
      <div className="glass rounded-[3rem] p-16 text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Star size={120} className="text-theme-accent" />
        </div>
        <h2 className="text-4xl font-black mb-8 text-theme-text">Ready to transform your study routine?</h2>
        <p className="text-theme-muted mb-12 max-w-2xl mx-auto font-medium text-lg">
          No more fear of asking questions. EDUVA is here 24/7 to help you master any subject with ease and confidence.
        </p>
        <Link
          to="/about"
          className="inline-flex items-center gap-3 text-theme-accent bg-theme-accent/10 px-8 py-4 rounded-2xl font-black hover:bg-theme-accent hover:text-theme-bg transition-all shadow-sm"
        >
          Discover EDUVA Vision <Star size={20} className="fill-current" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
