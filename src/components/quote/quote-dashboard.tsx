"use client";

import { useState } from 'react';
import { useRouter } from '@/lib/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useQuoteStoreHydrated } from '@/lib/hooks/use-hydration';
import { useToast } from '@/hooks/use-toast';
import { Quote, QuoteStatus } from '@/lib/types/quote';
import { 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  EyeIcon,
  MessageSquareIcon,
  CalendarIcon,
  DollarSignIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon 
} from '@/components/ui/icons';

const STATUS_CONFIG = {
  draft: {
    name: 'Borrador',
    color: 'bg-gray-100 text-gray-800',
    icon: EditIcon,
  },
  submitted: {
    name: 'Enviada',
    color: 'bg-blue-100 text-blue-800',
    icon: ClockIcon,
  },
  'in-review': {
    name: 'En Revisión',
    color: 'bg-yellow-100 text-yellow-800',
    icon: AlertCircleIcon,
  },
  quoted: {
    name: 'Cotizada',
    color: 'bg-purple-100 text-purple-800',
    icon: DollarSignIcon,
  },
  approved: {
    name: 'Aprobada',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircleIcon,
  },
  rejected: {
    name: 'Rechazada',
    color: 'bg-red-100 text-red-800',
    icon: XCircleIcon,
  },
};

interface QuoteCardProps {
  quote: Quote;
  onEdit: (quote: Quote) => void;
  onDelete: (quoteId: string) => void;
  onView: (quote: Quote) => void;
}

function QuoteCard({ quote, onEdit, onDelete, onView }: QuoteCardProps) {
  const statusConfig = STATUS_CONFIG[quote.status];
  const StatusIcon = statusConfig.icon;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">
              {quote.formData.projectType ? 
                quote.formData.projectType.charAt(0).toUpperCase() + quote.formData.projectType.slice(1) :
                'Proyecto sin definir'
              }
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Creado el {formatDate(quote.createdAt)}
            </p>
          </div>
          <Badge className={statusConfig.color}>
            <StatusIcon size={12} className="mr-1" />
            {statusConfig.name}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Industria:</span>
            <p className="font-medium">
              {quote.formData.industry || 'No especificada'}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Precio estimado:</span>
            <p className="font-medium text-primary">
              {formatPrice(quote.estimatedPrice)}
            </p>
          </div>
        </div>

        {quote.formData.contactInfo && (
          <div className="text-sm">
            <span className="text-muted-foreground">Contacto:</span>
            <p className="font-medium">
              {quote.formData.contactInfo.firstName} {quote.formData.contactInfo.lastName}
            </p>
            <p className="text-muted-foreground">{quote.formData.contactInfo.email}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onView(quote)}>
            <EyeIcon size={14} className="mr-1" />
            Ver
          </Button>
          
          {quote.status === 'draft' && (
            <Button variant="outline" size="sm" onClick={() => onEdit(quote)}>
              <EditIcon size={14} className="mr-1" />
              Editar
            </Button>
          )}
          
          <Button variant="outline" size="sm">
            <MessageSquareIcon size={14} className="mr-1" />
            Chat
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                <TrashIcon size={14} className="mr-1" />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar cotización?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. La cotización será eliminada permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(quote.id)}>
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

export function QuoteDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const { quotes, deleteQuote, loadQuote, _hasHydrated } = useQuoteStoreHydrated();
  const [activeTab, setActiveTab] = useState('all');

  // Show loading state during hydration
  if (!_hasHydrated) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
            <div className="h-10 bg-muted rounded w-32"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded"></div>
            ))}
          </div>
          
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const handleNewQuote = () => {
    router.push('/cotizar');
  };

  const handleEditQuote = (quote: Quote) => {
    loadQuote(quote.id);
    router.push('/cotizar');
  };

  const handleDeleteQuote = (quoteId: string) => {
    deleteQuote(quoteId);
    toast({
      title: "Cotización eliminada",
      description: "La cotización ha sido eliminada correctamente.",
      variant: "success",
    });
  };

  const handleViewQuote = (quote: Quote) => {
    // TODO: Implement quote detail view
    console.log('View quote:', quote);
  };

  const getFilteredQuotes = () => {
    switch (activeTab) {
      case 'draft':
        return quotes.filter(q => q.status === 'draft');
      case 'submitted':
        return quotes.filter(q => ['submitted', 'in-review'].includes(q.status));
      case 'completed':
        return quotes.filter(q => ['quoted', 'approved', 'rejected'].includes(q.status));
      default:
        return quotes;
    }
  };

  const filteredQuotes = getFilteredQuotes();

  const getQuoteStats = () => {
    return {
      total: quotes.length,
      draft: quotes.filter(q => q.status === 'draft').length,
      submitted: quotes.filter(q => ['submitted', 'in-review'].includes(q.status)).length,
      completed: quotes.filter(q => ['quoted', 'approved', 'rejected'].includes(q.status)).length,
    };
  };

  const stats = getQuoteStats();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mis Cotizaciones</h1>
          <p className="text-muted-foreground">
            Gestiona tus solicitudes de cotización y seguimiento de proyectos
          </p>
        </div>
        <Button onClick={handleNewQuote}>
          <PlusIcon size={16} className="mr-2" />
          Nueva Cotización
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <CalendarIcon size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <EditIcon size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.draft}</p>
                <p className="text-sm text-muted-foreground">Borradores</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <ClockIcon size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.submitted}</p>
                <p className="text-sm text-muted-foreground">En Proceso</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircleIcon size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-sm text-muted-foreground">Completadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quotes List */}
      <Card>
        <CardHeader>
          <CardTitle>Cotizaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                Todas ({stats.total})
              </TabsTrigger>
              <TabsTrigger value="draft">
                Borradores ({stats.draft})
              </TabsTrigger>
              <TabsTrigger value="submitted">
                En Proceso ({stats.submitted})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completadas ({stats.completed})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredQuotes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    {activeTab === 'all' ? 'No tienes cotizaciones' : `No hay cotizaciones ${
                      activeTab === 'draft' ? 'en borrador' :
                      activeTab === 'submitted' ? 'en proceso' : 'completadas'
                    }`}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {activeTab === 'all' ? 
                      'Crea tu primera cotización para comenzar' :
                      'Las cotizaciones aparecerán aquí cuando cambien de estado'
                    }
                  </p>
                  {activeTab === 'all' && (
                    <Button onClick={handleNewQuote}>
                      <PlusIcon size={16} className="mr-2" />
                      Crear Primera Cotización
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredQuotes.map((quote) => (
                    <QuoteCard
                      key={quote.id}
                      quote={quote}
                      onEdit={handleEditQuote}
                      onDelete={handleDeleteQuote}
                      onView={handleViewQuote}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 