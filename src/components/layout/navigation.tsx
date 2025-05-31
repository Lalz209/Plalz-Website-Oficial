"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/lib/navigation';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  labelKey: string;
  children?: NavItem[];
}

export function Navigation() {
  const t = useTranslations('navigation');
  const tServices = useTranslations('services');
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: '/',
      labelKey: 'home',
    },
    {
      href: '/servicios',
      labelKey: 'services',
      children: [
        { href: '/servicios', labelKey: 'services' },
        { href: '/servicios/paginas-web', labelKey: 'web_development.title' },
        { href: '/servicios/paginas-web/e-commerce', labelKey: 'ecommerce.title' },
        { href: '/servicios/mantenimiento', labelKey: 'maintenance.title' },
        { href: '/servicios/mantenimiento/contenido', labelKey: 'seo.title' },
      ],
    },
    {
      href: '/portfolio',
      labelKey: 'portfolio',
    },
    {
      href: '/blog',
      labelKey: 'blog',
    },
    {
      href: '/precios',
      labelKey: 'pricing',
    },
    {
      href: '/contacto',
      labelKey: 'contact',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const getLabel = (item: NavItem) => {
    if (item.href.startsWith('/servicios/') && item.href !== '/servicios') {
      return tServices(item.labelKey);
    }
    return t(item.labelKey);
  };

  return (
    <nav className="hidden lg:flex items-center space-x-6">
      {navItems.map((item) => {
        if (item.children) {
          return (
            <DropdownMenu key={item.href}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-1 font-medium transition-colors hover:text-primary",
                    isActive(item.href) ? "text-primary" : "text-foreground"
                  )}
                >
                  {getLabel(item)}
                  <ChevronDownIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel>{tServices('title')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {item.children.map((child) => (
                  <DropdownMenuItem key={child.href} asChild>
                    <Link
                      href={child.href}
                      className={cn(
                        "w-full cursor-pointer font-medium",
                        isActive(child.href) ? "bg-accent text-accent-foreground" : ""
                      )}
                    >
                      {getLabel(child)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "font-medium transition-colors hover:text-primary",
              isActive(item.href) ? "text-primary" : "text-foreground"
            )}
          >
            {getLabel(item)}
          </Link>
        );
      })}
    </nav>
  );
}

// Mobile Navigation Component
export function MobileNavigation({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const t = useTranslations('navigation');
  const tServices = useTranslations('services');
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      href: '/',
      labelKey: 'home',
    },
    {
      href: '/servicios',
      labelKey: 'services',
      children: [
        { href: '/servicios', labelKey: 'services' },
        { href: '/servicios/paginas-web', labelKey: 'web_development.title' },
        { href: '/servicios/paginas-web/e-commerce', labelKey: 'ecommerce.title' },
        { href: '/servicios/mantenimiento', labelKey: 'maintenance.title' },
        { href: '/servicios/mantenimiento/contenido', labelKey: 'seo.title' },
      ],
    },
    {
      href: '/portfolio',
      labelKey: 'portfolio',
    },
    {
      href: '/blog',
      labelKey: 'blog',
    },
    {
      href: '/precios',
      labelKey: 'pricing',
    },
    {
      href: '/contacto',
      labelKey: 'contact',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const getLabel = (item: NavItem) => {
    if (item.href.startsWith('/servicios/') && item.href !== '/servicios') {
      return tServices(item.labelKey);
    }
    return t(item.labelKey);
  };

  const toggleDropdown = (href: string) => {
    setOpenDropdown(openDropdown === href ? null : href);
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="fixed inset-y-0 right-0 z-50 h-full w-full border-l bg-background p-6 shadow-lg sm:max-w-sm">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between font-medium",
                        isActive(item.href) ? "text-primary" : "text-foreground"
                      )}
                      onClick={() => toggleDropdown(item.href)}
                    >
                      {getLabel(item)}
                      <ChevronDownIcon 
                        size={16} 
                        className={cn(
                          "transition-transform",
                          openDropdown === item.href ? "rotate-180" : ""
                        )}
                      />
                    </Button>
                    {openDropdown === item.href && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className={cn(
                              "block py-2 px-3 rounded-md text-sm transition-colors hover:bg-accent",
                              isActive(child.href) ? "bg-accent text-accent-foreground" : ""
                            )}
                          >
                            {getLabel(child)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "block py-2 px-3 rounded-md font-medium transition-colors hover:bg-accent",
                    isActive(item.href) ? "bg-accent text-accent-foreground" : ""
                  )}
                >
                  {getLabel(item)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 