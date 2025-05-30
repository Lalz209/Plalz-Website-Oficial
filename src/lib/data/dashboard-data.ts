import { 
  Project, 
  DashboardMetrics, 
  Notification, 
  Quote, 
  Invoice, 
  DashboardStats,
  UserPreferences 
} from '@/lib/types/dashboard';

export const MOCK_METRICS: DashboardMetrics = {
  activeProjects: 3,
  completedProjects: 12,
  totalSpent: 45750,
  pendingApprovals: 2,
};

export const MOCK_STATS: DashboardStats = {
  projectsThisMonth: 2,
  projectsLastMonth: 1,
  spentThisMonth: 8500,
  spentLastMonth: 12300,
  averageProjectDuration: 45,
  satisfactionScore: 4.8,
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Desarrollo de tienda online completa con sistema de pagos integrado',
    type: 'ecommerce',
    status: 'in-progress',
    progress: 75,
    startDate: new Date('2024-01-15'),
    dueDate: new Date('2024-03-15'),
    budget: 15000,
    spent: 11250,
    thumbnail: '/projects/ecommerce-thumb.jpg',
    client: {
      name: 'María González',
      email: 'maria@empresa.com',
      avatar: '/avatars/maria.jpg',
    },
    team: [
      {
        id: '1',
        name: 'Carlos Ruiz',
        role: 'Project Manager',
        avatar: '/avatars/carlos.jpg',
      },
      {
        id: '2',
        name: 'Ana López',
        role: 'Frontend Developer',
        avatar: '/avatars/ana.jpg',
      },
      {
        id: '3',
        name: 'Luis Martín',
        role: 'Backend Developer',
        avatar: '/avatars/luis.jpg',
      },
    ],
    deliverables: [
      {
        id: '1',
        name: 'Diseño UI/UX',
        description: 'Diseños completos de la interfaz de usuario',
        type: 'design',
        status: 'approved',
        dueDate: new Date('2024-02-01'),
        fileUrl: '/files/design-mockups.zip',
        comments: [],
      },
      {
        id: '2',
        name: 'Frontend Development',
        description: 'Implementación del frontend responsive',
        type: 'development',
        status: 'in-progress',
        dueDate: new Date('2024-02-28'),
        comments: [],
      },
    ],
    milestones: [
      {
        id: '1',
        title: 'Diseño Aprobado',
        description: 'Finalización y aprobación de diseños',
        dueDate: new Date('2024-02-01'),
        status: 'completed',
        progress: 100,
      },
      {
        id: '2',
        title: 'Frontend Completado',
        description: 'Desarrollo frontend finalizado',
        dueDate: new Date('2024-02-28'),
        status: 'in-progress',
        progress: 80,
      },
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
  },
  {
    id: '2',
    title: 'Corporate Website',
    description: 'Sitio web corporativo con CMS personalizado',
    type: 'website',
    status: 'review',
    progress: 95,
    startDate: new Date('2024-01-01'),
    dueDate: new Date('2024-02-15'),
    budget: 8000,
    spent: 7600,
    thumbnail: '/projects/corporate-thumb.jpg',
    client: {
      name: 'Roberto Silva',
      email: 'roberto@corporacion.com',
      avatar: '/avatars/roberto.jpg',
    },
    team: [
      {
        id: '1',
        name: 'Carlos Ruiz',
        role: 'Project Manager',
        avatar: '/avatars/carlos.jpg',
      },
      {
        id: '4',
        name: 'Elena Vega',
        role: 'Designer',
        avatar: '/avatars/elena.jpg',
      },
    ],
    deliverables: [
      {
        id: '3',
        name: 'Sitio Web Completo',
        description: 'Website corporativo con todas las funcionalidades',
        type: 'development',
        status: 'review',
        dueDate: new Date('2024-02-15'),
        fileUrl: '/files/website-preview.zip',
        comments: [],
      },
    ],
    milestones: [
      {
        id: '3',
        title: 'Desarrollo Completado',
        description: 'Finalización del desarrollo',
        dueDate: new Date('2024-02-10'),
        status: 'completed',
        progress: 100,
      },
      {
        id: '4',
        title: 'Testing y Launch',
        description: 'Pruebas finales y lanzamiento',
        dueDate: new Date('2024-02-15'),
        status: 'in-progress',
        progress: 70,
      },
    ],
    tags: ['WordPress', 'PHP', 'MySQL'],
  },
  {
    id: '3',
    title: 'Mobile App Design',
    description: 'Diseño de aplicación móvil para iOS y Android',
    type: 'design',
    status: 'planning',
    progress: 25,
    startDate: new Date('2024-02-01'),
    dueDate: new Date('2024-04-01'),
    budget: 12000,
    spent: 3000,
    thumbnail: '/projects/mobile-thumb.jpg',
    client: {
      name: 'Startup Tech',
      email: 'contact@startuptech.com',
      avatar: '/avatars/startup.jpg',
    },
    team: [
      {
        id: '4',
        name: 'Elena Vega',
        role: 'UI/UX Designer',
        avatar: '/avatars/elena.jpg',
      },
    ],
    deliverables: [
      {
        id: '4',
        name: 'Research & Wireframes',
        description: 'Investigación de usuarios y wireframes',
        type: 'design',
        status: 'in-progress',
        dueDate: new Date('2024-02-20'),
        comments: [],
      },
    ],
    milestones: [
      {
        id: '5',
        title: 'Research Completado',
        description: 'Investigación y análisis de usuarios',
        dueDate: new Date('2024-02-20'),
        status: 'in-progress',
        progress: 60,
      },
    ],
    tags: ['Figma', 'User Research', 'Prototyping'],
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Proyecto Aprobado',
    message: 'El diseño del E-commerce Platform ha sido aprobado por el cliente',
    createdAt: new Date('2024-01-20T10:30:00'),
    read: false,
    actionUrl: '/dashboard/proyectos/1',
    actionLabel: 'Ver Proyecto',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Entrega Próxima',
    message: 'El Corporate Website debe entregarse en 3 días',
    createdAt: new Date('2024-01-19T14:15:00'),
    read: false,
    actionUrl: '/dashboard/proyectos/2',
    actionLabel: 'Ver Detalles',
  },
  {
    id: '3',
    type: 'info',
    title: 'Nueva Cotización',
    message: 'Has recibido una nueva cotización para revisar',
    createdAt: new Date('2024-01-18T09:45:00'),
    read: true,
    actionUrl: '/dashboard/cotizaciones',
    actionLabel: 'Ver Cotizaciones',
  },
  {
    id: '4',
    type: 'error',
    title: 'Pago Pendiente',
    message: 'Factura #INV-2024-001 vence mañana',
    createdAt: new Date('2024-01-17T16:20:00'),
    read: true,
    actionUrl: '/dashboard/historial',
    actionLabel: 'Ver Facturas',
  },
];

export const MOCK_QUOTES: Quote[] = [
  {
    id: '1',
    title: 'Rediseño de Website',
    description: 'Modernización completa del sitio web corporativo',
    status: 'approved',
    amount: 18500,
    validUntil: new Date('2024-02-28'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
    items: [
      {
        id: '1',
        name: 'Diseño UI/UX',
        description: 'Diseño completo de la interfaz',
        quantity: 1,
        unitPrice: 8000,
        total: 8000,
      },
      {
        id: '2',
        name: 'Desarrollo Frontend',
        description: 'Implementación responsive',
        quantity: 1,
        unitPrice: 7500,
        total: 7500,
      },
      {
        id: '3',
        name: 'CMS Integration',
        description: 'Integración con sistema de gestión',
        quantity: 1,
        unitPrice: 3000,
        total: 3000,
      },
    ],
    notes: 'Incluye 3 meses de soporte post-lanzamiento',
  },
  {
    id: '2',
    title: 'App Móvil E-commerce',
    description: 'Desarrollo de aplicación móvil para tienda online',
    status: 'sent',
    amount: 35000,
    validUntil: new Date('2024-03-15'),
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    items: [
      {
        id: '4',
        name: 'Diseño de App',
        description: 'Diseño completo iOS y Android',
        quantity: 1,
        unitPrice: 12000,
        total: 12000,
      },
      {
        id: '5',
        name: 'Desarrollo iOS',
        description: 'Desarrollo nativo iOS',
        quantity: 1,
        unitPrice: 11500,
        total: 11500,
      },
      {
        id: '6',
        name: 'Desarrollo Android',
        description: 'Desarrollo nativo Android',
        quantity: 1,
        unitPrice: 11500,
        total: 11500,
      },
    ],
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    projectId: '1',
    amount: 7500,
    status: 'paid',
    dueDate: new Date('2024-01-31'),
    paidDate: new Date('2024-01-28'),
    createdAt: new Date('2024-01-15'),
    downloadUrl: '/invoices/INV-2024-001.pdf',
  },
  {
    id: '2',
    number: 'INV-2024-002',
    projectId: '2',
    amount: 4000,
    status: 'sent',
    dueDate: new Date('2024-02-15'),
    createdAt: new Date('2024-02-01'),
    downloadUrl: '/invoices/INV-2024-002.pdf',
  },
  {
    id: '3',
    number: 'INV-2024-003',
    amount: 1500,
    status: 'draft',
    dueDate: new Date('2024-02-28'),
    createdAt: new Date('2024-02-10'),
    downloadUrl: '/invoices/INV-2024-003.pdf',
  },
];

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  notifications: {
    email: true,
    push: true,
    projectUpdates: true,
    marketing: false,
    invoices: true,
  },
  dashboard: {
    defaultView: 'grid',
    itemsPerPage: 12,
    showCompletedProjects: false,
  },
  language: 'es',
  timezone: 'America/Mexico_City',
};

export const PROJECT_STATUS_CONFIG = {
  planning: {
    label: 'Planificación',
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
  },
  'in-progress': {
    label: 'En Progreso',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
  },
  review: {
    label: 'En Revisión',
    color: 'bg-purple-500',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
  },
  completed: {
    label: 'Completado',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
  },
  'on-hold': {
    label: 'En Pausa',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
  },
  cancelled: {
    label: 'Cancelado',
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
  },
};

export const PROJECT_TYPE_CONFIG = {
  website: {
    label: 'Sitio Web',
    icon: '🌐',
    color: 'bg-blue-500',
  },
  ecommerce: {
    label: 'E-commerce',
    icon: '🛒',
    color: 'bg-green-500',
  },
  webapp: {
    label: 'Web App',
    icon: '💻',
    color: 'bg-purple-500',
  },
  mobile: {
    label: 'App Móvil',
    icon: '📱',
    color: 'bg-pink-500',
  },
  design: {
    label: 'Diseño',
    icon: '🎨',
    color: 'bg-orange-500',
  },
  seo: {
    label: 'SEO',
    icon: '📈',
    color: 'bg-indigo-500',
  },
}; 