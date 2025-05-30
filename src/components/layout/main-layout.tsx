import { ReactNode } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';

interface MainLayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
}

export function MainLayout({ children, showBreadcrumbs = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {showBreadcrumbs && <Breadcrumbs />}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
} 