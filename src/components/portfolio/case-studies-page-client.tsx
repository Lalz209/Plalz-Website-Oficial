"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CaseStudy, Industry } from '@/lib/types/portfolio';
import { CASE_STUDIES, INDUSTRY_CONFIG } from '@/lib/data/portfolio-data';
import { 
  SearchIcon, 
  ClockIcon, 
  TrendingUpIcon, 
  EyeIcon,
  CalendarIcon,
  BookOpenIcon,
  BarChartIcon
} from '@/components/ui/icons';

function CaseStudyHero() {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <Badge variant="outline" className="px-4 py-2">
              📊 Casos de Estudio
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Casos de
              <span className="text-primary"> Estudio</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Análisis profundos de nuestros proyectos más exitosos. Descubre las estrategias, 
              procesos y resultados que han transformado negocios reales.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Casos Documentados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">250%</div>
              <div className="text-sm text-muted-foreground">Mejora Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Industrias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Éxito en Objetivos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onClick: (caseStudy: CaseStudy) => void;
}

function CaseStudyCard({ caseStudy, onClick }: CaseStudyCardProps) {
  const industryConfig = INDUSTRY_CONFIG[caseStudy.industry];
  const highlightedMetrics = caseStudy.keyMetrics.filter(m => m.highlighted).slice(0, 3);

  return (
    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        {/* Thumbnail */}
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={caseStudy.thumbnail}
            alt={caseStudy.title}
            width={600}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {industryConfig.icon} {industryConfig.label}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ClockIcon className="h-3 w-3" />
                {caseStudy.readTime} min lectura
              </div>
            </div>

            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {caseStudy.title}
            </h3>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              {caseStudy.subtitle}
            </p>
          </div>

          {/* Key Metrics */}
          {highlightedMetrics.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground">Resultados Clave:</h4>
              <div className="grid grid-cols-3 gap-3">
                {highlightedMetrics.map((metric) => (
                  <div key={metric.id} className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-lg font-bold text-primary">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Meta Info */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              {caseStudy.publishedAt.toLocaleDateString()}
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick(caseStudy);
              }}
            >
              <EyeIcon className="h-4 w-4 mr-2" />
              Leer Caso
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export function CaseStudiesPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState<Industry | 'all'>('all');

  // Filter case studies
  const filteredCaseStudies = useMemo(() => {
    return CASE_STUDIES.filter(caseStudy => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
          caseStudy.title.toLowerCase().includes(searchLower) ||
          caseStudy.description.toLowerCase().includes(searchLower) ||
          caseStudy.subtitle.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Industry filter
      if (industryFilter !== 'all' && caseStudy.industry !== industryFilter) {
        return false;
      }

      return true;
    });
  }, [searchQuery, industryFilter]);

  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    // Navigate to case study detail or open modal
    window.location.href = `/casos-estudio/${caseStudy.slug}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <CaseStudyHero />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar casos de estudio..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Industry Filter */}
                <div className="w-full md:w-64">
                  <Select
                    value={industryFilter}
                    onValueChange={(value) => setIndustryFilter(value as Industry | 'all')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por industria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las industrias</SelectItem>
                      {Object.entries(INDUSTRY_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{config.icon}</span>
                            {config.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  {filteredCaseStudies.length} caso{filteredCaseStudies.length !== 1 ? 's' : ''} de estudio encontrado{filteredCaseStudies.length !== 1 ? 's' : ''}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Case Studies Grid */}
          {filteredCaseStudies.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCaseStudies.map((caseStudy) => (
                <CaseStudyCard
                  key={caseStudy.id}
                  caseStudy={caseStudy}
                  onClick={handleCaseStudyClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <BookOpenIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">No se encontraron casos de estudio</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                No hay casos de estudio que coincidan con los filtros seleccionados. 
                Intenta ajustar los criterios de búsqueda.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setIndustryFilter('all');
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Featured Insights Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Insights Destacados</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Principales aprendizajes y tendencias identificadas en nuestros casos de estudio
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUpIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Optimización UX</h3>
                <p className="text-muted-foreground mb-4">
                  El 85% de nuestros proyectos logran mejoras significativas en conversión 
                  mediante optimización de experiencia de usuario.
                </p>
                <div className="text-2xl font-bold text-primary">+180%</div>
                <div className="text-sm text-muted-foreground">Mejora promedio en conversión</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChartIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Performance Web</h3>
                <p className="text-muted-foreground mb-4">
                  La optimización técnica reduce tiempos de carga y mejora 
                  significativamente las métricas de rendimiento.
                </p>
                <div className="text-2xl font-bold text-primary">-65%</div>
                <div className="text-sm text-muted-foreground">Reducción en tiempo de carga</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpenIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Metodología Ágil</h3>
                <p className="text-muted-foreground mb-4">
                  Nuestro enfoque iterativo permite adaptarse rápidamente y 
                  entregar valor desde las primeras semanas.
                </p>
                <div className="text-2xl font-bold text-primary">4 sem</div>
                <div className="text-sm text-muted-foreground">Tiempo promedio al primer MVP</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">
              ¿Quieres ser nuestro próximo caso de éxito?
            </h2>
            <p className="text-lg text-muted-foreground">
              Trabajemos juntos para crear resultados extraordinarios que podamos 
              documentar y compartir como inspiración para otros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/cotizar">
                  Iniciar Proyecto
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/portfolio">
                  Ver Portfolio Completo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 