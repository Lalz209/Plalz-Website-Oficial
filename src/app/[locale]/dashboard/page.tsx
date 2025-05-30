"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarGroup } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardBreadcrumbs } from '@/components/dashboard/dashboard-breadcrumbs';
import { Link } from '@/lib/navigation';
import { 
  MOCK_METRICS, 
  MOCK_PROJECTS, 
  MOCK_NOTIFICATIONS, 
  MOCK_STATS,
  PROJECT_STATUS_CONFIG,
  PROJECT_TYPE_CONFIG 
} from '@/lib/data/dashboard-data';
import {
  BarChartIcon,
  TrendingUpIcon,
  DollarSignIcon,
  ClockIcon,
  PlusIcon,
  ArrowRightIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  AlertTriangleIcon,
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon 
}: {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn(
            "text-xs",
            changeType === 'positive' && "text-green-600",
            changeType === 'negative' && "text-red-600",
            changeType === 'neutral' && "text-muted-foreground"
          )}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function ProjectCard({ project }: { project: typeof MOCK_PROJECTS[0] }) {
  const statusConfig = PROJECT_STATUS_CONFIG[project.status];
  const typeConfig = PROJECT_TYPE_CONFIG[project.type];
  
  const daysUntilDue = Math.ceil(
    (project.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">{project.title}</CardTitle>
            <CardDescription className="text-sm">
              {project.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
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
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationItem({ notification }: { notification: typeof MOCK_NOTIFICATIONS[0] }) {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangleIcon className="h-4 w-4 text-orange-600" />;
      case 'error':
        return <AlertCircleIcon className="h-4 w-4 text-red-600" />;
      default:
        return <InfoIcon className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className={cn(
      "flex items-start gap-3 p-3 rounded-lg border transition-colors",
      !notification.read && "bg-muted/50"
    )}>
      {getIcon()}
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{notification.title}</p>
          <span className="text-xs text-muted-foreground">
            {notification.createdAt.toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        {notification.actionUrl && (
          <Button asChild variant="link" size="sm" className="h-auto p-0">
            <Link href={notification.actionUrl}>
              {notification.actionLabel}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

function DashboardOverview() {
  const activeProjects = MOCK_PROJECTS.filter(p => 
    p.status === 'in-progress' || p.status === 'review'
  );
  
  const recentNotifications = MOCK_NOTIFICATIONS.slice(0, 3);

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido de vuelta. Aquí tienes un resumen de tus proyectos.
          </p>
        </div>
        <Button asChild>
          <Link href="/cotizar">
            <PlusIcon className="mr-2 h-4 w-4" />
            Nuevo Proyecto
          </Link>
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Proyectos Activos"
          value={MOCK_METRICS.activeProjects}
          change="+2 este mes"
          changeType="positive"
          icon={BarChartIcon}
        />
        <MetricCard
          title="Proyectos Completados"
          value={MOCK_METRICS.completedProjects}
          change="+1 este mes"
          changeType="positive"
          icon={CheckCircleIcon}
        />
        <MetricCard
          title="Total Invertido"
          value={`$${MOCK_METRICS.totalSpent.toLocaleString()}`}
          change="-31% vs mes anterior"
          changeType="negative"
          icon={DollarSignIcon}
        />
        <MetricCard
          title="Aprobaciones Pendientes"
          value={MOCK_METRICS.pendingApprovals}
          change="2 requieren atención"
          changeType="neutral"
          icon={ClockIcon}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Projects */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Proyectos Activos</CardTitle>
                  <CardDescription>
                    Proyectos en progreso y en revisión
                  </CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/proyectos">
                    Ver Todos
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activeProjects.length > 0 ? (
                <div className="space-y-4">
                  {activeProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No tienes proyectos activos</p>
                  <Button asChild className="mt-4">
                    <Link href="/cotizar">Crear Nuevo Proyecto</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Notifications & Quick Actions */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Notificaciones</CardTitle>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/notificaciones">Ver Todas</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentNotifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/cotizar">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Solicitar Cotización
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/proyectos">
                  <BarChartIcon className="mr-2 h-4 w-4" />
                  Ver Mis Proyectos
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/historial">
                  <ClockIcon className="mr-2 h-4 w-4" />
                  Ver Historial
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Duración Promedio</span>
                  <span className="font-medium">{MOCK_STATS.averageProjectDuration} días</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Satisfacción</span>
                  <span className="font-medium">{MOCK_STATS.satisfactionScore}/5.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Proyectos este mes</span>
                  <span className="font-medium text-green-600">
                    +{MOCK_STATS.projectsThisMonth - MOCK_STATS.projectsLastMonth}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardOverview />
      </DashboardLayout>
    </ProtectedRoute>
  );
} 