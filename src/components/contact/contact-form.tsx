"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CONTACT_TYPES } from '@/lib/data/company-data';
import { 
  SendIcon, 
  CheckCircleIcon, 
  AlertCircleIcon,
  LoaderIcon
} from '@/components/ui/icons';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono inválido').optional().or(z.literal('')),
  company: z.string().optional(),
  inquiryType: z.string().min(1, 'Selecciona el tipo de consulta'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  acceptTerms: z.boolean().refine(val => val === true, 'Debes aceptar los términos'),
  acceptMarketing: z.boolean().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({ status: 'idle' });
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      acceptTerms: false,
      acceptMarketing: false,
    }
  });

  const watchedInquiryType = watch('inquiryType');

  const onSubmit = async (data: ContactFormData) => {
    if (!captchaVerified) {
      setFormState({
        status: 'error',
        message: 'Por favor, verifica que no eres un robot'
      });
      return;
    }

    setFormState({ status: 'loading' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your API
      console.log('Form data:', data);
      
      setFormState({
        status: 'success',
        message: '¡Mensaje enviado correctamente! Te contactaremos en menos de 24 horas.'
      });
      
      reset();
      setCaptchaVerified(false);
    } catch (error) {
      setFormState({
        status: 'error',
        message: 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
      });
    }
  };

  const handleCaptchaVerification = () => {
    // Simple captcha simulation - in production, use reCAPTCHA or similar
    setCaptchaVerified(true);
  };

  if (formState.status === 'success') {
    return (
      <Card className="p-8 text-center">
        <CardContent className="space-y-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">¡Mensaje Enviado!</h3>
            <p className="text-muted-foreground">
              {formState.message}
            </p>
          </div>
          <Button 
            onClick={() => {
              setFormState({ status: 'idle' });
              reset();
            }}
            variant="outline"
          >
            Enviar Otro Mensaje
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                placeholder="Tu nombre completo"
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Phone and Company Row */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+34 600 123 456"
                {...register('phone')}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Empresa (opcional)</Label>
              <Input
                id="company"
                placeholder="Nombre de tu empresa"
                {...register('company')}
              />
            </div>
          </div>

          {/* Inquiry Type */}
          <div className="space-y-2">
            <Label htmlFor="inquiryType">Tipo de Consulta *</Label>
            <Select onValueChange={(value) => setValue('inquiryType', value)}>
              <SelectTrigger className={errors.inquiryType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecciona el tipo de consulta" />
              </SelectTrigger>
              <SelectContent>
                {CONTACT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.inquiryType && (
              <p className="text-sm text-red-500">{errors.inquiryType.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje *</Label>
            <Textarea
              id="message"
              placeholder={
                watchedInquiryType === 'quote' 
                  ? 'Describe tu proyecto: tipo de sitio web, funcionalidades necesarias, presupuesto aproximado, fechas importantes...'
                  : 'Cuéntanos en qué podemos ayudarte...'
              }
              rows={6}
              {...register('message')}
              className={errors.message ? 'border-red-500' : ''}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Simple Captcha */}
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="captcha"
                  checked={captchaVerified}
                  onCheckedChange={handleCaptchaVerification}
                />
                <Label htmlFor="captcha" className="text-sm">
                  No soy un robot
                </Label>
              </div>
            </div>
          </div>

          {/* Terms and Marketing */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="acceptTerms"
                {...register('acceptTerms')}
                className={errors.acceptTerms ? 'border-red-500' : ''}
              />
              <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                Acepto los{' '}
                <a href="/terminos" className="text-primary hover:underline">
                  términos y condiciones
                </a>{' '}
                y la{' '}
                <a href="/privacidad" className="text-primary hover:underline">
                  política de privacidad
                </a>
                *
              </Label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
            )}

            <div className="flex items-start gap-3">
              <Checkbox
                id="acceptMarketing"
                {...register('acceptMarketing')}
              />
              <Label htmlFor="acceptMarketing" className="text-sm leading-relaxed">
                Acepto recibir comunicaciones comerciales y newsletters sobre servicios y novedades
              </Label>
            </div>
          </div>

          {/* Error Message */}
          {formState.status === 'error' && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200">
              <AlertCircleIcon className="h-5 w-5 text-red-600" />
              <p className="text-sm text-red-600">{formState.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={formState.status === 'loading'}
          >
            {formState.status === 'loading' ? (
              <>
                <LoaderIcon className="h-5 w-5 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <SendIcon className="h-5 w-5 mr-2" />
                Enviar Mensaje
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Campos obligatorios. Respuesta garantizada en 24 horas.
          </p>
        </form>
      </CardContent>
    </Card>
  );
} 