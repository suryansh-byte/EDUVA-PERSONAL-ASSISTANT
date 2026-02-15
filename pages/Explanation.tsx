
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Loader2, BookOpen, Lightbulb, Zap } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { useGamification } from '../App';

const Explanation = ({ saveDoubt }: { saveDoubt: (record: any) => void }) => {
  const [searchParams] = useSearchParams();
  const subjectFromUrl = searchParams.get('subject') || '';
  const { addPoints } = useGamification();
  
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPointsToast, setShowPointsToast] = useState(false);

  const handleExplain = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    setExplanation('');

    const systemInstruction = `You are a professional academic instructor for EDUVA, which was created by Suryansh Sahu. 
    Explain the topic deeply for a student. 
    Include:
    1. Definition (Simple)
    2. Step-by-step working/logic
    3. Exam-oriented points
    4. A text-based diagram (if applicable) using ASCII or structured lines
    5. A real-world example.
    Use clear Markdown formatting.
    If asked who created EDUVA, always state that it was created by Suryansh Sahu and not Google.`;

    const prompt = `Explain the following topic in the context of ${subjectFromUrl || 'General Academic Studies'}: ${topic}`;

    try {
      const response = await getGeminiResponse(prompt, systemInstruction);
      setExplanation(response || "No explanation generated.");
      
      // Pass subject to track for badges like 'Math Whiz'
      addPoints(20, 'doubt', subjectFromUrl || 'General');
      setShowPointsToast(true);
      setTimeout(() => setShowPointsToast(false), 3000);

      saveDoubt({
        question: `Explain: ${topic} (${subjectFromUrl || 'General'})`,
        answer: response,
        subject: subjectFromUrl || 'General',
        type: 'explanation'
      });
    } catch (error) {
      setExplanation("Error fetching explanation. Please check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
      {showPointsToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 glass text-theme-text px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl animate-bounce border-none">
          <Zap size={20} className="text-yellow-400 fill-yellow-400" />
          <span className="font-black">Deep Learning Reward: +20 Points!</span>
        </div>
      )}

      <div className="mb-8 flex items-center gap-4">
        <div className="p-4 glass rounded-[1.5rem] text-theme-text shadow-sm">
          <BookOpen size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-theme-text tracking-tighter">Smart Explanation</h1>
          <p className="text-theme-muted font-medium">Earn points for every topic you master.</p>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-8 mb-10 shadow-lg border-theme-border transition-colors">
        <form onSubmit={handleExplain} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-grow">
              <label className="block text-[10px] font-black uppercase tracking-widest text-theme-muted mb-2 ml-1">Current Subject</label>
              <input 
                type="text" 
                value={subjectFromUrl} 
                disabled 
                className="w-full px-6 py-4 glass bg-theme-accent/5 border-theme-border rounded-[1.25rem] text-theme-muted font-bold"
                placeholder="None selected"
              />
            </div>
            <div className="flex-[2]">
              <label className="block text-[10px] font-black uppercase tracking-widest text-theme-muted mb-2 ml-1">Enter Topic Name</label>
              <input 
                type="text" 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-6 py-4 glass bg-transparent border-theme-border rounded-[1.25rem] text-theme-text font-medium focus:ring-4 focus:ring-theme-accent/5 outline-none transition-all"
                placeholder="e.g., Quick Sort, Calculus, photosynthesis"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!topic.trim() || isLoading}
            className="w-full py-5 bg-theme-accent text-theme-bg font-black rounded-[1.25rem] flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-30 transition-all shadow-xl hover:shadow-theme-accent/10"
          >
            {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
            Ask EDUVA to Explain
          </button>
        </form>
      </div>

      {explanation && (
        <div className="glass rounded-[2.5rem] p-10 animate-in fade-in slide-in-from-bottom-8 duration-500 shadow-2xl border-theme-border transition-all">
          <div className="flex items-center gap-3 mb-8 text-yellow-500">
            <Lightbulb size={32} className="fill-current" />
            <span className="font-black text-lg uppercase tracking-tight">AI Generated Explanation</span>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-theme-text leading-relaxed font-medium">
            {explanation}
          </div>
        </div>
      )}

      {!explanation && !isLoading && (
        <div className="text-center py-32 glass border-dashed border-2 border-theme-border rounded-[3rem] transition-colors">
          <div className="w-20 h-20 glass bg-theme-muted/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={40} className="text-theme-muted/30" />
          </div>
          <p className="text-theme-muted font-medium text-lg">Knowledge is the only asset that grows when shared.</p>
          <p className="text-sm text-theme-muted/50 mt-2">Choose a topic to begin your lesson.</p>
        </div>
      )}
    </div>
  );
};

export default Explanation;
