export const COMPANY_SIZES = [
  { value: 'freelancer', label: 'Freelancer / Autónomo' },
  { value: 'startup', label: 'Startup (1-10 empleados)' },
  { value: 'small', label: 'Pequeña empresa (11-50 empleados)' },
  { value: 'medium', label: 'Mediana empresa (51-200 empleados)' },
  { value: 'large', label: 'Gran empresa (201-1000 empleados)' },
  { value: 'enterprise', label: 'Corporación (+1000 empleados)' },
];

export const INDUSTRIES = [
  { value: 'technology', label: 'Tecnología' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'healthcare', label: 'Salud y Medicina' },
  { value: 'education', label: 'Educación' },
  { value: 'finance', label: 'Finanzas y Banca' },
  { value: 'real-estate', label: 'Bienes Raíces' },
  { value: 'food', label: 'Alimentación y Restauración' },
  { value: 'fashion', label: 'Moda y Belleza' },
  { value: 'travel', label: 'Viajes y Turismo' },
  { value: 'automotive', label: 'Automotriz' },
  { value: 'construction', label: 'Construcción' },
  { value: 'consulting', label: 'Consultoría' },
  { value: 'marketing', label: 'Marketing y Publicidad' },
  { value: 'media', label: 'Medios y Entretenimiento' },
  { value: 'nonprofit', label: 'Organizaciones sin fines de lucro' },
  { value: 'government', label: 'Gobierno y Sector Público' },
  { value: 'other', label: 'Otro' },
];

export const SERVICES_OF_INTEREST = [
  {
    category: 'Desarrollo Web',
    services: [
      { value: 'website', label: 'Sitio Web Corporativo' },
      { value: 'ecommerce', label: 'Tienda Online' },
      { value: 'webapp', label: 'Aplicación Web' },
      { value: 'landing', label: 'Landing Pages' },
      { value: 'blog', label: 'Blog / CMS' },
    ],
  },
  {
    category: 'Desarrollo Móvil',
    services: [
      { value: 'mobile-app', label: 'App Móvil Nativa' },
      { value: 'pwa', label: 'Progressive Web App' },
      { value: 'hybrid-app', label: 'App Híbrida' },
    ],
  },
  {
    category: 'Diseño',
    services: [
      { value: 'ui-design', label: 'Diseño UI/UX' },
      { value: 'branding', label: 'Branding e Identidad' },
      { value: 'graphic-design', label: 'Diseño Gráfico' },
      { value: 'web-design', label: 'Diseño Web' },
    ],
  },
  {
    category: 'Marketing Digital',
    services: [
      { value: 'seo', label: 'SEO y Posicionamiento' },
      { value: 'sem', label: 'SEM y Google Ads' },
      { value: 'social-media', label: 'Redes Sociales' },
      { value: 'email-marketing', label: 'Email Marketing' },
      { value: 'content-marketing', label: 'Marketing de Contenidos' },
    ],
  },
  {
    category: 'Consultoría',
    services: [
      { value: 'strategy', label: 'Estrategia Digital' },
      { value: 'analytics', label: 'Analítica Web' },
      { value: 'conversion', label: 'Optimización de Conversión' },
      { value: 'automation', label: 'Automatización' },
    ],
  },
];

export const LANGUAGES = [
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
];

export const OAUTH_PROVIDERS = [
  {
    id: 'google',
    name: 'Google',
    icon: '🔍',
    color: 'bg-red-500 hover:bg-red-600',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    color: 'bg-gray-800 hover:bg-gray-900',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    icon: '🪟',
    color: 'bg-blue-500 hover:bg-blue-600',
  },
];

export const PASSWORD_STRENGTH_CONFIG = {
  weak: {
    label: 'Débil',
    color: 'bg-red-500',
    textColor: 'text-red-600',
  },
  medium: {
    label: 'Media',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
  },
  strong: {
    label: 'Fuerte',
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
  },
  'very-strong': {
    label: 'Muy Fuerte',
    color: 'bg-green-500',
    textColor: 'text-green-600',
  },
};

export const AUTH_ERRORS = {
  'auth/user-not-found': 'No existe una cuenta con este email',
  'auth/wrong-password': 'Contraseña incorrecta',
  'auth/email-already-in-use': 'Ya existe una cuenta con este email',
  'auth/weak-password': 'La contraseña es muy débil',
  'auth/invalid-email': 'Email inválido',
  'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
  'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
  'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
  'auth/invalid-token': 'Token de recuperación inválido o expirado',
  'auth/expired-token': 'El token de recuperación ha expirado',
  'validation/email-required': 'El email es requerido',
  'validation/password-required': 'La contraseña es requerida',
  'validation/passwords-not-match': 'Las contraseñas no coinciden',
  'validation/terms-required': 'Debes aceptar los términos y condiciones',
  'server/internal-error': 'Error interno del servidor',
  'server/maintenance': 'El servidor está en mantenimiento',
  default: 'Ha ocurrido un error inesperado',
}; 