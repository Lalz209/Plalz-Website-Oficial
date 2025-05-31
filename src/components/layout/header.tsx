"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { LanguageSwitcher, MobileLanguageSwitcher } from '@/components/i18n/language-switcher';
import { CartButton } from '@/components/layout/cart-button';
import { UserMenu } from '@/components/layout/user-menu';
import { Navigation, MobileNavigation } from '@/components/layout/navigation';
import { GlobalSearch } from '@/components/search/global-search';
import { useSearchShortcut } from '@/lib/hooks/use-keyboard-shortcut';
import { MenuIcon, CloseIcon, SearchIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('search');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut for search (Cmd+K or Ctrl+K)
  useSearchShortcut(() => {
    setIsSearchOpen(true);
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="hidden sm:inline-block font-bold text-xl text-foreground">
                Plalz
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Utilities */}
          <div className="flex items-center space-x-2">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              {isSearchOpen ? (
                <div className="w-80">
                  <GlobalSearch
                    isOpen={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                    placeholder={t('placeholder')}
                  />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2"
                >
                  <SearchIcon size={16} />
                  <span className="hidden lg:inline text-sm text-muted-foreground">
                    {t('placeholder')}
                  </span>
                  <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
              )}
            </div>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label={t('title')}
            >
              <SearchIcon size={16} />
            </Button>

            {/* Language Switcher - Desktop */}
            <div className="hidden sm:block">
              <LanguageSwitcher variant="compact" />
            </div>

            {/* Language Switcher - Mobile */}
            <div className="sm:hidden">
              <MobileLanguageSwitcher />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart */}
            <CartButton />

            {/* User Menu */}
            <UserMenu />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <CloseIcon size={20} />
              ) : (
                <MenuIcon size={20} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t">
            <GlobalSearch
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              placeholder={t('placeholder')}
            />
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Global Search Overlay for Desktop */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </header>
  );
} 