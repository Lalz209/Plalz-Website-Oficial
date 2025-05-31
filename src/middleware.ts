import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/navigation';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
  alternateLinks: true,
  pathnames: {
    '/': '/',
    '/sobre-nosotros': {
      es: '/sobre-nosotros',
      en: '/about-us'
    },
    '/contacto': {
      es: '/contacto',
      en: '/contact'
    },
    '/servicios': {
      es: '/servicios',
      en: '/services'
    },
    '/precios': {
      es: '/precios',
      en: '/pricing'
    },
    '/privacidad': {
      es: '/privacidad',
      en: '/privacy'
    },
    '/terminos': {
      es: '/terminos',
      en: '/terms'
    },
    '/buscar': {
      es: '/buscar',
      en: '/search'
    },
    '/cotizar': {
      es: '/cotizar',
      en: '/quote'
    },
    '/portfolio': {
      es: '/portfolio',
      en: '/portfolio'
    },
    '/blog': {
      es: '/blog',
      en: '/blog'
    }
  }
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(es|en)/:path*',
    
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
}; 