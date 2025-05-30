"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useQuoteStore } from '@/lib/stores/quote-store';
import { budgetSchema, BudgetFormData } from '@/lib/validations/quote';
import { PaymentPreference } from '@/lib/types/quote';
import { 
  DollarSignIcon, 
  CreditCardIcon, 
  CalendarIcon,
  TrendingUpIcon,
  CheckCircleIcon 
} from '@/components/ui/icons';

const PAYMENT_OPTIONS = {
  full: {
    name: 'Pago Completo',
    description: 'Pago único al finalizar el proyecto',
    icon: DollarSignIcon,
    discount: 0.05, // 5% discount
    color: 'bg-green-100 text-green-800',
  },
  phases: {
    name: 'Por Fases',
    description: 'Pagos divididos según las fases del proyecto',
    icon: CalendarIcon,
    discount: 0,
    color: 'bg-blue-100 text-blue-800',
  },
  monthly: {
    name: 'Mensual',
    description: 'Pagos mensuales durante el desarrollo',
    icon: CreditCardIcon,
    discount: -0.1, // 10% increase
    color: 'bg-orange-100 text-orange-800',
  },
};

const BUDGET_RANGES = [
  { min: 500, max: 2000, label: '€500 - €2,000', description: 'Proyectos básicos' },
  { min: 2000, max: 5000, label: '€2,000 - €5,000', description: 'Proyectos estándar' },
  { min: 5000, max: 10000, label: '€5,000 - €10,000', description: 'Proyectos avanzados' },
  { min: 10000, max: 25000, label: '€10,000 - €25,000', description: 'Proyectos premium' },
  { min: 25000, max: 50000, label: '€25,000+', description: 'Proyectos enterprise' },
];

export function BudgetStep() {
  const { currentQuote, estimatedPrice, updateQuoteData } = useQuoteStore();
  const [budgetRange, setBudgetRange] = useState<[number, number]>(
    currentQuote.budget?.range || [2000, 10000]
  );

  const form = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      budget: {
        range: currentQuote.budget?.range || [2000, 10000],
        paymentPreference: currentQuote.budget?.paymentPreference || 'phases',
        hasFlexibility: currentQuote.budget?.hasFlexibility || false,
      },
    },
  });

  const watchedBudget = form.watch('budget');

  // Update store when form values change
  form.watch((data) => {
    if (data.budget && data.budget.range && data.budget.range.length === 2) {
      const validBudget = {
        range: [data.budget.range[0] || 0, data.budget.range[1] || 0] as [number, number],
        paymentPreference: data.budget.paymentPreference || 'phases',
        hasFlexibility: data.budget.hasFlexibility || false,
      };
      updateQuoteData(6, { budget: validBudget });
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleRangeChange = (newRange: [number, number]) => {
    setBudgetRange(newRange);
    form.setValue('budget.range', newRange);
  };

  const getPaymentSchedule = (paymentPreference: PaymentPreference, totalPrice: number) => {
    const paymentOption = PAYMENT_OPTIONS[paymentPreference];
    const adjustedPrice = totalPrice * (1 + paymentOption.discount);

    switch (paymentPreference) {
      case 'full':
        return [
          { phase: 'Finalización del proyecto', amount: adjustedPrice, percentage: 100 }
        ];
      case 'phases':
        return [
          { phase: 'Inicio del proyecto', amount: adjustedPrice * 0.3, percentage: 30 },
          { phase: 'Diseño completado', amount: adjustedPrice * 0.3, percentage: 30 },
          { phase: 'Desarrollo completado', amount: adjustedPrice * 0.3, percentage: 30 },
          { phase: 'Entrega final', amount: adjustedPrice * 0.1, percentage: 10 },
        ];
      case 'monthly':
        const months = 3; // Assuming 3 months project
        const monthlyAmount = adjustedPrice / months;
        return Array.from({ length: months }, (_, i) => ({
          phase: `Mes ${i + 1}`,
          amount: monthlyAmount,
          percentage: Math.round(100 / months),
        }));
      default:
        return [];
    }
  };

  const getBudgetFit = () => {
    const [min, max] = watchedBudget.range;
    if (estimatedPrice < min) {
      return { status: 'below', message: 'El precio estimado está por debajo de tu presupuesto' };
    } else if (estimatedPrice > max) {
      return { status: 'above', message: 'El precio estimado supera tu presupuesto máximo' };
    } else {
      return { status: 'within', message: 'El precio estimado está dentro de tu presupuesto' };
    }
  };

  const budgetFit = getBudgetFit();
  const paymentSchedule = getPaymentSchedule(watchedBudget.paymentPreference, estimatedPrice);
  const paymentOption = PAYMENT_OPTIONS[watchedBudget.paymentPreference];
  const adjustedPrice = estimatedPrice * (1 + paymentOption.discount);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Presupuesto</h2>
        <p className="text-muted-foreground">
          Define tu rango de presupuesto y preferencias de pago.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          {/* Budget Range */}
          <FormField
            control={form.control}
            name="budget.range"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  <TrendingUpIcon size={20} />
                  Rango de Presupuesto
                </FormLabel>
                <div className="space-y-6">
                  <div className="px-4">
                    <Slider
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleRangeChange(value as [number, number]);
                      }}
                      min={500}
                      max={50000}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>€500</span>
                      <span>€50,000+</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {formatPrice(field.value[0])} - {formatPrice(field.value[1])}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tu rango de presupuesto seleccionado
                    </p>
                  </div>

                  {/* Quick Budget Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {BUDGET_RANGES.map((range, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleRangeChange([range.min, range.max])}
                        className={`p-3 rounded-lg border text-left transition-all hover:shadow-md ${
                          field.value[0] === range.min && field.value[1] === range.max
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-medium text-sm">{range.label}</div>
                        <div className="text-xs text-muted-foreground">{range.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Budget vs Estimate Comparison */}
          <Card className={`${
            budgetFit.status === 'within' ? 'bg-green-50 border-green-200' :
            budgetFit.status === 'above' ? 'bg-red-50 border-red-200' :
            'bg-blue-50 border-blue-200'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  budgetFit.status === 'within' ? 'bg-green-100 text-green-600' :
                  budgetFit.status === 'above' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {budgetFit.status === 'within' ? <CheckCircleIcon size={16} /> : <TrendingUpIcon size={16} />}
                </div>
                <div>
                  <h3 className="font-medium">Comparación de Presupuesto</h3>
                  <p className="text-sm text-muted-foreground">{budgetFit.message}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Tu presupuesto:</span>
                  <p className="font-medium">
                    {formatPrice(watchedBudget.range[0])} - {formatPrice(watchedBudget.range[1])}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Precio estimado:</span>
                  <p className="font-medium">{formatPrice(estimatedPrice)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Preference */}
          <FormField
            control={form.control}
            name="budget.paymentPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  <CreditCardIcon size={20} />
                  Preferencia de Pago
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {Object.entries(PAYMENT_OPTIONS).map(([key, option]) => {
                      const Icon = option.icon;
                      return (
                        <div key={key} className="relative">
                          <RadioGroupItem value={key} id={key} className="peer sr-only" />
                          <Label htmlFor={key} className="cursor-pointer">
                            <Card className="h-full transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                              <CardContent className="p-4 text-center">
                                <Icon size={24} className="mx-auto mb-3 text-primary" />
                                <h3 className="font-semibold mb-2">{option.name}</h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {option.description}
                                </p>
                                {option.discount !== 0 && (
                                  <Badge 
                                    variant={option.discount > 0 ? "default" : "destructive"}
                                    className="text-xs"
                                  >
                                    {option.discount > 0 ? '-' : '+'}
                                    {Math.abs(option.discount * 100)}%
                                  </Badge>
                                )}
                              </CardContent>
                            </Card>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cronograma de Pagos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="font-medium">Total del proyecto:</span>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(adjustedPrice)}
                  </span>
                </div>
                
                {paymentSchedule.map((payment, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div>
                      <span className="font-medium">{payment.phase}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({payment.percentage}%)
                      </span>
                    </div>
                    <span className="font-medium">{formatPrice(payment.amount)}</span>
                  </div>
                ))}

                {paymentOption.discount !== 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        {paymentOption.discount > 0 ? 'Descuento aplicado:' : 'Recargo aplicado:'}
                      </span>
                      <span className={paymentOption.discount > 0 ? 'text-green-600' : 'text-red-600'}>
                        {paymentOption.discount > 0 ? '-' : '+'}
                        {formatPrice(Math.abs(estimatedPrice * paymentOption.discount))}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Budget Flexibility */}
          <FormField
            control={form.control}
            name="budget.hasFlexibility"
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
                    Tengo flexibilidad en el presupuesto
                  </FormLabel>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Marca esta opción si puedes ajustar tu presupuesto para incluir funcionalidades adicionales
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Budget Summary */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Resumen del Presupuesto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Rango de presupuesto:</span>
                  <p className="font-medium">
                    {formatPrice(watchedBudget.range[0])} - {formatPrice(watchedBudget.range[1])}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Método de pago:</span>
                  <p className="font-medium">
                    {PAYMENT_OPTIONS[watchedBudget.paymentPreference].name}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Precio final:</span>
                  <p className="font-medium text-primary">
                    {formatPrice(adjustedPrice)}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Flexibilidad:</span>
                  <p className="font-medium">
                    {watchedBudget.hasFlexibility ? 'Sí' : 'No'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
} 