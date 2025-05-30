"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarGroup } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardBreadcrumbs } from '@/components/dashboard/dashboard-breadcrumbs';
import { Link } from '@/lib/navigation';
import { 
  MOCK_PROJECTS,
  PROJECT_STATUS_CONFIG,
  PROJECT_TYPE_CONFIG 
} from '@/lib/data/dashboard-data';
import {
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  DownloadIcon,
  MessageSquareIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  FileTextIcon,
  SendIcon,
  AttachmentIcon,
  EyeIcon,
  EditIcon,
  ArrowLeftIcon,
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

function ProjectHeader({ project }: { project: typeof MOCK_PROJECTS[0] }) {
  const statusConfig = PROJECT_STATUS_CONFIG[project.status];
  const typeConfig = PROJECT_TYPE_CONFIG[project.type];
  
  const daysUntilDue = Math.ceil(
    (project.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const budgetUsed = (project.spent / project.budget) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <Badge variant="outline">
                {typeConfig.icon} {typeConfig.label}
              </Badge>
              <Badge 
                variant="outline" 
                className={cn("", statusConfig.textColor, statusConfig.bgColor)}
              >
                {statusConfig.label}
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">{project.description}</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <EditIcon className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button size="sm">
              <MessageSquareIcon className="h-4 w-4 mr-2" />
              Chat
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Progreso del Proyecto</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completado</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Presupuesto</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usado</span>
                  <span>{budgetUsed.toFixed(0)}%</span>
                </div>
                <Progress value={budgetUsed} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${project.spent.toLocaleString()}</span>
                  <span>${project.budget.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Fechas Importantes</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Inicio: {project.startDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  <span className={cn(
                    daysUntilDue < 0 ? "text-red-600" : 
                    daysUntilDue <= 3 ? "text-orange-600" : 
                    "text-muted-foreground"
                  )}>
                    Entrega: {project.dueDate.toLocaleDateString()}
                    {daysUntilDue < 0 && ` (${Math.abs(daysUntilDue)} días de retraso)`}
                    {daysUntilDue === 0 && " (Vence hoy)"}
                    {daysUntilDue > 0 && ` (${daysUntilDue} días restantes)`}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cliente</h3>
              <div className="flex items-center gap-2">
                <Avatar fallback={project.client.name.split(' ').map(n => n[0]).join('')} size="sm" />
                <div>
                  <p className="text-sm font-medium">{project.client.name}</p>
                  <p className="text-xs text-muted-foreground">{project.client.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Equipo del Proyecto</h3>
              <div className="space-y-2">
                {project.team.map((member) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <Avatar fallback={member.name.split(' ').map(n => n[0]).join('')} size="sm" />
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Tecnologías</h3>
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TimelineTab({ project }: { project: typeof MOCK_PROJECTS[0] }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {project.milestones.map((milestone, index) => (
          <div key={milestone.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                milestone.status === 'completed' ? "bg-green-500 text-white" :
                milestone.status === 'in-progress' ? "bg-blue-500 text-white" :
                milestone.status === 'overdue' ? "bg-red-500 text-white" :
                "bg-muted text-muted-foreground"
              )}>
                {milestone.status === 'completed' ? (
                  <CheckCircleIcon className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              {index < project.milestones.length - 1 && (
                <div className="w-px h-16 bg-border mt-2" />
              )}
            </div>
            
            <div className="flex-1 pb-8">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{milestone.title}</CardTitle>
                    <Badge variant={
                      milestone.status === 'completed' ? 'default' :
                      milestone.status === 'in-progress' ? 'secondary' :
                      milestone.status === 'overdue' ? 'destructive' :
                      'outline'
                    }>
                      {milestone.status === 'completed' ? 'Completado' :
                       milestone.status === 'in-progress' ? 'En Progreso' :
                       milestone.status === 'overdue' ? 'Retrasado' :
                       'Pendiente'}
                    </Badge>
                  </div>
                  <CardDescription>{milestone.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progreso</span>
                      <span>{milestone.progress}%</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Fecha límite: {milestone.dueDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeliverablesTab({ project }: { project: typeof MOCK_PROJECTS[0] }) {
  return (
    <div className="space-y-4">
      {project.deliverables.map((deliverable) => (
        <Card key={deliverable.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{deliverable.name}</CardTitle>
                <CardDescription>{deliverable.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={
                  deliverable.status === 'approved' ? 'default' :
                  deliverable.status === 'review' ? 'secondary' :
                  deliverable.status === 'rejected' ? 'destructive' :
                  deliverable.status === 'in-progress' ? 'outline' :
                  'outline'
                }>
                  {deliverable.status === 'approved' ? 'Aprobado' :
                   deliverable.status === 'review' ? 'En Revisión' :
                   deliverable.status === 'rejected' ? 'Rechazado' :
                   deliverable.status === 'in-progress' ? 'En Progreso' :
                   'Pendiente'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {deliverable.type === 'design' ? '🎨 Diseño' :
                   deliverable.type === 'development' ? '💻 Desarrollo' :
                   deliverable.type === 'content' ? '📝 Contenido' :
                   deliverable.type === 'documentation' ? '📚 Documentación' :
                   '📄 Otro'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Fecha límite: {deliverable.dueDate.toLocaleDateString()}</span>
              </div>
              <div className="flex gap-2">
                {deliverable.fileUrl && (
                  <Button size="sm" variant="outline">
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Ver Detalles
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ChatTab() {
  const [message, setMessage] = useState('');
  
  const mockMessages = [
    {
      id: '1',
      author: 'Carlos Ruiz',
      role: 'Project Manager',
      content: 'Hola! El diseño está listo para revisión. Por favor revisa los archivos adjuntos.',
      timestamp: new Date('2024-01-20T10:30:00'),
      isClient: false,
    },
    {
      id: '2',
      author: 'María González',
      role: 'Cliente',
      content: 'Perfecto! Me gusta mucho el diseño. Solo tengo algunas observaciones menores en la página de contacto.',
      timestamp: new Date('2024-01-20T14:15:00'),
      isClient: true,
    },
    {
      id: '3',
      author: 'Ana López',
      role: 'Frontend Developer',
      content: 'Entendido. Haré los ajustes en la página de contacto y subiré la nueva versión mañana.',
      timestamp: new Date('2024-01-20T16:45:00'),
      isClient: false,
    },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Chat del Proyecto</CardTitle>
          <CardDescription>
            Comunícate directamente con el equipo del proyecto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mockMessages.map((msg) => (
              <div key={msg.id} className={cn(
                "flex gap-3",
                msg.isClient && "flex-row-reverse"
              )}>
                <Avatar fallback={msg.author.split(' ').map(n => n[0]).join('')} size="sm" />
                <div className={cn(
                  "flex-1 space-y-1",
                  msg.isClient && "text-right"
                )}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{msg.author}</span>
                    <span className="text-xs text-muted-foreground">{msg.role}</span>
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className={cn(
                    "p-3 rounded-lg text-sm",
                    msg.isClient 
                      ? "bg-primary text-primary-foreground ml-8" 
                      : "bg-muted mr-8"
                  )}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex gap-2">
              <Textarea
                placeholder="Escribe tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline">
                  <AttachmentIcon className="h-4 w-4" />
                </Button>
                <Button size="sm">
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  // Find project by ID
  const project = MOCK_PROJECTS.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-2">Proyecto no encontrado</h1>
        <p className="text-muted-foreground mb-6">
          El proyecto que buscas no existe o no tienes permisos para verlo.
        </p>
        <Button asChild>
          <Link href="/dashboard/proyectos">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Volver a Proyectos
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs />
      
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/proyectos">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </Button>
      </div>

      <ProjectHeader project={project} />

      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="deliverables">Entregables</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="files">Archivos</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <TimelineTab project={project} />
        </TabsContent>

        <TabsContent value="deliverables">
          <DeliverablesTab project={project} />
        </TabsContent>

        <TabsContent value="chat">
          <ChatTab />
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>Archivos del Proyecto</CardTitle>
              <CardDescription>
                Todos los archivos relacionados con este proyecto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileTextIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Los archivos del proyecto aparecerán aquí
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ProjectDetailPageWrapper() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ProjectDetailPage />
      </DashboardLayout>
    </ProtectedRoute>
  );
} 