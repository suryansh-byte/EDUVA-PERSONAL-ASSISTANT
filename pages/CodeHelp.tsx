
import React, { useState } from 'react';
import { Code, Loader2, AlertCircle, Terminal, HelpCircle, Zap } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { useGamification } from '../App';

const CodeHelp = ({ saveDoubt }: { saveDoubt: (record: any) => void }) => {
  const [code, setCode] = useState('');
  const [problem, setProblem] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPointsToast, setShowPointsToast] = useState(false);
  const { addPoints } = useGamification();

  const handleDebug = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || isLoading) return;

    setIsLoading(true);
    setAnalysis('');

    const systemInstruction = `You are a Senior Software Engineer and Tutor for EDUVA, which was developed by Suryansh Sahu. 
    Analyze the provided code carefully. 
    1. Identify errors (syntax or logical).
    2. Explain the logic line-by-line if requested.
    3. Suggest improvements for efficiency or readability.
    4. Provide the corrected code in a Markdown code block.
    Use clean, student-friendly language.
    If asked who created EDUVA, you MUST state that it was Suryansh Sahu and NOT Google.`;

    const prompt = `
    Problem Description: ${problem || 'Not provided'}
    Code:
    \`\`\`
    ${code}
    \`\`\`
    Please debug this and explain the improvements.
    `;

    try {
      const response = await getGeminiResponse(prompt, systemInstruction);
      setAnalysis(response || "No analysis generated.");
      
      addPoints(30, 'code');
      setShowPointsToast(true);
      setTimeout(() => setShowPointsToast(false), 3000);

      saveDoubt({
        question: `Debug Code: ${problem || 'Unnamed snippet'}`,
        answer: response,
        subject: 'Coding',
        type: 'code'
      });
    } catch (error) {
      setAnalysis("Error communicating with AI. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 relative dark:bg-zinc-950">
      {showPointsToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full flex items-center gap-2 shadow-xl animate-bounce">
          <Zap size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-bold">+30 Points for Code Debugging!</span>
        </div>
      )}

      <div className="mb-8 flex items-center gap-3">
        <div className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-lg transition-colors">
          <Code size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black dark:text-white">Code Help & Debugging</h1>
          <p className="text-gray-500 dark:text-zinc-500">Find errors and understand logic line-by-line. Earn 30 points.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-black dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
            <div className="bg-gray-50 dark:bg-zinc-800 px-4 py-2 border-b border-black dark:border-zinc-700 flex items-center gap-2">
              <Terminal size={14} className="dark:text-white" />
              <span className="text-xs font-bold uppercase tracking-widest dark:text-white">Code Editor</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 p-4 font-mono text-sm focus:outline-none resize-none bg-white dark:bg-zinc-900 text-black dark:text-zinc-200 transition-colors"
              placeholder="// Paste your code here..."
            />
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-black dark:border-zinc-800 rounded-2xl p-4 transition-colors">
            <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-zinc-500">
              <HelpCircle size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">What's wrong? (Optional)</span>
            </div>
            <input
              type="text"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full px-4 py-3 border border-gray-100 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-xl focus:outline-none focus:border-black dark:focus:border-white transition-all"
              placeholder="e.g., 'Getting Segment Fault', 'Logic not working'"
            />
          </div>

          <button
            onClick={handleDebug}
            disabled={!code.trim() || isLoading}
            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-30 transition-all"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <AlertCircle size={20} />}
            Analyze & Fix Code
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 min-h-[400px] transition-colors">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 size={48} className="animate-spin text-black dark:text-white" />
              <p className="text-gray-500 dark:text-zinc-400">EDUVA is reviewing your logic...</p>
            </div>
          ) : analysis ? (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-black prose-pre:text-white dark:prose-pre:bg-black dark:prose-pre:border dark:prose-pre:border-zinc-800">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Analysis & Fix</h3>
              <div className="whitespace-pre-wrap dark:text-zinc-300">
                {analysis}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 transition-colors">
              <Code size={48} className="dark:text-white" />
              <p className="max-w-xs dark:text-white">Analysis will appear here after you submit your code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeHelp;
