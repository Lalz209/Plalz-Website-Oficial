"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useQuoteStore } from '@/lib/stores/quote-store';
import { designPreferencesSchema, DesignPreferencesFormData } from '@/lib/validations/quote';
import { DESIGN_STYLES, COLOR_SCHEMES } from '@/lib/data/quote-data';
import { DesignType } from '@/lib/types/quote';
import { UploadIcon, PlusIcon, XIcon, PaletteIcon, ImageIcon } from '@/components/ui/icons';

export function DesignStep() {
  const { currentQuote, updateQuoteData } = useQuoteStore();
  const [inspirationUrls, setInspirationUrls] = useState<string[]>(
    currentQuote.designPreferences?.inspirationUrls || []
  );
  const [newUrl, setNewUrl] = useState('');

  const form = useForm<DesignPreferencesFormData>({
    // resolver: zodResolver(designPreferencesSchema),
    defaultValues: {
      designPreferences: {
        type: currentQuote.designPreferences?.type || 'template',
        style: currentQuote.designPreferences?.style || 'modern',
        colorScheme: currentQuote.designPreferences?.colorScheme || 'brand',
        inspirationUrls: currentQuote.designPreferences?.inspirationUrls || [],
        hasExistingBrand: currentQuote.designPreferences?.hasExistingBrand || false,
      },
    },
  });

  const watchedDesignPreferences = form.watch('designPreferences');

  // Update store when form values change
  form.watch((data) => {
    if (data.designPreferences && data.designPreferences.type && data.designPreferences.style && data.designPreferences.colorScheme) {
      updateQuoteData(3, { 
        designPreferences: {
          type: data.designPreferences.type,
          style: data.designPreferences.style,
          colorScheme: data.designPreferences.colorScheme,
          hasExistingBrand: data.designPreferences.hasExistingBrand || false,
          inspirationUrls,
        }
      });
    }
  });

  const handleAddUrl = () => {
    if (newUrl && !inspirationUrls.includes(newUrl)) {
      const updatedUrls = [...inspirationUrls, newUrl];
      setInspirationUrls(updatedUrls);
      form.setValue('designPreferences.inspirationUrls', updatedUrls);
      setNewUrl('');
    }
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    const updatedUrls = inspirationUrls.filter(url => url !== urlToRemove);
    setInspirationUrls(updatedUrls);
    form.setValue('designPreferences.inspirationUrls', updatedUrls);
  };

  const getDesignTypeMultiplier = (type: DesignType) => {
    switch (type) {
      case 'template': return 0.8;
      case 'custom': return 1.5;
      case 'hybrid': return 1.2;
      default: return 1.0;
    }
  };

  const formatMultiplier = (multiplier: number) => {
    const percentage = Math.round((multiplier - 1) * 100);
    if (percentage === 0) return '';
    return percentage > 0 ? `+${percentage}%` : `${percentage}%`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Diseño y Branding</h2>
        <p className="text-muted-foreground">
          Define el estilo visual y la identidad de tu proyecto.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          {/* Design Type */}
          <FormField
            control={form.control}
            name="designPreferences.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Tipo de Diseño</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="relative">
                      <RadioGroupItem value="template" id="template" className="peer sr-only" />
                      <Label htmlFor="template" className="cursor-pointer">
                        <Card className="h-full transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl mb-3">🎨</div>
                            <h3 className="font-semibold mb-2">Template</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              Diseño basado en plantillas profesionales
                            </p>
                            <Badge variant="secondary">
                              {formatMultiplier(getDesignTypeMultiplier('template')) || 'Estándar'}
                            </Badge>
                          </CardContent>
                        </Card>
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem value="hybrid" id="hybrid" className="peer sr-only" />
                      <Label htmlFor="hybrid" className="cursor-pointer">
                        <Card className="h-full transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl mb-3">🔧</div>
                            <h3 className="font-semibold mb-2">Híbrido</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              Template personalizado con elementos únicos
                            </p>
                            <Badge variant="default">
                              {formatMultiplier(getDesignTypeMultiplier('hybrid'))}
                            </Badge>
                          </CardContent>
                        </Card>
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem value="custom" id="custom" className="peer sr-only" />
                      <Label htmlFor="custom" className="cursor-pointer">
                        <Card className="h-full transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl mb-3">✨</div>
                            <h3 className="font-semibold mb-2">Personalizado</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              Diseño completamente único y personalizado
                            </p>
                            <Badge variant="destructive">
                              {formatMultiplier(getDesignTypeMultiplier('custom'))}
                            </Badge>
                          </CardContent>
                        </Card>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Design Style */}
          <FormField
            control={form.control}
            name="designPreferences.style"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Estilo de Diseño</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-2 md:grid-cols-5 gap-4"
                  >
                    {Object.entries(DESIGN_STYLES).map(([key, style]) => (
                      <div key={key} className="relative">
                        <RadioGroupItem value={key} id={key} className="peer sr-only" />
                        <Label htmlFor={key} className="cursor-pointer">
                          <Card className="transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                            <CardContent className="p-4 text-center">
                              <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded mb-3 flex items-center justify-center">
                                <PaletteIcon size={24} className="text-muted-foreground" />
                              </div>
                              <h4 className="font-medium text-sm">{style.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {style.description}
                              </p>
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

          {/* Color Scheme */}
          <FormField
            control={form.control}
            name="designPreferences.colorScheme"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Esquema de Colores</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {Object.entries(COLOR_SCHEMES).map(([key, scheme]) => (
                      <div key={key} className="relative">
                        <RadioGroupItem value={key} id={key} className="peer sr-only" />
                        <Label htmlFor={key} className="cursor-pointer">
                          <Card className="transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/60"></div>
                                <div>
                                  <h4 className="font-medium">{scheme.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {scheme.description}
                                  </p>
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

          {/* Existing Brand */}
          <FormField
            control={form.control}
            name="designPreferences.hasExistingBrand"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-base font-medium">
                    Tengo una identidad de marca existente
                  </FormLabel>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Marca esta opción si ya tienes logo, colores corporativos o guía de marca
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Brand Assets Upload */}
          {watchedDesignPreferences.hasExistingBrand && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon size={20} />
                  Assets de Marca
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <UploadIcon size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Logo</p>
                    <p className="text-xs text-muted-foreground">PNG, SVG, JPG</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Subir Logo
                    </Button>
                  </div>
                  
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <UploadIcon size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Guía de Marca</p>
                    <p className="text-xs text-muted-foreground">PDF</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Subir Guía
                    </Button>
                  </div>
                  
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <UploadIcon size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Imágenes</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Subir Imágenes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Inspiration URLs */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Referencias e Inspiración</Label>
              <p className="text-sm text-muted-foreground">
                Comparte URLs de sitios web que te gusten o que sirvan de inspiración
              </p>
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="https://ejemplo.com"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddUrl()}
              />
              <Button type="button" onClick={handleAddUrl} disabled={!newUrl}>
                <PlusIcon size={16} />
              </Button>
            </div>

            {inspirationUrls.length > 0 && (
              <div className="space-y-2">
                {inspirationUrls.map((url, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <span className="flex-1 text-sm truncate">{url}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveUrl(url)}
                    >
                      <XIcon size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Design Summary */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Resumen de Diseño</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Tipo:</span>
                  <p className="font-medium capitalize">{watchedDesignPreferences.type}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Estilo:</span>
                  <p className="font-medium">
                    {DESIGN_STYLES[watchedDesignPreferences.style]?.name}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Colores:</span>
                  <p className="font-medium">
                    {COLOR_SCHEMES[watchedDesignPreferences.colorScheme]?.name}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Marca existente:</span>
                  <p className="font-medium">
                    {watchedDesignPreferences.hasExistingBrand ? 'Sí' : 'No'}
                  </p>
                </div>
              </div>
              {inspirationUrls.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <span className="text-muted-foreground text-sm">Referencias:</span>
                  <p className="text-sm font-medium">{inspirationUrls.length} URL(s) agregadas</p>
                </div>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
} 