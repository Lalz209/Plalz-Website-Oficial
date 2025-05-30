"use client";

import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useQuoteStore } from '@/lib/stores/quote-store';
import { integrationsSchema, IntegrationsFormData } from '@/lib/validations/quote';
import { INTEGRATIONS } from '@/lib/data/quote-data';
import { Integration } from '@/lib/types/quote';
import { 
  UsersIcon, 
  MailIcon, 
  BarChartIcon, 
  CreditCardIcon, 
  ShareIcon,
  SettingsIcon 
} from '@/components/ui/icons';

const CATEGORY_CONFIG = {
  crm: {
    title: 'CRM',
    description: 'Gestión de relaciones con clientes',
    icon: UsersIcon,
    color: 'bg-blue-100 text-blue-800',
  },
  email: {
    title: 'Email Marketing',
    description: 'Herramientas de marketing por email',
    icon: MailIcon,
    color: 'bg-green-100 text-green-800',
  },
  analytics: {
    title: 'Analytics',
    description: 'Análisis y métricas',
    icon: BarChartIcon,
    color: 'bg-purple-100 text-purple-800',
  },
  payment: {
    title: 'Pagos',
    description: 'Sistemas de pago y facturación',
    icon: CreditCardIcon,
    color: 'bg-orange-100 text-orange-800',
  },
  social: {
    title: 'Redes Sociales',
    description: 'Integración con redes sociales',
    icon: ShareIcon,
    color: 'bg-pink-100 text-pink-800',
  },
  other: {
    title: 'Otros',
    description: 'Otras integraciones',
    icon: SettingsIcon,
    color: 'bg-gray-100 text-gray-800',
  },
};

const COMPLEXITY_CONFIG = {
  simple: {
    name: 'Simple',
    description: 'Configuración básica',
    color: 'bg-green-100 text-green-800',
    multiplier: 1.0,
  },
  medium: {
    name: 'Medio',
    description: 'Configuración personalizada',
    color: 'bg-yellow-100 text-yellow-800',
    multiplier: 1.3,
  },
  complex: {
    name: 'Complejo',
    description: 'Configuración avanzada',
    color: 'bg-red-100 text-red-800',
    multiplier: 1.6,
  },
};

export function IntegrationsStep() {
  const { currentQuote, updateQuoteData } = useQuoteStore();

  const form = useForm<IntegrationsFormData>({
    // resolver: zodResolver(integrationsSchema),
    defaultValues: {
      selectedIntegrations: currentQuote.selectedIntegrations || [],
    },
  });

  const watchedIntegrations = form.watch('selectedIntegrations');

  // Update store when form values change
  const handleIntegrationToggle = (integrationId: string, checked: boolean) => {
    const currentIntegrations = watchedIntegrations || [];
    const updatedIntegrations = checked
      ? [...currentIntegrations, integrationId]
      : currentIntegrations.filter(id => id !== integrationId);
    
    form.setValue('selectedIntegrations', updatedIntegrations);
    updateQuoteData(4, { selectedIntegrations: updatedIntegrations });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getIntegrationsByCategory = (category: string) => {
    return INTEGRATIONS.filter(integration => integration.category === category);
  };

  const getTotalPriceImpact = () => {
    if (!watchedIntegrations) return 0;
    return watchedIntegrations.reduce((total, integrationId) => {
      const integration = INTEGRATIONS.find(i => i.id === integrationId);
      return total + (integration?.priceImpact || 0);
    }, 0);
  };

  const getSelectedIntegrationsCount = (category: string) => {
    if (!watchedIntegrations) return 0;
    const categoryIntegrations = getIntegrationsByCategory(category);
    return categoryIntegrations.filter(integration => 
      watchedIntegrations.includes(integration.id)
    ).length;
  };

  const getSelectedIntegrations = (): Integration[] => {
    if (!watchedIntegrations) return [];
    return INTEGRATIONS.filter(integration => 
      watchedIntegrations.includes(integration.id)
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Integraciones</h2>
        <p className="text-muted-foreground">
          Selecciona las herramientas y servicios que necesitas integrar en tu proyecto.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="selectedIntegrations"
            render={() => (
              <FormItem>
                <Tabs defaultValue="crm" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                    {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
                      const Icon = config.icon;
                      const selectedCount = getSelectedIntegrationsCount(key);
                      
                      return (
                        <TabsTrigger key={key} value={key} className="flex items-center gap-1">
                          <Icon size={14} />
                          <span className="hidden sm:inline text-xs">{config.title}</span>
                          {selectedCount > 0 && (
                            <Badge variant="secondary" className="ml-1 text-xs h-4 w-4 p-0 flex items-center justify-center">
                              {selectedCount}
                            </Badge>
                          )}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {Object.entries(CATEGORY_CONFIG).map(([categoryKey, config]) => (
                    <TabsContent key={categoryKey} value={categoryKey} className="space-y-4">
                      <div className="text-center py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                          <config.icon size={16} />
                          {config.title}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {config.description}
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {getIntegrationsByCategory(categoryKey).map((integration) => {
                          const isSelected = watchedIntegrations?.includes(integration.id) || false;
                          const complexityConfig = COMPLEXITY_CONFIG[integration.complexity];
                          
                          return (
                            <Card 
                              key={integration.id} 
                              className={`transition-all cursor-pointer hover:shadow-md ${
                                isSelected ? 'ring-2 ring-primary border-primary' : ''
                              }`}
                              onClick={() => handleIntegrationToggle(integration.id, !isSelected)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                  <FormControl>
                                    <Checkbox
                                      checked={isSelected}
                                      onCheckedChange={(checked) => 
                                        handleIntegrationToggle(integration.id, checked === true)
                                      }
                                      className="mt-1"
                                    />
                                  </FormControl>
                                  
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <Label className="font-medium cursor-pointer">
                                        {integration.name}
                                      </Label>
                                      <div className="flex items-center gap-2">
                                        <Badge 
                                          variant="outline"
                                          className={`text-xs ${complexityConfig.color}`}
                                        >
                                          {complexityConfig.name}
                                        </Badge>
                                        <Badge variant="default" className="text-xs">
                                          {formatPrice(integration.priceImpact)}
                                        </Badge>
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {complexityConfig.description}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}

                        {getIntegrationsByCategory(categoryKey).length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <config.icon size={48} className="mx-auto mb-2 opacity-50" />
                            <p>No hay integraciones disponibles en esta categoría</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Selected Integrations Summary */}
          {watchedIntegrations && watchedIntegrations.length > 0 && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">Integraciones Seleccionadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total de integraciones:</span>
                    <Badge variant="secondary">
                      {watchedIntegrations.length}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Costo adicional:</span>
                    <span className="font-medium text-primary">
                      +{formatPrice(getTotalPriceImpact())}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Integraciones:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {getSelectedIntegrations().map((integration) => {
                        const categoryConfig = CATEGORY_CONFIG[integration.category];
                        const complexityConfig = COMPLEXITY_CONFIG[integration.complexity];
                        
                        return (
                          <div key={integration.id} className="flex items-center justify-between p-2 bg-background rounded border">
                            <div className="flex items-center gap-2">
                              <categoryConfig.icon size={16} className="text-muted-foreground" />
                              <span className="text-sm font-medium">{integration.name}</span>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${complexityConfig.color}`}
                              >
                                {complexityConfig.name}
                              </Badge>
                            </div>
                            <span className="text-sm font-medium">
                              {formatPrice(integration.priceImpact)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                    {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
                      const count = getSelectedIntegrationsCount(key);
                      if (count === 0) return null;
                      
                      return (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-primary">{count}</div>
                          <div className="text-xs text-muted-foreground">
                            {config.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Integrations Message */}
          {(!watchedIntegrations || watchedIntegrations.length === 0) && (
            <Card className="bg-muted/30">
              <CardContent className="p-6 text-center">
                <SettingsIcon size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-medium mb-2">Sin integraciones</h3>
                <p className="text-sm text-muted-foreground">
                  No has seleccionado ninguna integración. Puedes continuar sin integraciones 
                  o seleccionar las que necesites para tu proyecto.
                </p>
              </CardContent>
            </Card>
          )}
        </form>
      </Form>
    </div>
  );
} 