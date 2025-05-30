"use client";

import { useState, useEffect } from 'react';
import { useRouter } from '@/lib/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useQuoteStoreHydrated } from '@/lib/hooks/use-hydration';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  SaveIcon,
  CheckIcon,
  DollarSignIcon 
} from '@/components/ui/icons';

// Step components
import { ProjectTypeStep } from './steps/project-type-step';
import { FeaturesStep } from './steps/features-step';
import { DesignStep } from './steps/design-step';
import { IntegrationsStep } from './steps/integrations-step';
import { TimelineStep } from './steps/timeline-step';
import { BudgetStep } from './steps/budget-step';
import { ContactStep } from './steps/contact-step';

const STEPS = [
  { id: 1, title: 'Tipo de Proyecto', component: ProjectTypeStep },
  { id: 2, title: 'Funcionalidades', component: FeaturesStep },
  { id: 3, title: 'Diseño y Branding', component: DesignStep },
  { id: 4, title: 'Integraciones', component: IntegrationsStep },
  { id: 5, title: 'Timeline y Urgencia', component: TimelineStep },
  { id: 6, title: 'Presupuesto', component: BudgetStep },
  { id: 7, title: 'Información de Contacto', component: ContactStep },
];

interface QuoteWizardProps {
  onComplete?: (quoteId: string) => void;
}

export function QuoteWizard({ onComplete }: QuoteWizardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const {
    currentStep,
    currentQuote,
    estimatedPrice,
    setCurrentStep,
    saveQuote,
    submitQuote,
    clearCurrentQuote,
    _hasHydrated,
  } = useQuoteStoreHydrated();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = (currentStep / STEPS.length) * 100;
  const CurrentStepComponent = STEPS[currentStep - 1]?.component;

  useEffect(() => {
    // Only set up auto-save after hydration
    if (!_hasHydrated) return;
    
    // Auto-save every 30 seconds
    const interval = setInterval(() => {
      if (Object.keys(currentQuote).length > 0) {
        saveQuote();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [currentQuote, saveQuote, _hasHydrated]);

  // Show loading state during hydration
  if (!_hasHydrated) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
          <div className="h-32 bg-muted rounded mb-8"></div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    const quoteId = saveQuote();
    toast({
      title: "Borrador guardado",
      description: "Tu cotización ha sido guardada como borrador.",
      variant: "success",
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const quoteId = saveQuote();
      submitQuote(quoteId);
      
      toast({
        title: "¡Cotización enviada!",
        description: "Hemos recibido tu solicitud. Te contactaremos pronto.",
        variant: "success",
      });

      if (onComplete) {
        onComplete(quoteId);
      } else {
        router.push('/mis-cotizaciones');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al enviar la cotización.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    // Allow navigation to previous steps or current step
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Cotizador Inteligente</h1>
        <p className="text-muted-foreground">
          Obtén una cotización personalizada para tu proyecto en 7 sencillos pasos
        </p>
      </div>

      {/* Progress Bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">
              Paso {currentStep} de {STEPS.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% completado
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-6" />
          
          {/* Step Navigation */}
          <div className="flex flex-wrap gap-2">
            {STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${step.id === currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : step.id < currentStep
                    ? 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }
                `}
                disabled={step.id > currentStep}
              >
                {step.id < currentStep ? (
                  <CheckIcon size={14} />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
                    {step.id}
                  </span>
                )}
                <span className="hidden sm:inline">{step.title}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {currentStep}
                </span>
                {STEPS[currentStep - 1]?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {CurrentStepComponent && <CurrentStepComponent />}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeftIcon size={16} className="mr-2" />
                  Anterior
                </Button>
              )}
              
              <Button variant="ghost" onClick={handleSaveDraft}>
                <SaveIcon size={16} className="mr-2" />
                Guardar Borrador
              </Button>
            </div>

            <div className="flex gap-3">
              {currentStep < STEPS.length ? (
                <Button onClick={handleNext}>
                  Siguiente
                  <ArrowRightIcon size={16} className="ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Cotización'}
                  <CheckIcon size={16} className="ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Price Sidebar */}
        <div className="space-y-6">
          {/* Estimated Price */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSignIcon size={20} />
                Estimación de Precio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {formatPrice(estimatedPrice)}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Precio estimado basado en tus selecciones
                </p>
                <Badge variant="secondary" className="text-xs">
                  Precio final puede variar
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Project Summary */}
          {Object.keys(currentQuote).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Proyecto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuote.projectType && (
                  <div>
                    <span className="text-sm font-medium">Tipo:</span>
                    <p className="text-sm text-muted-foreground">
                      {currentQuote.projectType}
                    </p>
                  </div>
                )}
                
                {currentQuote.selectedFeatures && currentQuote.selectedFeatures.length > 0 && (
                  <div>
                    <span className="text-sm font-medium">Funcionalidades:</span>
                    <p className="text-sm text-muted-foreground">
                      {currentQuote.selectedFeatures.length} seleccionadas
                    </p>
                  </div>
                )}

                {currentQuote.timeline?.priority && (
                  <div>
                    <span className="text-sm font-medium">Prioridad:</span>
                    <p className="text-sm text-muted-foreground">
                      {currentQuote.timeline.priority}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Help */}
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-sm mb-2">¿Necesitas ayuda?</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Nuestro equipo está aquí para ayudarte con tu cotización
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contactar Soporte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 