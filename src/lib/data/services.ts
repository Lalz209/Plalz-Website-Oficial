import { Service, ServiceCategory } from '@/lib/types/services';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'paginas-web',
    name: 'Páginas Web',
    slug: 'paginas-web',
    description: 'Desarrollo de sitios web modernos, responsivos y optimizados para conversión',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500',
    benefits: [
      'Diseño responsive para todos los dispositivos',
      'Optimización SEO incluida',
      'Velocidad de carga optimizada',
      'Panel de administración intuitivo',
      'Certificado SSL incluido',
      'Soporte técnico 24/7'
    ],
    industries: ['Corporativo', 'E-commerce', 'Educación', 'Salud', 'Restaurantes', 'Inmobiliaria'],
    startingPrice: 299,
    services: []
  },
  {
    id: 'mantenimiento',
    name: 'Mantenimiento Web',
    slug: 'mantenimiento',
    description: 'Servicios de mantenimiento continuo para mantener tu sitio web actualizado y seguro',
    icon: '🛠️',
    color: 'from-green-500 to-emerald-500',
    benefits: [
      'Actualizaciones de seguridad automáticas',
      'Backups diarios automáticos',
      'Monitoreo 24/7 del sitio',
      'Optimización continua de velocidad',
      'Soporte técnico prioritario',
      'Reportes mensuales detallados'
    ],
    industries: ['Todos los sectores'],
    startingPrice: 49,
    services: []
  }
];

export const webDevelopmentServices: Service[] = [
  {
    id: 'corporativas',
    name: 'Páginas Web Corporativas',
    slug: 'corporativas',
    category: 'paginas-web',
    description: 'Sitios web profesionales que reflejan la identidad de tu empresa y generan confianza en tus clientes',
    shortDescription: 'Sitios web profesionales para empresas',
    icon: '🏢',
    color: 'from-blue-600 to-indigo-600',
    hero: {
      title: 'Páginas Web Corporativas',
      subtitle: 'Presencia digital profesional que genera confianza',
      description: 'Desarrollamos sitios web corporativos que reflejan la profesionalidad de tu empresa, mejoran tu credibilidad y convierten visitantes en clientes potenciales.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      imageUrl: '/services/corporativas-hero.jpg',
      features: [
        'Diseño profesional y moderno',
        'Optimización para conversión',
        'Panel de administración',
        'Integración con CRM',
        'Certificado SSL incluido'
      ]
    },
    benefits: [
      'Aumenta la credibilidad de tu empresa',
      'Mejora la generación de leads',
      'Facilita la comunicación con clientes',
      'Optimiza la presencia en buscadores',
      'Reduce costos de marketing tradicional'
    ],
    targetAudience: [
      'Empresas establecidas',
      'Startups en crecimiento',
      'Profesionales independientes',
      'Consultorías y servicios',
      'Empresas B2B'
    ],
    qualificationQuestions: [
      {
        id: 'company-size',
        question: '¿Cuál es el tamaño de tu empresa?',
        type: 'radio',
        options: ['1-10 empleados', '11-50 empleados', '51-200 empleados', '200+ empleados'],
        weight: 3,
        category: 'company'
      },
      {
        id: 'current-website',
        question: '¿Actualmente tienes un sitio web?',
        type: 'radio',
        options: ['No tengo sitio web', 'Tengo uno pero necesita renovación', 'Tengo uno reciente'],
        weight: 2,
        category: 'current-state'
      },
      {
        id: 'main-goals',
        question: '¿Cuáles son tus objetivos principales? (selecciona todos los que apliquen)',
        type: 'checkbox',
        options: [
          'Generar más leads',
          'Mejorar credibilidad',
          'Mostrar productos/servicios',
          'Facilitar contacto',
          'Mejorar posicionamiento en Google'
        ],
        weight: 4,
        category: 'goals'
      }
    ],
    process: [
      {
        id: 1,
        title: 'Análisis y Estrategia',
        description: 'Analizamos tu empresa, competencia y objetivos',
        duration: '2-3 días',
        icon: '🔍',
        details: [
          'Reunión inicial para entender tus necesidades',
          'Análisis de competencia y mercado',
          'Definición de objetivos y KPIs',
          'Creación de estrategia digital'
        ]
      },
      {
        id: 2,
        title: 'Diseño y Prototipo',
        description: 'Creamos el diseño visual y la estructura del sitio',
        duration: '5-7 días',
        icon: '🎨',
        details: [
          'Wireframes y arquitectura de información',
          'Diseño visual y mockups',
          'Prototipo interactivo',
          'Revisiones y ajustes'
        ]
      },
      {
        id: 3,
        title: 'Desarrollo',
        description: 'Programamos tu sitio web con las mejores tecnologías',
        duration: '7-10 días',
        icon: '💻',
        details: [
          'Desarrollo frontend responsive',
          'Programación backend y base de datos',
          'Integración de funcionalidades',
          'Optimización de velocidad'
        ]
      },
      {
        id: 4,
        title: 'Testing y Lanzamiento',
        description: 'Probamos todo y lanzamos tu sitio web',
        duration: '2-3 días',
        icon: '🚀',
        details: [
          'Testing en múltiples dispositivos',
          'Optimización SEO técnico',
          'Configuración de hosting y dominio',
          'Lanzamiento y monitoreo'
        ]
      }
    ],
    packages: [
      {
        id: 'basico',
        name: 'Básico',
        price: 299,
        duration: '2-3 semanas',
        description: 'Perfecto para empresas que necesitan presencia digital básica',
        features: [
          'Hasta 5 páginas',
          'Diseño responsive',
          'Formulario de contacto',
          'Optimización SEO básica',
          'Certificado SSL',
          '1 mes de soporte'
        ]
      },
      {
        id: 'profesional',
        name: 'Profesional',
        price: 599,
        originalPrice: 799,
        duration: '3-4 semanas',
        description: 'La opción más popular para empresas en crecimiento',
        features: [
          'Hasta 10 páginas',
          'Diseño personalizado',
          'Panel de administración',
          'Blog integrado',
          'Optimización SEO avanzada',
          'Integración con redes sociales',
          'Analytics configurado',
          '3 meses de soporte'
        ],
        popular: true
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 999,
        duration: '4-6 semanas',
        description: 'Solución completa para empresas establecidas',
        features: [
          'Páginas ilimitadas',
          'Diseño completamente personalizado',
          'Panel de administración avanzado',
          'Blog y noticias',
          'Optimización SEO premium',
          'Integración con CRM',
          'Chat en vivo',
          'Múltiples idiomas',
          'Analytics avanzado',
          '6 meses de soporte'
        ],
        recommended: true
      }
    ],
    caseStudies: [
      {
        id: 'consultoria-cr',
        title: 'Transformación Digital de Consultoría CR',
        client: 'Consultoría CR',
        industry: 'Consultoría Empresarial',
        challenge: 'La empresa tenía un sitio web desactualizado que no generaba leads y no reflejaba su profesionalismo.',
        solution: 'Desarrollamos un sitio web corporativo moderno con enfoque en generación de leads y optimización SEO.',
        results: [
          {
            metric: 'Leads mensuales',
            before: '5',
            after: '25',
            improvement: '+400%'
          },
          {
            metric: 'Tiempo en sitio',
            before: '45 seg',
            after: '2:30 min',
            improvement: '+233%'
          },
          {
            metric: 'Posición en Google',
            before: 'Página 3+',
            after: 'Top 3',
            improvement: 'Primera página'
          }
        ],
        testimonial: {
          quote: 'El nuevo sitio web transformó completamente nuestra presencia digital. Ahora generamos 5 veces más leads y nuestros clientes nos perciben como una empresa mucho más profesional.',
          author: 'Carlos Rodríguez',
          position: 'CEO',
          company: 'Consultoría CR',
          avatar: '/testimonials/carlos.jpg'
        },
        images: {
          before: '/case-studies/consultoria-before.jpg',
          after: '/case-studies/consultoria-after.jpg'
        },
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Strapi CMS'],
        duration: '3 semanas',
        url: 'https://consultoriacr.com'
      }
    ],
    faqs: [
      {
        id: 'tiempo-desarrollo',
        question: '¿Cuánto tiempo toma desarrollar una página web corporativa?',
        answer: 'El tiempo de desarrollo varía según el paquete elegido. El paquete Básico toma 2-3 semanas, el Profesional 3-4 semanas, y el Premium 4-6 semanas. Esto incluye diseño, desarrollo, testing y lanzamiento.'
      },
      {
        id: 'que-incluye',
        question: '¿Qué incluye exactamente el desarrollo?',
        answer: 'Incluye análisis inicial, diseño personalizado, desarrollo completo, optimización SEO, certificado SSL, configuración de hosting, capacitación para usar el panel de administración y soporte post-lanzamiento según el paquete elegido.'
      },
      {
        id: 'modificaciones',
        question: '¿Puedo hacer modificaciones después del lanzamiento?',
        answer: 'Sí, todos nuestros sitios incluyen un panel de administración fácil de usar para que puedas actualizar contenido. Para modificaciones de diseño o funcionalidad, ofrecemos servicios de mantenimiento y desarrollo adicional.'
      },
      {
        id: 'hosting-dominio',
        question: '¿El hosting y dominio están incluidos?',
        answer: 'El primer año de hosting está incluido en todos los paquetes. El dominio (.com, .es, etc.) tiene un costo adicional de €15/año. Te ayudamos con todo el proceso de configuración.'
      }
    ],
    relatedServices: ['e-commerce', 'landing-pages', 'mantenimiento-diseno'],
    seo: {
      title: 'Páginas Web Corporativas Profesionales | Desarrollo Web Plalz',
      description: 'Desarrollamos sitios web corporativos que generan confianza y convierten visitantes en clientes. Diseño profesional, optimización SEO y soporte incluido. Desde €299.',
      keywords: ['páginas web corporativas', 'sitios web empresariales', 'desarrollo web profesional', 'diseño web corporativo']
    }
  },
  {
    id: 'e-commerce',
    name: 'Tiendas Online (E-commerce)',
    slug: 'e-commerce',
    category: 'paginas-web',
    description: 'Tiendas online completas con sistema de pagos, gestión de inventario y panel de administración',
    shortDescription: 'Tiendas online completas y optimizadas',
    icon: '🛒',
    color: 'from-purple-600 to-pink-600',
    hero: {
      title: 'Tiendas Online (E-commerce)',
      subtitle: 'Vende online las 24 horas del día',
      description: 'Desarrollamos tiendas online completas que te permiten vender tus productos las 24 horas del día con sistema de pagos seguro, gestión de inventario y análisis de ventas.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      imageUrl: '/services/ecommerce-hero.jpg',
      features: [
        'Sistema de pagos integrado',
        'Gestión de inventario',
        'Panel de administración',
        'Análisis de ventas',
        'Optimización para móviles'
      ]
    },
    benefits: [
      'Vende las 24 horas del día',
      'Reduce costos operativos',
      'Amplía tu mercado geográfico',
      'Automatiza procesos de venta',
      'Obtén datos valiosos de clientes'
    ],
    targetAudience: [
      'Tiendas físicas que quieren vender online',
      'Emprendedores con productos',
      'Mayoristas y distribuidores',
      'Artesanos y creadores',
      'Empresas con catálogo de productos'
    ],
    qualificationQuestions: [
      {
        id: 'product-count',
        question: '¿Cuántos productos planeas vender?',
        type: 'radio',
        options: ['1-50 productos', '51-200 productos', '201-1000 productos', '1000+ productos'],
        weight: 4,
        category: 'scale'
      },
      {
        id: 'payment-methods',
        question: '¿Qué métodos de pago necesitas?',
        type: 'checkbox',
        options: ['Tarjeta de crédito/débito', 'PayPal', 'Transferencia bancaria', 'Pago contra entrega', 'Bizum'],
        weight: 3,
        category: 'payments'
      },
      {
        id: 'shipping',
        question: '¿Cómo planeas enviar los productos?',
        type: 'checkbox',
        options: ['Envío nacional', 'Envío internacional', 'Recogida en tienda', 'Entrega local'],
        weight: 2,
        category: 'logistics'
      }
    ],
    process: [
      {
        id: 1,
        title: 'Planificación E-commerce',
        description: 'Definimos la estrategia de tu tienda online',
        duration: '3-5 días',
        icon: '📋',
        details: [
          'Análisis de productos y categorías',
          'Definición de métodos de pago',
          'Planificación de logística y envíos',
          'Estrategia de precios y promociones'
        ]
      },
      {
        id: 2,
        title: 'Diseño UX/UI',
        description: 'Diseñamos una experiencia de compra optimizada',
        duration: '7-10 días',
        icon: '🎨',
        details: [
          'Diseño de catálogo de productos',
          'Optimización del proceso de compra',
          'Diseño responsive para móviles',
          'Prototipo interactivo'
        ]
      },
      {
        id: 3,
        title: 'Desarrollo y Configuración',
        description: 'Programamos tu tienda con todas las funcionalidades',
        duration: '10-15 días',
        icon: '⚙️',
        details: [
          'Desarrollo de la tienda online',
          'Configuración de pagos y envíos',
          'Integración con sistemas de inventario',
          'Panel de administración personalizado'
        ]
      },
      {
        id: 4,
        title: 'Testing y Lanzamiento',
        description: 'Probamos todos los procesos y lanzamos',
        duration: '3-5 días',
        icon: '🚀',
        details: [
          'Testing de proceso de compra',
          'Pruebas de pagos y envíos',
          'Optimización de velocidad',
          'Lanzamiento y configuración de analytics'
        ]
      }
    ],
    packages: [
      {
        id: 'starter',
        name: 'Starter',
        price: 599,
        duration: '3-4 semanas',
        description: 'Perfecto para empezar a vender online',
        features: [
          'Hasta 100 productos',
          'Diseño responsive',
          'Sistema de pagos básico',
          'Gestión de inventario',
          'Panel de administración',
          'Certificado SSL',
          '2 meses de soporte'
        ]
      },
      {
        id: 'business',
        name: 'Business',
        price: 999,
        originalPrice: 1299,
        duration: '4-6 semanas',
        description: 'La opción más popular para tiendas en crecimiento',
        features: [
          'Hasta 500 productos',
          'Diseño personalizado',
          'Múltiples métodos de pago',
          'Sistema de envíos avanzado',
          'Cupones y descuentos',
          'Integración con redes sociales',
          'Analytics de ventas',
          'SEO optimizado',
          '4 meses de soporte'
        ],
        popular: true
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 1999,
        duration: '6-8 semanas',
        description: 'Solución completa para grandes volúmenes',
        features: [
          'Productos ilimitados',
          'Diseño completamente personalizado',
          'Integración con ERP/CRM',
          'Múltiples idiomas y monedas',
          'Sistema de afiliados',
          'Marketplace integrado',
          'API personalizada',
          'Soporte prioritario 24/7',
          '6 meses de soporte'
        ],
        recommended: true
      }
    ],
    caseStudies: [
      {
        id: 'boutique-luna',
        title: 'Boutique Luna: De tienda física a éxito online',
        client: 'Boutique Luna',
        industry: 'Moda y Accesorios',
        challenge: 'Boutique Luna necesitaba expandir sus ventas más allá de su tienda física y llegar a más clientes.',
        solution: 'Desarrollamos una tienda online elegante con catálogo completo, sistema de pagos seguro y optimización para móviles.',
        results: [
          {
            metric: 'Ventas online',
            before: '€0',
            after: '€15,000/mes',
            improvement: 'Nuevo canal'
          },
          {
            metric: 'Clientes nuevos',
            before: '50/mes',
            after: '200/mes',
            improvement: '+300%'
          },
          {
            metric: 'Ticket promedio',
            before: '€45',
            after: '€65',
            improvement: '+44%'
          }
        ],
        testimonial: {
          quote: 'La tienda online cambió completamente nuestro negocio. Ahora vendemos las 24 horas y hemos triplicado nuestros ingresos. El panel de administración es súper fácil de usar.',
          author: 'María González',
          position: 'Propietaria',
          company: 'Boutique Luna',
          avatar: '/testimonials/maria.jpg'
        },
        images: {
          before: '/case-studies/boutique-before.jpg',
          after: '/case-studies/boutique-after.jpg'
        },
        technologies: ['WooCommerce', 'WordPress', 'Stripe', 'Mailchimp'],
        duration: '5 semanas',
        url: 'https://boutiqueluna.com'
      }
    ],
    faqs: [
      {
        id: 'comisiones-ventas',
        question: '¿Cobran comisión por las ventas?',
        answer: 'No, no cobramos ninguna comisión por tus ventas. Solo pagas el precio del desarrollo inicial y el mantenimiento opcional. Las únicas comisiones son las de las pasarelas de pago (Stripe, PayPal, etc.) que son estándar del mercado.'
      },
      {
        id: 'metodos-pago',
        question: '¿Qué métodos de pago puedo ofrecer?',
        answer: 'Integramos múltiples métodos de pago: tarjetas de crédito/débito, PayPal, Bizum, transferencia bancaria y pago contra entrega. También podemos integrar métodos específicos según tu país o necesidades.'
      },
      {
        id: 'gestion-inventario',
        question: '¿Cómo funciona la gestión de inventario?',
        answer: 'Incluimos un sistema completo de gestión de inventario donde puedes controlar stock, recibir alertas de productos agotados, gestionar variantes (tallas, colores) y sincronizar con tu inventario físico si tienes tienda.'
      },
      {
        id: 'envios-logistica',
        question: '¿Cómo manejo los envíos?',
        answer: 'Configuramos zonas de envío, calculadoras de costos automáticas e integración con empresas de mensajería. También incluimos sistema de tracking para que tus clientes puedan seguir sus pedidos.'
      }
    ],
    relatedServices: ['corporativas', 'mantenimiento-contenido', 'seo'],
    seo: {
      title: 'Tiendas Online E-commerce Profesionales | Desarrollo Plalz',
      description: 'Desarrollamos tiendas online completas que venden 24/7. Sistema de pagos, inventario y panel de administración incluidos. Desde €599.',
      keywords: ['tienda online', 'e-commerce', 'desarrollo tienda virtual', 'venta online']
    }
  },
  {
    id: 'landing-pages',
    name: 'Landing Pages',
    slug: 'landing-pages',
    category: 'paginas-web',
    description: 'Páginas de aterrizaje optimizadas para conversión y campañas de marketing',
    shortDescription: 'Páginas optimizadas para conversión',
    icon: '🎯',
    color: 'from-orange-600 to-red-600',
    hero: {
      title: 'Landing Pages de Alta Conversión',
      subtitle: 'Convierte más visitantes en clientes',
      description: 'Diseñamos landing pages optimizadas específicamente para convertir visitantes en leads y ventas, perfectas para campañas de marketing digital.',
      imageUrl: '/services/landing-pages-hero.jpg',
      features: [
        'Diseño optimizado para conversión',
        'A/B testing incluido',
        'Integración con herramientas de marketing',
        'Formularios optimizados',
        'Analytics y seguimiento'
      ]
    },
    benefits: [
      'Aumenta la tasa de conversión',
      'Reduce el costo por lead',
      'Mejora el ROI de campañas',
      'Facilita el seguimiento de resultados',
      'Optimiza la experiencia del usuario'
    ],
    targetAudience: [
      'Empresas con campañas de marketing',
      'Startups lanzando productos',
      'Agencias de marketing',
      'E-commerce con promociones',
      'Empresas de servicios B2B'
    ],
    qualificationQuestions: [
      {
        id: 'campaign-type',
        question: '¿Para qué tipo de campaña necesitas la landing page?',
        type: 'radio',
        options: ['Google Ads', 'Facebook Ads', 'Email Marketing', 'Lanzamiento de producto', 'Generación de leads'],
        weight: 4,
        category: 'campaign'
      },
      {
        id: 'conversion-goal',
        question: '¿Cuál es tu objetivo principal?',
        type: 'radio',
        options: ['Generar leads', 'Vender producto', 'Descargas', 'Registros', 'Suscripciones'],
        weight: 3,
        category: 'goals'
      }
    ],
    process: [
      {
        id: 1,
        title: 'Estrategia de Conversión',
        description: 'Definimos la estrategia y objetivos de conversión',
        duration: '1-2 días',
        icon: '🎯',
        details: [
          'Análisis de audiencia objetivo',
          'Definición de propuesta de valor',
          'Estrategia de conversión',
          'Planificación de A/B testing'
        ]
      },
      {
        id: 2,
        title: 'Diseño UX/UI',
        description: 'Diseñamos la experiencia optimizada para conversión',
        duration: '2-3 días',
        icon: '🎨',
        details: [
          'Wireframes optimizados',
          'Diseño visual persuasivo',
          'Optimización de formularios',
          'Call-to-actions estratégicos'
        ]
      },
      {
        id: 3,
        title: 'Desarrollo y Testing',
        description: 'Desarrollamos y optimizamos la landing page',
        duration: '3-5 días',
        icon: '💻',
        details: [
          'Desarrollo responsive',
          'Integración con herramientas',
          'Configuración de analytics',
          'Testing de conversión'
        ]
      },
      {
        id: 4,
        title: 'Lanzamiento y Optimización',
        description: 'Lanzamos y optimizamos basado en datos',
        duration: '1-2 días',
        icon: '🚀',
        details: [
          'Lanzamiento y monitoreo',
          'Configuración de seguimiento',
          'Análisis inicial de resultados',
          'Recomendaciones de optimización'
        ]
      }
    ],
    packages: [
      {
        id: 'basico',
        name: 'Básico',
        price: 199,
        duration: '1 semana',
        description: 'Landing page esencial para campañas básicas',
        features: [
          '1 landing page',
          'Diseño responsive',
          'Formulario de contacto',
          'Integración con Google Analytics',
          'Optimización básica SEO',
          '1 mes de soporte'
        ]
      },
      {
        id: 'profesional',
        name: 'Profesional',
        price: 399,
        duration: '1-2 semanas',
        description: 'Landing page optimizada con A/B testing',
        features: [
          '1 landing page + variante A/B',
          'Diseño personalizado',
          'Formularios avanzados',
          'Integración con CRM',
          'Heatmaps y analytics',
          'Optimización de conversión',
          '3 meses de soporte'
        ],
        popular: true
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 699,
        duration: '2-3 semanas',
        description: 'Campaña completa con múltiples landing pages',
        features: [
          '3 landing pages',
          'Múltiples variantes A/B',
          'Diseño completamente personalizado',
          'Integración completa con marketing tools',
          'Dashboard de conversiones',
          'Optimización continua',
          '6 meses de soporte'
        ]
      }
    ],
    caseStudies: [
      {
        id: 'startup-tech',
        title: 'Startup Tech: 300% más conversiones',
        client: 'TechStart Solutions',
        industry: 'Tecnología',
        challenge: 'Necesitaban una landing page para su campaña de lanzamiento de producto que convirtiera visitantes en usuarios beta.',
        solution: 'Creamos una landing page optimizada con A/B testing y formularios inteligentes.',
        results: [
          {
            metric: 'Tasa de conversión',
            before: '2.1%',
            after: '8.4%',
            improvement: '+300%'
          },
          {
            metric: 'Costo por lead',
            before: '€45',
            after: '€12',
            improvement: '-73%'
          },
          {
            metric: 'Registros beta',
            before: '50/mes',
            after: '600/mes',
            improvement: '+1100%'
          }
        ],
        testimonial: {
          quote: 'La landing page superó todas nuestras expectativas. No solo aumentó nuestras conversiones, sino que redujo significativamente nuestro costo de adquisición.',
          author: 'Ana Martínez',
          position: 'CMO',
          company: 'TechStart Solutions',
          avatar: '/testimonials/ana.jpg'
        },
        images: {
          before: '/case-studies/techstart-before.jpg',
          after: '/case-studies/techstart-after.jpg'
        },
        technologies: ['Next.js', 'Tailwind CSS', 'Google Analytics', 'Hotjar'],
        duration: '2 semanas'
      }
    ],
    faqs: [
      {
        id: 'diferencia-landing-web',
        question: '¿Cuál es la diferencia entre una landing page y una página web?',
        answer: 'Una landing page está diseñada específicamente para un objetivo de conversión único (como generar leads o ventas), mientras que una página web corporativa tiene múltiples objetivos y páginas. Las landing pages son más efectivas para campañas de marketing específicas.'
      },
      {
        id: 'tiempo-resultados',
        question: '¿Cuánto tiempo toma ver resultados?',
        answer: 'Los resultados se pueden ver inmediatamente después del lanzamiento. Sin embargo, recomendamos al menos 2-4 semanas de datos para hacer optimizaciones significativas basadas en el comportamiento real de los usuarios.'
      },
      {
        id: 'ab-testing',
        question: '¿Qué es el A/B testing y por qué es importante?',
        answer: 'El A/B testing consiste en crear dos versiones de la misma página para probar cuál convierte mejor. Es importante porque te permite optimizar continuamente y aumentar las conversiones basándote en datos reales, no suposiciones.'
      },
      {
        id: 'integraciones',
        question: '¿Se puede integrar con mis herramientas de marketing?',
        answer: 'Sí, integramos con las principales herramientas como Google Ads, Facebook Pixel, Mailchimp, HubSpot, Salesforce, y muchas más. Esto permite un seguimiento completo del customer journey.'
      }
    ],
    relatedServices: ['corporativas', 'e-commerce', 'seo'],
    seo: {
      title: 'Landing Pages de Alta Conversión | Diseño Web Plalz',
      description: 'Diseñamos landing pages optimizadas que convierten más visitantes en clientes. A/B testing, integración con herramientas de marketing y soporte incluido. Desde €199.',
      keywords: ['landing pages', 'páginas de aterrizaje', 'conversión', 'marketing digital']
    }
  },
  {
    id: 'blogs',
    name: 'Blogs Profesionales',
    slug: 'blogs',
    category: 'paginas-web',
    description: 'Blogs optimizados para SEO y engagement que posicionan tu marca como autoridad en tu sector',
    shortDescription: 'Blogs profesionales optimizados para SEO',
    icon: '📝',
    color: 'from-green-600 to-teal-600',
    hero: {
      title: 'Blogs Profesionales',
      subtitle: 'Posiciona tu marca como autoridad en tu sector',
      description: 'Creamos blogs profesionales optimizados para SEO que atraen tráfico orgánico, generan leads y establecen tu marca como líder de opinión en tu industria.',
      imageUrl: '/services/blogs-hero.jpg',
      features: [
        'Diseño optimizado para lectura',
        'SEO técnico avanzado',
        'Sistema de gestión de contenido',
        'Integración con redes sociales',
        'Analytics y métricas de engagement'
      ]
    },
    benefits: [
      'Mejora el posicionamiento SEO',
      'Genera tráfico orgánico cualificado',
      'Establece autoridad en tu sector',
      'Crea una comunidad de lectores',
      'Genera leads de forma natural'
    ],
    targetAudience: [
      'Empresas de servicios profesionales',
      'Consultores y expertos',
      'Agencias de marketing',
      'E-commerce con contenido',
      'Empresas B2B'
    ],
    qualificationQuestions: [
      {
        id: 'content-frequency',
        question: '¿Con qué frecuencia planeas publicar contenido?',
        type: 'radio',
        options: ['Diario', 'Semanal', 'Quincenal', 'Mensual'],
        weight: 3,
        category: 'content'
      },
      {
        id: 'blog-goals',
        question: '¿Cuáles son tus objetivos principales con el blog?',
        type: 'checkbox',
        options: ['Mejorar SEO', 'Generar leads', 'Establecer autoridad', 'Educar clientes', 'Aumentar ventas'],
        weight: 4,
        category: 'goals'
      }
    ],
    process: [
      {
        id: 1,
        title: 'Estrategia de Contenido',
        description: 'Definimos la estrategia y arquitectura del blog',
        duration: '2-3 días',
        icon: '📋',
        details: [
          'Investigación de palabras clave',
          'Análisis de competencia',
          'Definición de categorías',
          'Estrategia de contenido'
        ]
      },
      {
        id: 2,
        title: 'Diseño y UX',
        description: 'Diseñamos la experiencia de lectura perfecta',
        duration: '3-5 días',
        icon: '🎨',
        details: [
          'Diseño optimizado para lectura',
          'Navegación intuitiva',
          'Diseño responsive',
          'Optimización de velocidad'
        ]
      },
      {
        id: 3,
        title: 'Desarrollo y CMS',
        description: 'Desarrollamos el blog con CMS fácil de usar',
        duration: '5-7 días',
        icon: '💻',
        details: [
          'Desarrollo del blog',
          'Configuración de CMS',
          'Optimización SEO técnico',
          'Integración con herramientas'
        ]
      },
      {
        id: 4,
        title: 'Lanzamiento y Capacitación',
        description: 'Lanzamos el blog y te capacitamos',
        duration: '1-2 días',
        icon: '🚀',
        details: [
          'Lanzamiento del blog',
          'Capacitación en CMS',
          'Configuración de analytics',
          'Guía de mejores prácticas'
        ]
      }
    ],
    packages: [
      {
        id: 'basico',
        name: 'Básico',
        price: 399,
        duration: '2 semanas',
        description: 'Blog profesional para empezar',
        features: [
          'Diseño responsive',
          'CMS fácil de usar',
          'Optimización SEO básica',
          'Integración con redes sociales',
          'Google Analytics',
          '2 meses de soporte'
        ]
      },
      {
        id: 'profesional',
        name: 'Profesional',
        price: 699,
        duration: '3 semanas',
        description: 'Blog optimizado para crecimiento',
        features: [
          'Diseño personalizado',
          'SEO técnico avanzado',
          'Newsletter integrado',
          'Comentarios y engagement',
          'Optimización de velocidad',
          'Analytics avanzado',
          '4 meses de soporte'
        ],
        popular: true
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 1199,
        duration: '4 semanas',
        description: 'Blog completo con estrategia de contenido',
        features: [
          'Diseño completamente personalizado',
          'Estrategia de contenido incluida',
          'Primeros 10 artículos incluidos',
          'Optimización SEO premium',
          'Integración con CRM',
          'Dashboard de métricas',
          '6 meses de soporte'
        ]
      }
    ],
    caseStudies: [
      {
        id: 'consultoria-blog',
        title: 'Consultoría Legal: Blog que genera 50 leads/mes',
        client: 'Bufete Jurídico Martínez',
        industry: 'Legal',
        challenge: 'Necesitaban generar más leads cualificados y establecerse como autoridad en derecho empresarial.',
        solution: 'Creamos un blog profesional con estrategia de contenido SEO y lead magnets.',
        results: [
          {
            metric: 'Tráfico orgánico',
            before: '200 visitas/mes',
            after: '3,500 visitas/mes',
            improvement: '+1650%'
          },
          {
            metric: 'Leads mensuales',
            before: '5',
            after: '50',
            improvement: '+900%'
          },
          {
            metric: 'Posiciones top 3',
            before: '2',
            after: '45',
            improvement: '+2150%'
          }
        ],
        testimonial: {
          quote: 'El blog se convirtió en nuestra principal fuente de leads. Los clientes nos encuentran por nuestros artículos y ya llegan educados sobre nuestros servicios.',
          author: 'Roberto Martínez',
          position: 'Socio Director',
          company: 'Bufete Jurídico Martínez',
          avatar: '/testimonials/roberto.jpg'
        },
        images: {
          before: '/case-studies/legal-blog-before.jpg',
          after: '/case-studies/legal-blog-after.jpg'
        },
        technologies: ['WordPress', 'Yoast SEO', 'Mailchimp', 'Google Analytics'],
        duration: '3 semanas'
      }
    ],
    faqs: [
      {
        id: 'diferencia-blog-web',
        question: '¿Puedo integrar el blog con mi sitio web existente?',
        answer: 'Sí, podemos integrar el blog con tu sitio web existente o crear un blog independiente. La integración permite mantener la coherencia de marca y mejorar el SEO general de tu sitio.'
      },
      {
        id: 'gestion-contenido',
        question: '¿Incluyen la creación de contenido?',
        answer: 'En el paquete Premium incluimos los primeros 10 artículos. Para otros paquetes, ofrecemos servicios de creación de contenido por separado o puedes gestionarlo internamente con nuestro CMS fácil de usar.'
      },
      {
        id: 'seo-blog',
        question: '¿Cómo optimizan el blog para SEO?',
        answer: 'Implementamos SEO técnico (velocidad, estructura, schema markup), optimización on-page, investigación de palabras clave, y configuramos herramientas de análisis para monitorear el rendimiento.'
      },
      {
        id: 'monetizacion',
        question: '¿Se puede monetizar el blog?',
        answer: 'Sí, podemos integrar diferentes formas de monetización como publicidad, afiliados, productos digitales, o suscripciones premium, dependiendo de tu modelo de negocio.'
      }
    ],
    relatedServices: ['contenido', 'seo', 'corporativas'],
    seo: {
      title: 'Blogs Profesionales Optimizados para SEO | Desarrollo Web Plalz',
      description: 'Creamos blogs profesionales que generan tráfico orgánico y establecen tu autoridad. Optimización SEO, CMS fácil de usar y estrategia de contenido. Desde €399.',
      keywords: ['blog profesional', 'blog empresarial', 'blog SEO', 'marketing de contenidos']
    }
  }
];

export const maintenanceServices: Service[] = [
  {
    id: 'contenido',
    name: 'Mantenimiento de Contenido',
    slug: 'contenido',
    category: 'mantenimiento',
    description: 'Actualizamos y gestionamos el contenido de tu sitio web para mantenerlo fresco y relevante',
    shortDescription: 'Gestión y actualización de contenido',
    icon: '📝',
    color: 'from-green-600 to-teal-600',
    hero: {
      title: 'Mantenimiento de Contenido',
      subtitle: 'Mantén tu sitio web siempre actualizado',
      description: 'Nos encargamos de mantener tu contenido fresco, actualizado y optimizado para que tu sitio web siempre ofrezca valor a tus visitantes.',
      imageUrl: '/services/content-maintenance-hero.jpg',
      features: [
        'Actualización de contenido regular',
        'Creación de nuevas páginas',
        'Optimización SEO del contenido',
        'Gestión de blog y noticias',
        'Revisión y corrección de textos'
      ]
    },
    benefits: [
      'Mejora el posicionamiento SEO',
      'Mantiene a los visitantes interesados',
      'Ahorra tiempo y recursos internos',
      'Contenido siempre profesional',
      'Aumenta la autoridad de tu sitio'
    ],
    targetAudience: [
      'Empresas sin equipo de marketing',
      'Sitios web con blog activo',
      'E-commerce con catálogo dinámico',
      'Empresas de servicios',
      'Organizaciones con noticias frecuentes'
    ],
    qualificationQuestions: [
      {
        id: 'content-frequency',
        question: '¿Con qué frecuencia necesitas actualizar contenido?',
        type: 'radio',
        options: ['Semanal', 'Quincenal', 'Mensual', 'Según necesidad'],
        weight: 4,
        category: 'frequency'
      },
      {
        id: 'content-types',
        question: '¿Qué tipo de contenido necesitas gestionar?',
        type: 'checkbox',
        options: ['Páginas principales', 'Blog/Noticias', 'Productos/Servicios', 'Imágenes', 'Videos'],
        weight: 3,
        category: 'content-type'
      }
    ],
    process: [
      {
        id: 1,
        title: 'Auditoría de Contenido',
        description: 'Analizamos tu contenido actual y definimos estrategia',
        duration: '1-2 días',
        icon: '🔍',
        details: [
          'Revisión completa del contenido existente',
          'Identificación de oportunidades de mejora',
          'Definición de calendario editorial',
          'Establecimiento de objetivos y KPIs'
        ]
      },
      {
        id: 2,
        title: 'Planificación Editorial',
        description: 'Creamos un plan de contenido personalizado',
        duration: '1 día',
        icon: '📅',
        details: [
          'Calendario de publicaciones',
          'Temas y palabras clave objetivo',
          'Formato y estilo de contenido',
          'Proceso de aprobación'
        ]
      },
      {
        id: 3,
        title: 'Ejecución Continua',
        description: 'Implementamos y gestionamos el contenido',
        duration: 'Continuo',
        icon: '✍️',
        details: [
          'Creación y actualización de contenido',
          'Optimización SEO de cada pieza',
          'Publicación según calendario',
          'Monitoreo de rendimiento'
        ]
      },
      {
        id: 4,
        title: 'Análisis y Optimización',
        description: 'Medimos resultados y optimizamos estrategia',
        duration: 'Mensual',
        icon: '📊',
        details: [
          'Análisis de métricas de contenido',
          'Identificación de contenido top',
          'Optimización de contenido existente',
          'Ajustes en la estrategia'
        ]
      }
    ],
    packages: [
      {
        id: 'basico',
        name: 'Básico',
        price: 99,
        duration: 'Mensual',
        description: 'Perfecto para sitios web con necesidades básicas',
        features: [
          '2 actualizaciones de contenido/mes',
          'Revisión y corrección de textos',
          'Optimización SEO básica',
          'Actualización de imágenes',
          'Reporte mensual',
          'Soporte por email'
        ]
      },
      {
        id: 'profesional',
        name: 'Profesional',
        price: 199,
        duration: 'Mensual',
        description: 'Ideal para empresas con blog activo',
        features: [
          '4 actualizaciones de contenido/mes',
          '2 artículos de blog/mes',
          'Optimización SEO avanzada',
          'Gestión de redes sociales básica',
          'Actualización de productos/servicios',
          'Análisis de rendimiento',
          'Soporte prioritario'
        ],
        popular: true
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 399,
        duration: 'Mensual',
        description: 'Solución completa para empresas grandes',
        features: [
          'Actualizaciones ilimitadas',
          '4 artículos de blog/mes',
          'Creación de landing pages',
          'Gestión completa de redes sociales',
          'Newsletter mensual',
          'Análisis competitivo',
          'Estrategia de contenido personalizada',
          'Soporte 24/7'
        ]
      }
    ],
    caseStudies: [
      {
        id: 'consultoria-contenido',
        title: 'Consultoria CR: Estrategia de contenido que genera leads',
        client: 'Consultoria CR',
        industry: 'Consultoría Empresarial',
        challenge: 'El sitio web tenía contenido desactualizado y no generaba tráfico orgánico ni leads.',
        solution: 'Implementamos una estrategia de contenido SEO con blog activo y actualizaciones regulares.',
        results: [
          {
            metric: 'Tráfico orgánico',
            before: '500 visitas/mes',
            after: '2,500 visitas/mes',
            improvement: '+400%'
          },
          {
            metric: 'Leads del blog',
            before: '0',
            after: '15/mes',
            improvement: 'Nuevo canal'
          },
          {
            metric: 'Tiempo en sitio',
            before: '1:20 min',
            after: '3:45 min',
            improvement: '+187%'
          }
        ],
        testimonial: {
          quote: 'El mantenimiento de contenido transformó nuestro sitio web en una máquina de generar leads. Ahora aparecemos en Google para todas nuestras palabras clave objetivo.',
          author: 'Carlos Rodríguez',
          position: 'CEO',
          company: 'Consultoria CR',
          avatar: '/testimonials/carlos.jpg'
        },
        images: {
          before: '/case-studies/content-before.jpg',
          after: '/case-studies/content-after.jpg'
        },
        technologies: ['WordPress', 'Yoast SEO', 'Google Analytics', 'Mailchimp'],
        duration: '6 meses',
        url: 'https://consultoriacr.com/blog'
      }
    ],
    faqs: [
      {
        id: 'quien-crea-contenido',
        question: '¿Quién crea el contenido?',
        answer: 'Nuestro equipo de redactores especializados crea todo el contenido. Trabajamos contigo para entender tu voz de marca y tus objetivos, pero nos encargamos de toda la creación, optimización y publicación.'
      },
      {
        id: 'aprobacion-contenido',
        question: '¿Puedo revisar el contenido antes de publicarlo?',
        answer: 'Absolutamente. Todo el contenido pasa por un proceso de aprobación. Te enviamos el contenido para revisión y no publicamos nada sin tu aprobación previa.'
      },
      {
        id: 'contenido-original',
        question: '¿El contenido es original?',
        answer: 'Sí, todo nuestro contenido es 100% original y creado específicamente para tu empresa. Utilizamos herramientas anti-plagio para garantizar la originalidad y optimizamos cada pieza para SEO.'
      },
      {
        id: 'cambio-plan',
        question: '¿Puedo cambiar de plan durante el servicio?',
        answer: 'Sí, puedes cambiar de plan en cualquier momento. Si subes de plan, la diferencia se prorratea. Si bajas de plan, el cambio se aplica en el siguiente ciclo de facturación.'
      }
    ],
    relatedServices: ['seo', 'diseno', 'analytics'],
    seo: {
      title: 'Mantenimiento de Contenido Web | Gestión de Contenido Plalz',
      description: 'Mantenemos tu sitio web actualizado con contenido fresco y optimizado para SEO. Gestión profesional de blog, páginas y productos. Desde €99/mes.',
      keywords: ['mantenimiento contenido web', 'gestión contenido', 'actualización sitio web', 'blog profesional']
    }
  }
];

// Combine all services
export const allServices: Service[] = [
  ...webDevelopmentServices,
  ...maintenanceServices
];

// Update service categories with their services
serviceCategories[0].services = webDevelopmentServices;
serviceCategories[1].services = maintenanceServices; 