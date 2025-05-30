"use client";

import { useState, useEffect } from 'react';
import { useRouter } from '@/lib/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { PaymentForm } from '@/components/checkout/payment-form';
import { OrderSummary } from '@/components/checkout/order-summary';
import { useCartStore } from '@/lib/stores/cart-store';
import { useToast } from '@/hooks/use-toast';
import {
  type PersonalInfoFormData,
  type BillingInfoFormData,
  type CardInfoFormData,
} from '@/lib/validations/checkout';
import { PaymentMethod } from '@/lib/types/cart';
import { 
  ArrowLeftIcon, 
  CheckIcon, 
  UserIcon, 
  MapPinIcon, 
  CreditCardIcon,
  ShieldCheckIcon 
} from '@/components/ui/icons';

const STEPS = [
  { id: 1, name: 'Información Personal', icon: UserIcon },
  { id: 2, name: 'Facturación', icon: MapPinIcon },
  { id: 3, name: 'Pago', icon: CreditCardIcon },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, discount, clearCart } = useCartStore();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  // Form data state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormData>();
  const [billingInfo, setBillingInfo] = useState<BillingInfoFormData>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const [cardInfo, setCardInfo] = useState<CardInfoFormData>();

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/carrito');
    }
  }, [items.length, router]);

  const handlePersonalInfoSubmit = (data: PersonalInfoFormData) => {
    setPersonalInfo(data);
    setCurrentStep(2);
  };

  const handleBillingInfoSubmit = (data: BillingInfoFormData) => {
    setBillingInfo(data);
    setCurrentStep(3);
  };

  const handlePaymentSubmit = async (data: { paymentMethod: PaymentMethod; cardInfo?: CardInfoFormData }) => {
    if (!acceptTerms) {
      toast({
        title: "Términos y condiciones",
        description: "Debes aceptar los términos y condiciones para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setPaymentMethod(data.paymentMethod);
    setCardInfo(data.cardInfo);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate order number
      const orderNumber = `PLZ-${Date.now().toString().slice(-6)}`;

      // Clear cart and redirect to success page
      clearCart();
      
      toast({
        title: "¡Pedido confirmado!",
        description: `Tu pedido ${orderNumber} ha sido procesado correctamente.`,
        variant: "success",
      });

      router.push(`/checkout/success?order=${orderNumber}`);
    } catch (error) {
      toast({
        title: "Error en el pago",
        description: "Ha ocurrido un error procesando tu pago. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = (currentStep / STEPS.length) * 100;

  if (items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.push('/carrito')}>
            <ArrowLeftIcon size={16} className="mr-2" />
            Volver al carrito
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Finalizar Compra</h1>
            <p className="text-muted-foreground">
              Completa tu pedido de forma segura
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {currentStep > step.id ? (
                    <CheckIcon size={16} />
                  ) : (
                    <step.icon size={16} />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.name}
                </span>
                {step.id < STEPS.length && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step Navigation */}
            {currentStep > 1 && (
              <Button variant="outline" onClick={goToPreviousStep}>
                <ArrowLeftIcon size={16} className="mr-2" />
                Paso anterior
              </Button>
            )}

            {/* Forms */}
            {(currentStep === 1 || currentStep === 2) && (
              <CheckoutForm
                onPersonalInfoSubmit={handlePersonalInfoSubmit}
                onBillingInfoSubmit={handleBillingInfoSubmit}
                personalInfo={personalInfo}
                billingInfo={billingInfo}
                currentStep={currentStep}
              />
            )}

            {/* Payment Step */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <PaymentForm
                  onSubmit={handlePaymentSubmit}
                  isLoading={isLoading}
                />

                {/* Terms and Conditions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldCheckIcon size={20} />
                      Términos y Condiciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptTerms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                        className="mt-1"
                      />
                      <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                        Acepto los{' '}
                        <a href="/terms" className="text-primary hover:underline" target="_blank">
                          términos y condiciones
                        </a>{' '}
                        y la{' '}
                        <a href="/privacy" className="text-primary hover:underline" target="_blank">
                          política de privacidad
                        </a>
                        . Entiendo que este es un servicio digital y que el trabajo comenzará una vez confirmado el pago.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="newsletter"
                        checked={newsletter}
                        onCheckedChange={(checked) => setNewsletter(checked === true)}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Quiero recibir ofertas especiales y actualizaciones por email (opcional)
                      </Label>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheckIcon size={16} />
                        <span>
                          Tu información está protegida con encriptación SSL de 256 bits.
                          No almacenamos datos de tarjetas de crédito.
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <OrderSummary items={items} discount={discount} />

            {/* Security Badges */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <h3 className="font-semibold text-sm">Compra 100% Segura</h3>
                  <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ShieldCheckIcon size={14} />
                      <span>SSL</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🔒</span>
                      <span>Encriptado</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>✅</span>
                      <span>Verificado</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Aceptamos: Visa, Mastercard, PayPal
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Info */}
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-sm mb-2">¿Necesitas ayuda?</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Nuestro equipo está aquí para ayudarte
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contactar Soporte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 