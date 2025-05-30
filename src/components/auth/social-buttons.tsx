"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { OAUTH_PROVIDERS } from "@/lib/data/auth-data";
import { AuthProvider } from "@/lib/types/auth";
import { cn } from "@/lib/utils";

interface SocialButtonsProps {
  onProviderClick: (provider: AuthProvider) => void;
  isLoading?: boolean;
  loadingProvider?: AuthProvider | null;
  disabled?: boolean;
  className?: string;
}

export function SocialButtons({
  onProviderClick,
  isLoading = false,
  loadingProvider = null,
  disabled = false,
  className,
}: SocialButtonsProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {OAUTH_PROVIDERS.map((provider) => {
        const isProviderLoading = isLoading && loadingProvider === provider.id;
        const isDisabled = disabled || isLoading;

        return (
          <Button
            key={provider.id}
            type="button"
            variant="outline"
            className={cn(
              "w-full h-11 text-sm font-medium transition-colors",
              "border-2 hover:border-primary/20",
              isDisabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !isDisabled && onProviderClick(provider.id as AuthProvider)}
            disabled={isDisabled}
          >
            {isProviderLoading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <span className="mr-2 text-lg">{provider.icon}</span>
            )}
            {isProviderLoading ? 'Conectando...' : `Continuar con ${provider.name}`}
          </Button>
        );
      })}
    </div>
  );
}

interface SocialDividerProps {
  text?: string;
  className?: string;
}

export function SocialDivider({ text = "O continúa con", className }: SocialDividerProps) {
  return (
    <div className={cn("relative my-6", className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          {text}
        </span>
      </div>
    </div>
  );
} 