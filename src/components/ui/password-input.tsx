"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons";
import { checkPasswordStrength } from "@/lib/validations/auth";
import { PASSWORD_STRENGTH_CONFIG } from "@/lib/data/auth-data";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  showStrength?: boolean;
  strengthValue?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrength = false, strengthValue = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [strength, setStrength] = React.useState<ReturnType<typeof checkPasswordStrength> | null>(null);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    React.useEffect(() => {
      if (showStrength && strengthValue) {
        setStrength(checkPasswordStrength(strengthValue));
      }
    }, [showStrength, strengthValue]);

    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            className={cn("pr-10", className)}
            ref={ref}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={togglePasswordVisibility}
            disabled={props.disabled}
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <EyeIcon className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">
              {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            </span>
          </Button>
        </div>

        {/* Password Strength Indicator */}
        {showStrength && strength && strengthValue && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Fortaleza de la contraseña
              </span>
              <span className={cn("text-xs font-medium", PASSWORD_STRENGTH_CONFIG[strength.strength].textColor)}>
                {PASSWORD_STRENGTH_CONFIG[strength.strength].label}
              </span>
            </div>
            
            {/* Strength Bar */}
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "h-2 flex-1 rounded-full",
                    level <= strength.score
                      ? PASSWORD_STRENGTH_CONFIG[strength.strength].color
                      : "bg-muted"
                  )}
                />
              ))}
            </div>

            {/* Requirements Checklist */}
            <div className="space-y-1">
              <div className="grid grid-cols-1 gap-1 text-xs">
                <div className={cn(
                  "flex items-center gap-2",
                  strength.checks.length ? "text-green-600" : "text-muted-foreground"
                )}>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    strength.checks.length ? "bg-green-500" : "bg-muted-foreground"
                  )} />
                  Al menos 8 caracteres
                </div>
                <div className={cn(
                  "flex items-center gap-2",
                  strength.checks.uppercase ? "text-green-600" : "text-muted-foreground"
                )}>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    strength.checks.uppercase ? "bg-green-500" : "bg-muted-foreground"
                  )} />
                  Una mayúscula
                </div>
                <div className={cn(
                  "flex items-center gap-2",
                  strength.checks.lowercase ? "text-green-600" : "text-muted-foreground"
                )}>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    strength.checks.lowercase ? "bg-green-500" : "bg-muted-foreground"
                  )} />
                  Una minúscula
                </div>
                <div className={cn(
                  "flex items-center gap-2",
                  strength.checks.number ? "text-green-600" : "text-muted-foreground"
                )}>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    strength.checks.number ? "bg-green-500" : "bg-muted-foreground"
                  )} />
                  Un número
                </div>
                <div className={cn(
                  "flex items-center gap-2",
                  strength.checks.special ? "text-green-600" : "text-muted-foreground"
                )}>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    strength.checks.special ? "bg-green-500" : "bg-muted-foreground"
                  )} />
                  Un carácter especial
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput }; 