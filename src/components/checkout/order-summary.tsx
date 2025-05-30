"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PriceSummary } from '@/components/cart/price-display';
import { CartItem } from '@/lib/types/cart';
import { calculateOrderSummary } from '@/lib/stores/cart-store';
import { ShoppingBagIcon, ClockIcon } from '@/components/ui/icons';

interface OrderSummaryProps {
  items: CartItem[];
  discount?: any;
  className?: string;
}

export function OrderSummary({ items, discount, className }: OrderSummaryProps) {
  const orderSummary = calculateOrderSummary(items, discount);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBagIcon size={20} />
          Resumen del Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items List */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center text-xl">
                {item.category === 'mantenimiento' && '🛠️'}
                {item.category === 'paginas-web' && '🌐'}
                {item.category === 'seo' && '📈'}
                {item.category === 'hosting' && '☁️'}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <p className="text-xs text-muted-foreground">
                  Cantidad: {item.quantity}
                </p>
                {item.estimatedDelivery && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <ClockIcon size={10} />
                    <span>{item.estimatedDelivery}</span>
                  </div>
                )}
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-sm">
                  €{(item.price * item.quantity).toFixed(2)}
                </div>
                {item.quantity > 1 && (
                  <div className="text-xs text-muted-foreground">
                    €{item.price} × {item.quantity}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Price Summary */}
        <PriceSummary
          subtotal={orderSummary.subtotal}
          discount={orderSummary.discount}
          tax={orderSummary.tax}
          shipping={orderSummary.shipping}
          total={orderSummary.total}
          currency={orderSummary.currency}
        />

        {/* Discount Badge */}
        {discount && (
          <div className="flex items-center justify-center">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Descuento aplicado: {discount.code}
            </Badge>
          </div>
        )}

        {/* Free Shipping Badge */}
        {orderSummary.shipping === 0 && orderSummary.subtotal >= 500 && (
          <div className="flex items-center justify-center">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              🚚 Envío gratuito incluido
            </Badge>
          </div>
        )}

        {/* Estimated Delivery */}
        <div className="text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-1">
            <ClockIcon size={14} />
            <span>Entrega estimada: 2-5 días laborables</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 