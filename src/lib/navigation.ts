import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'es' as const;

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale
}); 