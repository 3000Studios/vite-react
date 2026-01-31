
import React, { useState, useCallback, useEffect } from 'react';
import { UserRole, ProjectTask, Notice, ShoppingItem } from './types';
import { INITIAL_TASKS, SHOPPING_LIST_ITEMS } from './constants';
import ProjectTracker from './components/ProjectTracker';
import NoticeBoard from './components/NoticeBoard';
import TaskManager from './components/TaskManager';
import ShoppingList from './components/ShoppingList';
import ChatBot from './components/ChatBot';
import PreviewPane from './components/PreviewPane';
import { getAiSuggestions } from './services/geminiService';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('Owner');
  const [tasks, setTasks] = useState<ProjectTask[]>(() => {
    const saved = localStorage.getItem('cm_tasks_v2');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });
  const [notices, setNotices] = useState<Notice[]>([]);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(SHOPPING_LIST_ITEMS);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [showDashboard, setShowDashboard] = useState(true);
  
  const [activePreviewIds, setActivePreviewIds] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem('cm_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  const addNotice = useCallback((content: string) => {
    const newNotice: Notice = {
      id: Date.now().toString(),
      author: role === 'Owner' ? 'Project Principal' : 'Engineering Lead',
      role,
      content,
      timestamp: new Date()
    };
    setNotices(prev => [...prev, newNotice]);
  }, [role]);

  const handleUpdateTask = (updatedTask: ProjectTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    addNotice(`Database updated for task: ${updatedTask.title}. Status: ${updatedTask.status}`);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    addNotice(`Record deleted from database.`);
  };

  const handleCreateTask = (newTask: Partial<ProjectTask>) => {
    const task: ProjectTask = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now().toString(),
      title: newTask.title || 'New Work Order',
      description: newTask.description || '',
      scopeOfWork: newTask.scopeOfWork || '',
      actualCost: 0,
      estimatedHours: newTask.estimatedHours || 0,
      actualHours: 0,
      workPerformed: '',
      status: role === 'Owner' ? 'Pending Approval' : 'To Do',
      priority: newTask.priority || 'Medium',
      category: newTask.category || 'Feature',
      assignedTo: newTask.assignedTo || 'Developer',
      createdBy: role,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [task, ...prev]);
    addNotice(`Workflow initialized: ${task.title}. Priority: ${task.priority}`);
  };

  const toggleShoppingItem = (id: string) => {
    if (role !== 'Owner') return;
    setShoppingItems(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, isChecked: !i.isChecked } : i);
      const activeIds = updated.filter(i => i.isChecked).map(i => i.previewType);
      setActivePreviewIds(activeIds);
      return updated;
    });
  };

  const approveShoppingUpgrades = () => {
    const selected = shoppingItems.filter(i => i.isChecked);
    selected.forEach(item => {
      handleCreateTask({
        title: item.title,
        description: item.description,
        scopeOfWork: `Phase 1: Database Schema Prep.\nPhase 2: UI Component Logic.\nPhase 3: Beta Deployment & Testing.\n\nProjected Impact: ${item.benefit}`,
        category: item.category as any,
        priority: 'High',
        assignedTo: 'Developer'
      });
    });
    setShoppingItems(prev => prev.map(i => ({ ...i, isChecked: false })));
    setActivePreviewIds([]);
    addNotice(`Owner authorized ${selected.length} modules for immediate development.`);
  };

  const fetchAiSuggestions = async () => {
    setAiLoading(true);
    const suggestions = await getAiSuggestions(tasks);
    setAiSuggestions(suggestions);
    setAiLoading(false);
  };

  const acceptAiSuggestion = (suggestion: any) => {
    handleCreateTask({ ...suggestion, assignedTo: 'Developer' });
    setAiSuggestions(prev => prev.filter(s => s.title !== suggestion.title));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <div className="fixed top-0 left-0 w-full h-1 bg-indigo-600 z-50"></div>
      
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-10 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">CM</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase">Cajun Project Console <span className="text-slate-700 font-light">|</span> <span className="text-indigo-400">Engineering</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">TheCajunMenu.site Lifecycle Manager</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 shadow-inner">
            <button 
              onClick={() => setRole('Owner')}
              className={`px-5 py-2 rounded-md text-[10px] font-bold transition-all uppercase tracking-widest ${role === 'Owner' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-400'}`}
            >
              Principal
            </button>
            <button 
              onClick={() => setRole('Developer')}
              className={`px-5 py-2 rounded-md text-[10px] font-bold transition-all uppercase tracking-widest ${role === 'Developer' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-600 hover:text-slate-400'}`}
            >
              Engineer
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className={`flex-1 transition-all duration-500 p-10 overflow-y-auto ${showDashboard ? 'w-full' : 'w-0 opacity-0'}`}>
          <div className="max-w-7xl mx-auto space-y-12 pb-40">
            
            <ProjectTracker tasks={tasks} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-12">
                <TaskManager 
                  tasks={tasks} 
                  role={role} 
                  onUpdateTask={handleUpdateTask} 
                  onCreateTask={handleCreateTask}
                  onDeleteTask={handleDeleteTask}
                />
                
                <div className="bg-slate-900 border border-slate-800 p-10 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-2">Architect AI</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-8">Dynamic roadmap discovery engine</p>
                    <button 
                      onClick={fetchAiSuggestions}
                      disabled={aiLoading}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl transition-all disabled:opacity-50"
                    >
                      {aiLoading ? 'Generating Roadmap...' : 'Analyze Domain & Suggest Upgrades'}
                    </button>
                  </div>

                  {aiSuggestions.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                      {aiSuggestions.map((s, idx) => (
                        <div key={idx} className="bg-slate-950 p-6 rounded-lg border border-slate-800 hover:border-indigo-600 transition-all group/card">
                          <h4 className="font-bold text-slate-200 mb-3 text-xs uppercase tracking-wider">{s.title}</h4>
                          <p className="text-[10px] text-slate-500 mb-6 leading-relaxed font-medium line-clamp-3">{s.description}</p>
                          <button 
                            onClick={() => acceptAiSuggestion(s)}
                            className="w-full py-3 bg-slate-900 hover:bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-widest rounded-md transition-all"
                          >
                            Stage for Deployment
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-12">
                <ShoppingList 
                  items={shoppingItems} 
                  onToggleItem={toggleShoppingItem} 
                  onApproveSelected={approveShoppingUpgrades} 
                />
                <NoticeBoard notices={notices} currentUserRole={role} onAddNotice={addNotice} />
                <ChatBot currentTasks={tasks} catalog={shoppingItems} />
              </div>
            </div>
          </div>
        </div>

        <PreviewPane show={!showDashboard} activeFeatures={activePreviewIds} />

        <button 
          onClick={() => setShowDashboard(!showDashboard)}
          className="fixed bottom-10 right-10 z-50 bg-white text-slate-950 w-24 h-24 rounded-2xl flex flex-col items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all border border-slate-200"
        >
          <div className="h-8 w-8 mb-1">
            {showDashboard ? (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            ) : (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">{showDashboard ? 'Live View' : 'Backlog'}</span>
        </button>
      </main>

      <footer className="bg-slate-950 text-slate-700 text-[9px] py-2 px-10 flex justify-between uppercase tracking-widest font-bold border-t border-slate-900">
        <div className="flex gap-10">
          <span>Connection: Encrypted</span>
          <span>System: Terminal.v8.2</span>
        </div>
        <div>Cajun Hub &copy; 2025</div>
      </footer>
    </div>
  );
};

export default App;
