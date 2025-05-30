"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PortfolioProject } from '@/lib/types/portfolio';
import { CATEGORY_CONFIG, INDUSTRY_CONFIG } from '@/lib/data/portfolio-data';
import { EyeIcon, ExternalLinkIcon, CalendarIcon, ClockIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface PortfolioGridProps {
  projects: PortfolioProject[];
  onProjectClick: (project: PortfolioProject) => void;
  loading?: boolean;
}

interface ProjectCardProps {
  project: PortfolioProject;
  onClick: (project: PortfolioProject) => void;
  index: number;
}

function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const categoryConfig = CATEGORY_CONFIG[project.category];
  const industryConfig = INDUSTRY_CONFIG[project.industry];

  // Calculate card height based on content and index for masonry effect
  const getCardHeight = () => {
    const baseHeight = 300;
    const variations = [0, 50, 100, 25, 75];
    return baseHeight + variations[index % variations.length];
  };

  return (
    <Card
      ref={cardRef}
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2",
        "border-0 bg-gradient-to-br from-background to-muted/20"
      )}
      style={{ height: getCardHeight() }}
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
              isHovered && "scale-110"
            )}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-60"
          )} />
        </div>

        {/* Content */}
        <CardContent className="relative h-full p-6 flex flex-col justify-between text-white">
          {/* Top Section */}
          <div className="space-y-3">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {project.featured && (
                <Badge className="bg-yellow-500/90 text-yellow-900 border-0">
                  ⭐ Destacado
                </Badge>
              )}
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                {categoryConfig.icon} {categoryConfig.label}
              </Badge>
            </div>

            {/* Project Info */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {project.shortDescription}
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            {/* Technologies */}
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech) => (
                <Badge
                  key={tech.id}
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 text-xs"
                >
                  {tech.icon} {tech.name}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 text-xs"
                >
                  +{project.technologies.length - 3}
                </Badge>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-white/70">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {project.year}
                </div>
                <div className="flex items-center gap-1">
                  {industryConfig.icon} {industryConfig.label}
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                {project.duration}
              </div>
            </div>

            {/* Hover Actions */}
            <div className={cn(
              "flex gap-2 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <Button
                size="sm"
                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(project);
                }}
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                Ver Proyecto
              </Button>
              
              {project.client.website && (
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.client.website, '_blank');
                  }}
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>

        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
      </div>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="h-80 bg-muted animate-pulse" />
        </Card>
      ))}
    </div>
  );
}

export function PortfolioGrid({ projects, onProjectClick, loading }: PortfolioGridProps) {
  const [visibleProjects, setVisibleProjects] = useState(9);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = async () => {
    setIsLoadingMore(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setVisibleProjects(prev => prev + 6);
    setIsLoadingMore(false);
  };

  const hasMore = visibleProjects < projects.length;

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <EyeIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">No se encontraron proyectos</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          No hay proyectos que coincidan con los filtros seleccionados. 
          Intenta ajustar los criterios de búsqueda.
        </p>
        <Button variant="outline">
          Limpiar Filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Masonry Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, visibleProjects).map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={onProjectClick}
            index={index}
          />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <Button
            onClick={loadMore}
            disabled={isLoadingMore}
            size="lg"
            className="min-w-[200px]"
          >
            {isLoadingMore ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Cargando...
              </>
            ) : (
              `Cargar más proyectos (${projects.length - visibleProjects} restantes)`
            )}
          </Button>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center text-sm text-muted-foreground">
        Mostrando {Math.min(visibleProjects, projects.length)} de {projects.length} proyectos
      </div>
    </div>
  );
} 