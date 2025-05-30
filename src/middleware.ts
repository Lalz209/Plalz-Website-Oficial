import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/navigation';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(es|en)/:path*']
}; 