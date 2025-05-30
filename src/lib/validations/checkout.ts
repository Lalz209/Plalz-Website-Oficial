import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Introduce un email válido'),
  phone: z.string().min(9, 'El teléfono debe tener al menos 9 dígitos'),
  company: z.string().optional(),
});

export const addressSchema = z.object({
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  city: z.string().min(2, 'La ciudad debe tener al menos 2 caracteres'),
  state: z.string().min(2, 'La provincia debe tener al menos 2 caracteres'),
  zipCode: z.string().min(5, 'El código postal debe tener al menos 5 caracteres'),
  country: z.string().min(2, 'Selecciona un país'),
});

export const billingInfoSchema = personalInfoSchema.merge(addressSchema).extend({
  taxId: z.string().optional(),
  sameAsShipping: z.boolean(),
});

export const shippingInfoSchema = personalInfoSchema.merge(addressSchema);

export const cardInfoSchema = z.object({
  cardNumber: z.string()
    .min(16, 'El número de tarjeta debe tener 16 dígitos')
    .max(19, 'El número de tarjeta no puede tener más de 19 caracteres')
    .regex(/^[\d\s]+$/, 'Solo se permiten números y espacios'),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato: MM/YY'),
  cvv: z.string()
    .min(3, 'El CVV debe tener al menos 3 dígitos')
    .max(4, 'El CVV no puede tener más de 4 dígitos')
    .regex(/^\d+$/, 'Solo se permiten números'),
  cardholderName: z.string().min(2, 'El nombre del titular debe tener al menos 2 caracteres'),
});

export const checkoutSchema = z.object({
  personalInfo: personalInfoSchema,
  billingInfo: billingInfoSchema,
  shippingInfo: shippingInfoSchema,
  paymentMethod: z.object({
    id: z.string(),
    type: z.enum(['card', 'paypal', 'bank_transfer']),
  }),
  cardInfo: cardInfoSchema.optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
  newsletter: z.boolean(),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type BillingInfoFormData = z.infer<typeof billingInfoSchema>;
export type ShippingInfoFormData = z.infer<typeof shippingInfoSchema>;
export type CardInfoFormData = z.infer<typeof cardInfoSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Helper functions for validation
export const validateCardNumber = (cardNumber: string): boolean => {
  // Remove spaces and check if it's a valid number
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^\d{16}$/.test(cleaned);
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  const [month, year] = expiryDate.split('/');
  if (!month || !year) return false;
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);
  
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;
  
  return true;
};

export const formatCardNumber = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  
  // Add spaces every 4 digits
  const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
  
  // Limit to 19 characters (16 digits + 3 spaces)
  return formatted.substring(0, 19);
};

export const formatExpiryDate = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  
  // Add slash after 2 digits
  if (cleaned.length >= 2) {
    return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
  }
  
  return cleaned;
};

export const getCardType = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (/^4/.test(cleaned)) return 'visa';
  if (/^5[1-5]/.test(cleaned)) return 'mastercard';
  if (/^3[47]/.test(cleaned)) return 'amex';
  if (/^6/.test(cleaned)) return 'discover';
  
  return 'unknown';
}; 