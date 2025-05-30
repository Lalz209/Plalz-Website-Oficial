'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/main-layout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MainLayout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-destructive">
              ¡Oops!
            </h1>
            <h2 className="text-xl font-semibold">
              Algo salió mal
            </h2>
          </div>
          
          <p className="text-muted-foreground">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo o regresa a la página principal.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => reset()}>
              Intentar de nuevo
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/es'}>
              Ir al inicio
            </Button>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground">
                Detalles del error (desarrollo)
              </summary>
              <pre className="mt-2 text-xs bg-muted p-4 rounded overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 