"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { PublicRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/lib/contexts/auth-context';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/lib/validations/auth';
import { 
  AlertCircleIcon, 
  MailIcon, 
  ArrowLeftIcon,
  CheckCircleIcon,
  InfoIcon
} from '@/components/ui/icons';

function ForgotPasswordPageContent() {
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      clearError();
      await forgotPassword(data.email);
      setSentEmail(data.email);
      setEmailSent(true);
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  const handleResendEmail = async () => {
    if (sentEmail) {
      try {
        clearError();
        await forgotPassword(sentEmail);
      } catch (error) {
        console.error('Resend email error:', error);
      }
    }
  };

  const handleBackToForm = () => {
    setEmailSent(false);
    setSentEmail('');
    clearError();
    form.reset();
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Email enviado</h1>
            <p className="text-muted-foreground">
              Revisa tu bandeja de entrada para continuar
            </p>
          </div>

          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Revisa tu email</CardTitle>
              <CardDescription>
                Hemos enviado un enlace de recuperación a
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                  <MailIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{sentEmail}</span>
                </div>
              </div>

              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p>Si no recibes el email en unos minutos:</p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                      <li>Revisa tu carpeta de spam o correo no deseado</li>
                      <li>Verifica que el email sea correcto</li>
                      <li>Intenta reenviar el email</li>
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>

              {error && (
                <Alert variant="destructive">
                  <AlertCircleIcon className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Reenviando...
                    </>
                  ) : (
                    'Reenviar email'
                  )}
                </Button>

                <Button
                  onClick={handleBackToForm}
                  variant="ghost"
                  className="w-full"
                >
                  Usar otro email
                </Button>
              </div>

              <div className="text-center text-sm">
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Volver al inicio de sesión
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">¿Olvidaste tu contraseña?</h1>
          <p className="text-muted-foreground">
            No te preocupes, te ayudamos a recuperarla
          </p>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Recuperar Contraseña</CardTitle>
            <CardDescription className="text-center">
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Instructions */}
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Ingresa el email asociado a tu cuenta y te enviaremos las instrucciones 
                para crear una nueva contraseña.
              </AlertDescription>
            </Alert>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
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
                            autoFocus
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Enviando enlace...
                    </>
                  ) : (
                    'Enviar enlace de recuperación'
                  )}
                </Button>
              </form>
            </Form>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-primary hover:underline font-medium"
              >
                <ArrowLeftIcon size={16} className="mr-2" />
                Volver al inicio de sesión
              </Link>
            </div>

            {/* Register Link */}
            <div className="text-center text-sm pt-4 border-t">
              <span className="text-muted-foreground">¿No tienes una cuenta? </span>
              <Link
                href="/registro"
                className="text-primary hover:underline font-medium"
              >
                Regístrate aquí
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Para pruebas
              </h3>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p>Usa cualquier email válido para ver el flujo</p>
                <p>El email <strong>nonexistent@example.com</strong> simulará un error</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <PublicRoute>
      <ForgotPasswordPageContent />
    </PublicRoute>
  );
} 