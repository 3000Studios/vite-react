
import React from 'react';
import { ShoppingItem } from '../types';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onApproveSelected: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ items, onToggleItem, onApproveSelected }) => {
  const selectedCount = items.filter(i => i.isChecked).length;

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-full max-h-[660px]">
      <div className="p-6 bg-indigo-900 text-white">
        <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Strategic Upgrade Catalog
        </h3>
        <p className="text-indigo-400 text-[9px] font-black mt-1 uppercase tracking-widest opacity-80">Roadmap Modules for thecajunmenu.site</p>
      </div>

      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">
          Select modules to preview UI overlays
        </p>
        <span className="text-[8px] font-black bg-slate-900 px-2 py-0.5 rounded text-indigo-500 uppercase tracking-widest border border-slate-800">{items.length} Modules</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/20">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`flex items-start gap-4 p-5 rounded-lg border transition-all cursor-pointer group ${item.isChecked ? 'bg-indigo-950/20 border-indigo-900/60' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
            onClick={() => onToggleItem(item.id)}
          >
            <div className={`mt-0.5 w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors ${item.isChecked ? 'bg-indigo-600 border-indigo-600' : 'bg-slate-950 border-slate-800 group-hover:border-slate-600'}`}>
              {item.isChecked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-slate-200 text-[11px] uppercase tracking-wider">{item.title}</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed mb-4">{item.description}</p>
              
              <div className="space-y-2 pt-3 border-t border-slate-800/50">
                <div className="flex items-start gap-2">
                  <span className="text-[7px] font-black uppercase text-slate-700 tracking-widest mt-0.5">Impact</span>
                  <p className="text-[9px] text-slate-400 leading-tight font-medium">{item.benefit}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[7px] font-black uppercase text-slate-700 tracking-widest">Build</span>
                  <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">{item.effort}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-900 border-t border-slate-800">
        <button 
          onClick={onApproveSelected}
          disabled={selectedCount === 0}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold rounded text-[10px] uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95"
        >
          Authorize Selected Roadmaps ({selectedCount})
        </button>
      </div>
    </div>
  );
};

export default ShoppingList;
