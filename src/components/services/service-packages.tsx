"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { ServicePackage, AddOn } from '@/lib/types/services';
import { useCartStore } from '@/lib/stores/cart-store';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCartIcon } from '@/components/ui/icons';

interface ServicePackagesProps {
  packages: ServicePackage[];
  serviceName: string;
}

export function ServicePackages({ packages, serviceName }: ServicePackagesProps) {
  const [showComparison, setShowComparison] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, AddOn[]>>({});
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const toggleAddOn = (packageId: string, addOn: AddOn) => {
    setSelectedAddOns(prev => {
      const currentAddOns = prev[packageId] || [];
      const exists = currentAddOns.find(a => a.id === addOn.id);
      
      if (exists) {
        return {
          ...prev,
          [packageId]: currentAddOns.filter(a => a.id !== addOn.id)
        };
      } else {
        return {
          ...prev,
          [packageId]: [...currentAddOns, addOn]
        };
      }
    });
  };

  const getTotalPrice = (pkg: ServicePackage) => {
    const addOnsPrice = (selectedAddOns[pkg.id] || []).reduce((sum, addOn) => sum + addOn.price, 0);
    return pkg.price + addOnsPrice;
  };

  const getROICalculation = (pkg: ServicePackage) => {
    // Simple ROI calculation based on package price
    const monthlyValue = pkg.price * 0.1; // Assume 10% monthly value
    const yearlyValue = monthlyValue * 12;
    const roi = ((yearlyValue - pkg.price) / pkg.price) * 100;
    
    return {
      monthlyValue: Math.round(monthlyValue),
      yearlyValue: Math.round(yearlyValue),
      roi: Math.round(roi),
      paybackMonths: Math.ceil(pkg.price / monthlyValue)
    };
  };

  const handleAddToCart = (pkg: ServicePackage) => {
    const selectedPackageAddOns = selectedAddOns[pkg.id] || [];
    const totalPrice = getTotalPrice(pkg);
    
    // Create cart item
    const cartItem = {
      id: `${pkg.id}-${Date.now()}`,
      name: `${serviceName} - ${pkg.name}`,
      description: pkg.description,
      price: totalPrice,
      originalPrice: pkg.originalPrice,
      quantity: 1,
      category: 'servicios',
      slug: pkg.id,
      estimatedDelivery: pkg.duration,
      features: [
        ...pkg.features,
        ...selectedPackageAddOns.map(addon => `+ ${addon.name}`)
      ]
    };

    addItem(cartItem);
    
    toast({
      title: "¡Añadido al carrito!",
      description: `${cartItem.name} se ha añadido correctamente al carrito.`,
      variant: "success",
    });

    // Reset selected add-ons for this package
    setSelectedAddOns(prev => ({
      ...prev,
      [pkg.id]: []
    }));
  };

  return (
    <section id="paquetes" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Paquetes de {serviceName}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Elige el paquete que mejor se adapte a tus necesidades y presupuesto
          </p>

          {/* Comparison Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm">Vista Normal</span>
            <Switch
              checked={showComparison}
              onCheckedChange={setShowComparison}
            />
            <span className="text-sm">Comparación Detallada</span>
          </div>
        </motion.div>

        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="packages">Paquetes</TabsTrigger>
            <TabsTrigger value="roi">Calculadora ROI</TabsTrigger>
          </TabsList>

          <TabsContent value="packages" className="mt-8">
            {!showComparison ? (
              /* Normal Package View */
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <Card className={`h-full transition-all duration-300 hover:shadow-xl ${
                      pkg.popular ? 'border-2 border-blue-500 scale-105' : 
                      pkg.recommended ? 'border-2 border-green-500' : 
                      'border hover:border-primary/50'
                    }`}>
                      {/* Popular/Recommended Badge */}
                      {(pkg.popular || pkg.recommended) && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className={
                            pkg.popular ? 'bg-blue-500' : 'bg-green-500'
                          }>
                            {pkg.popular ? '⭐ Más Popular' : '🏆 Recomendado'}
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                        <div className="mb-4">
                          <div className="text-4xl font-bold text-primary">
                            €{getTotalPrice(pkg)}
                            {pkg.originalPrice && (
                              <span className="text-lg text-muted-foreground line-through ml-2">
                                €{pkg.originalPrice}
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground">{pkg.duration}</p>
                        </div>
                        <p className="text-muted-foreground">{pkg.description}</p>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Features */}
                        <div>
                          <h4 className="font-semibold mb-3">Incluye:</h4>
                          <ul className="space-y-2">
                            {pkg.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Add-ons */}
                        {pkg.addOns && pkg.addOns.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3">Complementos opcionales:</h4>
                            <div className="space-y-2">
                              {pkg.addOns.slice(0, 3).map((addOn) => (
                                <div key={addOn.id} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      id={`${pkg.id}-${addOn.id}`}
                                      checked={(selectedAddOns[pkg.id] || []).some(a => a.id === addOn.id)}
                                      onChange={() => toggleAddOn(pkg.id, addOn)}
                                      className="rounded"
                                    />
                                    <label htmlFor={`${pkg.id}-${addOn.id}`} className="text-sm cursor-pointer">
                                      {addOn.name}
                                    </label>
                                  </div>
                                  <span className="text-sm font-semibold">+€{addOn.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* CTA */}
                        <div className="pt-4 space-y-3">
                          <Button 
                            className="w-full" 
                            size="lg"
                            onClick={() => handleAddToCart(pkg)}
                          >
                            <ShoppingCartIcon size={16} className="mr-2" />
                            Añadir al Carrito
                          </Button>
                          <Button variant="outline" className="w-full">
                            Más Información
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Comparison Table View */
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="overflow-x-auto"
              >
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Característica</th>
                      {packages.map((pkg) => (
                        <th key={pkg.id} className="text-center p-4 min-w-[200px]">
                          <div className="space-y-2">
                            <div className="font-bold">{pkg.name}</div>
                            <div className="text-2xl font-bold text-primary">€{pkg.price}</div>
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={() => handleAddToCart(pkg)}
                            >
                              <ShoppingCartIcon size={14} className="mr-1" />
                              Añadir
                            </Button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Get all unique features */}
                    {Array.from(new Set(packages.flatMap(pkg => pkg.features))).map((feature, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-medium">{feature}</td>
                        {packages.map((pkg) => (
                          <td key={pkg.id} className="p-4 text-center">
                            {pkg.features.includes(feature) ? (
                              <span className="text-green-500 text-xl">✓</span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="roi" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => {
                const roi = getROICalculation(pkg);
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-xl">{pkg.name}</CardTitle>
                        <div className="text-2xl font-bold text-primary">€{pkg.price}</div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-lg font-bold text-blue-600">€{roi.monthlyValue}</div>
                            <div className="text-xs text-muted-foreground">Valor mensual</div>
                          </div>
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="text-lg font-bold text-green-600">{roi.roi}%</div>
                            <div className="text-xs text-muted-foreground">ROI anual</div>
                          </div>
                          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <div className="text-lg font-bold text-purple-600">€{roi.yearlyValue}</div>
                            <div className="text-xs text-muted-foreground">Valor anual</div>
                          </div>
                          <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <div className="text-lg font-bold text-orange-600">{roi.paybackMonths}m</div>
                            <div className="text-xs text-muted-foreground">Recuperación</div>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full" 
                          onClick={() => handleAddToCart(pkg)}
                        >
                          <ShoppingCartIcon size={16} className="mr-2" />
                          Añadir al Carrito
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas algo personalizado?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Si ninguno de estos paquetes se ajusta perfectamente a tus necesidades, 
              podemos crear una solución completamente personalizada para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Solicitar Cotización Personalizada
              </Button>
              <Button variant="outline" size="lg">
                Hablar con un Especialista
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 