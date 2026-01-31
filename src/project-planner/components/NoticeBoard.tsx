
import React, { useState, useEffect, useRef } from 'react';
import { Notice, UserRole } from '../types';

interface NoticeBoardProps {
  notices: Notice[];
  currentUserRole: UserRole;
  onAddNotice: (content: string) => void;
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ notices, currentUserRole, onAddNotice }) => {
  const [newNotice, setNewNotice] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const mkSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setNewNotice(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNotice.trim()) {
      onAddNotice(newNotice);
      setNewNotice('');

      if (!mkSound.current) {
        mkSound.current = new Audio('https://www.myinstants.com/media/sounds/mk6-get-over-here.mp3');
      }
      mkSound.current.play().catch(() => {}); // Play sound
    }
  };

  const startVoice = () => {
    if (!isListening) {
      setIsListening(true);
      recognitionRef.current?.start();
    } else {
      recognitionRef.current?.stop();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-slate-800 rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
      <div className="p-4 bg-purple-700 text-white flex justify-between items-center">
        <h3 className="font-bold text-sm uppercase tracking-widest">Project Notices</h3>
        <span className="text-[10px] bg-purple-600 px-2 py-1 rounded-full uppercase tracking-wider font-black">Live</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
        {notices.length === 0 ? (
          <p className="text-slate-600 text-center italic mt-10 text-xs font-black uppercase tracking-widest">No communication yet</p>
        ) : (
          notices.map((notice) => (
            <div key={notice.id} className={`flex flex-col ${notice.role === currentUserRole ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                notice.role === 'Developer' 
                  ? 'bg-green-900/40 text-green-100 border border-green-800 rounded-tr-none' 
                  : 'bg-purple-900/40 text-purple-100 border border-purple-800 rounded-tl-none'
              }`}>
                <div className="flex justify-between items-center gap-4 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-tight opacity-50">
                    {notice.author}
                  </span>
                  <span className="text-[9px] opacity-40">
                    {notice.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed font-medium">{notice.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700 bg-slate-800 flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={newNotice}
              onChange={(e) => setNewNotice(e.target.value)}
              placeholder="Write a project note..."
              className="w-full px-4 pr-10 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-900 text-sm font-medium"
            />
            <button 
              type="button"
              onClick={startVoice}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-500 hover:text-purple-400'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 013 3v5a3 3 0 01-3 3 3 3 0 01-3-3V6a3 3 0 013-3z" /></svg>
            </button>
          </div>
          <button 
            type="submit"
            className="bg-purple-600 text-white px-5 rounded-xl font-black hover:bg-purple-700 transition-all shadow-xl shine-btn text-xs uppercase"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeBoard;
