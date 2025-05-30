"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarGroup } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardBreadcrumbs } from '@/components/dashboard/dashboard-breadcrumbs';
import { Link } from '@/lib/navigation';
import { 
  MOCK_PROJECTS,
  PROJECT_STATUS_CONFIG,
  PROJECT_TYPE_CONFIG 
} from '@/lib/data/dashboard-data';
import { ProjectStatus, ProjectType } from '@/lib/types/dashboard';
import {
  SearchIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  ClockIcon,
  DollarSignIcon,
  MessageSquareIcon,
  EyeIcon,
  CalendarIcon,
  PlusIcon,
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'list';

function ProjectCard({ 
  project, 
  viewMode 
}: { 
  project: typeof MOCK_PROJECTS[0]; 
  viewMode: ViewMode;
}) {
  const statusConfig = PROJECT_STATUS_CONFIG[project.status];
  const typeConfig = PROJECT_TYPE_CONFIG[project.type];
  
  const daysUntilDue = Math.ceil(
    (project.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const budgetUsed = (project.spent / project.budget) * 100;

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-2xl">
                {typeConfig.icon}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {typeConfig.label}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", statusConfig.textColor, statusConfig.bgColor)}
                  >
                    {statusConfig.label}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">{project.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>
                      {daysUntilDue < 0 
                        ? `${Math.abs(daysUntilDue)} días de retraso`
                        : daysUntilDue === 0 
                        ? "Vence hoy"
                        : `${daysUntilDue} días restantes`
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSignIcon className="h-4 w-4" />
                    <span>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Progreso: </span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="w-24 h-2" />
              </div>

              <AvatarGroup max={3} total={project.team.length}>
                {project.team.map((member) => (
                  <Avatar 
                    key={member.id} 
                    fallback={member.name.split(' ').map(n => n[0]).join('')}
                    size="sm"
                  />
                ))}
              </AvatarGroup>

              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/dashboard/proyectos/${project.id}`}>
                    <EyeIcon className="h-4 w-4 mr-1" />
                    Ver
                  </Link>
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquareIcon className="h-4 w-4 mr-1" />
                  Chat
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <CardDescription className="text-sm">
              {project.description}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant="outline" className="text-xs">
              {typeConfig.icon} {typeConfig.label}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn("text-xs", statusConfig.textColor, statusConfig.bgColor)}
            >
              {statusConfig.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progreso</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Presupuesto</span>
            <span>{budgetUsed.toFixed(0)}% usado</span>
          </div>
          <Progress value={budgetUsed} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${project.spent.toLocaleString()}</span>
            <span>${project.budget.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
            <span className={cn(
              daysUntilDue < 0 ? "text-red-600" : 
              daysUntilDue <= 3 ? "text-orange-600" : 
              "text-muted-foreground"
            )}>
              {daysUntilDue < 0 
                ? `${Math.abs(daysUntilDue)} días de retraso`
                : daysUntilDue === 0 
                ? "Vence hoy"
                : `${daysUntilDue} días restantes`
              }
            </span>
          </div>
          <AvatarGroup max={3} total={project.team.length}>
            {project.team.map((member) => (
              <Avatar 
                key={member.id} 
                fallback={member.name.split(' ').map(n => n[0]).join('')}
                size="sm"
              />
            ))}
          </AvatarGroup>
        </div>

        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/dashboard/proyectos/${project.id}`}>
              Ver Detalles
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquareIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
        <GridIcon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No se encontraron proyectos</h3>
      <p className="text-muted-foreground mb-6">
        No tienes proyectos que coincidan con los filtros seleccionados.
      </p>
      <Button asChild>
        <Link href="/cotizar">
          <PlusIcon className="mr-2 h-4 w-4" />
          Crear Nuevo Proyecto
        </Link>
      </Button>
    </div>
  );
}

function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ProjectType | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesType = typeFilter === 'all' || project.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const projectsByStatus = useMemo(() => {
    const groups = {
      active: filteredProjects.filter(p => p.status === 'in-progress' || p.status === 'review'),
      planning: filteredProjects.filter(p => p.status === 'planning'),
      completed: filteredProjects.filter(p => p.status === 'completed'),
      onHold: filteredProjects.filter(p => p.status === 'on-hold' || p.status === 'cancelled'),
    };
    return groups;
  }, [filteredProjects]);

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Proyectos</h1>
          <p className="text-muted-foreground">
            Gestiona y da seguimiento a todos tus proyectos
          </p>
        </div>
        <Button asChild>
          <Link href="/cotizar">
            <PlusIcon className="mr-2 h-4 w-4" />
            Nuevo Proyecto
          </Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar proyectos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ProjectStatus | 'all')}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="planning">Planificación</SelectItem>
                  <SelectItem value="in-progress">En Progreso</SelectItem>
                  <SelectItem value="review">En Revisión</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="on-hold">En Pausa</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as ProjectType | 'all')}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="website">Sitio Web</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="webapp">Web App</SelectItem>
                  <SelectItem value="mobile">App Móvil</SelectItem>
                  <SelectItem value="design">Diseño</SelectItem>
                  <SelectItem value="seo">SEO</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Content */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            Todos ({filteredProjects.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Activos ({projectsByStatus.active.length})
          </TabsTrigger>
          <TabsTrigger value="planning">
            Planificación ({projectsByStatus.planning.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completados ({projectsByStatus.completed.length})
          </TabsTrigger>
          <TabsTrigger value="onHold">
            En Pausa ({projectsByStatus.onHold.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {filteredProjects.length > 0 ? (
            <div className={cn(
              viewMode === 'grid' 
                ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" 
                : "space-y-4"
            )}>
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="active">
          {projectsByStatus.active.length > 0 ? (
            <div className={cn(
              viewMode === 'grid' 
                ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" 
                : "space-y-4"
            )}>
              {projectsByStatus.active.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="planning">
          {projectsByStatus.planning.length > 0 ? (
            <div className={cn(
              viewMode === 'grid' 
                ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" 
                : "space-y-4"
            )}>
              {projectsByStatus.planning.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="completed">
          {projectsByStatus.completed.length > 0 ? (
            <div className={cn(
              viewMode === 'grid' 
                ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" 
                : "space-y-4"
            )}>
              {projectsByStatus.completed.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="onHold">
          {projectsByStatus.onHold.length > 0 ? (
            <div className={cn(
              viewMode === 'grid' 
                ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" 
                : "space-y-4"
            )}>
              {projectsByStatus.onHold.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ProjectsPageWrapper() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ProjectsPage />
      </DashboardLayout>
    </ProtectedRoute>
  );
} 