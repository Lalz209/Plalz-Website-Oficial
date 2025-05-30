import { MainLayout } from '@/components/layout/main-layout';
import {
  HeroSection,
  ServicesOverview,
  ValueProposition,
  Testimonials,
  PortfolioShowcase,
  StatsSection,
  FinalCTA
} from '@/components/sections';

export default function HomePage() {
  return (
    <MainLayout showBreadcrumbs={false}>
      <HeroSection />
      <ServicesOverview />
      <ValueProposition />
      <Testimonials />
      <PortfolioShowcase />
      <StatsSection />
      <FinalCTA />
    </MainLayout>
  );
} 