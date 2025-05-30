"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useQuoteStore } from '@/lib/stores/quote-store';
import { featuresSchema, FeaturesFormData } from '@/lib/validations/quote';
import { FEATURES } from '@/lib/data/quote-data';
import { FeatureCategory } from '@/lib/types/quote';
import { InfoIcon, StarIcon, CrownIcon } from '@/components/ui/icons';

const CATEGORY_CONFIG = {
  basic: {
    title: 'Funcionalidades Básicas',
    description: 'Características esenciales para cualquier proyecto',
    icon: InfoIcon,
    color: 'bg-blue-100 text-blue-800',
  },
  advanced: {
    title: 'Funcionalidades Avanzadas',
    description: 'Características que mejoran la experiencia del usuario',
    icon: StarIcon,
    color: 'bg-purple-100 text-purple-800',
  },
  premium: {
    title: 'Funcionalidades Premium',
    description: 'Características de última generación para proyectos únicos',
    icon: CrownIcon,
    color: 'bg-amber-100 text-amber-800',
  },
};

export function FeaturesStep() {
  const { currentQuote, updateQuoteData } = useQuoteStore();
  const [activeCategory, setActiveCategory] = useState<FeatureCategory>('basic');

  const form = useForm<FeaturesFormData>({
    resolver: zodResolver(featuresSchema),
    defaultValues: {
      selectedFeatures: currentQuote.selectedFeatures || [],
    },
  });

  const watchedFeatures = form.watch('selectedFeatures');

  // Update store when form values change
  const handleFeatureToggle = (featureId: string, checked: boolean) => {
    const currentFeatures = watchedFeatures || [];
    const updatedFeatures = checked
      ? [...currentFeatures, featureId]
      : currentFeatures.filter(id => id !== featureId);
    
    form.setValue('selectedFeatures', updatedFeatures);
    updateQuoteData(2, { selectedFeatures: updatedFeatures });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getFeaturesByCategory = (category: FeatureCategory) => {
    return FEATURES.filter(feature => feature.category === category);
  };

  const getTotalPriceImpact = () => {
    if (!watchedFeatures) return 0;
    return watchedFeatures.reduce((total, featureId) => {
      const feature = FEATURES.find(f => f.id === featureId);
      return total + (feature?.priceImpact || 0);
    }, 0);
  };

  const getSelectedFeaturesCount = (category: FeatureCategory) => {
    if (!watchedFeatures) return 0;
    const categoryFeatures = getFeaturesByCategory(category);
    return categoryFeatures.filter(feature => 
      watchedFeatures.includes(feature.id)
    ).length;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">¿Qué funcionalidades necesitas?</h2>
        <p className="text-muted-foreground">
          Selecciona las características que quieres incluir en tu proyecto. 
          Puedes ver el impacto en el precio en tiempo real.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="selectedFeatures"
            render={() => (
              <FormItem>
                <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as FeatureCategory)}>
                  <TabsList className="grid w-full grid-cols-3">
                    {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
                      const Icon = config.icon;
                      const selectedCount = getSelectedFeaturesCount(key as FeatureCategory);
                      
                      return (
                        <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                          <Icon size={16} />
                          <span className="hidden sm:inline">{config.title}</span>
                          {selectedCount > 0 && (
                            <Badge variant="secondary" className="ml-1 text-xs">
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
                        {getFeaturesByCategory(categoryKey as FeatureCategory).map((feature) => {
                          const isSelected = watchedFeatures?.includes(feature.id) || false;
                          const isRequired = feature.required || false;
                          
                          return (
                            <Card 
                              key={feature.id} 
                              className={`transition-all cursor-pointer hover:shadow-md ${
                                isSelected ? 'ring-2 ring-primary border-primary' : ''
                              } ${isRequired ? 'bg-muted/30' : ''}`}
                              onClick={() => !isRequired && handleFeatureToggle(feature.id, !isSelected)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                  <FormControl>
                                    <Checkbox
                                      checked={isSelected}
                                      disabled={isRequired}
                                      onCheckedChange={(checked) => 
                                        !isRequired && handleFeatureToggle(feature.id, checked === true)
                                      }
                                      className="mt-1"
                                    />
                                  </FormControl>
                                  
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <Label className="font-medium cursor-pointer">
                                        {feature.name}
                                        {isRequired && (
                                          <Badge variant="secondary" className="ml-2 text-xs">
                                            Incluido
                                          </Badge>
                                        )}
                                      </Label>
                                      <Badge 
                                        variant={feature.priceImpact > 0 ? "default" : "secondary"}
                                        className="text-xs"
                                      >
                                        {feature.priceImpact > 0 
                                          ? `+${formatPrice(feature.priceImpact)}`
                                          : 'Incluido'
                                        }
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {feature.description}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Selected Features Summary */}
          {watchedFeatures && watchedFeatures.length > 0 && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">Resumen de Funcionalidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Funcionalidades seleccionadas:</span>
                    <Badge variant="secondary">
                      {watchedFeatures.length} de {FEATURES.length}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Impacto en precio:</span>
                    <span className="font-medium text-primary">
                      +{formatPrice(getTotalPriceImpact())}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                    {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
                      const count = getSelectedFeaturesCount(key as FeatureCategory);
                      return (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-primary">{count}</div>
                          <div className="text-xs text-muted-foreground">
                            {config.title.split(' ')[1]}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </Form>
    </div>
  );
} 