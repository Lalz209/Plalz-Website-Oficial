"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PasswordInput } from '@/components/ui/password-input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SocialButtons, SocialDivider } from '@/components/auth/social-buttons';
import { PublicRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/lib/contexts/auth-context';
import { 
  registerStep1Schema, 
  registerStep2Schema, 
  registerStep3Schema,
  RegisterStep1FormData,
  RegisterStep2FormData,
  RegisterStep3FormData,
  RegisterFormData 
} from '@/lib/validations/auth';
import { AuthProvider } from '@/lib/types/auth';
import { COMPANY_SIZES, INDUSTRIES, SERVICES_OF_INTEREST, LANGUAGES } from '@/lib/data/auth-data';
import { 
  AlertCircleIcon, 
  MailIcon, 
  LockIcon, 
  UserIcon, 
  BuildingIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon
} from '@/components/ui/icons';

const STEPS = [
  { id: 1, title: 'Información Básica', description: 'Datos personales y credenciales' },
  { id: 2, title: 'Información de Empresa', description: 'Detalles profesionales (opcional)' },
  { id: 3, title: 'Preferencias', description: 'Idioma y servicios de interés' },
];

function RegisterPageContent() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegisterFormData>>({});
  const [socialLoading, setSocialLoading] = useState<AuthProvider | null>(null);

  // Step 1 Form
  const step1Form = useForm<RegisterStep1FormData>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      password: '',
      confirmPassword: '',
    },
  });

  // Step 2 Form
  const step2Form = useForm<RegisterStep2FormData>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      companyName: formData.companyName || '',
      position: formData.position || '',
      industry: formData.industry || '',
      companySize: formData.companySize || '',
    },
  });

  // Step 3 Form
  const step3Form = useForm<RegisterStep3FormData>({
    resolver: zodResolver(registerStep3Schema),
    defaultValues: {
      language: formData.language || 'es',
      servicesOfInterest: formData.servicesOfInterest || [],
      acceptTerms: false,
      acceptMarketing: formData.acceptMarketing || false,
    },
  });

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = async () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = await step1Form.trigger();
      if (isValid) {
        const data = step1Form.getValues();
        setFormData((prev: Partial<RegisterFormData>) => ({ ...prev, ...data }));
      }
    } else if (currentStep === 2) {
      isValid = await step2Form.trigger();
      if (isValid) {
        const data = step2Form.getValues();
        setFormData((prev: Partial<RegisterFormData>) => ({ ...prev, ...data }));
      }
    }

    if (isValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (data: RegisterStep3FormData) => {
    try {
      clearError();
      const completeData: RegisterFormData = {
        ...formData,
        ...data,
      } as RegisterFormData;

      await register(completeData);
      router.push('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleSocialRegister = async (provider: AuthProvider) => {
    try {
      setSocialLoading(provider);
      clearError();
      
      // Mock OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Initiating ${provider} OAuth registration`);
      
      if (provider === 'google') {
        router.push('/');
      }
    } catch (error) {
      console.error(`${provider} registration error:`, error);
    } finally {
      setSocialLoading(null);
    }
  };

  const watchedPassword = step1Form.watch('password');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Crear cuenta</h1>
          <p className="text-muted-foreground">
            Únete a nuestra plataforma y comienza tu proyecto
          </p>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-4">
            <div className="text-center">
              <CardTitle className="text-2xl">Registro</CardTitle>
              <CardDescription>
                Paso {currentStep} de {STEPS.length}: {STEPS[currentStep - 1].title}
              </CardDescription>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                {STEPS.map((step) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      step.id < currentStep 
                        ? 'bg-green-500 text-white' 
                        : step.id === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.id < currentStep ? <CheckIcon size={12} /> : step.id}
                    </div>
                    <span className="mt-1 text-center">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <Form {...step1Form}>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={step1Form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Tu nombre"
                                className="pl-10"
                                autoComplete="given-name"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step1Form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Tu apellido"
                                className="pl-10"
                                autoComplete="family-name"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={step1Form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="tu@email.com"
                              className="pl-10"
                              autoComplete="email"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={step1Form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                            <PasswordInput
                              placeholder="Crea una contraseña segura"
                              className="pl-10"
                              autoComplete="new-password"
                              showStrength
                              strengthValue={watchedPassword}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={step1Form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                            <PasswordInput
                              placeholder="Confirma tu contraseña"
                              className="pl-10"
                              autoComplete="new-password"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}

            {/* Step 2: Company Information */}
            {currentStep === 2 && (
              <Form {...step2Form}>
                <form className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      Esta información es opcional pero nos ayuda a personalizar tu experiencia
                    </p>
                  </div>

                  <FormField
                    control={step2Form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de la Empresa</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <BuildingIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Nombre de tu empresa"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={step2Form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cargo / Posición</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tu cargo en la empresa"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={step2Form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industria</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona industria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {INDUSTRIES.map((industry) => (
                                <SelectItem key={industry.value} value={industry.value}>
                                  {industry.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="companySize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tamaño de Empresa</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona tamaño" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {COMPANY_SIZES.map((size) => (
                                <SelectItem key={size.value} value={size.value}>
                                  {size.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <Form {...step3Form}>
                <form onSubmit={step3Form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={step3Form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idioma Preferido</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona idioma" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LANGUAGES.map((language) => (
                              <SelectItem key={language.value} value={language.value}>
                                <span className="flex items-center gap-2">
                                  <span>{language.flag}</span>
                                  {language.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={step3Form.control}
                    name="servicesOfInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servicios de Interés</FormLabel>
                        <FormDescription>
                          Selecciona los servicios que te interesan para personalizar tu experiencia
                        </FormDescription>
                        <FormControl>
                          <div className="space-y-4">
                            {SERVICES_OF_INTEREST.map((category) => (
                              <div key={category.category} className="space-y-2">
                                <h4 className="text-sm font-medium">{category.category}</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {category.services.map((service) => (
                                    <div key={service.value} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={service.value}
                                        checked={field.value?.includes(service.value)}
                                        onCheckedChange={(checked) => {
                                          const currentValues = field.value || [];
                                          if (checked) {
                                            field.onChange([...currentValues, service.value]);
                                          } else {
                                            field.onChange(currentValues.filter(v => v !== service.value));
                                          }
                                        }}
                                      />
                                      <label
                                        htmlFor={service.value}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        {service.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={step3Form.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              Acepto los{' '}
                              <Link href="/terminos" className="text-primary hover:underline">
                                términos y condiciones
                              </Link>{' '}
                              y la{' '}
                              <Link href="/privacidad" className="text-primary hover:underline">
                                política de privacidad
                              </Link>
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step3Form.control}
                      name="acceptMarketing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              Quiero recibir emails sobre nuevos servicios y ofertas especiales
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Creando cuenta...
                      </>
                    ) : (
                      'Crear Cuenta'
                    )}
                  </Button>
                </form>
              </Form>
            )}

            {/* Social Registration (only on step 1) */}
            {currentStep === 1 && (
              <>
                <SocialDivider text="O regístrate con" />
                
                <SocialButtons
                  onProviderClick={handleSocialRegister}
                  isLoading={!!socialLoading}
                  loadingProvider={socialLoading}
                  disabled={isLoading}
                />
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <div>
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={isLoading}
                  >
                    <ArrowLeftIcon size={16} className="mr-2" />
                    Anterior
                  </Button>
                )}
              </div>
              
              <div>
                {currentStep < STEPS.length && (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                  >
                    Siguiente
                    <ArrowRightIcon size={16} className="ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center text-sm pt-4 border-t">
              <span className="text-muted-foreground">¿Ya tienes una cuenta? </span>
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Inicia sesión aquí
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <PublicRoute>
      <RegisterPageContent />
    </PublicRoute>
  );
} 