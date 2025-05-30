"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCartIcon } from '@/components/ui/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function CartButton() {
  const t = useTranslations('Cart');
  const [cartItems] = useState<CartItem[]>([
    // Mock data - replace with actual cart state
    { id: '1', name: 'Página Web Básica', price: 299, quantity: 1 },
    { id: '2', name: 'Mantenimiento Mensual', price: 49, quantity: 2 },
  ]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCartIcon size={20} />
          {totalItems > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {totalItems > 99 ? '99+' : totalItems}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="font-semibold">
          {t('title')} ({totalItems} {totalItems === 1 ? t('item') : t('items')})
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {cartItems.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            {t('empty')}
          </div>
        ) : (
          <>
            <div className="max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <DropdownMenuItem key={item.id} className="flex-col items-start p-3">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ${item.price} x {item.quantity}
                    </span>
                  </div>
                  <div className="text-sm font-semibold">
                    ${item.price * item.quantity}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <div className="p-3">
              <div className="flex justify-between font-semibold mb-2">
                <span>{t('total')}:</span>
                <span>${totalPrice}</span>
              </div>
              <Button className="w-full" size="sm">
                {t('viewCart')}
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 