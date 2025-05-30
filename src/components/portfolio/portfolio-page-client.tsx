"use client";

import { useState, useMemo } from 'react';
import { PortfolioHero } from '@/components/portfolio/portfolio-hero';
import { PortfolioFiltersComponent } from '@/components/portfolio/portfolio-filters';
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';
import { PortfolioFilters, PortfolioProject } from '@/lib/types/portfolio';
import { PORTFOLIO_PROJECTS } from '@/lib/data/portfolio-data';

export function PortfolioPageClient() {
  const [filters, setFilters] = useState<PortfolioFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    return PORTFOLIO_PROJECTS.filter(project => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.shortDescription.toLowerCase().includes(searchLower) ||
          project.client.name.toLowerCase().includes(searchLower) ||
          project.technologies.some(tech => tech.name.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && project.category !== filters.category) {
        return false;
      }

      // Industry filter
      if (filters.industry && project.industry !== filters.industry) {
        return false;
      }

      // Year filter
      if (filters.year && project.year !== filters.year) {
        return false;
      }

      // Technology filter
      if (filters.technology) {
        const hasTechnology = project.technologies.some(tech => tech.id === filters.technology);
        if (!hasTechnology) return false;
      }

      // Status filter
      if (filters.status && project.status !== filters.status) {
        return false;
      }

      // Featured filter
      if (filters.featured && !project.featured) {
        return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  const handleProjectClick = (project: PortfolioProject) => {
    // Navigate to project detail page
    window.location.href = `/portfolio/${project.slug}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PortfolioHero />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          {/* Filters */}
          <PortfolioFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalResults={filteredProjects.length}
          />

          {/* Projects Grid */}
          <PortfolioGrid
            projects={filteredProjects}
            onProjectClick={handleProjectClick}
          />
        </div>
      </div>

      {/* Call to Action Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-lg text-muted-foreground">
              Trabajemos juntos para crear algo increíble. Desde la idea inicial 
              hasta el lanzamiento, te acompañamos en cada paso del proceso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/cotizar"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Solicitar Cotización
              </a>
              <a
                href="/casos-estudio"
                className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Ver Casos de Estudio
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 