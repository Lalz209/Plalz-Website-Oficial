"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useQuoteStoreHydrated } from '@/lib/hooks/use-hydration';
import { projectTypeSchema, ProjectTypeFormData } from '@/lib/validations/quote';
import { PROJECT_TYPES, INDUSTRIES } from '@/lib/data/quote-data';
import { ProjectType, Industry } from '@/lib/types/quote';

export function ProjectTypeStep() {
  const { currentQuote, updateQuoteData, _hasHydrated } = useQuoteStoreHydrated();

  const form = useForm<ProjectTypeFormData>({
    resolver: zodResolver(projectTypeSchema),
    defaultValues: {
      projectType: currentQuote.projectType || 'website',
      industry: currentQuote.industry || 'technology',
    },
  });

  // Show loading state during hydration
  if (!_hasHydrated) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const watchedProjectType = form.watch('projectType');
  const watchedIndustry = form.watch('industry');

  // Update store when form values change
  const handleFormChange = (data: Partial<ProjectTypeFormData>) => {
    updateQuoteData(1, data);
  };

  // Watch for changes and update store
  form.watch((data) => {
    if (data.projectType || data.industry) {
      handleFormChange(data);
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">¿Qué tipo de proyecto necesitas?</h2>
        <p className="text-muted-foreground">
          Selecciona el tipo de proyecto que mejor describe lo que necesitas desarrollar.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          {/* Project Type Selection */}
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Tipo de Proyecto</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {Object.entries(PROJECT_TYPES).map(([key, project]) => (
                      <div key={key} className="relative">
                        <RadioGroupItem
                          value={key}
                          id={key}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={key}
                          className="flex flex-col h-full cursor-pointer"
                        >
                          <Card className="h-full transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <div className="text-3xl">{project.icon}</div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold">{project.name}</h3>
                                    <Badge variant="secondary">
                                      {formatPrice(project.basePrice)}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">
                                    {project.description}
                                  </p>
                                  <div className="space-y-1">
                                    <p className="text-xs font-medium text-muted-foreground">
                                      Ejemplos:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {project.examples.map((example, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {example}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Industry Selection */}
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Industria o Sector</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona tu industria" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(INDUSTRIES).map(([key, industry]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center justify-between w-full">
                            <span>{industry.name}</span>
                            {industry.multiplier !== 1.0 && (
                              <Badge 
                                variant={industry.multiplier > 1.0 ? "destructive" : "secondary"}
                                className="ml-2 text-xs"
                              >
                                {industry.multiplier > 1.0 ? '+' : ''}
                                {Math.round((industry.multiplier - 1) * 100)}%
                              </Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
                {watchedIndustry && INDUSTRIES[watchedIndustry as Industry]?.multiplier !== 1.0 && (
                  <p className="text-xs text-muted-foreground">
                    {INDUSTRIES[watchedIndustry as Industry].multiplier > 1.0 
                      ? 'Esta industria requiere consideraciones especiales que pueden incrementar el precio.'
                      : 'Esta industria puede beneficiarse de descuentos especiales.'
                    }
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Project Summary */}
          {watchedProjectType && watchedIndustry && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Resumen de tu selección</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Proyecto:</span>
                    <span className="font-medium">
                      {PROJECT_TYPES[watchedProjectType as ProjectType].name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Industria:</span>
                    <span className="font-medium">
                      {INDUSTRIES[watchedIndustry as Industry].name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precio base:</span>
                    <span className="font-medium">
                      {formatPrice(
                        PROJECT_TYPES[watchedProjectType as ProjectType].basePrice *
                        INDUSTRIES[watchedIndustry as Industry].multiplier
                      )}
                    </span>
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