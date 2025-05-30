"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CartItem, SavedItem } from '@/components/cart/cart-item';
import { PriceSummary } from '@/components/cart/price-display';
import { Link } from '@/lib/navigation';
import { useCartStore, calculateOrderSummary } from '@/lib/stores/cart-store';
import { useToast } from '@/hooks/use-toast';
import { 
  ShoppingCartIcon, 
  TagIcon, 
  TruckIcon, 
  ArrowLeftIcon,
  HeartIcon,
  SparklesIcon
} from '@/components/ui/icons';

export default function CartPage() {
  const {
    items,
    savedItems,
    discount,
    updateQuantity,
    removeItem,
    saveForLater,
    moveToCart,
    removeSavedItem,
    applyDiscount,
    removeDiscount,
    clearCart,
    getRecommendedItems,
  } = useCartStore();

  const [discountCode, setDiscountCode] = useState('');
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const { toast } = useToast();

  const orderSummary = calculateOrderSummary(items, discount);
  const recommendedItems = getRecommendedItems();

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;

    setIsApplyingDiscount(true);
    const success = await applyDiscount(discountCode.trim());
    
    if (success) {
      toast({
        title: "¡Descuento aplicado!",
        description: "El código de descuento se ha aplicado correctamente.",
        variant: "success",
      });
      setDiscountCode('');
    } else {
      toast({
        title: "Código inválido",
        description: "El código de descuento no es válido o no cumple los requisitos mínimos.",
        variant: "destructive",
      });
    }
    
    setIsApplyingDiscount(false);
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Carrito vaciado",
      description: "Todos los productos han sido eliminados del carrito.",
    });
  };

  const addRecommendedItem = (item: any) => {
    const cartItem = {
      ...item,
      quantity: 1,
    };
    useCartStore.getState().addItem(cartItem);
    toast({
      title: "Producto añadido",
      description: `${item.name} se ha añadido al carrito.`,
      variant: "success",
    });
  };

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCartIcon size={48} className="text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mb-8">
              Explora nuestros servicios y encuentra el perfecto para tu proyecto
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/servicios">
                  Explorar Servicios
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">
                  Volver al Inicio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/servicios">
              <ArrowLeftIcon size={16} className="mr-2" />
              Continuar comprando
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Carrito de Compras</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
            </p>
          </div>
          {items.length > 0 && (
            <Button variant="outline" onClick={handleClearCart}>
              Vaciar carrito
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Cart Items */}
            {items.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCartIcon size={20} />
                    Productos en tu carrito
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onQuantityChange={updateQuantity}
                        onRemove={removeItem}
                        onSaveForLater={saveForLater}
                      />
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Card>
            )}

            {/* Saved Items */}
            {savedItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartIcon size={20} />
                    Guardados para después ({savedItems.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedItems.map((savedItem) => (
                    <SavedItem
                      key={savedItem.id}
                      savedItem={savedItem}
                      onMoveToCart={moveToCart}
                      onRemove={removeSavedItem}
                    />
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recommended Items */}
            {recommendedItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SparklesIcon size={20} />
                    Productos recomendados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {recommendedItems.slice(0, 4).map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xl">
                            {item.category === 'mantenimiento' && '🛠️'}
                            {item.category === 'seo' && '📈'}
                            {item.category === 'hosting' && '☁️'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">
                              {item.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              €{item.price}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => addRecommendedItem(item)}
                        >
                          Añadir al carrito
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="space-y-6">
              {/* Discount Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TagIcon size={20} />
                    Código de descuento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {discount ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div>
                          <div className="font-semibold text-green-700 dark:text-green-300">
                            {discount.code}
                          </div>
                          <div className="text-sm text-green-600 dark:text-green-400">
                            {discount.description}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeDiscount}
                          className="text-green-700 hover:text-green-800"
                        >
                          Quitar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Código de descuento"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyDiscount()}
                        />
                        <Button
                          onClick={handleApplyDiscount}
                          disabled={!discountCode.trim() || isApplyingDiscount}
                        >
                          {isApplyingDiscount ? 'Aplicando...' : 'Aplicar'}
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Códigos disponibles: WELCOME10, SAVE50, PREMIUM20
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Shipping Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TruckIcon size={20} />
                    Información de envío
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {orderSummary.subtotal >= 500 ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Envío gratis
                        </Badge>
                        <span className="text-sm">¡Has conseguido envío gratuito!</span>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Añade €{(500 - orderSummary.subtotal).toFixed(2)} más para envío gratuito
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      • Entrega estimada: 2-5 días laborables
                      • Seguimiento incluido
                      • Soporte 24/7
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <PriceSummary
                    subtotal={orderSummary.subtotal}
                    discount={orderSummary.discount}
                    tax={orderSummary.tax}
                    shipping={orderSummary.shipping}
                    total={orderSummary.total}
                    currency={orderSummary.currency}
                  />
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/checkout">
                        Proceder al pago
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/servicios">
                        Continuar comprando
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 