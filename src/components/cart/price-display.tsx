"use client";

import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCurrency?: boolean;
  className?: string;
}

export function PriceDisplay({
  price,
  originalPrice,
  currency = 'EUR',
  size = 'md',
  showCurrency = true,
  className,
}: PriceDisplayProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: showCurrency ? 'currency' : 'decimal',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className={cn('font-semibold', sizeClasses[size])}>
        {formatPrice(price)}
      </span>
      
      {hasDiscount && (
        <span className={cn(
          'text-muted-foreground line-through',
          size === 'sm' ? 'text-xs' : 
          size === 'md' ? 'text-sm' :
          size === 'lg' ? 'text-base' : 'text-lg'
        )}>
          {formatPrice(originalPrice)}
        </span>
      )}
      
      {hasDiscount && (
        <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded-full">
          -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
        </span>
      )}
    </div>
  );
}

interface PriceSummaryProps {
  subtotal: number;
  discount?: number;
  tax?: number;
  shipping?: number;
  total: number;
  currency?: string;
  className?: string;
}

export function PriceSummary({
  subtotal,
  discount = 0,
  tax = 0,
  shipping = 0,
  total,
  currency = 'EUR',
  className,
}: PriceSummaryProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      
      {discount > 0 && (
        <div className="flex justify-between text-sm text-green-600">
          <span>Descuento</span>
          <span>-{formatPrice(discount)}</span>
        </div>
      )}
      
      {tax > 0 && (
        <div className="flex justify-between text-sm">
          <span>IVA (21%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
      )}
      
      <div className="flex justify-between text-sm">
        <span>Envío</span>
        <span>
          {shipping === 0 ? (
            <span className="text-green-600 font-medium">Gratis</span>
          ) : (
            formatPrice(shipping)
          )}
        </span>
      </div>
      
      <div className="border-t pt-3">
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
} 