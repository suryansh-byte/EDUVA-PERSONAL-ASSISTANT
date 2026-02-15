
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Database, Terminal, Calculator, Cpu, Globe, FlaskConical, Layout } from 'lucide-react';

const subjects = [
  { name: 'C Programming', icon: Code2, color: 'bg-blue-50 dark:bg-blue-900/20' },
  { name: 'Java', icon: Layout, color: 'bg-orange-50 dark:bg-orange-900/20' },
  { name: 'DBMS', icon: Database, color: 'bg-green-50 dark:bg-green-900/20' },
  { name: 'Operating Systems', icon: Terminal, color: 'bg-purple-50 dark:bg-purple-900/20' },
  { name: 'Mathematics', icon: Calculator, color: 'bg-red-50 dark:bg-red-900/20' },
  { name: 'Computer Networks', icon: Globe, color: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { name: 'Data Structures', icon: Cpu, color: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { name: 'Web Dev', icon: Layout, color: 'bg-pink-50 dark:bg-pink-900/20' },
];

const SubjectSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (subject: string) => {
    navigate(`/explanation?subject=${encodeURIComponent(subject)}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 dark:bg-zinc-950 transition-colors">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black mb-4 dark:text-white">Choose Your Subject</h1>
        <p className="text-gray-600 dark:text-zinc-400">Select a subject to explore topics and get deep explanations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((s) => (
          <button
            key={s.name}
            onClick={() => handleSelect(s.name)}
            className="group flex flex-col items-center p-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl hover:border-black dark:hover:border-white hover:shadow-xl transition-all"
          >
            <div className={`w-16 h-16 ${s.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <s.icon size={32} className="text-black dark:text-zinc-200" />
            </div>
            <h3 className="text-lg font-bold dark:text-white">{s.name}</h3>
            <p className="text-xs text-gray-400 dark:text-zinc-500 mt-2">Topic-wise learning</p>
          </button>
        ))}
      </div>
      
      <div className="mt-16 p-8 border border-dashed border-gray-300 dark:border-zinc-800 rounded-3xl text-center transition-colors">
        <h4 className="font-bold mb-2 dark:text-white">Can't find your subject?</h4>
        <p className="text-sm text-gray-500 dark:text-zinc-500 mb-4">You can still ask anything in the Chat page!</p>
        <button 
          onClick={() => navigate('/chat')}
          className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full text-sm hover:opacity-90 transition-all"
        >
          Go to Chat
        </button>
      </div>
    </div>
  );
};

export default SubjectSelection;
