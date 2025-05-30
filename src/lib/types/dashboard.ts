export interface DashboardMetrics {
  activeProjects: number;
  completedProjects: number;
  totalSpent: number;
  pendingApprovals: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'website' | 'ecommerce' | 'webapp' | 'mobile' | 'design' | 'seo';
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold' | 'cancelled';
  progress: number;
  startDate: Date;
  dueDate: Date;
  budget: number;
  spent: number;
  thumbnail?: string;
  client: {
    name: string;
    email: string;
    avatar?: string;
  };
  team: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }[];
  deliverables: Deliverable[];
  milestones: Milestone[];
  tags: string[];
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  type: 'design' | 'development' | 'content' | 'documentation' | 'other';
  status: 'pending' | 'in-progress' | 'review' | 'approved' | 'rejected';
  dueDate: Date;
  fileUrl?: string;
  comments: Comment[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'upcoming' | 'in-progress' | 'completed' | 'overdue';
  progress: number;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  createdAt: Date;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface Quote {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'sent' | 'viewed' | 'approved' | 'rejected' | 'expired';
  amount: number;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
  items: QuoteItem[];
  notes?: string;
}

export interface QuoteItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  projectId?: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: Date;
  paidDate?: Date;
  createdAt: Date;
  downloadUrl: string;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    projectUpdates: boolean;
    marketing: boolean;
    invoices: boolean;
  };
  dashboard: {
    defaultView: 'grid' | 'list';
    itemsPerPage: number;
    showCompletedProjects: boolean;
  };
  language: 'es' | 'en';
  timezone: string;
}

export interface DashboardStats {
  projectsThisMonth: number;
  projectsLastMonth: number;
  spentThisMonth: number;
  spentLastMonth: number;
  averageProjectDuration: number;
  satisfactionScore: number;
}

export type ProjectStatus = Project['status'];
export type ProjectType = Project['type'];
export type DeliverableStatus = Deliverable['status'];
export type NotificationType = Notification['type'];
export type QuoteStatus = Quote['status'];
export type InvoiceStatus = Invoice['status']; 