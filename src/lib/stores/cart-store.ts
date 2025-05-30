import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartStore, CartItem, CartDiscount, SavedItem } from '@/lib/types/cart';

// Mock discount codes for demo
const DISCOUNT_CODES: Record<string, CartDiscount> = {
  'WELCOME10': {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    description: '10% de descuento en tu primer pedido',
    minAmount: 100,
  },
  'SAVE50': {
    code: 'SAVE50',
    type: 'fixed',
    value: 50,
    description: '€50 de descuento',
    minAmount: 200,
    maxDiscount: 50,
  },
  'PREMIUM20': {
    code: 'PREMIUM20',
    type: 'percentage',
    value: 20,
    description: '20% de descuento en servicios premium',
    minAmount: 500,
    maxDiscount: 200,
  },
};

// Mock recommended items
const RECOMMENDED_ITEMS: CartItem[] = [
  {
    id: 'rec-1',
    name: 'Mantenimiento Básico',
    description: 'Mantenimiento mensual para tu sitio web',
    price: 49,
    quantity: 1,
    category: 'mantenimiento',
    slug: 'mantenimiento-basico',
    image: '/services/maintenance.jpg',
    estimatedDelivery: 'Inmediato',
    features: ['Actualizaciones', 'Backups', 'Soporte'],
  },
  {
    id: 'rec-2',
    name: 'SEO Básico',
    description: 'Optimización SEO para tu sitio web',
    price: 199,
    quantity: 1,
    category: 'seo',
    slug: 'seo-basico',
    image: '/services/seo.jpg',
    estimatedDelivery: '1-2 semanas',
    features: ['Análisis SEO', 'Optimización', 'Reportes'],
  },
  {
    id: 'rec-3',
    name: 'Hosting Premium',
    description: 'Hosting optimizado para alto rendimiento',
    price: 29,
    quantity: 1,
    category: 'hosting',
    slug: 'hosting-premium',
    image: '/services/hosting.jpg',
    estimatedDelivery: 'Inmediato',
    features: ['SSD', 'CDN', 'SSL'],
  },
];

const TAX_RATE = 0.21; // 21% IVA
const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 15;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // State
      items: [],
      savedItems: [],
      discount: null,
      isLoading: false,
      lastActivity: new Date(),

      // Actions
      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            return {
              ...state,
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: Math.min(i.quantity + quantity, i.maxQuantity || 99) }
                  : i
              ),
              lastActivity: new Date(),
            };
          }

          return {
            ...state,
            items: [...state.items, { ...item, quantity }],
            lastActivity: new Date(),
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          ...state,
          items: state.items.filter((item) => item.id !== id),
          lastActivity: new Date(),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          ...state,
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, item.maxQuantity || 99) }
              : item
          ),
          lastActivity: new Date(),
        }));
      },

      clearCart: () => {
        set((state) => ({
          ...state,
          items: [],
          discount: null,
          lastActivity: new Date(),
        }));
      },

      saveForLater: (id) => {
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;

          const savedItem: SavedItem = {
            id: `saved-${id}-${Date.now()}`,
            item,
            savedAt: new Date(),
          };

          return {
            ...state,
            items: state.items.filter((i) => i.id !== id),
            savedItems: [...state.savedItems, savedItem],
            lastActivity: new Date(),
          };
        });
      },

      moveToCart: (savedId) => {
        set((state) => {
          const savedItem = state.savedItems.find((i) => i.id === savedId);
          if (!savedItem) return state;

          return {
            ...state,
            items: [...state.items, savedItem.item],
            savedItems: state.savedItems.filter((i) => i.id !== savedId),
            lastActivity: new Date(),
          };
        });
      },

      removeSavedItem: (savedId) => {
        set((state) => ({
          ...state,
          savedItems: state.savedItems.filter((i) => i.id !== savedId),
          lastActivity: new Date(),
        }));
      },

      applyDiscount: async (code) => {
        const discount = DISCOUNT_CODES[code.toUpperCase()];
        if (!discount) return false;

        const subtotal = get().getSubtotal();
        if (discount.minAmount && subtotal < discount.minAmount) {
          return false;
        }

        set((state) => ({
          ...state,
          discount,
          lastActivity: new Date(),
        }));

        return true;
      },

      removeDiscount: () => {
        set((state) => ({
          ...state,
          discount: null,
          lastActivity: new Date(),
        }));
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotal: () => {
        const { discount } = get();
        const subtotal = get().getSubtotal();
        
        let discountAmount = 0;
        if (discount) {
          if (discount.type === 'percentage') {
            discountAmount = (subtotal * discount.value) / 100;
            if (discount.maxDiscount) {
              discountAmount = Math.min(discountAmount, discount.maxDiscount);
            }
          } else {
            discountAmount = discount.value;
          }
        }

        const discountedSubtotal = subtotal - discountAmount;
        const tax = discountedSubtotal * TAX_RATE;
        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
        
        return discountedSubtotal + tax + shipping;
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      isItemInCart: (id) => {
        const { items } = get();
        return items.some((item) => item.id === id);
      },

      getRecommendedItems: () => {
        const { items } = get();
        const cartItemIds = items.map((item) => item.id);
        return RECOMMENDED_ITEMS.filter((item) => !cartItemIds.includes(item.id));
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        savedItems: state.savedItems,
        discount: state.discount,
        lastActivity: state.lastActivity,
      }),
    }
  )
);

// Helper functions for calculations
export const calculateOrderSummary = (
  items: CartItem[],
  discount: CartDiscount | null
) => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (discount) {
    if (discount.type === 'percentage') {
      discountAmount = (subtotal * discount.value) / 100;
      if (discount.maxDiscount) {
        discountAmount = Math.min(discountAmount, discount.maxDiscount);
      }
    } else {
      discountAmount = discount.value;
    }
  }

  const discountedSubtotal = subtotal - discountAmount;
  const tax = discountedSubtotal * TAX_RATE;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = discountedSubtotal + tax + shipping;

  return {
    subtotal,
    discount: discountAmount,
    tax,
    shipping,
    total,
    currency: 'EUR',
  };
};

// Abandoned cart detection
export const useAbandonedCartDetection = () => {
  const { items, lastActivity } = useCartStore();
  
  const isAbandoned = () => {
    if (items.length === 0) return false;
    const timeDiff = Date.now() - new Date(lastActivity).getTime();
    const thirtyMinutes = 30 * 60 * 1000;
    return timeDiff > thirtyMinutes;
  };

  return { isAbandoned: isAbandoned() };
}; 