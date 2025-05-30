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
  label: string;
  children?: NavItem[];
}

export function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'Inicio',
    },
    {
      href: '/servicios',
      label: 'Servicios',
      children: [
        { href: '/servicios', label: 'Todos los Servicios' },
        { href: '/servicios/paginas-web', label: 'Páginas Web' },
        { href: '/servicios/paginas-web/corporativas', label: '• Páginas Corporativas' },
        { href: '/servicios/paginas-web/e-commerce', label: '• Tiendas Online' },
        { href: '/servicios/paginas-web/landing-pages', label: '• Landing Pages' },
        { href: '/servicios/paginas-web/blogs', label: '• Blogs Profesionales' },
        { href: '/servicios/mantenimiento', label: 'Mantenimiento Web' },
        { href: '/servicios/mantenimiento/contenido', label: '• Mantenimiento de Contenido' },
      ],
    },
    {
      href: '/portfolio',
      label: 'Portfolio',
    },
    {
      href: '/blog',
      label: 'Blog',
    },
    {
      href: '/contact',
      label: 'Contacto',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
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
                  {item.label}
                  <ChevronDownIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel>Nuestros Servicios</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {item.children.map((child, index) => {
                  // Add separator before maintenance section
                  if (child.label === 'Mantenimiento Web') {
                    return (
                      <div key={child.href}>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link
                            href={child.href}
                            className={cn(
                              "w-full cursor-pointer font-medium",
                              isActive(child.href) ? "bg-accent text-accent-foreground" : ""
                            )}
                          >
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      </div>
                    );
                  }
                  
                  return (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link
                        href={child.href}
                        className={cn(
                          "w-full cursor-pointer",
                          child.label.startsWith('•') ? "text-sm text-muted-foreground pl-4" : "font-medium",
                          isActive(child.href) ? "bg-accent text-accent-foreground" : ""
                        )}
                      >
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
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
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

// Mobile Navigation Component
export function MobileNavigation({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'Inicio',
    },
    {
      href: '/servicios',
      label: 'Servicios',
      children: [
        { href: '/servicios', label: 'Todos los Servicios' },
        { href: '/servicios/paginas-web', label: 'Páginas Web' },
        { href: '/servicios/paginas-web/corporativas', label: '• Páginas Corporativas' },
        { href: '/servicios/paginas-web/e-commerce', label: '• Tiendas Online' },
        { href: '/servicios/paginas-web/landing-pages', label: '• Landing Pages' },
        { href: '/servicios/paginas-web/blogs', label: '• Blogs Profesionales' },
        { href: '/servicios/mantenimiento', label: 'Mantenimiento Web' },
        { href: '/servicios/mantenimiento/contenido', label: '• Mantenimiento de Contenido' },
      ],
    },
    {
      href: '/portfolio',
      label: 'Portfolio',
    },
    {
      href: '/blog',
      label: 'Blog',
    },
    {
      href: '/contact',
      label: 'Contacto',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const toggleDropdown = (href: string) => {
    setOpenDropdown(openDropdown === href ? null : href);
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background p-6 shadow-lg">
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
                    {item.label}
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
                          className={cn(
                            "block py-2 px-4 text-sm transition-colors hover:text-primary",
                            child.label.startsWith('•') ? "text-muted-foreground pl-6" : "font-medium",
                            isActive(child.href) ? "text-primary bg-accent rounded" : "text-foreground"
                          )}
                          onClick={onClose}
                        >
                          {child.label}
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
                className={cn(
                  "block py-2 px-4 font-medium transition-colors hover:text-primary",
                  isActive(item.href) ? "text-primary bg-accent rounded" : "text-foreground"
                )}
                onClick={onClose}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 