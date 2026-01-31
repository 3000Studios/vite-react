
import React, { useState } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '5555') {
      onUnlock();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Background Effects - Green with Purple Glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-900/40 via-purple-900/40 to-slate-900 z-0"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-green-600/20 blur-[100px] animate-pulse"></div>

      {/* Lock Card */}
      <div className="relative z-10 p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-gold-500/30">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Project Planner</h2>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Restricted Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Enter Access Code"
              className="w-full bg-slate-900/50 border border-slate-700 focus:border-gold-500 text-white text-center text-2xl tracking-[1em] py-4 rounded-xl outline-none transition-colors placeholder:text-slate-600 placeholder:tracking-normal placeholder:text-sm"
              maxLength={4}
            />
            {error && (
              <p className="text-red-500 text-xs text-center mt-2 font-bold uppercase tracking-wide animate-bounce">
                Incorrect Access Code
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 hover:from-gold-200 hover:via-gold-400 hover:to-gold-600 text-white font-black rounded-xl shadow-lg shadow-gold-500/40 border-t border-gold-300 transition-all transform hover:scale-[1.02] active:scale-[0.98] shine-btn uppercase tracking-widest text-sm"
          >
            Unlock Dashboard
          </button>
        </form>

        <div className="mt-8 text-center">
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
             The Cajun Menu Internal System
           </p>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
