
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Zap, Camera, X } from 'lucide-react';
import { startStudyChat, getGeminiVisionResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useGamification } from '../App';

const Chat = ({ saveDoubt }: { saveDoubt: (record: any) => void }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPointsToast, setShowPointsToast] = useState(false);
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addPoints } = useGamification();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (err) {
      setCameraError("Could not access camera. Check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL('image/jpeg'));
        stopCamera();
      }
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !capturedImage) || isLoading) return;

    const userMsg = input.trim();
    const currentImage = capturedImage;
    
    setInput('');
    setCapturedImage(null);
    
    setMessages(prev => [
      ...prev, 
      { role: 'user', content: currentImage ? `[IMAGE SENT] ${userMsg}` : userMsg }
    ]);
    setIsLoading(true);

    try {
      let responseText = "";
      if (currentImage) {
        responseText = await getGeminiVisionResponse(userMsg, currentImage.split(',')[1], 'image/jpeg');
      } else {
        const chat = startStudyChat(
          "You are EDUVA, an academic tutor by Suryansh Sahu. Be clear, step-by-step, and simple. State you were created by Suryansh Sahu if asked."
        );
        const result = await chat.sendMessage({ message: userMsg });
        responseText = result.text || "I couldn't generate a response.";
      }
      
      setMessages(prev => [...prev, { role: 'model', content: responseText }]);
      addPoints(currentImage ? 25 : 10, 'doubt');
      setShowPointsToast(true);
      setTimeout(() => setShowPointsToast(false), 3000);

      saveDoubt({
        question: currentImage ? `Photo Doubt: ${userMsg}` : userMsg,
        answer: responseText,
        subject: 'General',
        type: 'chat'
      });
      
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Error analyzing doubt. Try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-64px)] flex flex-col relative bg-transparent">
      {showPointsToast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 glass text-theme-text px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl animate-bounce">
          <Zap size={20} className="text-yellow-400 fill-yellow-400" />
          <span className="font-black">Earned Points!</span>
        </div>
      )}

      {/* Camera UI */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-[60] glass flex flex-col items-center justify-center p-6">
          <button onClick={stopCamera} className="absolute top-8 right-8 text-theme-text p-3 glass rounded-full hover:bg-red-500 transition-colors">
            <X size={32} />
          </button>
          <div className="relative w-full max-w-2xl aspect-video glass rounded-[3rem] overflow-hidden border-4 border-theme-accent/20 shadow-2xl">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          </div>
          <button onClick={capturePhoto} className="mt-12 w-24 h-24 glass rounded-full border-8 border-theme-accent flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
            <div className="w-16 h-16 bg-theme-accent rounded-full"></div>
          </button>
        </div>
      )}

      <div className="p-6 glass border-b border-theme-border flex items-center justify-between sticky top-0 z-10">
        <div>
          <h2 className="text-2xl font-black text-theme-text">Study Assistant</h2>
          <p className="text-sm text-theme-muted font-medium">Text or Photo doubt clearing</p>
        </div>
        {cameraError && <div className="text-xs text-red-500 glass px-4 py-2 rounded-full font-bold">{cameraError}</div>}
      </div>

      <div className="flex-grow overflow-y-auto p-6 space-y-8 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <Bot size={64} className="mb-6 text-theme-text" />
            <h3 className="text-xl font-black mb-2">I'm EDUVA</h3>
            <p className="max-w-xs font-medium">How can I help you learn today? Send a photo or type your doubt below.</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] glass rounded-3xl p-6 shadow-sm flex gap-4 ${
              msg.role === 'user' 
                ? 'bg-theme-accent text-theme-bg rounded-tr-none border-transparent' 
                : 'rounded-tl-none'
            }`}>
              <div className="flex-shrink-0">
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`prose prose-sm max-w-none whitespace-pre-wrap leading-relaxed ${msg.role === 'user' ? 'text-theme-bg' : 'text-theme-text'}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="glass rounded-3xl rounded-tl-none p-5 flex items-center gap-4 animate-pulse">
              <Loader2 size={20} className="animate-spin text-theme-muted" />
              <span className="text-sm font-black text-theme-muted">Analyzing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 glass border-t border-theme-border mt-auto">
        {capturedImage && (
          <div className="mb-6 relative w-40 h-40 animate-in zoom-in duration-300">
            <img src={capturedImage} className="w-full h-full object-cover rounded-[2rem] border-4 border-theme-accent shadow-2xl" />
            <button onClick={() => setCapturedImage(null)} className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
              <X size={16} />
            </button>
          </div>
        )}
        
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-4 items-center">
          <div className="relative flex-grow glass rounded-[2rem] overflow-hidden focus-within:ring-4 focus-within:ring-theme-accent/10 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={capturedImage ? "Explain this photo..." : "Type your academic doubt here..."}
              className="w-full pl-6 pr-14 py-5 bg-transparent text-theme-text font-medium focus:outline-none"
              disabled={isLoading}
            />
            <button type="button" onClick={startCamera} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-theme-muted hover:text-theme-accent transition-colors">
              <Camera size={24} />
            </button>
          </div>
          
          <button
            type="submit"
            disabled={(!input.trim() && !capturedImage) || isLoading}
            className="p-5 bg-theme-accent text-theme-bg rounded-full shadow-xl hover:opacity-90 active:scale-90 disabled:opacity-30 transition-all"
          >
            <Send size={28} />
          </button>
        </form>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Chat;
