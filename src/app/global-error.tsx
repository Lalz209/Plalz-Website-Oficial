'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-destructive">
              ¡Algo salió mal!
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => reset()}>
                Intentar de nuevo
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/es'}>
                Ir al inicio
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 