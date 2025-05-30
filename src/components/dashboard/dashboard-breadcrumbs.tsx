"use client";

import { usePathname } from 'next/navigation';
import { Link } from '@/lib/navigation';
import { ChevronRightIcon, HomeIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}

export function DashboardBreadcrumbs() {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Always start with Dashboard
    breadcrumbs.push({ label: 'Dashboard', href: '/dashboard' });

    let currentPath = '';
    segments.forEach((segment, index) => {
      // Skip the first segment if it's 'dashboard'
      if (segment === 'dashboard' && index === 0) {
        currentPath = '/dashboard';
        return;
      }

      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      // Map segments to readable labels
      let label = segment;
      switch (segment) {
        case 'proyectos':
          label = 'Mis Proyectos';
          break;
        case 'cotizaciones':
          label = 'Cotizaciones';
          break;
        case 'historial':
          label = 'Historial';
          break;
        case 'configuracion':
          label = 'Configuración';
          break;
        default:
          // For dynamic segments like project IDs, try to get a meaningful name
          if (segment.match(/^[0-9]+$/)) {
            label = `Proyecto #${segment}`;
          } else {
            // Capitalize and replace hyphens with spaces
            label = segment
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
          }
      }

      breadcrumbs.push({
        label,
        href: currentPath,
        isCurrentPage: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs if we're on the main dashboard page
  if (pathname === '/dashboard') {
    return null;
  }

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="h-4 w-4 text-muted-foreground mx-2" />
            )}
            
            {breadcrumb.isCurrentPage ? (
              <span className="text-sm font-medium text-foreground">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  index === 0 ? "text-muted-foreground" : "text-muted-foreground"
                )}
              >
                {index === 0 && (
                  <HomeIcon className="h-4 w-4 mr-1 inline" />
                )}
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 