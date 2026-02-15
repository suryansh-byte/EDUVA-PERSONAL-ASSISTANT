
import React from 'react';
import { Target, Shield, Zap, Sparkles, MessageCircle, User, GraduationCap, Lightbulb } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 dark:bg-zinc-950 transition-colors">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-6 dark:text-white">About EDUVA</h1>
        <p className="text-xl text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          The main objective of EDUVA is to provide students with an intelligent, 
          interactive, and instant doubt-clearing system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-white">
            <Target size={24} className="text-black dark:text-white" />
            Project Objective
          </h2>
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed mb-4">
            It helps learners understand concepts clearly, solve coding problems, revise topics efficiently, and improve academic performance without hesitation or fear of asking questions.
          </p>
          <ul className="space-y-3 text-gray-700 dark:text-zinc-400">
            <li className="flex items-start gap-2">
              <Zap size={18} className="mt-1 flex-shrink-0 text-yellow-500" />
              <span>Instant clarification of complex academic doubts.</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap size={18} className="mt-1 flex-shrink-0 text-yellow-500" />
              <span>Personalized tutoring experience 24/7.</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap size={18} className="mt-1 flex-shrink-0 text-yellow-500" />
              <span>Distraction-free, reading-focused interface.</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-white">
            <Shield size={24} className="text-black dark:text-white" />
            Problem Statement
          </h2>
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
            Many students hesitate to ask doubts in class or fail to understand topics properly 
            due to lack of personalized guidance. Existing learning platforms are complex, 
            time-consuming, or expensive. EDUVA solves this by acting as a personal AI tutor 
            that explains concepts clearly and instantly.
          </p>
        </div>
      </div>

      <div className="bg-black dark:bg-white text-white dark:text-black rounded-3xl p-12 mb-20 transition-colors">
        <h2 className="text-3xl font-bold mb-8 text-center">Advantages of EDUVA</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            "Instant responses to any query",
            "No hesitation or fear of judgment",
            "Improves conceptual clarity",
            "Saves study and research time",
            "Available anytime, anywhere",
            "Student-friendly minimal design"
          ].map((adv, i) => (
            <div key={i} className="flex items-center gap-3">
              <Sparkles size={20} className="text-yellow-400 dark:text-yellow-600" />
              <span className="text-lg">{adv}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-black dark:border-zinc-800 pt-16 mb-20 transition-colors">
        <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">How to use EDUVA effectively?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 border border-gray-100 dark:border-zinc-900 rounded-2xl transition-colors">
            <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 font-black dark:text-white">1</div>
            <h4 className="font-bold mb-2 dark:text-white">Be Specific</h4>
            <p className="text-sm text-gray-500 dark:text-zinc-500">Instead of 'explain math', try 'explain integration by parts with 2 examples'.</p>
          </div>
          <div className="text-center p-6 border border-gray-100 dark:border-zinc-900 rounded-2xl transition-colors">
            <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 font-black dark:text-white">2</div>
            <h4 className="font-bold mb-2 dark:text-white">Follow Up</h4>
            <p className="text-sm text-gray-500 dark:text-zinc-500">Don't understand a step? Use the Chat page to ask 'can you explain step 2 further?'.</p>
          </div>
          <div className="text-center p-6 border border-gray-100 dark:border-zinc-900 rounded-2xl transition-colors">
            <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 font-black dark:text-white">3</div>
            <h4 className="font-bold mb-2 dark:text-white">Save History</h4>
            <p className="text-sm text-gray-500 dark:text-zinc-500">History is automatically saved. Re-visit it before exams for quick revision.</p>
          </div>
        </div>
      </div>

      {/* About the Developer Section */}
      <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-[2.5rem] p-10 mb-20 border border-gray-100 dark:border-zinc-900 transition-colors">
        <h2 className="text-3xl font-black mb-10 flex items-center gap-3 dark:text-white">
          <User size={32} className="text-black dark:text-white" />
          About the Developer
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold dark:text-white">Suryansh Sahu</h3>
                <p className="text-gray-500 dark:text-zinc-500">Creator & Designer of EDUVA</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-black dark:text-white rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors">
                <GraduationCap size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 dark:text-zinc-600 mb-1">Academic Background</h4>
                <p className="text-gray-700 dark:text-zinc-300">
                  Suryansh is a student of <span className="font-bold text-black dark:text-white">Computer Science and Engineering (CSE) from KIIT University</span>. 
                  He is currently pursuing his undergraduate studies with a strong interest in software development, 
                  artificial intelligence, and problem-solving technologies.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-black dark:text-white rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors">
                <Shield size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 dark:text-zinc-600 mb-1">Role in the Project</h4>
                <p className="text-gray-700 dark:text-zinc-300">
                  Suryansh Sahu is the <span className="font-bold text-black dark:text-white">sole developer and designer</span> of the AI-based study assistant EDUVA. 
                  He conceptualized the idea, designed the system structure, and developed the content with a 
                  focus on student-friendly learning.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-black dark:text-white rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 dark:text-zinc-600 mb-1">Developer’s Vision</h4>
                <p className="text-gray-700 dark:text-zinc-300 italic">
                  "My aim is to create intelligent learning solutions that simplify education, 
                  remove hesitation in learning, and help students grow academically with confidence."
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end items-start">
            <div className="relative group">
              <div className="absolute -inset-4 bg-black/10 dark:bg-white/10 rounded-3xl blur-xl group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-all"></div>
              <div className="relative border-8 border-white dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm aspect-[3/4]">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                  alt="Suryansh Sahu - Developer of EDUVA" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-4 text-white text-center">
                  <p className="text-sm font-bold uppercase tracking-widest">Suryansh Sahu</p>
                  <p className="text-[10px] opacity-70">KIIT University, CSE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-2 p-4 bg-gray-50 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 rounded-2xl transition-colors">
          <MessageCircle size={20} className="dark:text-zinc-400" />
          <span className="font-medium text-gray-700 dark:text-zinc-400">Have feedback? Contact us at <span className="font-bold dark:text-zinc-200">support@eduva.ai</span></span>
        </div>
      </div>
    </div>
  );
};

export default About;
