// Company data for institutional pages
export const COMPANY_INFO = {
  name: "Plalz",
  tagline: "Desarrollo Web Profesional",
  description: "Especialistas en desarrollo web moderno, diseño UX/UI y soluciones digitales que impulsan el crecimiento de tu negocio.",
  founded: 2020,
  employees: "15+",
  projects: "200+",
  clients: "150+",
  
  contact: {
    email: "hola@plalz.com",
    phone: "+34 900 123 456",
    whatsapp: "+34 600 123 456",
    address: {
      street: "Calle Innovación 123",
      city: "Madrid",
      postalCode: "28001",
      country: "España",
      coordinates: {
        lat: 40.4168,
        lng: -3.7038
      }
    },
    hours: {
      weekdays: "Lunes a Viernes: 9:00 - 18:00",
      weekend: "Sábados: 10:00 - 14:00",
      closed: "Domingos: Cerrado"
    },
    social: {
      linkedin: "https://linkedin.com/company/plalz",
      twitter: "https://twitter.com/plalz",
      instagram: "https://instagram.com/plalz",
      facebook: "https://facebook.com/plalz"
    }
  },

  mission: "Transformar ideas en experiencias digitales excepcionales que generen resultados reales para nuestros clientes.",
  
  vision: "Ser la agencia de desarrollo web líder en España, reconocida por nuestra innovación, calidad y compromiso con el éxito de nuestros clientes.",
  
  values: [
    {
      title: "Innovación",
      description: "Utilizamos las últimas tecnologías y metodologías para crear soluciones vanguardistas.",
      icon: "🚀"
    },
    {
      title: "Calidad",
      description: "Cada proyecto es desarrollado con los más altos estándares de calidad y atención al detalle.",
      icon: "⭐"
    },
    {
      title: "Transparencia",
      description: "Comunicación clara y honesta en cada etapa del proyecto, sin sorpresas ni costos ocultos.",
      icon: "🔍"
    },
    {
      title: "Compromiso",
      description: "Nos comprometemos con el éxito de nuestros clientes y trabajamos hasta lograr sus objetivos.",
      icon: "🤝"
    },
    {
      title: "Agilidad",
      description: "Metodologías ágiles que nos permiten entregar resultados rápidos y de alta calidad.",
      icon: "⚡"
    },
    {
      title: "Soporte",
      description: "Acompañamiento continuo y soporte técnico 24/7 para garantizar el éxito a largo plazo.",
      icon: "🛡️"
    }
  ],

  timeline: [
    {
      year: 2020,
      title: "Fundación de Plalz",
      description: "Iniciamos como un pequeño equipo de desarrolladores apasionados por crear experiencias web excepcionales.",
      milestone: "Primeros 10 clientes"
    },
    {
      year: 2021,
      title: "Expansión del Equipo",
      description: "Incorporamos especialistas en UX/UI y marketing digital para ofrecer soluciones integrales.",
      milestone: "50+ proyectos completados"
    },
    {
      year: 2022,
      title: "Reconocimiento en el Sector",
      description: "Ganamos el premio 'Mejor Agencia Digital Emergente' y establecimos partnerships estratégicos.",
      milestone: "100+ clientes satisfechos"
    },
    {
      year: 2023,
      title: "Innovación Tecnológica",
      description: "Implementamos IA y automatización en nuestros procesos, mejorando la eficiencia y calidad.",
      milestone: "150+ proyectos entregados"
    },
    {
      year: 2024,
      title: "Liderazgo en el Mercado",
      description: "Consolidamos nuestra posición como referente en desarrollo web y soluciones digitales.",
      milestone: "200+ clientes activos"
    }
  ],

  team: [
    {
      name: "Carlos Mendoza",
      role: "CEO & Founder",
      bio: "Ingeniero en Sistemas con más de 10 años de experiencia en desarrollo web y liderazgo de equipos tecnológicos.",
      image: "/team/carlos-mendoza.jpg",
      linkedin: "https://linkedin.com/in/carlos-mendoza",
      specialties: ["Estrategia Digital", "Liderazgo", "Arquitectura Web"]
    },
    {
      name: "Ana García",
      role: "CTO",
      bio: "Experta en tecnologías frontend y backend, especializada en React, Node.js y arquitecturas escalables.",
      image: "/team/ana-garcia.jpg",
      linkedin: "https://linkedin.com/in/ana-garcia",
      specialties: ["React", "Node.js", "DevOps"]
    },
    {
      name: "Miguel Torres",
      role: "Head of Design",
      bio: "Diseñador UX/UI con experiencia en crear interfaces intuitivas y experiencias de usuario excepcionales.",
      image: "/team/miguel-torres.jpg",
      linkedin: "https://linkedin.com/in/miguel-torres",
      specialties: ["UX/UI Design", "Figma", "Design Systems"]
    },
    {
      name: "Laura Martín",
      role: "Marketing Director",
      bio: "Especialista en marketing digital y SEO, enfocada en estrategias que generan resultados medibles.",
      image: "/team/laura-martin.jpg",
      linkedin: "https://linkedin.com/in/laura-martin",
      specialties: ["SEO", "Marketing Digital", "Analytics"]
    }
  ],

  certifications: [
    "Google Partner Certified",
    "AWS Solutions Architect",
    "Meta Business Partner",
    "HubSpot Certified Agency"
  ],

  awards: [
    {
      year: 2023,
      title: "Mejor Agencia Digital Emergente",
      organization: "Digital Awards España"
    },
    {
      year: 2023,
      title: "Top 10 Agencias de Desarrollo Web",
      organization: "TechReview Magazine"
    },
    {
      year: 2024,
      title: "Excellence in Web Development",
      organization: "European Web Awards"
    }
  ]
};

export const CONTACT_TYPES = [
  { value: "general", label: "Consulta General" },
  { value: "quote", label: "Solicitar Cotización" },
  { value: "support", label: "Soporte Técnico" },
  { value: "partnership", label: "Alianzas Estratégicas" },
  { value: "career", label: "Oportunidades Laborales" },
  { value: "press", label: "Prensa y Medios" }
];

export const FAQ_CONTACT = [
  {
    question: "¿Cuánto tiempo toma desarrollar un sitio web?",
    answer: "El tiempo de desarrollo varía según la complejidad del proyecto. Un sitio web básico puede tomar 2-3 semanas, mientras que proyectos más complejos pueden requerir 6-12 semanas. Te proporcionamos un cronograma detallado en la propuesta inicial."
  },
  {
    question: "¿Ofrecen soporte después del lanzamiento?",
    answer: "Sí, ofrecemos diferentes planes de soporte y mantenimiento. Incluimos 30 días de soporte gratuito después del lanzamiento, y tenemos planes mensuales para soporte continuo, actualizaciones y mejoras."
  },
  {
    question: "¿Trabajan con empresas de otros países?",
    answer: "Absolutamente. Trabajamos con clientes de toda Europa y América Latina. Tenemos experiencia en proyectos internacionales y nos adaptamos a diferentes zonas horarias para facilitar la comunicación."
  },
  {
    question: "¿Qué tecnologías utilizan?",
    answer: "Utilizamos tecnologías modernas como React, Next.js, Node.js, TypeScript, y servicios en la nube como AWS y Vercel. Seleccionamos la tecnología más adecuada según las necesidades específicas de cada proyecto."
  },
  {
    question: "¿Pueden ayudar con el SEO y marketing digital?",
    answer: "Sí, ofrecemos servicios integrales que incluyen SEO técnico, optimización de contenido, marketing digital y análisis de rendimiento. Nuestro objetivo es no solo crear tu sitio web, sino asegurar que genere resultados."
  },
  {
    question: "¿Cómo manejan los pagos y facturación?",
    answer: "Trabajamos con un sistema de pagos por hitos del proyecto. Generalmente solicitamos un 50% al inicio y el resto al completar el proyecto. Aceptamos transferencias bancarias, tarjetas de crédito y PayPal."
  }
];

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfecto para pequeñas empresas y emprendedores",
    monthlyPrice: 299,
    annualPrice: 2990,
    popular: false,
    features: [
      "Hasta 5 páginas",
      "Diseño responsive",
      "SEO básico",
      "Formulario de contacto",
      "Integración redes sociales",
      "SSL incluido",
      "Hosting por 1 año",
      "Soporte por email"
    ],
    limitations: [
      "Sin e-commerce",
      "Sin blog",
      "Sin analytics avanzados"
    ],
    cta: "Empezar Ahora",
    deliveryTime: "2-3 semanas"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal para empresas en crecimiento",
    monthlyPrice: 599,
    annualPrice: 5990,
    popular: true,
    features: [
      "Hasta 15 páginas",
      "Diseño personalizado",
      "SEO avanzado",
      "Blog integrado",
      "Google Analytics",
      "Formularios avanzados",
      "Chat en vivo",
      "Optimización velocidad",
      "Hosting por 1 año",
      "Soporte prioritario"
    ],
    limitations: [
      "E-commerce básico",
      "Hasta 100 productos"
    ],
    cta: "Más Popular",
    deliveryTime: "4-6 semanas"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Soluciones completas para grandes empresas",
    monthlyPrice: 1299,
    annualPrice: 12990,
    popular: false,
    features: [
      "Páginas ilimitadas",
      "Diseño completamente personalizado",
      "E-commerce completo",
      "Productos ilimitados",
      "CRM integrado",
      "Analytics avanzados",
      "Automatizaciones",
      "API personalizada",
      "Hosting premium",
      "Soporte 24/7",
      "Consultoría estratégica",
      "Training del equipo"
    ],
    limitations: [],
    cta: "Contactar Ventas",
    deliveryTime: "8-12 semanas"
  }
];

export const PRICING_FEATURES = [
  {
    category: "Diseño y Desarrollo",
    features: [
      { name: "Diseño responsive", starter: true, professional: true, enterprise: true },
      { name: "Diseño personalizado", starter: false, professional: true, enterprise: true },
      { name: "Animaciones avanzadas", starter: false, professional: false, enterprise: true },
      { name: "PWA (Progressive Web App)", starter: false, professional: false, enterprise: true }
    ]
  },
  {
    category: "Funcionalidades",
    features: [
      { name: "Formulario de contacto", starter: true, professional: true, enterprise: true },
      { name: "Blog integrado", starter: false, professional: true, enterprise: true },
      { name: "E-commerce", starter: false, professional: "Básico", enterprise: "Completo" },
      { name: "Multiidioma", starter: false, professional: false, enterprise: true },
      { name: "Área de miembros", starter: false, professional: false, enterprise: true }
    ]
  },
  {
    category: "SEO y Marketing",
    features: [
      { name: "SEO básico", starter: true, professional: true, enterprise: true },
      { name: "SEO avanzado", starter: false, professional: true, enterprise: true },
      { name: "Google Analytics", starter: false, professional: true, enterprise: true },
      { name: "Marketing automation", starter: false, professional: false, enterprise: true }
    ]
  },
  {
    category: "Soporte",
    features: [
      { name: "Soporte por email", starter: true, professional: true, enterprise: true },
      { name: "Soporte prioritario", starter: false, professional: true, enterprise: true },
      { name: "Soporte 24/7", starter: false, professional: false, enterprise: true },
      { name: "Consultoría estratégica", starter: false, professional: false, enterprise: true }
    ]
  }
];

export const PRICING_FAQ = [
  {
    question: "¿Qué incluye el hosting por 1 año?",
    answer: "Incluimos hosting premium con SSL, CDN global, backups automáticos diarios, y soporte técnico. Después del primer año, el costo es de €120/año para planes Starter y Professional, y €240/año para Enterprise."
  },
  {
    question: "¿Puedo cambiar de plan después?",
    answer: "Sí, puedes actualizar tu plan en cualquier momento. La diferencia de precio se prorratea y las nuevas funcionalidades se activan inmediatamente."
  },
  {
    question: "¿Hay costos adicionales?",
    answer: "No hay costos ocultos. El precio incluye todo lo mencionado en cada plan. Solo podrían aplicar costos adicionales por funcionalidades específicas no incluidas en el plan seleccionado."
  },
  {
    question: "¿Ofrecen garantía de devolución?",
    answer: "Sí, ofrecemos garantía de satisfacción de 30 días. Si no estás completamente satisfecho con el resultado, te devolvemos el 100% de tu dinero."
  },
  {
    question: "¿Cómo funciona el proceso de pago?",
    answer: "Solicitamos un 50% al iniciar el proyecto y el 50% restante al completar y entregar el sitio web. Aceptamos transferencias bancarias, tarjetas de crédito y PayPal."
  },
  {
    question: "¿Qué pasa si necesito funcionalidades personalizadas?",
    answer: "Podemos desarrollar funcionalidades personalizadas para cualquier plan. Te proporcionamos una cotización específica basada en tus requerimientos únicos."
  }
]; 