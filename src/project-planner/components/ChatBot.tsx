
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAssistant } from '../services/geminiService';
import { ProjectTask, ShoppingItem } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: { title?: string; uri: string }[];
}

interface ChatBotProps {
  currentTasks: ProjectTask[];
  catalog: ShoppingItem[];
}

const ChatBot: React.FC<ChatBotProps> = ({ currentTasks, catalog }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'model',
      text: "Terminal Secure. I am the Cajun Menu Intelligence Terminal. I have visibility over your operational backlog and strategic roadmap. I am prepared to provide data-driven market insights, competitive analysis, and technical ROI evaluations. How shall we proceed?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { id: generateId(), role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role === 'model' ? 'model' : 'user', parts: [{ text: m.text }] }));
    
    // Enriching context with deep operational and competitive focus
    const contextPrompt = `
    ADMIN CONTEXT:
    Site Domain: thecajunmenu.site
    Active Tasks: ${currentTasks.length}
    Available Modules: ${catalog.length}
    
    BACKLOG INVENTORY: ${currentTasks.map(t => t.title).join(', ')}
    
    DIRECTIVE: Provide a response based on restaurant industry benchmarks, digital marketing trends, and Cajun market intelligence. Use search grounding for any specific competitor or data-driven queries.
    
    QUERY: ${userMsg}`;

    const result = await chatWithAssistant(contextPrompt, history);
    
    setMessages(prev => [...prev, { id: generateId(), role: 'model', text: result.text, sources: result.sources }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-slate-900 rounded-lg border border-slate-800 shadow-2xl overflow-hidden">
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-sm font-black text-white">AI</div>
          <div>
            <h3 className="font-bold text-[10px] text-white uppercase tracking-widest leading-none mb-1">Intelligence Terminal</h3>
            <p className="text-[7px] font-bold text-indigo-500 uppercase tracking-widest">Market Intelligence v3.1</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/20">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-lg text-[11px] shadow-md leading-relaxed ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-900 text-slate-300 border border-slate-800 rounded-tl-none font-medium'
            }`}>
              {m.text}
              
              {m.sources && m.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-2">Market Sources & Grounding:</p>
                  <ul className="space-y-1.5">
                    {m.sources.map((source, idx) => (
                      <li key={idx}>
                        <a 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[9px] text-indigo-400 hover:text-indigo-300 transition-colors truncate block"
                        >
                          &bull; {source.title || source.uri}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex gap-1.5 p-4 bg-slate-900 rounded border border-slate-800">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Analyze market, ROI, or technical SOW..."
          className="flex-1 px-4 py-2.5 rounded bg-slate-950 border border-slate-800 focus:border-indigo-600 outline-none text-[11px] font-medium transition-all"
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded transition-all active:scale-95 disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
