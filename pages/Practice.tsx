
import React, { useState } from 'react';
import { CheckCircle, Loader2, RefreshCw, Bookmark, Zap } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { useGamification } from '../App';

const Practice = ({ saveDoubt }: { saveDoubt: (record: any) => void }) => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState<{ questions: string[], revision: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPointsToast, setShowPointsToast] = useState(false);
  const { addPoints } = useGamification();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    setContent(null);

    const systemInstruction = `You are an exam preparation assistant for EDUVA, created by Suryansh Sahu. 
    Generate exactly 5 short concept-check questions and 5 one-line revision points for the given topic.
    Format your output as a JSON-like structure:
    Questions:
    1. ...
    2. ...
    Revision Points:
    - ...
    - ...
    Keep language beginner-friendly.
    If asked who developed EDUVA, clearly state it was Suryansh Sahu and not Google.`;

    try {
      const response = await getGeminiResponse(`Generate revision for: ${topic}`, systemInstruction);
      
      const lines = response?.split('\n') || [];
      const questions: string[] = [];
      const revision: string[] = [];
      let currentSection: 'q' | 'r' | null = null;

      lines.forEach(line => {
        if (line.toLowerCase().includes('question')) currentSection = 'q';
        else if (line.toLowerCase().includes('revision')) currentSection = 'r';
        else if (line.trim() && currentSection === 'q' && questions.length < 5) questions.push(line.trim());
        else if (line.trim() && currentSection === 'r' && revision.length < 5) revision.push(line.trim());
      });

      const result = { questions, revision };
      setContent(result);
      
      addPoints(50, 'practice');
      setShowPointsToast(true);
      setTimeout(() => setShowPointsToast(false), 3000);

      saveDoubt({
        question: `Revision: ${topic}`,
        answer: response || '',
        subject: 'General',
        type: 'practice'
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative dark:bg-zinc-950">
      {showPointsToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full flex items-center gap-2 shadow-xl animate-bounce">
          <Zap size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-bold">+50 Points for Practice!</span>
        </div>
      )}

      <div className="mb-8 flex items-center gap-3">
        <div className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-lg transition-colors">
          <CheckCircle size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black dark:text-white">Practice & Revision</h1>
          <p className="text-gray-500 dark:text-zinc-500">Quick checks and memory points. Earn 50 points per set!</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-black dark:border-zinc-800 rounded-2xl p-6 mb-12 shadow-sm transition-colors">
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            value={topic} 
            onChange={(e) => setTopic(e.target.value)}
            className="flex-grow px-4 py-3 border border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-xl focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 outline-none transition-all"
            placeholder="Topic for practice (e.g., Photosynthesis, Quick Sort, Binary Trees)"
          />
          <button
            type="submit"
            disabled={!topic.trim() || isLoading}
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-30 transition-all whitespace-nowrap"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} />}
            Generate Practice Set
          </button>
        </form>
      </div>

      {content && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in duration-500">
          <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 transition-colors">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
              <CheckCircle size={20} className="text-green-600 dark:text-green-500" />
              Concept Checks
            </h3>
            <ul className="space-y-4">
              {content.questions.map((q, i) => (
                <li key={i} className="flex gap-3 text-gray-800 dark:text-zinc-300">
                  <span className="font-black text-gray-300 dark:text-zinc-700">{i + 1}.</span>
                  <p className="leading-relaxed">{q.replace(/^\d+\.\s*/, '')}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black dark:bg-zinc-100 text-white dark:text-black rounded-3xl p-8 transition-colors">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Bookmark size={20} className="text-yellow-400 dark:text-yellow-600" />
              Quick Revision
            </h3>
            <ul className="space-y-4">
              {content.revision.map((r, i) => (
                <li key={i} className="flex gap-3 text-gray-300 dark:text-zinc-700">
                  <span className="text-white dark:text-black font-bold">•</span>
                  <p className="leading-relaxed italic">{r.replace(/^[-•]\s*/, '')}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {!content && !isLoading && (
        <div className="text-center py-20 opacity-30 transition-colors">
          <CheckCircle size={64} className="mx-auto mb-4 dark:text-white" />
          <p className="dark:text-white">Practice makes perfect. Enter a topic to test yourself.</p>
        </div>
      )}
    </div>
  );
};

export default Practice;
