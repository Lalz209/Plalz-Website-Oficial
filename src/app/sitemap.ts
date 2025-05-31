import { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/lib/navigation';

const baseUrl = 'https://plalz.com';

// Define all routes that should be included in sitemap
const routes = [
  '',
  '/sobre-nosotros',
  '/contacto',
  '/servicios',
  '/servicios/desarrollo-web',
  '/servicios/ecommerce',
  '/servicios/mantenimiento',
  '/servicios/seo-marketing',
  '/precios',
  '/portfolio',
  '/blog',
  '/buscar',
  '/cotizar',
  '/privacidad',
  '/terminos'
];

// English route mappings
const routeMappings: Record<string, string> = {
  '/sobre-nosotros': '/about-us',
  '/contacto': '/contact',
  '/servicios': '/services',
  '/servicios/desarrollo-web': '/services/web-development',
  '/servicios/ecommerce': '/services/ecommerce',
  '/servicios/mantenimiento': '/services/maintenance',
  '/servicios/seo-marketing': '/services/seo-marketing',
  '/precios': '/pricing',
  '/buscar': '/search',
  '/cotizar': '/quote',
  '/privacidad': '/privacy',
  '/terminos': '/terms'
};

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  // Add routes for each locale
  for (const locale of locales) {
    for (const route of routes) {
      let localizedRoute = route;
      
      // Map Spanish routes to English equivalents
      if (locale === 'en' && routeMappings[route]) {
        localizedRoute = routeMappings[route];
      }

      const url = `${baseUrl}/${locale}${localizedRoute}`;
      
      // Generate alternate links for this route
      const alternates: Record<string, string> = {};
      for (const altLocale of locales) {
        let altRoute = route;
        if (altLocale === 'en' && routeMappings[route]) {
          altRoute = routeMappings[route];
        }
        alternates[altLocale] = `${baseUrl}/${altLocale}${altRoute}`;
      }

      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: getChangeFrequency(route),
        priority: getPriority(route),
        alternates: {
          languages: alternates
        }
      });
    }
  }

  // Add blog posts (example - you would fetch these from your CMS/database)
  const blogPosts = [
    {
      slug: 'tendencias-desarrollo-web-2024',
      enSlug: 'web-development-trends-2024',
      lastModified: '2024-01-15'
    },
    {
      slug: 'guia-seo-principiantes',
      enSlug: 'seo-guide-beginners',
      lastModified: '2024-01-10'
    },
    {
      slug: 'mejores-practicas-ecommerce',
      enSlug: 'ecommerce-best-practices',
      lastModified: '2024-01-05'
    },
    {
      slug: 'optimizacion-velocidad-web',
      enSlug: 'web-speed-optimization',
      lastModified: '2024-01-01'
    }
  ];

  for (const post of blogPosts) {
    for (const locale of locales) {
      const slug = locale === 'es' ? post.slug : post.enSlug;
      const url = `${baseUrl}/${locale}/blog/${slug}`;
      
      const alternates: Record<string, string> = {};
      for (const altLocale of locales) {
        const altSlug = altLocale === 'es' ? post.slug : post.enSlug;
        alternates[altLocale] = `${baseUrl}/${altLocale}/blog/${altSlug}`;
      }

      sitemap.push({
        url,
        lastModified: new Date(post.lastModified),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: alternates
        }
      });
    }
  }

  // Add portfolio projects (example)
  const portfolioProjects = [
    {
      slug: 'restaurante-la-mesa',
      enSlug: 'la-mesa-restaurant',
      lastModified: '2024-01-20'
    },
    {
      slug: 'tienda-moda-elegante',
      enSlug: 'elegant-fashion-store',
      lastModified: '2024-01-18'
    },
    {
      slug: 'portal-juridico-profesional',
      enSlug: 'professional-legal-portal',
      lastModified: '2024-01-15'
    },
    {
      slug: 'app-fintech-innovadora',
      enSlug: 'innovative-fintech-app',
      lastModified: '2024-01-12'
    }
  ];

  for (const project of portfolioProjects) {
    for (const locale of locales) {
      const slug = locale === 'es' ? project.slug : project.enSlug;
      const url = `${baseUrl}/${locale}/portfolio/${slug}`;
      
      const alternates: Record<string, string> = {};
      for (const altLocale of locales) {
        const altSlug = altLocale === 'es' ? project.slug : project.enSlug;
        alternates[altLocale] = `${baseUrl}/${altLocale}/portfolio/${altSlug}`;
      }

      sitemap.push({
        url,
        lastModified: new Date(project.lastModified),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: alternates
        }
      });
    }
  }

  return sitemap;
}

function getChangeFrequency(route: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  if (route === '') return 'weekly'; // Homepage
  if (route === '/blog') return 'daily';
  if (route === '/portfolio') return 'weekly';
  if (route === '/precios' || route === '/pricing') return 'monthly';
  if (route.startsWith('/servicios') || route.startsWith('/services')) return 'monthly';
  if (route === '/contacto' || route === '/contact') return 'monthly';
  if (route === '/sobre-nosotros' || route === '/about-us') return 'monthly';
  if (route === '/privacidad' || route === '/privacy') return 'yearly';
  if (route === '/terminos' || route === '/terms') return 'yearly';
  return 'monthly';
}

function getPriority(route: string): number {
  if (route === '') return 1.0; // Homepage
  if (route === '/servicios' || route === '/services') return 0.9;
  if (route === '/contacto' || route === '/contact') return 0.9;
  if (route === '/precios' || route === '/pricing') return 0.8;
  if (route === '/portfolio') return 0.8;
  if (route === '/sobre-nosotros' || route === '/about-us') return 0.7;
  if (route === '/blog') return 0.7;
  if (route.startsWith('/servicios/') || route.startsWith('/services/')) return 0.8;
  if (route === '/cotizar' || route === '/quote') return 0.8;
  if (route === '/buscar' || route === '/search') return 0.5;
  if (route === '/privacidad' || route === '/privacy') return 0.3;
  if (route === '/terminos' || route === '/terms') return 0.3;
  return 0.5;
} 