export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
  category: string;
  slug: string;
  maxQuantity?: number;
  estimatedDelivery?: string;
  features?: string[];
}

export interface CartDiscount {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  minAmount?: number;
  maxDiscount?: number;
}

export interface SavedItem {
  id: string;
  item: CartItem;
  savedAt: Date;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface BillingInfo extends ShippingInfo {
  taxId?: string;
  sameAsShipping: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank_transfer';
  name: string;
  icon: string;
  description: string;
  enabled: boolean;
}

export interface CardInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
}

export interface CheckoutData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
  };
  billingInfo: BillingInfo;
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  cardInfo?: CardInfo;
  acceptTerms: boolean;
  newsletter: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  summary: OrderSummary;
  customerInfo: CheckoutData;
  createdAt: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
}

export interface CartState {
  items: CartItem[];
  savedItems: SavedItem[];
  discount: CartDiscount | null;
  isLoading: boolean;
  lastActivity: Date;
}

export interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  removeSavedItem: (id: string) => void;
  applyDiscount: (code: string) => Promise<boolean>;
  removeDiscount: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  isItemInCart: (id: string) => boolean;
  getRecommendedItems: () => CartItem[];
}

export type CartStore = CartState & CartActions; 