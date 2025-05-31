"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { type Locale } from '@/lib/navigation';
import { getLocaleMetadata, formatCurrency, formatDate, formatNumber } from '@/lib/i18n/config';

interface LocaleContextType {
  locale: Locale;
  localeData: ReturnType<typeof getLocaleMetadata>;
  formatters: {
    currency: (value: number, currency?: string) => string;
    date: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
    number: (value: number, options?: Intl.NumberFormatOptions) => string;
    relativeTime: (value: number, unit: Intl.RelativeTimeFormatUnit) => string;
  };
  direction: 'ltr' | 'rtl';
  isRTL: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: React.ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const locale = useLocale() as Locale;
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const localeData = getLocaleMetadata(locale);
  const direction = localeData.direction;
  const isRTL = direction === 'rtl';

  // Create formatters with current locale
  const formatters = {
    currency: (value: number, currency?: string) => 
      formatCurrency(value, locale, currency),
    
    date: (date: Date, options?: Intl.DateTimeFormatOptions) => 
      formatDate(date, locale, options),
    
    number: (value: number, options?: Intl.NumberFormatOptions) => 
      formatNumber(value, locale, options),
    
    relativeTime: (value: number, unit: Intl.RelativeTimeFormatUnit) => {
      return new Intl.RelativeTimeFormat(locale, {
        numeric: 'auto'
      }).format(value, unit);
    }
  };

  // Apply direction to document
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.dir = direction;
      document.documentElement.lang = locale;
    }
  }, [direction, locale, mounted]);

  const value: LocaleContextType = {
    locale,
    localeData,
    formatters,
    direction,
    isRTL
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return context;
}

// Convenience hooks
export function useFormatters() {
  const { formatters } = useLocaleContext();
  return formatters;
}

export function useDirection() {
  const { direction, isRTL } = useLocaleContext();
  return { direction, isRTL };
}

export function useLocaleData() {
  const { locale, localeData } = useLocaleContext();
  return { locale, localeData };
} 