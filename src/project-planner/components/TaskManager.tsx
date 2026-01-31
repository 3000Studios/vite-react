
import React, { useState, useMemo } from 'react';
import { ProjectTask, UserRole, ProjectStatus, Priority } from '../types';

interface TaskManagerProps {
  tasks: ProjectTask[];
  role: UserRole;
  onUpdateTask: (task: ProjectTask) => void;
  onCreateTask: (task: Partial<ProjectTask>) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({ tasks, role, onUpdateTask, onCreateTask, onDeleteTask }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const [newTask, setNewTask] = useState<Partial<ProjectTask>>({
    title: '',
    description: '',
    scopeOfWork: '',
    priority: 'Medium',
    category: 'Feature',
    assignedTo: 'Developer',
    estimatedHours: 0
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchStatus = statusFilter === 'All' || task.status === statusFilter;
      const matchCategory = categoryFilter === 'All' || task.category === categoryFilter;
      return matchStatus && matchCategory;
    });
  }, [tasks, statusFilter, categoryFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTask(newTask);
    setNewTask({ title: '', description: '', scopeOfWork: '', priority: 'Medium', category: 'Feature', assignedTo: 'Developer', estimatedHours: 0 });
    setIsAdding(false);
  };

  const confirmDelete = (taskId: string) => {
    if (window.confirm("Permanently delete this project record from the secure database?")) {
      onDeleteTask(taskId);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Operational Backlog</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Project roadmap database</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-md shadow-lg transition-all uppercase tracking-widest"
        >
          {isAdding ? 'Close Request Terminal' : 'New Engineering Order'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-slate-900 p-10 rounded-lg border border-slate-800 shadow-2xl space-y-10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Project Title</label>
                <input 
                  required
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-md text-slate-200 text-sm focus:border-indigo-600 outline-none transition-all"
                  placeholder="e.g. Real-time Menu Sync Engine"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Technical Description</label>
                <textarea 
                  rows={3}
                  value={newTask.description}
                  onChange={e => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-md text-slate-200 text-sm focus:border-indigo-600 outline-none transition-all"
                  placeholder="Summary of requirements..."
                />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Scope of Work (SOW) Plan</label>
                <textarea 
                  rows={7}
                  value={newTask.scopeOfWork}
                  onChange={e => setNewTask({...newTask, scopeOfWork: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-md text-slate-200 text-sm focus:border-indigo-600 outline-none transition-all font-mono"
                  placeholder="Phase 1: DB Migration&#10;Phase 2: Controller API&#10;Phase 3: Front-end Integration"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-800">
             <div className="group">
                <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Assign To Personnel</label>
                <select 
                  required
                  value={newTask.assignedTo}
                  onChange={e => setNewTask({...newTask, assignedTo: e.target.value as UserRole})}
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 focus:border-indigo-600 rounded-md text-slate-300 text-[10px] font-bold uppercase tracking-widest transition-colors outline-none cursor-pointer"
                >
                  <option value="Developer">Lead Engineer (Dev)</option>
                  <option value="Owner">Project Principal (Owner)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Priority</label>
                <select 
                  value={newTask.priority}
                  onChange={e => setNewTask({...newTask, priority: e.target.value as Priority})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-md text-slate-300 text-[10px] font-bold uppercase tracking-widest"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Category</label>
                <select 
                  value={newTask.category}
                  onChange={e => setNewTask({...newTask, category: e.target.value as any})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-md text-slate-300 text-[10px] font-bold uppercase tracking-widest"
                >
                  <option>Feature</option>
                  <option>Design</option>
                  <option>Technical</option>
                  <option>Marketing</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Allocation (Hrs)</label>
                <input 
                  type="number"
                  value={newTask.estimatedHours}
                  onChange={e => setNewTask({...newTask, estimatedHours: Number(e.target.value)})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-md text-slate-200 text-sm font-bold"
                />
              </div>
          </div>
          <div className="flex justify-end pt-4">
             <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-md text-xs font-bold uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-95">
               Execute Engineering Order
             </button>
          </div>
        </form>
      )}

      {/* Filter Bar */}
      <div className="flex gap-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="text-[10px] font-bold px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-400 uppercase tracking-widest outline-none focus:border-indigo-600"
        >
          <option value="All">All Statuses</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-[10px] font-bold px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-400 uppercase tracking-widest outline-none focus:border-indigo-600"
        >
          <option value="All">All Categories</option>
          <option value="Feature">Features</option>
          <option value="Design">Design</option>
          <option value="Technical">Technical</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div key={task.id} className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden hover:border-slate-700 transition-all group">
              <div 
                className="p-6 cursor-pointer flex items-center justify-between"
                onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className={`px-2 py-0.5 rounded-[2px] text-[7px] font-black uppercase tracking-[0.2em] border ${
                      task.priority === 'High' ? 'text-red-400 border-red-900/50 bg-red-950/20' : 
                      'text-slate-500 border-slate-800 bg-slate-950/20'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{task.category}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{task.title}</h3>
                </div>
                
                <div className="flex items-center gap-12 text-right">
                  <div className="hidden md:block">
                    <p className="text-[7px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1">Personnel</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
                      task.assignedTo === 'Developer' ? 'text-indigo-400 border-indigo-900/50 bg-indigo-950/20' : 'text-slate-400 border-slate-800 bg-slate-950/40'
                    }`}>
                      {task.assignedTo === 'Developer' ? 'Lead Engineer' : 'Principal'}
                    </div>
                  </div>
                  <div className="min-w-[100px]">
                    <span className={`px-3 py-1 rounded-[2px] text-[8px] font-bold uppercase tracking-[0.2em] ${
                      task.status === 'Completed' ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-900' : 'bg-slate-950 text-slate-500 border border-slate-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <svg className={`w-4 h-4 text-slate-700 transition-transform ${expandedTaskId === task.id ? 'rotate-180 text-indigo-500' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedTaskId === task.id ? 'max-h-[1200px] border-t border-slate-800' : 'max-h-0'}`}>
                <div className="p-10 bg-slate-950/50 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] mb-3">Project Narrative</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">{task.description || 'N/A'}</p>
                      </div>
                      <div className="bg-slate-900/50 p-6 rounded border border-slate-800/50 shadow-inner">
                        <h4 className="text-[8px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-4">Strategic Scope of Work (SOW)</h4>
                        <p className="text-[11px] text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
                          {task.scopeOfWork || "System standing by for SOW documentation upload..."}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {role === 'Developer' ? (
                        <div className="space-y-6">
                          <label className="block text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">Engineering Deployment Log</label>
                          <textarea 
                            value={task.workPerformed}
                            onChange={e => onUpdateTask({...task, workPerformed: e.target.value})}
                            placeholder="Register deployment logs and build updates..."
                            className="w-full bg-slate-900 border border-slate-800 p-4 rounded text-xs font-medium outline-none focus:border-indigo-600 text-slate-300 transition-colors"
                            rows={4}
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="block text-[7px] font-black text-slate-600 uppercase tracking-widest">Update Assignee</label>
                                <select 
                                  value={task.assignedTo}
                                  onChange={e => onUpdateTask({...task, assignedTo: e.target.value as UserRole})}
                                  className="w-full text-[9px] font-bold p-3 bg-slate-900 border border-slate-800 rounded text-white uppercase tracking-widest outline-none"
                                >
                                  <option value="Developer">Lead Engineer</option>
                                  <option value="Owner">Project Principal</option>
                                </select>
                             </div>
                             <div className="space-y-2">
                                <label className="block text-[7px] font-black text-slate-600 uppercase tracking-widest">Update Status</label>
                                <select 
                                  value={task.status}
                                  onChange={e => onUpdateTask({...task, status: e.target.value as ProjectStatus})}
                                  className="w-full text-[9px] font-bold p-3 bg-slate-900 border border-slate-800 rounded text-white uppercase tracking-widest outline-none"
                                >
                                  <option>To Do</option>
                                  <option>In Progress</option>
                                  <option>Completed</option>
                                </select>
                             </div>
                             <button 
                              onClick={() => onUpdateTask({...task, actualHours: task.actualHours + 1})}
                              className="sm:col-span-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase tracking-widest rounded transition-all shadow-md active:scale-95"
                             >
                               Register Production Hour
                             </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Engineering Status Repository</h4>
                            <div className="p-6 bg-slate-900 rounded border border-slate-800 italic text-[11px] text-slate-500 font-medium leading-relaxed">
                              {task.workPerformed || "Awaiting engineering activity logs from lead developer..."}
                            </div>
                          </div>
                          <div className="pt-6 border-t border-slate-900 flex justify-between items-center">
                             <div className="space-y-3">
                                <div>
                                  <p className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">Assigned Personnel</p>
                                  <select 
                                    value={task.assignedTo}
                                    onChange={e => onUpdateTask({...task, assignedTo: e.target.value as UserRole})}
                                    className="text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-transparent border-none focus:ring-0 cursor-pointer p-0"
                                  >
                                    <option value="Developer">Lead Engineer</option>
                                    <option value="Owner">Project Principal</option>
                                  </select>
                                </div>
                                <div>
                                  <p className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">Origin</p>
                                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{task.createdBy}</p>
                                </div>
                             </div>
                             {task.status === 'Pending Approval' && (
                                <button 
                                  onClick={() => onUpdateTask({...task, status: 'To Do'})}
                                  className="px-6 py-2.5 bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-widest rounded hover:bg-indigo-700 transition-all shadow-lg"
                                >
                                  Authorize Workstream
                                </button>
                             )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-8 flex justify-between items-center border-t border-slate-900">
                    <div className="flex gap-12">
                       <div>
                         <p className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">Resource Allocation</p>
                         <p className="text-xs font-bold text-slate-300">{task.actualHours}h <span className="text-slate-700">logged / {task.estimatedHours}h plan</span></p>
                       </div>
                       <div>
                         <p className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">Initialization Date</p>
                         <p className="text-xs font-bold text-slate-300">{new Date(task.createdAt).toLocaleDateString()}</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => confirmDelete(task.id)}
                      className="text-[9px] font-bold text-slate-600 hover:text-red-500 uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Purge Record
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center border border-dashed border-slate-800 rounded bg-slate-900/20">
            <p className="text-slate-600 font-bold uppercase tracking-[0.2em] text-[10px]">Backlog Terminal Offline - No Active Tasks Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
