export const APP_CONFIG = {
  name: 'Plalz E-commerce',
  description: 'Plataforma e-commerce de servicios web',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '1.0.0',
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    profile: '/api/auth/profile',
  },
  services: {
    list: '/api/services',
    create: '/api/services',
    detail: (id: string) => `/api/services/${id}`,
    update: (id: string) => `/api/services/${id}`,
    delete: (id: string) => `/api/services/${id}`,
  },
  orders: {
    list: '/api/orders',
    create: '/api/orders',
    detail: (id: string) => `/api/orders/${id}`,
    update: (id: string) => `/api/orders/${id}`,
  },
  categories: {
    list: '/api/categories',
    detail: (id: string) => `/api/categories/${id}`,
  },
} as const;

export const ROUTES = {
  home: '/',
  services: '/services',
  service: (id: string) => `/services/${id}`,
  categories: '/categories',
  category: (slug: string) => `/categories/${slug}`,
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  dashboard: {
    home: '/dashboard',
    services: '/dashboard/services',
    orders: '/dashboard/orders',
    profile: '/dashboard/profile',
  },
} as const;

export const LOCALES = ['es', 'en'] as const;
export const DEFAULT_LOCALE = 'es' as const; 