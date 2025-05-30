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
import { MOCK_QUOTES } from '@/lib/data/dashboard-data';
import { QuoteStatus } from '@/lib/types/dashboard';
import {
  SearchIcon,
  PlusIcon,
  EyeIcon,
  MessageSquareIcon,
  CheckIcon,
  XIcon,
  ClockIcon,
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

const QUOTE_STATUS_CONFIG = {
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
  viewed: {
    label: 'Vista',
    color: 'bg-purple-500',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
  },
  approved: {
    label: 'Aprobada',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
  },
  rejected: {
    label: 'Rechazada',
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
  },
  expired: {
    label: 'Expirada',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
  },
};

function QuoteCard({ quote }: { quote: typeof MOCK_QUOTES[0] }) {
  const statusConfig = QUOTE_STATUS_CONFIG[quote.status];
  
  const daysUntilExpiry = Math.ceil(
    (quote.validUntil.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const isExpired = daysUntilExpiry < 0;
  const isExpiringSoon = daysUntilExpiry <= 3 && daysUntilExpiry >= 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{quote.title}</CardTitle>
            <CardDescription>{quote.description}</CardDescription>
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
              ${quote.amount.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {quote.items.length} elemento{quote.items.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-1 text-sm">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className={cn(
                isExpired ? "text-red-600" : 
                isExpiringSoon ? "text-orange-600" : 
                "text-muted-foreground"
              )}>
                {isExpired 
                  ? `Expiró hace ${Math.abs(daysUntilExpiry)} días`
                  : daysUntilExpiry === 0 
                  ? "Expira hoy"
                  : `Expira en ${daysUntilExpiry} días`
                }
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Creada: {quote.createdAt.toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <EyeIcon className="h-4 w-4 mr-2" />
            Ver Detalles
          </Button>
          
          {quote.status === 'sent' || quote.status === 'viewed' ? (
            <>
              <Button size="sm" variant="outline">
                <MessageSquareIcon className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </>
          ) : quote.status === 'draft' ? (
            <Button size="sm" variant="outline">
              Enviar
            </Button>
          ) : quote.status === 'approved' ? (
            <Button size="sm" variant="outline">
              <CheckIcon className="h-4 w-4 mr-2" />
              Crear Proyecto
            </Button>
          ) : null}
        </div>

        {quote.notes && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground">{quote.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
        <FileTextIcon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No se encontraron cotizaciones</h3>
      <p className="text-muted-foreground mb-6">
        No tienes cotizaciones que coincidan con los filtros seleccionados.
      </p>
      <Button asChild>
        <Link href="/cotizar">
          <PlusIcon className="mr-2 h-4 w-4" />
          Solicitar Nueva Cotización
        </Link>
      </Button>
    </div>
  );
}

function QuotesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | 'all'>('all');

  const filteredQuotes = useMemo(() => {
    return MOCK_QUOTES.filter(quote => {
      const matchesSearch = quote.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           quote.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const quotesByStatus = useMemo(() => {
    const groups = {
      active: filteredQuotes.filter(q => q.status === 'sent' || q.status === 'viewed'),
      pending: filteredQuotes.filter(q => q.status === 'draft'),
      approved: filteredQuotes.filter(q => q.status === 'approved'),
      rejected: filteredQuotes.filter(q => q.status === 'rejected' || q.status === 'expired'),
    };
    return groups;
  }, [filteredQuotes]);

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cotizaciones</h1>
          <p className="text-muted-foreground">
            Gestiona todas tus cotizaciones y solicitudes de presupuesto
          </p>
        </div>
        <Button asChild>
          <Link href="/cotizar">
            <PlusIcon className="mr-2 h-4 w-4" />
            Nueva Cotización
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cotizaciones</CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_QUOTES.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quotesByStatus.active.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
            <CheckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quotesByStatus.approved.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${MOCK_QUOTES.reduce((sum, quote) => sum + quote.amount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cotizaciones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as QuoteStatus | 'all')}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="sent">Enviada</SelectItem>
                  <SelectItem value="viewed">Vista</SelectItem>
                  <SelectItem value="approved">Aprobada</SelectItem>
                  <SelectItem value="rejected">Rechazada</SelectItem>
                  <SelectItem value="expired">Expirada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quotes Content */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            Todas ({filteredQuotes.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Activas ({quotesByStatus.active.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Borradores ({quotesByStatus.pending.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Aprobadas ({quotesByStatus.approved.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rechazadas ({quotesByStatus.rejected.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {filteredQuotes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredQuotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="active">
          {quotesByStatus.active.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quotesByStatus.active.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="pending">
          {quotesByStatus.pending.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quotesByStatus.pending.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="approved">
          {quotesByStatus.approved.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quotesByStatus.approved.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="rejected">
          {quotesByStatus.rejected.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quotesByStatus.rejected.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
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

export default function QuotesPageWrapper() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <QuotesPage />
      </DashboardLayout>
    </ProtectedRoute>
  );
} 