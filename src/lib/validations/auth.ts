import { z } from 'zod';

// Password validation schema
const passwordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
  .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
  .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'La contraseña debe contener al menos un carácter especial');

// Email validation schema
const emailSchema = z
  .string()
  .email('Ingresa un email válido')
  .min(1, 'El email es requerido');

// Login form validation
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'La contraseña es requerida'),
  rememberMe: z.boolean(),
});

// Register form validation - Step 1 (base schema without refine)
const registerStep1BaseSchema = z.object({
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
});

// Register form validation - Step 1 (with password confirmation)
export const registerStep1Schema = registerStep1BaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  }
);

// Register form validation - Step 2
export const registerStep2Schema = z.object({
  companyName: z
    .string()
    .max(100, 'El nombre de la empresa no puede exceder 100 caracteres')
    .optional(),
  position: z
    .string()
    .max(100, 'El cargo no puede exceder 100 caracteres')
    .optional(),
  industry: z
    .string()
    .optional(),
  companySize: z
    .string()
    .optional(),
});

// Register form validation - Step 3
export const registerStep3Schema = z.object({
  language: z.enum(['es', 'en'], {
    required_error: 'Selecciona un idioma',
  }),
  servicesOfInterest: z
    .array(z.string())
    .min(1, 'Selecciona al menos un servicio de interés'),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
  acceptMarketing: z.boolean(),
});

// Complete register form validation (merge base schemas then apply refinements)
const registerBaseSchema = registerStep1BaseSchema
  .merge(registerStep2Schema)
  .merge(registerStep3Schema.omit({ acceptTerms: true }))
  .extend({
    acceptTerms: z.boolean(),
  });

export const registerSchema = registerBaseSchema
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })
  .refine((data) => data.acceptTerms === true, {
    message: 'Debes aceptar los términos y condiciones',
    path: ['acceptTerms'],
  });

// Forgot password validation
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Reset password validation
export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
  token: z.string().min(1, 'Token de recuperación requerido'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

// Update profile validation
export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),
  email: emailSchema,
  company: z.object({
    name: z.string().max(100).optional(),
    position: z.string().max(100).optional(),
    industry: z.string().optional(),
    size: z.string().optional(),
  }).optional(),
  preferences: z.object({
    language: z.enum(['es', 'en']),
    servicesOfInterest: z.array(z.string()),
    notifications: z.object({
      email: z.boolean(),
      marketing: z.boolean(),
      updates: z.boolean(),
    }),
  }),
});

// Password strength checker
export const checkPasswordStrength = (password: string) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;
  
  let strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  if (score < 3) strength = 'weak';
  else if (score < 4) strength = 'medium';
  else if (score < 5) strength = 'strong';
  else strength = 'very-strong';

  return {
    score,
    strength,
    checks,
    isValid: score >= 4,
  };
};

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterStep1FormData = z.infer<typeof registerStep1Schema>;
export type RegisterStep2FormData = z.infer<typeof registerStep2Schema>;
export type RegisterStep3FormData = z.infer<typeof registerStep3Schema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>; 