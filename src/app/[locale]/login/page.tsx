"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PasswordInput } from '@/components/ui/password-input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SocialButtons, SocialDivider } from '@/components/auth/social-buttons';
import { PublicRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/lib/contexts/auth-context';
import { loginSchema, LoginFormData } from '@/lib/validations/auth';
import { AuthProvider } from '@/lib/types/auth';
import { AlertCircleIcon, MailIcon, LockIcon } from '@/components/ui/icons';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, error, clearError } = useAuth();
  const [socialLoading, setSocialLoading] = useState<AuthProvider | null>(null);

  const redirectTo = searchParams.get('redirect') || '/';

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data);
      router.push(redirectTo);
    } catch (error) {
      // Error is handled by the auth context
      console.error('Login error:', error);
    }
  };

  const handleSocialLogin = async (provider: AuthProvider) => {
    try {
      setSocialLoading(provider);
      clearError();
      
      // Mock OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would redirect to OAuth provider
      console.log(`Initiating ${provider} OAuth flow`);
      
      // Mock successful OAuth
      if (provider === 'google') {
        // Simulate successful OAuth login
        router.push(redirectTo);
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Bienvenido de vuelta</h1>
          <p className="text-muted-foreground">
            Inicia sesión en tu cuenta para continuar
          </p>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder a tu cuenta
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

            {/* Login Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
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
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                          <PasswordInput
                            placeholder="Tu contraseña"
                            className="pl-10"
                            autoComplete="current-password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            Recordarme
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Link
                    href="/recuperar-password"
                    className="text-sm text-primary hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </form>
            </Form>

            {/* Social Login */}
            <SocialDivider />
            
            <SocialButtons
              onProviderClick={handleSocialLogin}
              isLoading={!!socialLoading}
              loadingProvider={socialLoading}
              disabled={isLoading}
            />

            {/* Register Link */}
            <div className="text-center text-sm">
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

        {/* Demo Credentials */}
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Credenciales de prueba
              </h3>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p><strong>Email:</strong> test@example.com</p>
                <p><strong>Contraseña:</strong> Test123!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <PublicRoute>
      <LoginPageContent />
    </PublicRoute>
  );
} 