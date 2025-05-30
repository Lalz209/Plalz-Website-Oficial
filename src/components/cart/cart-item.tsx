"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { QuantitySelector } from './quantity-selector';
import { PriceDisplay } from './price-display';
import { TrashIcon, HeartIcon, ClockIcon } from '@/components/ui/icons';
import { CartItem as CartItemType } from '@/lib/types/cart';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater: (id: string) => void;
  className?: string;
}

export function CartItem({
  item,
  onQuantityChange,
  onRemove,
  onSaveForLater,
  className,
}: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    // Add a small delay for better UX
    setTimeout(() => {
      onRemove(item.id);
    }, 300);
  };

  const totalPrice = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 1, scale: 1 }}
      animate={{ 
        opacity: isRemoving ? 0 : 1, 
        scale: isRemoving ? 0.95 : 1 
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    {item.category === 'mantenimiento' && '🛠️'}
                    {item.category === 'paginas-web' && '🌐'}
                    {item.category === 'seo' && '📈'}
                    {item.category === 'hosting' && '☁️'}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-sm md:text-base truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
                
                <div className="text-right ml-4">
                  <PriceDisplay
                    price={totalPrice}
                    originalPrice={item.originalPrice ? item.originalPrice * item.quantity : undefined}
                    size="md"
                  />
                  {item.quantity > 1 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      €{item.price} × {item.quantity}
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              {item.features && item.features.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {item.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.features.length - 3} más
                    </Badge>
                  )}
                </div>
              )}

              {/* Estimated Delivery */}
              {item.estimatedDelivery && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <ClockIcon size={12} />
                  <span>Entrega estimada: {item.estimatedDelivery}</span>
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <QuantitySelector
                    quantity={item.quantity}
                    onQuantityChange={(quantity) => onQuantityChange(item.id, quantity)}
                    max={item.maxQuantity}
                    size="sm"
                  />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSaveForLater(item.id)}
                    className="text-xs"
                  >
                    <HeartIcon size={14} className="mr-1" />
                    Guardar
                  </Button>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <TrashIcon size={14} className="mr-1" />
                      Eliminar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                      <AlertDialogDescription>
                        ¿Estás seguro de que quieres eliminar "{item.name}" del carrito?
                        Esta acción no se puede deshacer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleRemove}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface SavedItemProps {
  savedItem: { id: string; item: CartItemType; savedAt: Date };
  onMoveToCart: (savedId: string) => void;
  onRemove: (savedId: string) => void;
  className?: string;
}

export function SavedItem({
  savedItem,
  onMoveToCart,
  onRemove,
  className,
}: SavedItemProps) {
  const { item } = savedItem;

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl">
                  {item.category === 'mantenimiento' && '🛠️'}
                  {item.category === 'paginas-web' && '🌐'}
                  {item.category === 'seo' && '📈'}
                  {item.category === 'hosting' && '☁️'}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-sm truncate">
                  {item.name}
                </h3>
                <PriceDisplay price={item.price} size="sm" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMoveToCart(savedItem.id)}
                className="text-xs"
              >
                Mover al carrito
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(savedItem.id)}
                className="text-xs text-destructive hover:text-destructive"
              >
                <TrashIcon size={12} className="mr-1" />
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 