"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PortfolioProject } from '@/lib/types/portfolio';
import { PORTFOLIO_PROJECTS, CATEGORY_CONFIG, INDUSTRY_CONFIG } from '@/lib/data/portfolio-data';
import { 
  ArrowLeftIcon, 
  ExternalLinkIcon, 
  CalendarIcon, 
  ClockIcon, 
  UsersIcon,
  DollarSignIcon,
  TrendingUpIcon,
  StarIcon,
  ShareIcon,
  EyeIcon
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface ProjectDetailClientProps {
  project: PortfolioProject;
}

function ProjectHero({ project }: { project: PortfolioProject }) {
  const categoryConfig = CATEGORY_CONFIG[project.category];
  const industryConfig = INDUSTRY_CONFIG[project.industry];

  return (
    <section className="relative py-16 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <a href="/portfolio">
              <ArrowLeftIcon className="h-4 w-4" />
              Volver al Portfolio
            </a>
          </Button>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Content */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {project.featured && (
                <Badge className="bg-yellow-500 text-yellow-900">
                  ⭐ Proyecto Destacado
                </Badge>
              )}
              <Badge variant="outline">
                {categoryConfig.icon} {categoryConfig.label}
              </Badge>
              <Badge variant="outline">
                {industryConfig.icon} {industryConfig.label}
              </Badge>
              <Badge variant="outline">
                {project.year}
              </Badge>
            </div>

            {/* Title and Description */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.subtitle}
              </p>
              <p className="text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Client Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {project.client.logo && (
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                      <Image
                        src={project.client.logo}
                        alt={`${project.client.name} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{project.client.name}</h3>
                    <p className="text-muted-foreground">{project.client.industry}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {project.client.size === 'startup' ? 'Startup' :
                       project.client.size === 'small' ? 'Empresa Pequeña' :
                       project.client.size === 'medium' ? 'Empresa Mediana' :
                       'Empresa Grande'}
                    </p>
                  </div>
                  {project.client.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.client.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon className="h-4 w-4 mr-2" />
                        Visitar
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Project Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <CalendarIcon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Lanzamiento</div>
                <div className="text-xs text-muted-foreground">
                  {project.launchDate.toLocaleDateString()}
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <ClockIcon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Duración</div>
                <div className="text-xs text-muted-foreground">{project.duration}</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <UsersIcon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Equipo</div>
                <div className="text-xs text-muted-foreground">{project.teamSize} personas</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <DollarSignIcon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Presupuesto</div>
                <div className="text-xs text-muted-foreground">{project.budget || 'Consultar'}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="/cotizar">
                  Proyecto Similar
                </a>
              </Button>
              <Button variant="outline" size="lg">
                <ShareIcon className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectContent({ project }: { project: PortfolioProject }) {
  return (
    <div className="container mx-auto px-4 py-16">
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="process">Proceso</TabsTrigger>
          <TabsTrigger value="results">Resultados</TabsTrigger>
          <TabsTrigger value="gallery">Galería</TabsTrigger>
          <TabsTrigger value="testimonial">Testimonial</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Challenge & Solution */}
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎯 El Desafío
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">{project.challenge}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💡 La Solución
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">{project.solution}</p>
              </CardContent>
            </Card>
          </div>

          {/* Technologies */}
          <Card>
            <CardHeader>
              <CardTitle>Tecnologías Utilizadas</CardTitle>
              <CardDescription>
                Stack tecnológico y herramientas empleadas en el proyecto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {project.technologies.map((tech) => (
                  <div key={tech.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl">{tech.icon}</div>
                    <div>
                      <div className="font-medium">{tech.name}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {tech.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="space-y-8">
          {/* Before/After */}
          {project.beforeAfter && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Antes y Después</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comparación visual que muestra la transformación lograda
                </p>
              </div>

              {project.beforeAfter.map((comparison, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{comparison.description}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <h4 className="font-medium text-red-600">Antes</h4>
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={comparison.before}
                            alt="Antes"
                            width={600}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-green-600">Después</h4>
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={comparison.after}
                            alt="Después"
                            width={600}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-8">
          {/* Key Results */}
          <div className="grid gap-6 md:grid-cols-3">
            {project.results.map((result) => (
              <Card key={result.id} className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{result.icon}</div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {result.metric}
                  </div>
                  <h3 className="font-semibold mb-2">{result.title}</h3>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas Detalladas</CardTitle>
              <CardDescription>
                Resultados cuantificables del proyecto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {project.metrics.map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{metric.icon}</div>
                      <div>
                        <div className="font-medium">{metric.label}</div>
                        <div className="text-2xl font-bold">{metric.value}</div>
                      </div>
                    </div>
                    {metric.change && (
                      <Badge 
                        variant={metric.changeType === 'positive' ? 'default' : 'destructive'}
                        className="gap-1"
                      >
                        <TrendingUpIcon className="h-3 w-3" />
                        {metric.change}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Galería del Proyecto</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Capturas de pantalla y elementos visuales del proyecto
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {project.gallery.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="aspect-video">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="object-cover w-full h-full"
                  />
                </div>
                {image.caption && (
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{image.caption}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testimonial" className="space-y-8">
          {project.testimonial && (
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={cn(
                          "h-6 w-6",
                          i < project.testimonial!.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <blockquote className="text-2xl font-medium leading-relaxed mb-6">
                    "{project.testimonial.quote}"
                  </blockquote>
                </div>
                
                <div className="flex items-center justify-center gap-4">
                  {project.testimonial.avatar && (
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={project.testimonial.avatar}
                        alt={project.testimonial.author}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <div className="font-semibold text-lg">{project.testimonial.author}</div>
                    <div className="text-muted-foreground">{project.testimonial.position}</div>
                    <div className="text-sm text-muted-foreground">{project.client.name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RelatedProjects({ project }: { project: PortfolioProject }) {
  const relatedProjects = project.relatedProjects
    ? PORTFOLIO_PROJECTS.filter(p => project.relatedProjects?.includes(p.id))
    : PORTFOLIO_PROJECTS.filter(p => 
        p.id !== project.id && 
        (p.category === project.category || p.industry === project.industry)
      ).slice(0, 3);

  if (relatedProjects.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Proyectos Relacionados</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Otros proyectos similares que podrían interesarte
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {relatedProjects.map((relatedProject) => (
            <Card key={relatedProject.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <Image
                  src={relatedProject.thumbnail}
                  alt={relatedProject.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {CATEGORY_CONFIG[relatedProject.category].icon} {CATEGORY_CONFIG[relatedProject.category].label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{relatedProject.year}</span>
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {relatedProject.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedProject.shortDescription}
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={`/portfolio/${relatedProject.slug}`}>
                      <EyeIcon className="h-4 w-4 mr-2" />
                      Ver Proyecto
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <div className="min-h-screen bg-background">
      <ProjectHero project={project} />
      <ProjectContent project={project} />
      <RelatedProjects project={project} />
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">
              ¿Te gustó este proyecto?
            </h2>
            <p className="text-lg opacity-90">
              Podemos crear algo similar para tu empresa. Conversemos sobre tu proyecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="/cotizar">
                  Solicitar Cotización
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="/contacto">
                  Contactar Ahora
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 