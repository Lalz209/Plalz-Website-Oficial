"use client";

import { usePathname } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { HomeIcon, ChevronDownIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: t('home'), href: '/' }
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      // Map segments to readable labels
      let label = segment;
      switch (segment) {
        case 'services':
          label = t('services');
          break;
        case 'web-development':
          label = t('webDevelopment');
          break;
        case 'maintenance':
          label = t('maintenance');
          break;
        case 'seo':
          label = t('seo');
          break;
        case 'hosting':
          label = t('hosting');
          break;
        case 'portfolio':
          label = t('portfolio');
          break;
        case 'blog':
          label = t('blog');
          break;
        case 'contact':
          label = t('contact');
          break;
        case 'about':
          label = 'Acerca de';
          break;
        case 'privacy':
          label = 'Privacidad';
          break;
        case 'terms':
          label = 'Términos';
          break;
        default:
          // Capitalize and replace hyphens with spaces
          label = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
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

  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-4 border-b bg-muted/30">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronDownIcon 
                  size={16} 
                  className="mx-2 rotate-[-90deg] text-muted-foreground" 
                />
              )}
              
              {item.isCurrentPage ? (
                <span 
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {index === 0 && <HomeIcon size={16} className="mr-1 inline" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    "flex items-center"
                  )}
                >
                  {index === 0 && <HomeIcon size={16} className="mr-1" />}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
} 