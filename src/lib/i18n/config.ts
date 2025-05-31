import { Locale } from '@/lib/navigation';

// Locale configurations
export const localeConfigs: Record<Locale, {
  name: string;
  nativeName: string;
  flag: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  direction: 'ltr' | 'rtl';
  numberFormat: Intl.NumberFormatOptions;
  currencyFormat: Intl.NumberFormatOptions;
  dateTimeFormat: Intl.DateTimeFormatOptions;
}> = {
  es: {
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    currency: 'EUR',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'HH:mm',
    direction: 'ltr',
    numberFormat: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    },
    currencyFormat: {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    },
    dateTimeFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  },
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    currency: 'USD',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'h:mm a',
    direction: 'ltr',
    numberFormat: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    },
    currencyFormat: {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    },
    dateTimeFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  }
};

// Formatting utilities
export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  const config = localeConfigs[locale];
  return new Intl.NumberFormat(locale, {
    ...config.numberFormat,
    ...options
  }).format(value);
}

export function formatCurrency(
  value: number,
  locale: Locale,
  currency?: string,
  options?: Intl.NumberFormatOptions
): string {
  const config = localeConfigs[locale];
  return new Intl.NumberFormat(locale, {
    ...config.currencyFormat,
    currency: currency || config.currency,
    ...options
  }).format(value);
}

export function formatDate(
  date: Date,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const config = localeConfigs[locale];
  return new Intl.DateTimeFormat(locale, {
    ...config.dateTimeFormat,
    ...options
  }).format(date);
}

export function formatRelativeTime(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale: Locale
): string {
  return new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto'
  }).format(value, unit);
}

// Pluralization utilities
export function getPlural(
  count: number,
  locale: Locale,
  options: {
    zero?: string;
    one?: string;
    two?: string;
    few?: string;
    many?: string;
    other: string;
  }
): string {
  const pluralRules = new Intl.PluralRules(locale);
  const rule = pluralRules.select(count);
  
  return (options as any)[rule] || options.other;
}

// Text direction utilities
export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  return localeConfigs[locale].direction;
}

// Locale metadata
export function getLocaleMetadata(locale: Locale) {
  return localeConfigs[locale];
} 