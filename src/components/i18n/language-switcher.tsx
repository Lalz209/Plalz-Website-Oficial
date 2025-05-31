"use client";

import { useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { GlobeIcon, CheckIcon } from '@/components/ui/icons';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/navigation';
import { getLocaleMetadata } from '@/lib/i18n/config';

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact' | 'minimal';
  showFlag?: boolean;
  showName?: boolean;
  className?: string;
}

export function LanguageSwitcher({
  variant = 'default',
  showFlag = true,
  showName = true,
  className
}: LanguageSwitcherProps) {
  const t = useTranslations('common');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocaleData = getLocaleMetadata(locale);

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    startTransition(() => {
      // Store the preference in localStorage
      localStorage.setItem('preferred-locale', newLocale);
      
      // Navigate to the same page with new locale
      router.replace(pathname, { locale: newLocale });
    });
    
    setIsOpen(false);
  };

  const renderTrigger = () => {
    switch (variant) {
      case 'compact':
        return (
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-2 ${className}`}
            disabled={isPending}
          >
            {showFlag && <span className="mr-1">{currentLocaleData.flag}</span>}
            {showName && (
              <span className="text-sm font-medium">
                {locale.toUpperCase()}
              </span>
            )}
          </Button>
        );
      
      case 'minimal':
        return (
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${className}`}
            disabled={isPending}
          >
            <GlobeIcon className="h-4 w-4" />
          </Button>
        );
      
      default:
        return (
          <Button
            variant="outline"
            className={`h-10 px-3 ${className}`}
            disabled={isPending}
          >
            {showFlag && <span className="mr-2">{currentLocaleData.flag}</span>}
            {showName && (
              <span className="font-medium">{currentLocaleData.nativeName}</span>
            )}
            <GlobeIcon className="ml-2 h-4 w-4" />
          </Button>
        );
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {renderTrigger()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {locales.map((loc) => {
          const localeData = getLocaleMetadata(loc);
          const isActive = loc === locale;
          
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className="flex items-center justify-between cursor-pointer"
              disabled={isPending}
            >
              <div className="flex items-center">
                <span className="mr-3">{localeData.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{localeData.nativeName}</span>
                  <span className="text-xs text-muted-foreground">
                    {localeData.name}
                  </span>
                </div>
              </div>
              {isActive && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Current
                  </Badge>
                  <CheckIcon className="h-4 w-4 text-primary" />
                </div>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Compact version for mobile
export function MobileLanguageSwitcher({ className }: { className?: string }) {
  return (
    <LanguageSwitcher
      variant="compact"
      showFlag={true}
      showName={false}
      className={className}
    />
  );
}

// Minimal version for tight spaces
export function MinimalLanguageSwitcher({ className }: { className?: string }) {
  return (
    <LanguageSwitcher
      variant="minimal"
      showFlag={false}
      showName={false}
      className={className}
    />
  );
} 