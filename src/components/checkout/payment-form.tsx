"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  cardInfoSchema,
  formatCardNumber,
  formatExpiryDate,
  getCardType,
  validateExpiryDate,
  type CardInfoFormData,
} from '@/lib/validations/checkout';
import { PaymentMethod } from '@/lib/types/cart';
import { CreditCardIcon, LockIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card',
    type: 'card',
    name: 'Tarjeta de Crédito/Débito',
    icon: '💳',
    description: 'Visa, Mastercard, American Express',
    enabled: true,
  },
  {
    id: 'paypal',
    type: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
    description: 'Paga con tu cuenta de PayPal',
    enabled: true,
  },
  {
    id: 'bank_transfer',
    type: 'bank_transfer',
    name: 'Transferencia Bancaria',
    icon: '🏦',
    description: 'Transferencia directa a nuestra cuenta',
    enabled: true,
  },
];

interface PaymentFormProps {
  onSubmit: (data: { paymentMethod: PaymentMethod; cardInfo?: CardInfoFormData }) => void;
  isLoading?: boolean;
  className?: string;
}

export function PaymentForm({ onSubmit, isLoading = false, className }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(PAYMENT_METHODS[0]);

  const form = useForm<CardInfoFormData>({
    resolver: zodResolver(cardInfoSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
    },
  });

  const handleSubmit = (data: CardInfoFormData) => {
    onSubmit({
      paymentMethod: selectedMethod,
      cardInfo: selectedMethod.type === 'card' ? data : undefined,
    });
  };

  const handlePaymentMethodChange = (methodId: string) => {
    const method = PAYMENT_METHODS.find(m => m.id === methodId);
    if (method) {
      setSelectedMethod(method);
    }
  };

  const cardNumber = form.watch('cardNumber');
  const cardType = getCardType(cardNumber);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCardIcon size={20} />
          Método de Pago
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <Label className="text-base font-semibold mb-4 block">
            Selecciona tu método de pago
          </Label>
          <RadioGroup
            value={selectedMethod.id}
            onValueChange={handlePaymentMethodChange}
            className="space-y-3"
          >
            {PAYMENT_METHODS.map((method) => (
              <div key={method.id} className="flex items-center space-x-3">
                <RadioGroupItem value={method.id} id={method.id} />
                <Label
                  htmlFor={method.id}
                  className="flex-1 flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-muted/50"
                >
                  <span className="text-2xl">{method.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {method.description}
                    </div>
                  </div>
                  {!method.enabled && (
                    <Badge variant="secondary">Próximamente</Badge>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Card Form */}
        {selectedMethod.type === 'card' && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <LockIcon size={16} />
                <span>Tus datos están protegidos con encriptación SSL</span>
              </div>

              {/* Card Number */}
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de tarjeta</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="1234 5678 9012 3456"
                          value={formatCardNumber(field.value)}
                          onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
                          className="pr-12"
                        />
                        {cardType !== 'unknown' && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Badge variant="outline" className="text-xs">
                              {cardType.toUpperCase()}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Expiry Date */}
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de vencimiento</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="MM/YY"
                          value={formatExpiryDate(field.value)}
                          onChange={(e) => field.onChange(formatExpiryDate(e.target.value))}
                          maxLength={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* CVV */}
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="123"
                          maxLength={4}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Cardholder Name */}
              <FormField
                control={form.control}
                name="cardholderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del titular</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nombre como aparece en la tarjeta"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}

        {/* PayPal */}
        {selectedMethod.type === 'paypal' && (
          <div className="p-6 bg-muted/50 rounded-lg text-center">
            <div className="text-4xl mb-4">🅿️</div>
            <h3 className="font-semibold mb-2">Pagar con PayPal</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Serás redirigido a PayPal para completar el pago de forma segura
            </p>
            <Button
              onClick={() => onSubmit({ paymentMethod: selectedMethod })}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Procesando...' : 'Continuar con PayPal'}
            </Button>
          </div>
        )}

        {/* Bank Transfer */}
        {selectedMethod.type === 'bank_transfer' && (
          <div className="p-6 bg-muted/50 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-4xl mb-4">🏦</div>
              <h3 className="font-semibold mb-2">Transferencia Bancaria</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Recibirás los datos bancarios por email para realizar la transferencia
              </p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Banco:</span>
                <span className="font-medium">Banco Santander</span>
              </div>
              <div className="flex justify-between">
                <span>IBAN:</span>
                <span className="font-medium">ES91 2100 0418 4502 0005 1332</span>
              </div>
              <div className="flex justify-between">
                <span>Beneficiario:</span>
                <span className="font-medium">Plalz S.L.</span>
              </div>
            </div>
            
            <Button
              onClick={() => onSubmit({ paymentMethod: selectedMethod })}
              disabled={isLoading}
              className="w-full mt-4"
            >
              {isLoading ? 'Procesando...' : 'Confirmar Pedido'}
            </Button>
          </div>
        )}

        {/* Card Payment Button */}
        {selectedMethod.type === 'card' && (
          <Button
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isLoading || !form.formState.isValid}
            className="w-full"
            size="lg"
          >
            {isLoading ? 'Procesando pago...' : 'Completar Pago'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
} 