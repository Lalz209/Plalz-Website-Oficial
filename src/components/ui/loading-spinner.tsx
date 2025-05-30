import * as React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    };

    const variantClasses = {
      default: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "animate-spin rounded-full border-2 border-current border-t-transparent",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <span className="sr-only">Cargando...</span>
      </div>
    );
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner }; 