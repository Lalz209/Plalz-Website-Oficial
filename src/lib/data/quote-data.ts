import { Feature, Integration, ProjectType, Industry } from '@/lib/types/quote';

export const PROJECT_TYPES: Record<ProjectType, { 
  name: string; 
  description: string; 
  basePrice: number;
  examples: string[];
  icon: string;
}> = {
  website: {
    name: 'Sitio Web Corporativo',
    description: 'Sitio web profesional para empresas y organizaciones',
    basePrice: 1500,
    examples: ['Sitio corporativo', 'Portafolio profesional', 'Página de servicios'],
    icon: '🌐',
  },
  ecommerce: {
    name: 'Tienda Online',
    description: 'Plataforma de comercio electrónico completa',
    basePrice: 3000,
    examples: ['Tienda de productos', 'Marketplace', 'Catálogo online'],
    icon: '🛒',
  },
  webapp: {
    name: 'Aplicación Web',
    description: 'Aplicación web personalizada con funcionalidades específicas',
    basePrice: 5000,
    examples: ['Dashboard', 'CRM', 'Sistema de gestión'],
    icon: '💻',
  },
  mobile: {
    name: 'App Móvil',
    description: 'Aplicación móvil nativa o híbrida',
    basePrice: 8000,
    examples: ['App iOS/Android', 'PWA', 'App híbrida'],
    icon: '📱',
  },
  landing: {
    name: 'Landing Page',
    description: 'Página de aterrizaje optimizada para conversión',
    basePrice: 800,
    examples: ['Página de producto', 'Campaña publicitaria', 'Evento'],
    icon: '🎯',
  },
  redesign: {
    name: 'Rediseño',
    description: 'Renovación completa de sitio web existente',
    basePrice: 2000,
    examples: ['Modernización', 'Mejora UX/UI', 'Optimización'],
    icon: '🔄',
  },
};

export const INDUSTRIES: Record<Industry, { name: string; multiplier: number }> = {
  technology: { name: 'Tecnología', multiplier: 1.2 },
  healthcare: { name: 'Salud', multiplier: 1.3 },
  finance: { name: 'Finanzas', multiplier: 1.4 },
  education: { name: 'Educación', multiplier: 1.0 },
  retail: { name: 'Retail', multiplier: 1.1 },
  restaurant: { name: 'Restaurante', multiplier: 0.9 },
  'real-estate': { name: 'Bienes Raíces', multiplier: 1.2 },
  consulting: { name: 'Consultoría', multiplier: 1.1 },
  nonprofit: { name: 'Sin Fines de Lucro', multiplier: 0.8 },
  other: { name: 'Otro', multiplier: 1.0 },
};

export const FEATURES: Feature[] = [
  // Basic Features
  {
    id: 'responsive-design',
    name: 'Diseño Responsive',
    description: 'Adaptación perfecta a todos los dispositivos',
    category: 'basic',
    priceImpact: 0,
    required: true,
  },
  {
    id: 'contact-form',
    name: 'Formulario de Contacto',
    description: 'Formulario básico con validación',
    category: 'basic',
    priceImpact: 100,
  },
  {
    id: 'seo-basic',
    name: 'SEO Básico',
    description: 'Optimización básica para motores de búsqueda',
    category: 'basic',
    priceImpact: 200,
  },
  {
    id: 'ssl-certificate',
    name: 'Certificado SSL',
    description: 'Seguridad HTTPS incluida',
    category: 'basic',
    priceImpact: 50,
  },
  
  // Advanced Features
  {
    id: 'cms-integration',
    name: 'Sistema de Gestión de Contenido',
    description: 'Panel para editar contenido fácilmente',
    category: 'advanced',
    priceImpact: 800,
  },
  {
    id: 'user-authentication',
    name: 'Sistema de Usuarios',
    description: 'Registro, login y perfiles de usuario',
    category: 'advanced',
    priceImpact: 1200,
  },
  {
    id: 'payment-gateway',
    name: 'Pasarela de Pagos',
    description: 'Integración con sistemas de pago',
    category: 'advanced',
    priceImpact: 1000,
  },
  {
    id: 'multilingual',
    name: 'Sitio Multiidioma',
    description: 'Soporte para múltiples idiomas',
    category: 'advanced',
    priceImpact: 1500,
  },
  {
    id: 'advanced-seo',
    name: 'SEO Avanzado',
    description: 'Optimización completa y análisis detallado',
    category: 'advanced',
    priceImpact: 600,
  },
  
  // Premium Features
  {
    id: 'custom-animations',
    name: 'Animaciones Personalizadas',
    description: 'Efectos visuales y transiciones únicas',
    category: 'premium',
    priceImpact: 2000,
  },
  {
    id: 'ai-integration',
    name: 'Integración con IA',
    description: 'Chatbots, recomendaciones automáticas',
    category: 'premium',
    priceImpact: 3000,
  },
  {
    id: 'advanced-analytics',
    name: 'Analytics Avanzado',
    description: 'Dashboard personalizado con métricas detalladas',
    category: 'premium',
    priceImpact: 1500,
  },
  {
    id: 'api-development',
    name: 'API Personalizada',
    description: 'Desarrollo de API REST para integraciones',
    category: 'premium',
    priceImpact: 2500,
  },
  {
    id: 'performance-optimization',
    name: 'Optimización de Rendimiento',
    description: 'Carga ultra-rápida y optimización avanzada',
    category: 'premium',
    priceImpact: 1200,
  },
];

export const INTEGRATIONS: Integration[] = [
  // CRM
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'crm',
    complexity: 'medium',
    priceImpact: 500,
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'crm',
    complexity: 'complex',
    priceImpact: 1000,
  },
  
  // Email Marketing
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'email',
    complexity: 'simple',
    priceImpact: 200,
  },
  {
    id: 'klaviyo',
    name: 'Klaviyo',
    category: 'email',
    complexity: 'medium',
    priceImpact: 400,
  },
  
  // Analytics
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'analytics',
    complexity: 'simple',
    priceImpact: 100,
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    category: 'analytics',
    complexity: 'medium',
    priceImpact: 300,
  },
  
  // Payment
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'payment',
    complexity: 'medium',
    priceImpact: 600,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'payment',
    complexity: 'simple',
    priceImpact: 400,
  },
  
  // Social
  {
    id: 'facebook-pixel',
    name: 'Facebook Pixel',
    category: 'social',
    complexity: 'simple',
    priceImpact: 150,
  },
  {
    id: 'instagram-feed',
    name: 'Instagram Feed',
    category: 'social',
    complexity: 'simple',
    priceImpact: 200,
  },
];

export const DESIGN_STYLES = {
  modern: {
    name: 'Moderno',
    description: 'Diseño limpio y contemporáneo',
    preview: '/images/styles/modern.jpg',
  },
  classic: {
    name: 'Clásico',
    description: 'Elegante y atemporal',
    preview: '/images/styles/classic.jpg',
  },
  minimalist: {
    name: 'Minimalista',
    description: 'Simple y funcional',
    preview: '/images/styles/minimalist.jpg',
  },
  bold: {
    name: 'Audaz',
    description: 'Llamativo y dinámico',
    preview: '/images/styles/bold.jpg',
  },
  creative: {
    name: 'Creativo',
    description: 'Único y artístico',
    preview: '/images/styles/creative.jpg',
  },
};

export const COLOR_SCHEMES = {
  brand: {
    name: 'Colores de Marca',
    description: 'Basado en tu identidad corporativa',
  },
  neutral: {
    name: 'Neutros',
    description: 'Grises, blancos y tonos suaves',
  },
  vibrant: {
    name: 'Vibrantes',
    description: 'Colores llamativos y energéticos',
  },
  dark: {
    name: 'Modo Oscuro',
    description: 'Fondo oscuro con acentos claros',
  },
  custom: {
    name: 'Personalizado',
    description: 'Paleta completamente personalizada',
  },
};

export const PRIORITY_LEVELS = {
  low: {
    name: 'Baja',
    description: 'Sin prisa, tiempo flexible',
    multiplier: 0.9,
    timeline: '8-12 semanas',
  },
  medium: {
    name: 'Media',
    description: 'Timeline estándar',
    multiplier: 1.0,
    timeline: '6-8 semanas',
  },
  high: {
    name: 'Alta',
    description: 'Entrega prioritaria',
    multiplier: 1.2,
    timeline: '4-6 semanas',
  },
  urgent: {
    name: 'Urgente',
    description: 'Entrega express',
    multiplier: 1.5,
    timeline: '2-4 semanas',
  },
}; 