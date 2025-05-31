"use client";

import { useTranslations, useLocale } from 'next-intl';
import { type Locale } from '@/lib/navigation';
import { useFormatters } from './locale-provider';

interface TranslatedContentProps {
  namespace: string;
  keyPath: string;
  values?: Record<string, any>;
  fallback?: string;
  rich?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function TranslatedContent({
  namespace,
  keyPath,
  values = {},
  fallback,
  rich = false,
  className,
  as: Component = 'span'
}: TranslatedContentProps) {
  const t = useTranslations(namespace);
  const locale = useLocale() as Locale;
  const formatters = useFormatters();

  // Enhanced values with formatters
  const enhancedValues: Record<string, any> = {
    ...values,
    // Add formatter functions to values
    formatCurrency: formatters.currency,
    formatDate: formatters.date,
    formatNumber: formatters.number,
    formatRelativeTime: formatters.relativeTime,
  };

  try {
    const content = t(keyPath, enhancedValues);
    
    if (rich) {
      return (
        <Component 
          className={className}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }

    return (
      <Component className={className}>
        {content}
      </Component>
    );
  } catch (error) {
    // Fallback handling
    if (fallback) {
      return (
        <Component className={className}>
          {fallback}
        </Component>
      );
    }

    // Development mode: show missing key
    if (process.env.NODE_ENV === 'development') {
      return (
        <Component className={`${className} text-red-500 bg-red-50 px-1 rounded`}>
          Missing: {namespace}.{keyPath}
        </Component>
      );
    }

    // Production: return empty or key path
    return (
      <Component className={className}>
        {keyPath.split('.').pop()}
      </Component>
    );
  }
}

// Specialized components for common use cases
interface TranslatedTextProps {
  namespace: string;
  keyPath: string;
  values?: Record<string, any>;
  fallback?: string;
  className?: string;
}

export function TranslatedText(props: TranslatedTextProps) {
  return <TranslatedContent {...props} as="span" />;
}

export function TranslatedHeading({ 
  level = 1, 
  ...props 
}: TranslatedTextProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  return <TranslatedContent {...props} as={Component} />;
}

export function TranslatedParagraph(props: TranslatedTextProps) {
  return <TranslatedContent {...props} as="p" />;
}

export function TranslatedRichText(props: TranslatedTextProps) {
  return <TranslatedContent {...props} rich={true} as="div" />;
}

// Hook for programmatic translations
export function useTranslatedContent(namespace: string) {
  const t = useTranslations(namespace);
  const formatters = useFormatters();

  return {
    t: (keyPath: string, values?: Record<string, any>) => {
      const enhancedValues: Record<string, any> = {
        ...values,
        formatCurrency: formatters.currency,
        formatDate: formatters.date,
        formatNumber: formatters.number,
        formatRelativeTime: formatters.relativeTime,
      };

      try {
        return t(keyPath, enhancedValues);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          return `Missing: ${namespace}.${keyPath}`;
        }
        return keyPath.split('.').pop() || keyPath;
      }
    },
    formatters
  };
}

// Pluralization component
interface PluralizedContentProps {
  namespace: string;
  keyPath: string;
  count: number;
  values?: Record<string, any>;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function PluralizedContent({
  namespace,
  keyPath,
  count,
  values = {},
  className,
  as: Component = 'span'
}: PluralizedContentProps) {
  const enhancedValues = {
    ...values,
    count
  };

  return (
    <TranslatedContent
      namespace={namespace}
      keyPath={keyPath}
      values={enhancedValues}
      className={className}
      as={Component}
    />
  );
}

// Date formatting component
interface FormattedDateProps {
  date: Date;
  options?: Intl.DateTimeFormatOptions;
  className?: string;
  relative?: boolean;
}

export function FormattedDate({ 
  date, 
  options, 
  className,
  relative = false 
}: FormattedDateProps) {
  const formatters = useFormatters();

  if (relative) {
    const now = new Date();
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
    
    let value: number;
    let unit: Intl.RelativeTimeFormatUnit;

    if (Math.abs(diffInSeconds) < 60) {
      value = diffInSeconds;
      unit = 'second';
    } else if (Math.abs(diffInSeconds) < 3600) {
      value = Math.floor(diffInSeconds / 60);
      unit = 'minute';
    } else if (Math.abs(diffInSeconds) < 86400) {
      value = Math.floor(diffInSeconds / 3600);
      unit = 'hour';
    } else {
      value = Math.floor(diffInSeconds / 86400);
      unit = 'day';
    }

    return (
      <time className={className} dateTime={date.toISOString()}>
        {formatters.relativeTime(value, unit)}
      </time>
    );
  }

  return (
    <time className={className} dateTime={date.toISOString()}>
      {formatters.date(date, options)}
    </time>
  );
}

// Currency formatting component
interface FormattedCurrencyProps {
  value: number;
  currency?: string;
  options?: Intl.NumberFormatOptions;
  className?: string;
}

export function FormattedCurrency({ 
  value, 
  currency, 
  options, 
  className 
}: FormattedCurrencyProps) {
  const formatters = useFormatters();

  return (
    <span className={className}>
      {formatters.currency(value, currency)}
    </span>
  );
}

// Number formatting component
interface FormattedNumberProps {
  value: number;
  options?: Intl.NumberFormatOptions;
  className?: string;
}

export function FormattedNumber({ 
  value, 
  options, 
  className 
}: FormattedNumberProps) {
  const formatters = useFormatters();

  return (
    <span className={className}>
      {formatters.number(value, options)}
    </span>
  );
} 