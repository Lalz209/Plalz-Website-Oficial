import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://plalz.com';
  
  const routes = [
    '',
    '/services',
    '/services/web-development',
    '/services/maintenance',
    '/services/seo',
    '/services/hosting',
    '/portfolio',
    '/blog',
    '/contact',
    '/about',
    '/components',
  ];

  const locales = ['es', 'en'];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add routes for each locale
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/es${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      });
    });
  });

  return sitemap;
} 