
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { ProjectTask } from '../types';

interface ProjectTrackerProps {
  tasks: ProjectTask[];
}

const ProjectTracker: React.FC<ProjectTrackerProps> = ({ tasks }) => {
  const financialData = [
    { 
      name: 'Cost ($)', 
      Estimated: tasks.reduce((acc, t) => acc + t.estimatedCost, 0),
      Actual: tasks.reduce((acc, t) => acc + t.actualCost, 0)
    },
    { 
      name: 'Time (Hrs)', 
      Estimated: tasks.reduce((acc, t) => acc + t.estimatedHours, 0),
      Actual: tasks.reduce((acc, t) => acc + t.actualHours, 0)
    }
  ];

  const totalEstCost = tasks.reduce((acc, t) => acc + t.estimatedCost, 0);
  const totalActCost = tasks.reduce((acc, t) => acc + t.actualCost, 0);
  const totalEstHours = tasks.reduce((acc, t) => acc + t.estimatedHours, 0);
  const totalActHours = tasks.reduce((acc, t) => acc + t.actualHours, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl border border-slate-700">
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2 tracking-tighter uppercase">
          <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
          Benchmark Analysis
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 10, fontWeight: 800}} />
              <YAxis tick={{fill: '#64748b', fontSize: 10, fontWeight: 800}} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: '1px solid #334155', 
                  backgroundColor: '#0f172a',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em'}} />
              <Bar dataKey="Estimated" fill="#9333ea" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Actual" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="text-lg font-black text-white flex items-center gap-2 tracking-tighter uppercase">
          <span className="w-2 h-6 bg-gold-500 rounded-full"></span>
          Project Totals
        </h3>
        
        <div className="space-y-4">
          <div className="bg-slate-900/50 p-5 rounded-3xl border border-slate-700">
            <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
              <span>Market Value Bench</span>
              <span>{totalEstCost > 0 ? Math.round((totalActCost / totalEstCost) * 100) : 0}%</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-black text-white">${totalActCost.toLocaleString()}</span>
              <span className="text-[10px] text-slate-600 font-bold mb-1">of ${totalEstCost.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
               <div 
                 className="bg-purple-600 h-full transition-all duration-1000 shadow-[0_0_10px_#9333ea]" 
                 style={{ width: `${Math.min(100, (totalActCost / (totalEstCost || 1)) * 100)}%` }}
               ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 p-5 rounded-3xl border border-slate-700">
            <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
              <span>Effort Benchmark</span>
              <span>{totalEstHours > 0 ? Math.round((totalActHours / totalEstHours) * 100) : 0}%</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-black text-white">{totalActHours}h</span>
              <span className="text-[10px] text-slate-600 font-bold mb-1">of {totalEstHours}h</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
               <div 
                 className="bg-green-500 h-full transition-all duration-1000 shadow-[0_0_10px_#22c55e]" 
                 style={{ width: `${Math.min(100, (totalActHours / (totalEstHours || 1)) * 100)}%` }}
               ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTracker;
