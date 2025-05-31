"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PRICING_PLANS } from '@/lib/data/company-data';
import { 
  CheckIcon, 
  XIcon, 
  CrownIcon,
  ClockIcon,
  ArrowRightIcon
} from '@/components/ui/icons';

export function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(false);

  const formatPrice = (monthlyPrice: number, annualPrice: number) => {
    if (isAnnual) {
      const monthlyFromAnnual = Math.round(annualPrice / 12);
      const savings = monthlyPrice - monthlyFromAnnual;
      return {
        price: monthlyFromAnnual,
        originalPrice: monthlyPrice,
        savings: savings,
        period: 'mes',
        billedAs: `€${annualPrice} facturado anualmente`
      };
    }
    return {
      price: monthlyPrice,
      originalPrice: null,
      savings: 0,
      period: 'mes',
      billedAs: 'Facturado mensualmente'
    };
  };

  return (
    <div className="space-y-12">
      {/* Annual/Monthly Toggle */}
      <div className="flex items-center justify-center gap-4">
        <Label htmlFor="billing-toggle" className={!isAnnual ? 'font-semibold' : ''}>
          Mensual
        </Label>
        <div className="relative">
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          {isAnnual && (
            <Badge className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs">
              Ahorra 20%
            </Badge>
          )}
        </div>
        <Label htmlFor="billing-toggle" className={isAnnual ? 'font-semibold' : ''}>
          Anual
        </Label>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-8 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => {
          const pricing = formatPrice(plan.monthlyPrice, plan.annualPrice);
          
          return (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'hover:shadow-lg transition-shadow'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                  <CrownIcon className="inline h-4 w-4 mr-1" />
                  Más Popular
                </div>
              )}

              <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'} pb-8`}>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                
                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-2">
                    {pricing.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        €{pricing.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold">€{pricing.price}</span>
                    <span className="text-muted-foreground">/{pricing.period}</span>
                  </div>
                  
                  {pricing.savings > 0 && (
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      Ahorras €{pricing.savings}/mes
                    </Badge>
                  )}
                  
                  <p className="text-sm text-muted-foreground">
                    {pricing.billedAs}
                  </p>
                </div>

                {/* Delivery Time */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <ClockIcon className="h-4 w-4" />
                  Entrega: {plan.deliveryTime}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="space-y-3 pt-4 border-t">
                    <p className="text-sm font-medium text-muted-foreground">No incluye:</p>
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <XIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  size="lg"
                  asChild
                >
                  <a href="/contacto">
                    {plan.cta}
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </a>
                </Button>

                {/* Additional Info */}
                <div className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Consulta gratuita incluida
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Garantía de satisfacción 30 días
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          Todos los planes incluyen hosting SSL, soporte técnico y actualizaciones de seguridad
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-green-600" />
            Sin permanencia
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-green-600" />
            Cambio de plan en cualquier momento
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-green-600" />
            Soporte en español
          </span>
        </div>
      </div>
    </div>
  );
} 