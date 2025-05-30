import { 
  PortfolioProject, 
  CaseStudy, 
  Technology, 
  PortfolioStats,
  ProjectCategory,
  Industry 
} from '@/lib/types/portfolio';

export const TECHNOLOGIES: Technology[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'frontend', icon: '⚛️', color: '#61DAFB' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', icon: '▲', color: '#000000' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', icon: '🟢', color: '#4FC08D' },
  { id: 'angular', name: 'Angular', category: 'frontend', icon: '🅰️', color: '#DD0031' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', icon: '📘', color: '#3178C6' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', icon: '🎨', color: '#06B6D4' },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', icon: '🟢', color: '#339933' },
  { id: 'python', name: 'Python', category: 'backend', icon: '🐍', color: '#3776AB' },
  { id: 'php', name: 'PHP', category: 'backend', icon: '🐘', color: '#777BB4' },
  { id: 'laravel', name: 'Laravel', category: 'backend', icon: '🔴', color: '#FF2D20' },
  
  // Database
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', icon: '🐘', color: '#336791' },
  { id: 'mysql', name: 'MySQL', category: 'database', icon: '🐬', color: '#4479A1' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', icon: '🍃', color: '#47A248' },
  
  // Cloud
  { id: 'aws', name: 'AWS', category: 'cloud', icon: '☁️', color: '#FF9900' },
  { id: 'vercel', name: 'Vercel', category: 'cloud', icon: '▲', color: '#000000' },
  { id: 'netlify', name: 'Netlify', category: 'cloud', icon: '🌐', color: '#00C7B7' },
  
  // Design
  { id: 'figma', name: 'Figma', category: 'design', icon: '🎨', color: '#F24E1E' },
  { id: 'adobe-xd', name: 'Adobe XD', category: 'design', icon: '🎨', color: '#FF61F6' },
  { id: 'sketch', name: 'Sketch', category: 'design', icon: '💎', color: '#F7B500' },
  
  // Marketing
  { id: 'google-analytics', name: 'Google Analytics', category: 'marketing', icon: '📊', color: '#E37400' },
  { id: 'google-ads', name: 'Google Ads', category: 'marketing', icon: '📢', color: '#4285F4' },
  { id: 'facebook-ads', name: 'Facebook Ads', category: 'marketing', icon: '📘', color: '#1877F2' },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: '1',
    slug: 'ecommerce-fashion-platform',
    title: 'Plataforma E-commerce de Moda',
    subtitle: 'Transformación digital completa para marca de moda',
    description: 'Desarrollo de una plataforma e-commerce completa con experiencia de usuario optimizada, sistema de gestión de inventario en tiempo real y integración con múltiples pasarelas de pago.',
    shortDescription: 'Plataforma e-commerce moderna con UX optimizada y gestión avanzada de inventario.',
    category: 'ecommerce',
    industry: 'fashion',
    year: 2024,
    technologies: [
      TECHNOLOGIES.find(t => t.id === 'nextjs')!,
      TECHNOLOGIES.find(t => t.id === 'typescript')!,
      TECHNOLOGIES.find(t => t.id === 'tailwind')!,
      TECHNOLOGIES.find(t => t.id === 'nodejs')!,
      TECHNOLOGIES.find(t => t.id === 'postgresql')!,
      TECHNOLOGIES.find(t => t.id === 'aws')!,
    ],
    status: 'completed',
    featured: true,
    
    thumbnail: '/portfolio/ecommerce-fashion/thumbnail.jpg',
    heroImage: '/portfolio/ecommerce-fashion/hero.jpg',
    gallery: [
      {
        id: '1',
        url: '/portfolio/ecommerce-fashion/gallery-1.jpg',
        alt: 'Homepage del e-commerce',
        caption: 'Página principal con diseño moderno y navegación intuitiva',
        width: 1920,
        height: 1080,
        type: 'screenshot',
      },
      {
        id: '2',
        url: '/portfolio/ecommerce-fashion/gallery-2.jpg',
        alt: 'Página de producto',
        caption: 'Vista detallada del producto con galería interactiva',
        width: 1920,
        height: 1080,
        type: 'screenshot',
      },
      {
        id: '3',
        url: '/portfolio/ecommerce-fashion/gallery-3.jpg',
        alt: 'Carrito de compras',
        caption: 'Proceso de checkout optimizado',
        width: 1920,
        height: 1080,
        type: 'screenshot',
      },
    ],
    
    client: {
      name: 'Fashion Forward',
      logo: '/clients/fashion-forward-logo.png',
      website: 'https://fashionforward.com',
      industry: 'Moda y Retail',
      size: 'medium',
    },
    
    challenge: 'Fashion Forward necesitaba modernizar su presencia online con una plataforma que pudiera manejar alto volumen de tráfico durante temporadas pico, ofrecer una experiencia de usuario excepcional y integrar sistemas de inventario en tiempo real.',
    solution: 'Desarrollamos una plataforma e-commerce completa utilizando Next.js para el frontend, con un backend robusto en Node.js y PostgreSQL. Implementamos un sistema de caché inteligente, optimización de imágenes automática y un dashboard administrativo completo.',
    
    results: [
      {
        id: '1',
        title: 'Aumento en Conversiones',
        description: 'Incremento significativo en la tasa de conversión gracias a la UX optimizada',
        icon: '📈',
        metric: '+45%',
      },
      {
        id: '2',
        title: 'Reducción en Tiempo de Carga',
        description: 'Mejora en la velocidad de carga de páginas',
        icon: '⚡',
        metric: '-60%',
      },
      {
        id: '3',
        title: 'Incremento en Ventas',
        description: 'Aumento en ventas online durante los primeros 6 meses',
        icon: '💰',
        metric: '+120%',
      },
    ],
    
    metrics: [
      {
        id: '1',
        label: 'Tasa de Conversión',
        value: '3.8%',
        change: '+45%',
        changeType: 'positive',
        icon: '📊',
      },
      {
        id: '2',
        label: 'Tiempo de Carga',
        value: '1.2s',
        change: '-60%',
        changeType: 'positive',
        icon: '⚡',
      },
      {
        id: '3',
        label: 'Ventas Mensuales',
        value: '$85,000',
        change: '+120%',
        changeType: 'positive',
        icon: '💰',
      },
      {
        id: '4',
        label: 'Usuarios Activos',
        value: '12,500',
        change: '+80%',
        changeType: 'positive',
        icon: '👥',
      },
    ],
    
    beforeAfter: [
      {
        before: '/portfolio/ecommerce-fashion/before-homepage.jpg',
        after: '/portfolio/ecommerce-fashion/after-homepage.jpg',
        description: 'Rediseño completo de la página principal con enfoque en conversión',
      },
      {
        before: '/portfolio/ecommerce-fashion/before-product.jpg',
        after: '/portfolio/ecommerce-fashion/after-product.jpg',
        description: 'Optimización de la página de producto con mejor presentación visual',
      },
    ],
    
    testimonial: {
      quote: 'El equipo de Plalz transformó completamente nuestra presencia online. Las ventas se han duplicado y nuestros clientes están encantados con la nueva experiencia.',
      author: 'María González',
      position: 'CEO, Fashion Forward',
      avatar: '/testimonials/maria-gonzalez.jpg',
      rating: 5,
    },
    
    duration: '4 meses',
    teamSize: 5,
    budget: '$45,000 - $60,000',
    launchDate: new Date('2024-01-15'),
    
    seo: {
      metaTitle: 'Plataforma E-commerce de Moda - Caso de Estudio | Plalz',
      metaDescription: 'Descubre cómo transformamos la presencia digital de Fashion Forward con una plataforma e-commerce que incrementó las ventas en 120%.',
      keywords: ['ecommerce', 'moda', 'nextjs', 'desarrollo web', 'ux design'],
      ogImage: '/portfolio/ecommerce-fashion/og-image.jpg',
    },
    
    awards: [
      {
        id: '1',
        title: 'Best E-commerce Design',
        organization: 'Web Design Awards',
        year: 2024,
        category: 'E-commerce',
        image: '/awards/web-design-awards.png',
      },
    ],
    
    relatedProjects: ['2', '3'],
  },
  
  {
    id: '2',
    slug: 'healthcare-management-system',
    title: 'Sistema de Gestión Hospitalaria',
    subtitle: 'Digitalización completa de procesos médicos',
    description: 'Desarrollo de un sistema integral de gestión hospitalaria que incluye historiales médicos electrónicos, sistema de citas, gestión de inventario médico y dashboard analítico para administradores.',
    shortDescription: 'Sistema integral para gestión hospitalaria con historiales electrónicos y analytics.',
    category: 'webapp',
    industry: 'healthcare',
    year: 2023,
    technologies: [
      TECHNOLOGIES.find(t => t.id === 'react')!,
      TECHNOLOGIES.find(t => t.id === 'nodejs')!,
      TECHNOLOGIES.find(t => t.id === 'postgresql')!,
      TECHNOLOGIES.find(t => t.id === 'aws')!,
    ],
    status: 'completed',
    featured: true,
    
    thumbnail: '/portfolio/healthcare-system/thumbnail.jpg',
    heroImage: '/portfolio/healthcare-system/hero.jpg',
    gallery: [
      {
        id: '1',
        url: '/portfolio/healthcare-system/dashboard.jpg',
        alt: 'Dashboard principal del sistema',
        caption: 'Vista general del dashboard con métricas en tiempo real',
        width: 1920,
        height: 1080,
        type: 'screenshot',
      },
      {
        id: '2',
        url: '/portfolio/healthcare-system/patient-record.jpg',
        alt: 'Historial médico electrónico',
        caption: 'Interface para gestión de historiales médicos',
        width: 1920,
        height: 1080,
        type: 'screenshot',
      },
    ],
    
    client: {
      name: 'Hospital San Rafael',
      logo: '/images/clients/hospital-san-rafael.png',
      industry: 'Salud y Medicina',
      website: 'https://hospitalsanrafael.com',
      size: 'enterprise',
    },
    
    challenge: 'El hospital necesitaba digitalizar sus procesos manuales, reducir errores médicos y mejorar la eficiencia operativa. Los historiales en papel generaban pérdidas de tiempo y riesgos de seguridad.',
    solution: 'Desarrollamos un sistema web completo con módulos para gestión de pacientes, citas, inventario médico y reportes. Implementamos medidas de seguridad avanzadas y cumplimiento con normativas de salud.',
    
    results: [
      {
        id: '1',
        title: 'Reducción de Errores',
        description: 'Disminución significativa en errores médicos',
        icon: '🎯',
        metric: '-75%',
      },
      {
        id: '2',
        title: 'Eficiencia Operativa',
        description: 'Mejora en tiempos de atención',
        icon: '⚡',
        metric: '+40%',
      },
      {
        id: '3',
        title: 'Satisfacción del Personal',
        description: 'Incremento en satisfacción del personal médico',
        icon: '😊',
        metric: '+85%',
      },
    ],
    
    metrics: [
      {
        id: '1',
        label: 'Tiempo de Consulta',
        value: '15 min',
        change: '-40%',
        changeType: 'positive',
        icon: '⏱️',
      },
      {
        id: '2',
        label: 'Errores Médicos',
        value: '0.2%',
        change: '-75%',
        changeType: 'positive',
        icon: '🎯',
      },
      {
        id: '3',
        label: 'Pacientes/Día',
        value: '450',
        change: '+25%',
        changeType: 'positive',
        icon: '👥',
      },
    ],
    
    testimonial: {
      quote: 'La implementación del sistema ha revolucionado nuestros procesos. Ahora podemos atender más pacientes con mayor calidad y seguridad.',
      author: 'Dr. Carlos Mendoza',
      position: 'Director Médico, Hospital San Rafael',
      avatar: '/testimonials/carlos-mendoza.jpg',
      rating: 5,
    },
    
    duration: '8 meses',
    teamSize: 7,
    budget: '$80,000 - $120,000',
    launchDate: new Date('2023-06-20'),
    
    seo: {
      metaTitle: 'Sistema de Gestión Hospitalaria - Caso de Estudio | Plalz',
      metaDescription: 'Conoce cómo digitalizamos los procesos del Hospital San Rafael, reduciendo errores médicos en 75% y mejorando la eficiencia operativa.',
      keywords: ['sistema hospitalario', 'salud digital', 'react', 'gestión médica'],
      ogImage: '/portfolio/healthcare-system/og-image.jpg',
    },
    
    relatedProjects: ['1', '4'],
  },
  
  {
    id: '3',
    slug: 'fintech-mobile-app',
    title: 'App Móvil Fintech',
    subtitle: 'Aplicación de banca digital para millennials',
    description: 'Desarrollo de una aplicación móvil fintech completa con funciones de banca digital, inversiones, presupuestos inteligentes y educación financiera.',
    shortDescription: 'App fintech con banca digital, inversiones y educación financiera.',
    category: 'mobile',
    industry: 'finance',
    year: 2024,
    technologies: [
      TECHNOLOGIES.find(t => t.id === 'react')!,
      TECHNOLOGIES.find(t => t.id === 'nodejs')!,
      TECHNOLOGIES.find(t => t.id === 'mongodb')!,
      TECHNOLOGIES.find(t => t.id === 'aws')!,
    ],
    status: 'completed',
    featured: true,
    
    thumbnail: '/portfolio/fintech-app/thumbnail.jpg',
    heroImage: '/portfolio/fintech-app/hero.jpg',
    gallery: [
      {
        id: '1',
        url: '/portfolio/fintech-app/app-screens.jpg',
        alt: 'Pantallas principales de la app',
        caption: 'Interface principal con dashboard financiero',
        width: 1920,
        height: 1080,
        type: 'mockup',
      },
    ],
    
    client: {
      name: 'FinanceFlow',
      logo: '/clients/financeflow-logo.png',
      website: 'https://financeflow.app',
      industry: 'Fintech',
      size: 'startup',
    },
    
    challenge: 'FinanceFlow quería crear una app que simplificara la gestión financiera para millennials, combinando banca tradicional con herramientas de inversión y educación financiera.',
    solution: 'Desarrollamos una app móvil nativa con React Native, implementando funciones de banca digital, robo-advisor para inversiones, presupuestos automáticos y contenido educativo gamificado.',
    
    results: [
      {
        id: '1',
        title: 'Usuarios Registrados',
        description: 'Crecimiento en base de usuarios',
        icon: '📱',
        metric: '50K+',
      },
      {
        id: '2',
        title: 'Retención de Usuarios',
        description: 'Usuarios activos después de 30 días',
        icon: '🔄',
        metric: '78%',
      },
      {
        id: '3',
        title: 'Rating en Stores',
        description: 'Calificación promedio en app stores',
        icon: '⭐',
        metric: '4.8/5',
      },
    ],
    
    metrics: [
      {
        id: '1',
        label: 'Descargas',
        value: '50,000+',
        change: 'Nuevo',
        changeType: 'positive',
        icon: '📱',
      },
      {
        id: '2',
        label: 'Retención 30d',
        value: '78%',
        change: 'Objetivo: 70%',
        changeType: 'positive',
        icon: '🔄',
      },
      {
        id: '3',
        label: 'Transacciones/mes',
        value: '125K',
        change: '+200%',
        changeType: 'positive',
        icon: '💳',
      },
    ],
    
    testimonial: {
      quote: 'Plalz entendió perfectamente nuestra visión y creó una app que supera las expectativas. Nuestros usuarios están encantados con la experiencia.',
      author: 'Ana Rodríguez',
      position: 'CEO, FinanceFlow',
      avatar: '/testimonials/ana-rodriguez.jpg',
      rating: 5,
    },
    
    duration: '6 meses',
    teamSize: 6,
    budget: '$60,000 - $80,000',
    launchDate: new Date('2024-03-10'),
    
    seo: {
      metaTitle: 'App Móvil Fintech - Caso de Estudio | Plalz',
      metaDescription: 'Descubre cómo desarrollamos una app fintech que alcanzó 50K usuarios y 78% de retención en sus primeros meses.',
      keywords: ['app móvil', 'fintech', 'react native', 'banca digital'],
      ogImage: '/portfolio/fintech-app/og-image.jpg',
    },
    
    relatedProjects: ['1', '2'],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    slug: 'ecommerce-conversion-optimization',
    title: 'Optimización de Conversión E-commerce',
    subtitle: 'Cómo incrementamos las ventas en 120% en 6 meses',
    description: 'Análisis detallado de la estrategia de optimización que transformó una tienda online de moda en un líder del mercado.',
    industry: 'fashion',
    projectId: '1',
    
    overview: 'Fashion Forward enfrentaba bajas tasas de conversión y abandono de carrito. Implementamos una estrategia integral de optimización que resultó en un crecimiento exponencial de ventas.',
    challenge: 'La tasa de conversión era de apenas 1.2% y el 78% de usuarios abandonaban el carrito sin completar la compra.',
    approach: 'Utilizamos análisis de comportamiento de usuario, A/B testing, optimización de UX y mejoras técnicas para crear una experiencia de compra fluida.',
    implementation: 'Rediseñamos el flujo de compra, implementamos checkout de una página, optimizamos la velocidad de carga y agregamos elementos de confianza.',
    results: 'Logramos incrementar la conversión a 3.8%, reducir el abandono de carrito a 45% y aumentar las ventas en 120%.',
    
    keyMetrics: [
      {
        id: '1',
        label: 'Tasa de Conversión',
        value: '+216%',
        description: 'De 1.2% a 3.8%',
        icon: '📈',
        highlighted: true,
      },
      {
        id: '2',
        label: 'Abandono de Carrito',
        value: '-42%',
        description: 'De 78% a 45%',
        icon: '🛒',
        highlighted: true,
      },
      {
        id: '3',
        label: 'Ventas Mensuales',
        value: '+120%',
        description: 'De $38K a $85K',
        icon: '💰',
        highlighted: true,
      },
      {
        id: '4',
        label: 'Tiempo de Carga',
        value: '-60%',
        description: 'De 3.2s a 1.2s',
        icon: '⚡',
        highlighted: false,
      },
    ],
    
    outcomes: [
      'Incremento del 120% en ventas mensuales',
      'Mejora del 216% en tasa de conversión',
      'Reducción del 42% en abandono de carrito',
      'Aumento del 80% en usuarios recurrentes',
      'Mejora del 60% en velocidad de carga',
    ],
    
    thumbnail: '/case-studies/ecommerce-optimization/thumbnail.jpg',
    images: [
      {
        id: '1',
        url: '/case-studies/ecommerce-optimization/before-after.jpg',
        alt: 'Comparación antes y después del rediseño',
        caption: 'Transformación visual del proceso de checkout',
        width: 1920,
        height: 1080,
        type: 'diagram',
      },
    ],
    
    timeline: [
      {
        id: '1',
        phase: 'Análisis y Auditoría',
        description: 'Evaluación completa del sitio actual y identificación de problemas',
        duration: '2 semanas',
        deliverables: ['Auditoría UX', 'Análisis de métricas', 'Reporte de problemas'],
      },
      {
        id: '2',
        phase: 'Diseño y Prototipado',
        description: 'Creación de nuevos diseños y prototipos interactivos',
        duration: '3 semanas',
        deliverables: ['Wireframes', 'Prototipos', 'Guía de estilo'],
      },
      {
        id: '3',
        phase: 'Desarrollo e Implementación',
        description: 'Desarrollo de las mejoras y optimizaciones técnicas',
        duration: '6 semanas',
        deliverables: ['Nuevo checkout', 'Optimizaciones', 'Testing'],
      },
      {
        id: '4',
        phase: 'Testing y Optimización',
        description: 'A/B testing y ajustes basados en datos',
        duration: '4 semanas',
        deliverables: ['A/B tests', 'Optimizaciones', 'Reporte final'],
      },
    ],
    
    seo: {
      metaTitle: 'Caso de Estudio: Optimización E-commerce +120% Ventas | Plalz',
      metaDescription: 'Descubre cómo optimizamos un e-commerce de moda y aumentamos las ventas en 120% mediante UX design y optimización técnica.',
      keywords: ['optimización ecommerce', 'conversión', 'ux design', 'caso de estudio'],
      ogImage: '/case-studies/ecommerce-optimization/og-image.jpg',
    },
    
    publishedAt: new Date('2024-02-15'),
    readTime: 8,
  },
];

export const PORTFOLIO_STATS: PortfolioStats = {
  totalProjects: 47,
  totalClients: 32,
  totalAwards: 8,
  yearsExperience: 6,
  industriesServed: 12,
  technologiesUsed: 25,
};

export const CATEGORY_CONFIG = {
  website: {
    label: 'Sitios Web',
    icon: '🌐',
    color: 'bg-blue-500',
    description: 'Sitios web corporativos y landing pages',
  },
  ecommerce: {
    label: 'E-commerce',
    icon: '🛒',
    color: 'bg-green-500',
    description: 'Tiendas online y plataformas de venta',
  },
  webapp: {
    label: 'Web Apps',
    icon: '💻',
    color: 'bg-purple-500',
    description: 'Aplicaciones web complejas',
  },
  mobile: {
    label: 'Apps Móviles',
    icon: '📱',
    color: 'bg-pink-500',
    description: 'Aplicaciones iOS y Android',
  },
  design: {
    label: 'Diseño',
    icon: '🎨',
    color: 'bg-orange-500',
    description: 'UI/UX y diseño visual',
  },
  branding: {
    label: 'Branding',
    icon: '✨',
    color: 'bg-yellow-500',
    description: 'Identidad visual y branding',
  },
  seo: {
    label: 'SEO',
    icon: '📈',
    color: 'bg-indigo-500',
    description: 'Optimización para buscadores',
  },
  marketing: {
    label: 'Marketing',
    icon: '📢',
    color: 'bg-red-500',
    description: 'Marketing digital y campañas',
  },
};

export const INDUSTRY_CONFIG = {
  technology: { label: 'Tecnología', icon: '💻' },
  healthcare: { label: 'Salud', icon: '🏥' },
  finance: { label: 'Finanzas', icon: '💰' },
  education: { label: 'Educación', icon: '🎓' },
  retail: { label: 'Retail', icon: '🛍️' },
  manufacturing: { label: 'Manufactura', icon: '🏭' },
  'real-estate': { label: 'Bienes Raíces', icon: '🏠' },
  hospitality: { label: 'Hospitalidad', icon: '🏨' },
  nonprofit: { label: 'Sin Fines de Lucro', icon: '❤️' },
  government: { label: 'Gobierno', icon: '🏛️' },
  entertainment: { label: 'Entretenimiento', icon: '🎬' },
  automotive: { label: 'Automotriz', icon: '🚗' },
  'food-beverage': { label: 'Alimentos y Bebidas', icon: '🍕' },
  fashion: { label: 'Moda', icon: '👗' },
  sports: { label: 'Deportes', icon: '⚽' },
  other: { label: 'Otros', icon: '📦' },
}; 