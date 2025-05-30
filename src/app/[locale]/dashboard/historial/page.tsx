"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardBreadcrumbs } from '@/components/dashboard/dashboard-breadcrumbs';
import { Link } from '@/lib/navigation';
import { MOCK_INVOICES, MOCK_PROJECTS, PROJECT_STATUS_CONFIG, PROJECT_TYPE_CONFIG } from '@/lib/data/dashboard-data';
import { InvoiceStatus } from '@/lib/types/dashboard';
import {
  SearchIcon,
  DownloadIcon,
  EyeIcon,
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  RefreshCwIcon,
  StarIcon,
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

const INVOICE_STATUS_CONFIG = {
  draft: {
    label: 'Borrador',
    color: 'bg-gray-500',
    textColor: 'text-gray-700',
    bgColor: 'bg-gray-50',
  },
  sent: {
    label: 'Enviada',
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
  },
  paid: {
    label: 'Pagada',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
  },
  overdue: {
    label: 'Vencida',
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
  },
  cancelled: {
    label: 'Cancelada',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
  },
};

function InvoiceCard({ invoice }: { invoice: typeof MOCK_INVOICES[0] }) {
  const statusConfig = INVOICE_STATUS_CONFIG[invoice.status];
  
  const daysUntilDue = Math.ceil(
    (invoice.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const isOverdue = daysUntilDue < 0 && invoice.status !== 'paid';
  const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0 && invoice.status !== 'paid';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{invoice.number}</CardTitle>
            <CardDescription>
              {invoice.projectId ? `Proyecto #${invoice.projectId}` : 'Factura independiente'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
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
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-bold">
              ${invoice.amount.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Creada: {invoice.createdAt.toLocaleDateString()}
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-1 text-sm">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className={cn(
                isOverdue ? "text-red-600" : 
                isDueSoon ? "text-orange-600" : 
                "text-muted-foreground"
              )}>
                {invoice.status === 'paid' && invoice.paidDate
                  ? `Pagada: ${invoice.paidDate.toLocaleDateString()}`
                  : isOverdue 
                  ? `Vencida hace ${Math.abs(daysUntilDue)} días`
                  : daysUntilDue === 0 
                  ? "Vence hoy"
                  : `Vence en ${daysUntilDue} días`
                }
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Descargar PDF
          </Button>
          <Button size="sm" variant="outline">
            <EyeIcon className="h-4 w-4 mr-2" />
            Ver
          </Button>
          {invoice.status === 'sent' && (
            <Button size="sm" variant="outline">
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Recomprar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CompletedProjectCard({ project }: { project: typeof MOCK_PROJECTS[0] }) {
  const statusConfig = PROJECT_STATUS_CONFIG[project.status];
  const typeConfig = PROJECT_TYPE_CONFIG[project.type];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
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
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-lg font-semibold">
              ${project.spent.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Presupuesto: ${project.budget.toLocaleString()}
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-1 text-sm">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>
                {project.startDate.toLocaleDateString()} - {project.dueDate.toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon 
                  key={star} 
                  className={cn(
                    "h-4 w-4",
                    star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                  )} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/dashboard/proyectos/${project.id}`}>
              Ver Proyecto
            </Link>
          </Button>
          <Button size="sm" variant="outline">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Recomprar
          </Button>
          <Button size="sm" variant="outline">
            <StarIcon className="h-4 w-4 mr-2" />
            Calificar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ type }: { type: 'invoices' | 'projects' }) {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
        {type === 'invoices' ? (
          <FileTextIcon className="h-12 w-12 text-muted-foreground" />
        ) : (
          <CheckCircleIcon className="h-12 w-12 text-muted-foreground" />
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2">
        {type === 'invoices' ? 'No hay facturas' : 'No hay proyectos completados'}
      </h3>
      <p className="text-muted-foreground mb-6">
        {type === 'invoices' 
          ? 'No tienes facturas que coincidan con los filtros seleccionados.'
          : 'No tienes proyectos completados que coincidan con los filtros seleccionados.'
        }
      </p>
    </div>
  );
}

function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState<InvoiceStatus | 'all'>('all');

  const filteredInvoices = useMemo(() => {
    return MOCK_INVOICES.filter(invoice => {
      const matchesSearch = invoice.number.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = invoiceStatusFilter === 'all' || invoice.status === invoiceStatusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, invoiceStatusFilter]);

  const completedProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(project => project.status === 'completed');
  }, []);

  const invoicesByStatus = useMemo(() => {
    const groups = {
      paid: filteredInvoices.filter(i => i.status === 'paid'),
      pending: filteredInvoices.filter(i => i.status === 'sent'),
      overdue: filteredInvoices.filter(i => i.status === 'overdue'),
      draft: filteredInvoices.filter(i => i.status === 'draft'),
    };
    return groups;
  }, [filteredInvoices]);

  const totalPaid = MOCK_INVOICES
    .filter(i => i.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const totalPending = MOCK_INVOICES
    .filter(i => i.status === 'sent' || i.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Historial</h1>
          <p className="text-muted-foreground">
            Revisa todas tus facturas, proyectos completados y historial de pagos
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {invoicesByStatus.paid.length} facturas pagadas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendiente</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {invoicesByStatus.pending.length + invoicesByStatus.overdue.length} facturas pendientes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proyectos Completados</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects.length}</div>
            <p className="text-xs text-muted-foreground">
              Proyectos finalizados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
            <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoicesByStatus.overdue.length}</div>
            <p className="text-xs text-muted-foreground">
              Facturas vencidas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="invoices">
            Facturas ({MOCK_INVOICES.length})
          </TabsTrigger>
          <TabsTrigger value="projects">
            Proyectos Completados ({completedProjects.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar facturas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Select value={invoiceStatusFilter} onValueChange={(value) => setInvoiceStatusFilter(value as InvoiceStatus | 'all')}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="paid">Pagadas</SelectItem>
                      <SelectItem value="sent">Enviadas</SelectItem>
                      <SelectItem value="overdue">Vencidas</SelectItem>
                      <SelectItem value="draft">Borradores</SelectItem>
                      <SelectItem value="cancelled">Canceladas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoices Grid */}
          {filteredInvoices.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredInvoices.map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
              ))}
            </div>
          ) : (
            <EmptyState type="invoices" />
          )}
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {/* Projects Grid */}
          {completedProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedProjects.map((project) => (
                <CompletedProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState type="projects" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function HistoryPageWrapper() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <HistoryPage />
      </DashboardLayout>
    </ProtectedRoute>
  );
} 