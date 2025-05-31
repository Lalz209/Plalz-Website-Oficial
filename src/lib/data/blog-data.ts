import { 
  BlogPost, 
  Author, 
  BlogCategory, 
  BlogTag, 
  BlogStats,
  TableOfContentsItem 
} from '@/lib/types/blog';

export const AUTHORS: Author[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    slug: 'carlos-mendoza',
    bio: 'Desarrollador Full Stack con más de 8 años de experiencia en tecnologías web modernas. Especialista en React, Next.js y arquitecturas escalables.',
    avatar: '/authors/carlos-mendoza.jpg',
    email: 'carlos@plalz.com',
    website: 'https://carlosmendoza.dev',
    social: {
      twitter: '@carlosmendoza_dev',
      linkedin: 'carlos-mendoza-dev',
      github: 'carlosmendoza',
    },
    role: 'Lead Developer',
    joinedAt: new Date('2020-01-15'),
    postsCount: 24,
  },
  {
    id: '2',
    name: 'Ana García',
    slug: 'ana-garcia',
    bio: 'Diseñadora UX/UI apasionada por crear experiencias digitales que conecten con los usuarios. Experta en design systems y metodologías de diseño centrado en el usuario.',
    avatar: '/authors/ana-garcia.jpg',
    email: 'ana@plalz.com',
    website: 'https://anagarcia.design',
    social: {
      twitter: '@ana_garcia_ux',
      linkedin: 'ana-garcia-ux',
      instagram: 'ana.garcia.design',
    },
    role: 'UX/UI Designer',
    joinedAt: new Date('2020-03-20'),
    postsCount: 18,
  },
  {
    id: '3',
    name: 'Miguel Torres',
    slug: 'miguel-torres',
    bio: 'Especialista en marketing digital y SEO con enfoque en estrategias de crecimiento para startups y empresas tecnológicas.',
    avatar: '/authors/miguel-torres.jpg',
    email: 'miguel@plalz.com',
    social: {
      twitter: '@miguel_torres_seo',
      linkedin: 'miguel-torres-seo',
    },
    role: 'Marketing Specialist',
    joinedAt: new Date('2021-06-10'),
    postsCount: 15,
  },
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: '1',
    name: 'Desarrollo Web',
    slug: 'desarrollo-web',
    description: 'Artículos sobre las últimas tecnologías, frameworks y mejores prácticas en desarrollo web.',
    color: '#3B82F6',
    icon: '💻',
    image: '/categories/desarrollo-web.jpg',
    postsCount: 32,
    featured: true,
    seo: {
      metaTitle: 'Desarrollo Web - Blog Plalz',
      metaDescription: 'Descubre las últimas tendencias en desarrollo web, tutoriales y mejores prácticas.',
      keywords: ['desarrollo web', 'programación', 'javascript', 'react', 'nextjs'],
    },
  },
  {
    id: '2',
    name: 'Diseño UX/UI',
    slug: 'diseno-ux-ui',
    description: 'Guías, tendencias y casos de estudio sobre diseño de experiencia de usuario e interfaces.',
    color: '#8B5CF6',
    icon: '🎨',
    image: '/categories/diseno-ux-ui.jpg',
    postsCount: 28,
    featured: true,
    seo: {
      metaTitle: 'Diseño UX/UI - Blog Plalz',
      metaDescription: 'Aprende sobre diseño UX/UI, tendencias y mejores prácticas para crear interfaces excepcionales.',
      keywords: ['diseño ux', 'diseño ui', 'experiencia usuario', 'interfaces', 'figma'],
    },
  },
  {
    id: '3',
    name: 'Marketing Digital',
    slug: 'marketing-digital',
    description: 'Estrategias de marketing digital, SEO, SEM y growth hacking para hacer crecer tu negocio online.',
    color: '#EF4444',
    icon: '📈',
    image: '/categories/marketing-digital.jpg',
    postsCount: 24,
    featured: true,
    seo: {
      metaTitle: 'Marketing Digital - Blog Plalz',
      metaDescription: 'Estrategias de marketing digital, SEO y growth hacking para impulsar tu negocio.',
      keywords: ['marketing digital', 'seo', 'sem', 'growth hacking', 'analytics'],
    },
  },
  {
    id: '4',
    name: 'E-commerce',
    slug: 'ecommerce',
    description: 'Todo sobre comercio electrónico: plataformas, optimización de conversiones y tendencias del sector.',
    color: '#10B981',
    icon: '🛒',
    image: '/categories/ecommerce.jpg',
    postsCount: 19,
    featured: false,
    seo: {
      metaTitle: 'E-commerce - Blog Plalz',
      metaDescription: 'Guías y estrategias para optimizar tu tienda online y aumentar las ventas.',
      keywords: ['ecommerce', 'tienda online', 'conversiones', 'shopify', 'woocommerce'],
    },
  },
  {
    id: '5',
    name: 'Tecnología',
    slug: 'tecnologia',
    description: 'Noticias, análisis y tendencias sobre las últimas tecnologías que están transformando el mundo digital.',
    color: '#F59E0B',
    icon: '🚀',
    image: '/categories/tecnologia.jpg',
    postsCount: 16,
    featured: false,
    seo: {
      metaTitle: 'Tecnología - Blog Plalz',
      metaDescription: 'Últimas noticias y tendencias tecnológicas que están transformando el mundo digital.',
      keywords: ['tecnología', 'innovación', 'inteligencia artificial', 'blockchain', 'cloud'],
    },
  },
];

export const BLOG_TAGS: BlogTag[] = [
  { id: '1', name: 'React', slug: 'react', postsCount: 15, color: '#61DAFB' },
  { id: '2', name: 'Next.js', slug: 'nextjs', postsCount: 12, color: '#000000' },
  { id: '3', name: 'TypeScript', slug: 'typescript', postsCount: 18, color: '#3178C6' },
  { id: '4', name: 'JavaScript', slug: 'javascript', postsCount: 25, color: '#F7DF1E' },
  { id: '5', name: 'CSS', slug: 'css', postsCount: 14, color: '#1572B6' },
  { id: '6', name: 'Tailwind CSS', slug: 'tailwind-css', postsCount: 10, color: '#06B6D4' },
  { id: '7', name: 'Node.js', slug: 'nodejs', postsCount: 13, color: '#339933' },
  { id: '8', name: 'SEO', slug: 'seo', postsCount: 16, color: '#4285F4' },
  { id: '9', name: 'UX Design', slug: 'ux-design', postsCount: 20, color: '#FF6B6B' },
  { id: '10', name: 'UI Design', slug: 'ui-design', postsCount: 17, color: '#4ECDC4' },
  { id: '11', name: 'Figma', slug: 'figma', postsCount: 11, color: '#F24E1E' },
  { id: '12', name: 'Performance', slug: 'performance', postsCount: 9, color: '#FF9500' },
  { id: '13', name: 'Accessibility', slug: 'accessibility', postsCount: 8, color: '#7B68EE' },
  { id: '14', name: 'API', slug: 'api', postsCount: 12, color: '#32CD32' },
  { id: '15', name: 'Database', slug: 'database', postsCount: 7, color: '#FF4500' },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'guia-completa-nextjs-14-app-router',
    title: 'Guía Completa de Next.js 14 y App Router',
    excerpt: 'Descubre todas las nuevas características de Next.js 14 y cómo migrar al nuevo App Router para crear aplicaciones web más rápidas y eficientes.',
    content: `# Guía Completa de Next.js 14 y App Router

Next.js 14 ha llegado con importantes mejoras y el App Router se ha convertido en la forma recomendada de estructurar aplicaciones. En esta guía completa, exploraremos todas las nuevas características y cómo aprovecharlas al máximo.

## ¿Qué es el App Router?

El App Router es una nueva forma de organizar y manejar las rutas en Next.js que utiliza las características más recientes de React, incluyendo Server Components y Suspense.

### Principales ventajas:

- **Server Components por defecto**: Mejor rendimiento y SEO
- **Streaming**: Carga progresiva de contenido
- **Layouts anidados**: Mejor organización del código
- **Loading y Error states**: Manejo mejorado de estados

## Estructura de carpetas

\`\`\`
app/
├── layout.tsx          # Layout raíz
├── page.tsx           # Página principal
├── loading.tsx        # Estado de carga
├── error.tsx          # Manejo de errores
├── not-found.tsx      # Página 404
└── blog/
    ├── layout.tsx     # Layout del blog
    ├── page.tsx       # Lista de posts
    └── [slug]/
        └── page.tsx   # Post individual
\`\`\`

## Server Components vs Client Components

### Server Components (por defecto)
- Se ejecutan en el servidor
- Acceso directo a bases de datos
- Mejor SEO y rendimiento inicial
- No pueden usar hooks de React

### Client Components
- Se ejecutan en el navegador
- Pueden usar hooks y estado
- Interactividad del usuario
- Se marcan con 'use client'

## Migración desde Pages Router

La migración es gradual y puedes mantener ambos sistemas:

1. **Crear la carpeta app/**
2. **Migrar layouts comunes**
3. **Convertir páginas una por una**
4. **Actualizar navegación**

## Nuevas características de Next.js 14

### Turbopack (Beta)
- Bundler ultra-rápido escrito en Rust
- Hasta 700x más rápido que Webpack
- Hot reload instantáneo

### Server Actions
- Funciones que se ejecutan en el servidor
- Simplifica el manejo de formularios
- Mejor experiencia de desarrollo

### Partial Prerendering
- Combina contenido estático y dinámico
- Mejor rendimiento y experiencia de usuario
- Carga progresiva optimizada

## Mejores prácticas

1. **Usa Server Components por defecto**
2. **Client Components solo cuando sea necesario**
3. **Aprovecha los layouts anidados**
4. **Implementa loading states**
5. **Maneja errores apropiadamente**

## Conclusión

Next.js 14 y el App Router representan el futuro del desarrollo web con React. La combinación de Server Components, mejor rendimiento y una experiencia de desarrollo mejorada hace que valga la pena la migración.

¿Ya has probado Next.js 14? Comparte tu experiencia en los comentarios.`,
    featuredImage: '/blog/nextjs-14-guide/featured.jpg',
    publishedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    status: 'published',
    featured: true,
    author: AUTHORS[0],
    category: BLOG_CATEGORIES[0],
    tags: [BLOG_TAGS[1], BLOG_TAGS[2], BLOG_TAGS[3]],
    readingTime: 8,
    wordCount: 1200,
    seo: {
      metaTitle: 'Guía Completa de Next.js 14 y App Router | Blog Plalz',
      metaDescription: 'Aprende todo sobre Next.js 14, el nuevo App Router y cómo migrar tus aplicaciones para mejor rendimiento.',
      keywords: ['nextjs 14', 'app router', 'react', 'server components', 'desarrollo web'],
      ogImage: '/blog/nextjs-14-guide/og-image.jpg',
    },
    socialSharing: {
      twitter: 'Descubre las nuevas características de Next.js 14 y el App Router 🚀',
      facebook: 'Guía completa para dominar Next.js 14',
      linkedin: 'Todo lo que necesitas saber sobre Next.js 14 y App Router',
    },
    tableOfContents: [
      { id: 'que-es-app-router', title: '¿Qué es el App Router?', level: 2, anchor: 'que-es-app-router' },
      { id: 'estructura-carpetas', title: 'Estructura de carpetas', level: 2, anchor: 'estructura-carpetas' },
      { id: 'server-vs-client', title: 'Server Components vs Client Components', level: 2, anchor: 'server-vs-client' },
      { id: 'migracion', title: 'Migración desde Pages Router', level: 2, anchor: 'migracion' },
      { id: 'nuevas-caracteristicas', title: 'Nuevas características de Next.js 14', level: 2, anchor: 'nuevas-caracteristicas' },
      { id: 'mejores-practicas', title: 'Mejores prácticas', level: 2, anchor: 'mejores-practicas' },
    ],
    relatedPosts: ['2', '3'],
    commentsEnabled: true,
    commentsCount: 12,
    views: 2847,
    likes: 156,
    shares: 43,
  },
  {
    id: '2',
    slug: 'diseno-sistemas-componentes-figma',
    title: 'Cómo Crear un Sistema de Componentes en Figma',
    excerpt: 'Aprende a construir un design system escalable en Figma que mejore la consistencia y eficiencia de tu equipo de diseño.',
    content: `# Cómo Crear un Sistema de Componentes en Figma

Un sistema de componentes bien estructurado es fundamental para mantener la consistencia visual y acelerar el proceso de diseño. En esta guía, aprenderás a crear un design system completo en Figma.

## ¿Por qué necesitas un Design System?

Los design systems ofrecen múltiples beneficios:

- **Consistencia visual** en todos los productos
- **Eficiencia** en el proceso de diseño
- **Colaboración** mejorada entre equipos
- **Escalabilidad** para proyectos futuros
- **Mantenimiento** simplificado

## Fundamentos del Design System

### 1. Tokens de Diseño

Los tokens son los valores fundamentales de tu sistema:

#### Colores
- **Primarios**: Identidad de marca
- **Secundarios**: Acciones y estados
- **Neutros**: Textos y fondos
- **Semánticos**: Success, warning, error

#### Tipografía
- **Familias**: Sans-serif, serif, monospace
- **Pesos**: Light, regular, medium, bold
- **Tamaños**: Scale modular (16px base)
- **Espaciado**: Line-height y letter-spacing

#### Espaciado
- **Sistema de 8px**: Base para todos los espacios
- **Componentes**: Padding y margin consistentes
- **Layout**: Grid y breakpoints

### 2. Componentes Atómicos

Siguiendo la metodología Atomic Design:

#### Átomos
- Botones
- Inputs
- Labels
- Icons

#### Moléculas
- Form fields
- Search bars
- Navigation items

#### Organismos
- Headers
- Forms
- Card grids

## Implementación en Figma

### Paso 1: Configuración inicial

1. **Crear archivo base** del design system
2. **Definir variables** de color y tipografía
3. **Establecer grid** y breakpoints
4. **Organizar páginas** por categorías

### Paso 2: Crear componentes base

\`\`\`
Estructura recomendada:
📁 Design System
├── 🎨 Foundations
│   ├── Colors
│   ├── Typography
│   └── Spacing
├── ⚛️ Components
│   ├── Atoms
│   ├── Molecules
│   └── Organisms
└── 📱 Templates
    ├── Mobile
    └── Desktop
\`\`\`

### Paso 3: Definir variantes

Cada componente debe tener variantes para:
- **Estados**: Default, hover, active, disabled
- **Tamaños**: Small, medium, large
- **Tipos**: Primary, secondary, ghost

### Paso 4: Documentación

- **Descripción** de cada componente
- **Casos de uso** recomendados
- **Propiedades** configurables
- **Ejemplos** de implementación

## Mejores Prácticas

### Nomenclatura consistente
- Usa prefijos claros (btn-, input-, card-)
- Mantén jerarquía lógica
- Evita abreviaciones confusas

### Organización eficiente
- Agrupa componentes relacionados
- Usa páginas separadas por categoría
- Mantén orden alfabético

### Mantenimiento continuo
- Revisa y actualiza regularmente
- Documenta cambios importantes
- Comunica actualizaciones al equipo

## Herramientas complementarias

### Plugins útiles
- **Design Tokens**: Sincronización con código
- **Content Reel**: Datos realistas
- **Stark**: Verificación de accesibilidad

### Integración con desarrollo
- **Figma to Code**: Exportación automática
- **Design Tokens**: Variables compartidas
- **Handoff tools**: Especificaciones precisas

## Conclusión

Un sistema de componentes bien implementado en Figma es una inversión que se paga con creces en eficiencia y consistencia. Comienza con lo básico y evoluciona gradualmente.

¿Qué herramientas usas para mantener tu design system? Comparte tu experiencia en los comentarios.`,
    featuredImage: '/blog/figma-design-system/featured.jpg',
    publishedAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    status: 'published',
    featured: true,
    author: AUTHORS[1],
    category: BLOG_CATEGORIES[1],
    tags: [BLOG_TAGS[10], BLOG_TAGS[8], BLOG_TAGS[9]],
    readingTime: 12,
    wordCount: 1800,
    seo: {
      metaTitle: 'Cómo Crear un Sistema de Componentes en Figma | Blog Plalz',
      metaDescription: 'Guía completa para crear un design system escalable en Figma que mejore la consistencia de tu equipo.',
      keywords: ['figma', 'design system', 'componentes', 'ux design', 'ui design'],
      ogImage: '/blog/figma-design-system/og-image.jpg',
    },
    socialSharing: {
      twitter: 'Aprende a crear un sistema de componentes profesional en Figma 🎨',
      facebook: 'Guía completa para design systems en Figma',
      linkedin: 'Cómo estructurar un design system escalable en Figma',
    },
    tableOfContents: [
      { id: 'por-que-design-system', title: '¿Por qué necesitas un Design System?', level: 2, anchor: 'por-que-design-system' },
      { id: 'fundamentos', title: 'Fundamentos del Design System', level: 2, anchor: 'fundamentos' },
      { id: 'implementacion-figma', title: 'Implementación en Figma', level: 2, anchor: 'implementacion-figma' },
      { id: 'mejores-practicas', title: 'Mejores Prácticas', level: 2, anchor: 'mejores-practicas' },
      { id: 'herramientas', title: 'Herramientas complementarias', level: 2, anchor: 'herramientas' },
    ],
    relatedPosts: ['1', '4'],
    commentsEnabled: true,
    commentsCount: 8,
    views: 1923,
    likes: 89,
    shares: 27,
  },
  {
    id: '3',
    slug: 'optimizacion-seo-tecnico-2024',
    title: 'SEO Técnico en 2024: Guía Completa de Optimización',
    excerpt: 'Domina las técnicas de SEO técnico más importantes para 2024, desde Core Web Vitals hasta la optimización para IA y búsqueda por voz.',
    content: `# SEO Técnico en 2024: Guía Completa de Optimización

El SEO técnico ha evolucionado significativamente en 2024. Con la integración de IA en los motores de búsqueda y nuevas métricas de rendimiento, es crucial mantenerse actualizado.

## Core Web Vitals: La Base del SEO Técnico

### Largest Contentful Paint (LCP)
- **Objetivo**: < 2.5 segundos
- **Optimización**: Imágenes, fonts, servidor
- **Herramientas**: PageSpeed Insights, Lighthouse

### First Input Delay (FID) → Interaction to Next Paint (INP)
- **Objetivo**: < 200ms
- **Optimización**: JavaScript, third-party scripts
- **Monitoreo**: Real User Monitoring (RUM)

### Cumulative Layout Shift (CLS)
- **Objetivo**: < 0.1
- **Optimización**: Dimensiones de imágenes, fonts
- **Prevención**: Reservar espacio para contenido dinámico

## Optimización para IA y Búsqueda Semántica

### Structured Data
- **Schema.org**: Markup completo
- **JSON-LD**: Formato recomendado
- **Rich Snippets**: Mayor CTR

### Contenido Semántico
- **Entidades**: Personas, lugares, conceptos
- **Relaciones**: Conexiones entre entidades
- **Contexto**: Información relevante y completa

## Arquitectura Web Optimizada

### URL Structure
\`\`\`
✅ Buena estructura:
/categoria/subcategoria/producto

❌ Evitar:
/p?id=123&cat=abc
\`\`\`

### Internal Linking
- **Jerarquía clara**: Páginas importantes más enlazadas
- **Anchor text**: Descriptivo y relevante
- **Distribución**: PageRank interno optimizado

### Crawl Budget
- **Robots.txt**: Bloquear páginas innecesarias
- **Sitemap.xml**: Priorizar contenido importante
- **Canonical tags**: Evitar contenido duplicado

## Optimización Técnica Avanzada

### JavaScript SEO
- **Server-Side Rendering (SSR)**: Next.js, Nuxt.js
- **Static Site Generation (SSG)**: Mejor rendimiento
- **Hydration**: Carga progresiva

### Mobile-First Indexing
- **Responsive design**: Adaptación completa
- **Touch targets**: Mínimo 44px
- **Viewport**: Configuración correcta

### Page Speed Optimization
- **Image optimization**: WebP, AVIF
- **Code splitting**: Carga bajo demanda
- **CDN**: Distribución global
- **Caching**: Estrategias múltiples

## Herramientas Esenciales 2024

### Análisis y Monitoreo
- **Google Search Console**: Datos oficiales
- **PageSpeed Insights**: Core Web Vitals
- **Screaming Frog**: Auditoría técnica
- **Ahrefs/SEMrush**: Análisis competitivo

### Testing y Debugging
- **Lighthouse**: Auditoría automatizada
- **WebPageTest**: Testing avanzado
- **Chrome DevTools**: Debugging en tiempo real

## Tendencias Emergentes

### AI-Powered Search
- **SGE (Search Generative Experience)**: Preparación de contenido
- **Answer Engine Optimization**: Respuestas directas
- **Conversational queries**: Búsqueda natural

### Privacy-First SEO
- **Cookieless tracking**: Alternativas de medición
- **First-party data**: Estrategias propias
- **Privacy compliance**: GDPR, CCPA

## Checklist de SEO Técnico 2024

### Fundamentos
- [ ] HTTPS implementado
- [ ] Sitemap.xml actualizado
- [ ] Robots.txt optimizado
- [ ] Canonical tags correctos

### Rendimiento
- [ ] Core Web Vitals < objetivos
- [ ] Imágenes optimizadas
- [ ] JavaScript optimizado
- [ ] CSS crítico inline

### Contenido
- [ ] Structured data implementado
- [ ] Meta tags optimizados
- [ ] Headings jerárquicos
- [ ] Internal linking estratégico

### Mobile
- [ ] Mobile-friendly test passed
- [ ] Touch targets adecuados
- [ ] Viewport configurado
- [ ] AMP (si aplica)

## Conclusión

El SEO técnico en 2024 requiere un enfoque holístico que combine rendimiento, experiencia de usuario y preparación para IA. La clave está en mantenerse actualizado y medir constantemente.

¿Qué técnicas de SEO técnico has implementado recientemente? Comparte tu experiencia.`,
    featuredImage: '/blog/seo-tecnico-2024/featured.jpg',
    publishedAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    status: 'published',
    featured: true,
    author: AUTHORS[2],
    category: BLOG_CATEGORIES[2],
    tags: [BLOG_TAGS[7], BLOG_TAGS[11], BLOG_TAGS[12]],
    readingTime: 15,
    wordCount: 2200,
    seo: {
      metaTitle: 'SEO Técnico en 2024: Guía Completa de Optimización | Blog Plalz',
      metaDescription: 'Domina las técnicas de SEO técnico más importantes para 2024, Core Web Vitals, IA y optimización avanzada.',
      keywords: ['seo tecnico', 'core web vitals', 'optimizacion web', 'seo 2024', 'performance'],
      ogImage: '/blog/seo-tecnico-2024/og-image.jpg',
    },
    socialSharing: {
      twitter: 'Guía completa de SEO técnico para 2024 🚀 Core Web Vitals, IA y más',
      facebook: 'Todo lo que necesitas saber sobre SEO técnico en 2024',
      linkedin: 'Técnicas avanzadas de SEO técnico para mejorar tu posicionamiento',
    },
    tableOfContents: [
      { id: 'core-web-vitals', title: 'Core Web Vitals: La Base del SEO Técnico', level: 2, anchor: 'core-web-vitals' },
      { id: 'optimizacion-ia', title: 'Optimización para IA y Búsqueda Semántica', level: 2, anchor: 'optimizacion-ia' },
      { id: 'arquitectura-web', title: 'Arquitectura Web Optimizada', level: 2, anchor: 'arquitectura-web' },
      { id: 'optimizacion-avanzada', title: 'Optimización Técnica Avanzada', level: 2, anchor: 'optimizacion-avanzada' },
      { id: 'herramientas', title: 'Herramientas Esenciales 2024', level: 2, anchor: 'herramientas' },
      { id: 'tendencias', title: 'Tendencias Emergentes', level: 2, anchor: 'tendencias' },
      { id: 'checklist', title: 'Checklist de SEO Técnico 2024', level: 2, anchor: 'checklist' },
    ],
    relatedPosts: ['1', '4'],
    commentsEnabled: true,
    commentsCount: 15,
    views: 3421,
    likes: 203,
    shares: 67,
  },
];

export const BLOG_STATS: BlogStats = {
  totalPosts: 47,
  totalCategories: 5,
  totalTags: 15,
  totalAuthors: 3,
  totalViews: 125847,
  averageReadingTime: 8,
};

// Helper functions for filtering and searching
export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return BLOG_POSTS.filter(post => post.category.slug === categorySlug);
}

export function getPostsByTag(tagSlug: string): BlogPost[] {
  return BLOG_POSTS.filter(post => 
    post.tags.some(tag => tag.slug === tagSlug)
  );
}

export function getPostsByAuthor(authorSlug: string): BlogPost[] {
  return BLOG_POSTS.filter(post => post.author.slug === authorSlug);
}

export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter(post => post.featured).slice(0, 3);
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
  return BLOG_POSTS
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
}

export function getRelatedPosts(postId: string, limit: number = 3): BlogPost[] {
  const currentPost = BLOG_POSTS.find(post => post.id === postId);
  if (!currentPost) return [];

  return BLOG_POSTS
    .filter(post => 
      post.id !== postId && 
      (post.category.id === currentPost.category.id || 
       post.tags.some(tag => currentPost.tags.some(currentTag => currentTag.id === tag.id)))
    )
    .slice(0, limit);
}

export function searchPosts(query: string): BlogPost[] {
  const searchLower = query.toLowerCase();
  return BLOG_POSTS.filter(post =>
    post.title.toLowerCase().includes(searchLower) ||
    post.excerpt.toLowerCase().includes(searchLower) ||
    post.content.toLowerCase().includes(searchLower) ||
    post.tags.some(tag => tag.name.toLowerCase().includes(searchLower)) ||
    post.category.name.toLowerCase().includes(searchLower)
  );
}

export function getPopularTags(limit: number = 10): BlogTag[] {
  return BLOG_TAGS
    .sort((a, b) => b.postsCount - a.postsCount)
    .slice(0, limit);
} 