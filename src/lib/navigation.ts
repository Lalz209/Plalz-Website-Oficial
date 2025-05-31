import { createNavigation } from 'next-intl/navigation';

export const locales = ['es', 'en'] as const;
export const defaultLocale = 'es' as const;

export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English'
};

export const localeFlags: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇺🇸'
};

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

// Utility functions for locale handling
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  if (isValidLocale(potentialLocale)) {
    return potentialLocale;
  }
  
  return defaultLocale;
}

export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/');
  if (segments.length > 1 && isValidLocale(segments[1])) {
    return '/' + segments.slice(2).join('/');
  }
  return pathname;
} 