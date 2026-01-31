
import React from 'react';

interface PreviewPaneProps {
  show: boolean;
  activeFeatures: string[];
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ show, activeFeatures }) => {
  return (
    <div className={`transition-all duration-500 border-l border-slate-800 bg-black relative flex-1 ${show ? '' : 'w-0 overflow-hidden'}`}>
      <div className="absolute top-0 left-0 w-full bg-slate-900 px-6 py-2.5 flex justify-between items-center z-50 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Environment Sandbox: thecajunmenu.site</span>
        </div>
        <div className="flex gap-4">
          <span className="text-[8px] font-bold text-slate-600 uppercase">Active Overlays: {activeFeatures.length}</span>
        </div>
      </div>
      
      <div className="relative w-full h-full pt-10">
        {/* Actual Site Iframe */}
        <iframe 
          src="https://thecajunmenu.site" 
          className="w-full h-full"
          title="Production Preview"
        />

        {/* Dynamic UI Overlays (Mockups) */}
        {activeFeatures.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 top-10 pointer-events-none flex flex-col items-center justify-center p-12 bg-slate-950/40 backdrop-blur-[2px]">
            <div className="max-w-4xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="bg-slate-900 border border-indigo-500/30 p-10 rounded-2xl shadow-2xl relative pointer-events-auto">
                <div className="absolute -top-3 left-8 px-4 py-1 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded">Feature Mockup Layer</div>
                
                <div className="space-y-12">
                  {activeFeatures.includes('gbp') && (
                    <div className="space-y-4">
                      <h4 className="text-white font-bold text-lg border-b border-slate-800 pb-2">Google Business Feedback Node</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                            <div className="flex text-amber-500 mb-2">★★★★★</div>
                            <p className="text-[10px] text-slate-400 font-medium">"Best Gumbo in the parish! The site ordering was so smooth."</p>
                            <p className="text-[9px] text-slate-600 font-bold mt-2 uppercase">- Verified Local</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeFeatures.includes('ai') && (
                    <div className="bg-indigo-900/20 p-6 rounded-xl border border-indigo-500/20 flex items-center gap-6">
                      <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl">👨‍🍳</div>
                      <div className="flex-1">
                        <h4 className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-1">Chef AI Recommendation</h4>
                        <p className="text-slate-300 text-xs font-medium">"It looks like you're ordering the Spicy Shrimp Po'Boy. I highly recommend our cooling Cajun Coleslaw on the side!"</p>
                        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Add to Bag (+$3.50)</button>
                      </div>
                    </div>
                  )}

                  {activeFeatures.includes('menu') && (
                    <div className="space-y-4">
                       <h4 className="text-white font-bold text-lg border-b border-slate-800 pb-2">Visual Ingredient Explorer</h4>
                       <div className="flex gap-4">
                          <div className="flex-1 bg-slate-950 p-6 rounded-xl border border-slate-800 flex gap-4">
                             <div className="w-20 h-20 bg-slate-800 rounded-lg"></div>
                             <div>
                                <h5 className="text-slate-200 font-bold text-xs uppercase">Seafood Gumbo</h5>
                                <p className="text-[10px] text-slate-500 mt-1">Click ingredients to see sourcing details.</p>
                                <div className="flex gap-2 mt-4">
                                   <span className="px-2 py-0.5 bg-green-900/30 text-green-400 text-[8px] font-bold rounded uppercase">Fresh Caught</span>
                                   <span className="px-2 py-0.5 bg-amber-900/30 text-amber-400 text-[8px] font-bold rounded uppercase">Organic Okra</span>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                  )}

                  {activeFeatures.includes('catering') && (
                    <div className="bg-slate-950 p-6 rounded-xl border border-indigo-500/30">
                       <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Corporate Event Portal</h4>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[8px] font-black text-slate-600 uppercase">Event Date</label>
                             <div className="h-10 bg-slate-900 border border-slate-800 rounded px-4 flex items-center text-slate-500 text-xs italic">Select Date...</div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[8px] font-black text-slate-600 uppercase">Headcount</label>
                             <div className="h-10 bg-slate-900 border border-slate-800 rounded px-4 flex items-center text-slate-500 text-xs italic">e.g. 50</div>
                          </div>
                       </div>
                    </div>
                  )}
                </div>

                <div className="mt-12 text-center text-slate-600 font-bold uppercase text-[9px] tracking-[0.3em]">
                  - End of Prototype Layer -
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPane;
