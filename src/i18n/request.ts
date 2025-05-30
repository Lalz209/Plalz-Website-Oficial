import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Ensure we have a valid locale, fallback to 'es' if undefined
  const validLocale = locale || 'es';
  
  // Validate that the locale is one of our supported locales
  const supportedLocales = ['en', 'es'];
  const finalLocale = supportedLocales.includes(validLocale) ? validLocale : 'es';
  
  return {
    locale: finalLocale,
    messages: (await import(`../../messages/${finalLocale}.json`)).default
  };
}); 