// Search data for global search functionality
import { COMPANY_INFO, FAQ_CONTACT, PRICING_FAQ } from './company-data';

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'service' | 'blog' | 'portfolio' | 'faq' | 'page' | 'team';
  url: string;
  tags: string[];
  priority: number; // 1-5, higher = more important
  lastUpdated?: string;
  image?: string;
}

// Services data for search
export const SEARCH_SERVICES: SearchItem[] = [
  {
    id: 'desarrollo-web',
    title: 'Desarrollo Web',
    description: 'Creamos sitios web modernos, rápidos y optimizados para SEO',
    content: 'Desarrollo web profesional con React, Next.js, TypeScript. Sitios web responsivos, optimizados para SEO, con diseño moderno y funcionalidades avanzadas. E-commerce, blogs, portfolios, aplicaciones web.',
    category: 'service',
    url: '/servicios/desarrollo-web',
    tags: ['desarrollo', 'web', 'react', 'nextjs', 'typescript', 'seo', 'responsive'],
    priority: 5,
    image: '/services/desarrollo-web.jpg'
  },
  {
    id: 'diseno-ux-ui',
    title: 'Diseño UX/UI',
    description: 'Diseños intuitivos que convierten visitantes en clientes',
    content: 'Diseño de experiencia de usuario (UX) y interfaz de usuario (UI). Wireframes, prototipos, design systems, investigación de usuarios, testing de usabilidad, diseño responsive.',
    category: 'service',
    url: '/servicios/diseno-ux-ui',
    tags: ['diseño', 'ux', 'ui', 'figma', 'prototipo', 'wireframe', 'usabilidad'],
    priority: 4,
    image: '/services/diseno-ux-ui.jpg'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Tiendas online que venden 24/7',
    content: 'Desarrollo de tiendas online con Shopify, WooCommerce, Magento. Integración de pagos, gestión de inventario, analytics, marketing automation, SEO para e-commerce.',
    category: 'service',
    url: '/servicios/ecommerce',
    tags: ['ecommerce', 'tienda', 'online', 'shopify', 'woocommerce', 'pagos', 'inventario'],
    priority: 5,
    image: '/services/ecommerce.jpg'
  },
  {
    id: 'seo-marketing',
    title: 'SEO y Marketing Digital',
    description: 'Aumenta tu visibilidad online y atrae más clientes',
    content: 'Optimización para motores de búsqueda (SEO), marketing digital, Google Ads, Facebook Ads, content marketing, email marketing, analytics y reporting.',
    category: 'service',
    url: '/servicios/seo-marketing',
    tags: ['seo', 'marketing', 'google', 'ads', 'facebook', 'content', 'email', 'analytics'],
    priority: 4,
    image: '/services/seo-marketing.jpg'
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento Web',
    description: 'Mantén tu sitio web seguro y actualizado',
    content: 'Mantenimiento y soporte técnico 24/7. Actualizaciones de seguridad, backups automáticos, monitoreo de rendimiento, optimización de velocidad.',
    category: 'service',
    url: '/servicios/mantenimiento',
    tags: ['mantenimiento', 'soporte', 'seguridad', 'backup', 'monitoreo', 'velocidad'],
    priority: 3,
    image: '/services/mantenimiento.jpg'
  },
  {
    id: 'consultoria',
    title: 'Consultoría Digital',
    description: 'Estrategias digitales que impulsan tu crecimiento',
    content: 'Consultoría en transformación digital, auditorías web, estrategia de contenidos, arquitectura de información, optimización de conversiones.',
    category: 'service',
    url: '/servicios/consultoria',
    tags: ['consultoria', 'estrategia', 'digital', 'auditoria', 'contenidos', 'conversiones'],
    priority: 3,
    image: '/services/consultoria.jpg'
  }
];

// Blog posts data for search
export const SEARCH_BLOG: SearchItem[] = [
  {
    id: 'tendencias-web-2024',
    title: '10 Tendencias de Desarrollo Web para 2024',
    description: 'Descubre las últimas tendencias en desarrollo web que dominarán este año',
    content: 'Inteligencia artificial, Progressive Web Apps, WebAssembly, Jamstack, headless CMS, micro-frontends, serverless, edge computing, web3, realidad aumentada.',
    category: 'blog',
    url: '/blog/tendencias-web-2024',
    tags: ['tendencias', '2024', 'ia', 'pwa', 'jamstack', 'serverless', 'web3'],
    priority: 4,
    lastUpdated: '2024-01-15',
    image: '/blog/tendencias-2024.jpg'
  },
  {
    id: 'seo-guia-completa',
    title: 'Guía Completa de SEO para Principiantes',
    description: 'Todo lo que necesitas saber para posicionar tu sitio web en Google',
    content: 'Keywords research, SEO on-page, SEO técnico, link building, contenido optimizado, herramientas SEO, métricas importantes, algoritmos de Google.',
    category: 'blog',
    url: '/blog/seo-guia-completa',
    tags: ['seo', 'google', 'keywords', 'contenido', 'linkbuilding', 'herramientas'],
    priority: 5,
    lastUpdated: '2024-01-10',
    image: '/blog/seo-guia.jpg'
  },
  {
    id: 'nextjs-vs-react',
    title: 'Next.js vs React: ¿Cuál Elegir para tu Proyecto?',
    description: 'Comparativa detallada entre Next.js y React para ayudarte a decidir',
    content: 'Diferencias entre Next.js y React, SSR vs CSR, performance, SEO, deployment, casos de uso, ventajas y desventajas de cada framework.',
    category: 'blog',
    url: '/blog/nextjs-vs-react',
    tags: ['nextjs', 'react', 'ssr', 'performance', 'framework', 'javascript'],
    priority: 4,
    lastUpdated: '2024-01-05',
    image: '/blog/nextjs-react.jpg'
  },
  {
    id: 'ecommerce-conversion',
    title: 'Cómo Optimizar tu E-commerce para Aumentar Conversiones',
    description: 'Estrategias probadas para mejorar las ventas de tu tienda online',
    content: 'UX/UI para e-commerce, checkout optimizado, product pages, reviews, trust signals, abandoned cart recovery, A/B testing, analytics.',
    category: 'blog',
    url: '/blog/ecommerce-conversion',
    tags: ['ecommerce', 'conversiones', 'ux', 'checkout', 'ventas', 'optimización'],
    priority: 4,
    lastUpdated: '2023-12-28',
    image: '/blog/ecommerce-conversion.jpg'
  }
];

// Portfolio projects for search
export const SEARCH_PORTFOLIO: SearchItem[] = [
  {
    id: 'restaurante-delicia',
    title: 'Restaurante Delicia - Sitio Web y Reservas Online',
    description: 'Sitio web moderno con sistema de reservas integrado para restaurante',
    content: 'Desarrollo completo de sitio web para restaurante con sistema de reservas online, menú digital, galería de fotos, integración con redes sociales y SEO local.',
    category: 'portfolio',
    url: '/portfolio/restaurante-delicia',
    tags: ['restaurante', 'reservas', 'gastronomía', 'seo local', 'responsive'],
    priority: 4,
    image: '/portfolio/restaurante-delicia.jpg'
  },
  {
    id: 'tienda-moda-online',
    title: 'Moda Urbana - E-commerce de Ropa',
    description: 'Tienda online completa con más de 1000 productos',
    content: 'E-commerce desarrollado en Shopify con diseño personalizado, integración de pagos, gestión de inventario, programa de fidelización y marketing automation.',
    category: 'portfolio',
    url: '/portfolio/tienda-moda-online',
    tags: ['ecommerce', 'moda', 'shopify', 'inventario', 'fidelización'],
    priority: 5,
    image: '/portfolio/moda-urbana.jpg'
  },
  {
    id: 'consultoria-legal',
    title: 'Bufete Legal - Portal Corporativo',
    description: 'Sitio web profesional para despacho de abogados',
    content: 'Portal corporativo con área de clientes, blog jurídico, formularios de contacto especializados, SEO para servicios legales y diseño profesional.',
    category: 'portfolio',
    url: '/portfolio/consultoria-legal',
    tags: ['legal', 'abogados', 'corporativo', 'área clientes', 'profesional'],
    priority: 3,
    image: '/portfolio/bufete-legal.jpg'
  },
  {
    id: 'startup-fintech',
    title: 'FinTech Startup - Aplicación Web',
    description: 'Plataforma financiera con dashboard avanzado',
    content: 'Aplicación web para startup fintech con dashboard de analytics, gestión de usuarios, integración con APIs bancarias, seguridad avanzada y UX optimizada.',
    category: 'portfolio',
    url: '/portfolio/startup-fintech',
    tags: ['fintech', 'dashboard', 'analytics', 'apis', 'seguridad', 'startup'],
    priority: 5,
    image: '/portfolio/fintech-app.jpg'
  }
];

// FAQ data for search
export const SEARCH_FAQ: SearchItem[] = [
  ...FAQ_CONTACT.map((faq, index) => ({
    id: `faq-contact-${index}`,
    title: faq.question,
    description: faq.answer.substring(0, 150) + '...',
    content: faq.answer,
    category: 'faq' as const,
    url: '/contacto#faq',
    tags: ['faq', 'contacto', 'consulta', 'información'],
    priority: 2
  })),
  ...PRICING_FAQ.map((faq, index) => ({
    id: `faq-pricing-${index}`,
    title: faq.question,
    description: faq.answer.substring(0, 150) + '...',
    content: faq.answer,
    category: 'faq' as const,
    url: '/precios#faq',
    tags: ['faq', 'precios', 'planes', 'costos'],
    priority: 2
  }))
];

// Pages data for search
export const SEARCH_PAGES: SearchItem[] = [
  {
    id: 'sobre-nosotros',
    title: 'Sobre Nosotros',
    description: 'Conoce nuestro equipo, historia y valores',
    content: `${COMPANY_INFO.description} ${COMPANY_INFO.mission} ${COMPANY_INFO.vision} Equipo de expertos en desarrollo web, diseño UX/UI y marketing digital.`,
    category: 'page',
    url: '/sobre-nosotros',
    tags: ['empresa', 'equipo', 'historia', 'valores', 'misión', 'visión'],
    priority: 3,
    image: '/og-images/about.jpg'
  },
  {
    id: 'contacto',
    title: 'Contacto',
    description: 'Ponte en contacto con nosotros para tu proyecto',
    content: `Contacta con ${COMPANY_INFO.name} para tu proyecto de desarrollo web. ${COMPANY_INFO.contact.email} ${COMPANY_INFO.contact.phone} ${COMPANY_INFO.contact.address.street}`,
    category: 'page',
    url: '/contacto',
    tags: ['contacto', 'consulta', 'proyecto', 'teléfono', 'email', 'dirección'],
    priority: 4,
    image: '/og-images/contact.jpg'
  },
  {
    id: 'precios',
    title: 'Precios y Planes',
    description: 'Descubre nuestros planes de desarrollo web',
    content: 'Planes de desarrollo web desde €299. Starter, Professional, Enterprise. Sin costos ocultos, garantía de satisfacción 30 días.',
    category: 'page',
    url: '/precios',
    tags: ['precios', 'planes', 'starter', 'professional', 'enterprise', 'garantía'],
    priority: 5,
    image: '/og-images/pricing.jpg'
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'Proyectos realizados y casos de éxito',
    content: 'Portfolio de proyectos de desarrollo web, e-commerce, aplicaciones web, diseño UX/UI. Casos de éxito y testimonios de clientes.',
    category: 'page',
    url: '/portfolio',
    tags: ['portfolio', 'proyectos', 'casos', 'éxito', 'testimonios', 'trabajos'],
    priority: 4
  }
];

// Team members for search
export const SEARCH_TEAM: SearchItem[] = COMPANY_INFO.team.map(member => ({
  id: `team-${member.name.toLowerCase().replace(/\s+/g, '-')}`,
  title: `${member.name} - ${member.role}`,
  description: member.bio,
  content: `${member.name} ${member.role} ${member.bio} ${member.specialties.join(' ')}`,
  category: 'team' as const,
  url: '/sobre-nosotros#equipo',
  tags: ['equipo', 'team', member.role.toLowerCase(), ...member.specialties.map(s => s.toLowerCase())],
  priority: 2,
  image: member.image
}));

// Combined search data
export const ALL_SEARCH_DATA: SearchItem[] = [
  ...SEARCH_SERVICES,
  ...SEARCH_BLOG,
  ...SEARCH_PORTFOLIO,
  ...SEARCH_FAQ,
  ...SEARCH_PAGES,
  ...SEARCH_TEAM
];

// Search categories for filtering
export const SEARCH_CATEGORIES = [
  { value: 'all', label: 'Todo', count: ALL_SEARCH_DATA.length },
  { value: 'service', label: 'Servicios', count: SEARCH_SERVICES.length },
  { value: 'blog', label: 'Blog', count: SEARCH_BLOG.length },
  { value: 'portfolio', label: 'Portfolio', count: SEARCH_PORTFOLIO.length },
  { value: 'faq', label: 'FAQ', count: SEARCH_FAQ.length },
  { value: 'page', label: 'Páginas', count: SEARCH_PAGES.length },
  { value: 'team', label: 'Equipo', count: SEARCH_TEAM.length }
];

// Popular searches
export const POPULAR_SEARCHES = [
  'desarrollo web',
  'diseño ux ui',
  'ecommerce',
  'seo',
  'precios',
  'portfolio',
  'contacto',
  'next.js',
  'react',
  'mantenimiento web'
];

// Search suggestions based on common queries
export const SEARCH_SUGGESTIONS = [
  'desarrollo web con react',
  'diseño de tienda online',
  'optimización seo',
  'mantenimiento sitio web',
  'consultoría digital',
  'aplicación web personalizada',
  'rediseño de sitio web',
  'integración de pagos',
  'blog corporativo',
  'landing page'
]; 