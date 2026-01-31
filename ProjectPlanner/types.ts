
export type UserRole = 'Owner' | 'Developer';

export type ProjectStatus = 'To Do' | 'In Progress' | 'Completed' | 'Deferred' | 'Pending Approval';

export type Priority = 'Low' | 'Medium' | 'High';

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  scopeOfWork: string;
  estimatedCost?: number;
  actualCost: number;
  estimatedHours: number;
  actualHours: number;
  workPerformed: string;
  status: ProjectStatus;
  priority: Priority;
  category: 'Feature' | 'Design' | 'Technical' | 'Marketing';
  assignedTo: UserRole;
  createdBy: UserRole;
  createdAt: string;
}

export interface Notice {
  id: string;
  author: string;
  role: UserRole;
  content: string;
  timestamp: Date;
}

export interface ShoppingItem {
  id: string;
  title: string;
  description: string;
  benefit: string;
  effort: string;
  category: string;
  isChecked: boolean;
  previewType: 'gbp' | 'seo' | 'menu' | 'ai' | 'speed' | 'loyalty' | 'access' | 'catering' | 'sms' | 'wholesale';
}
