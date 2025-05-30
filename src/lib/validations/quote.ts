import { z } from 'zod';

// Step 1: Project Type
export const projectTypeSchema = z.object({
  projectType: z.enum(['website', 'ecommerce', 'webapp', 'mobile', 'landing', 'redesign'], {
    required_error: 'Selecciona un tipo de proyecto',
  }),
  industry: z.enum([
    'technology', 'healthcare', 'finance', 'education', 'retail', 
    'restaurant', 'real-estate', 'consulting', 'nonprofit', 'other'
  ], {
    required_error: 'Selecciona una industria',
  }),
});

// Step 2: Features
export const featuresSchema = z.object({
  selectedFeatures: z.array(z.string()).min(1, 'Selecciona al menos una funcionalidad'),
});

// Step 3: Design Preferences
export const designPreferencesSchema = z.object({
  designPreferences: z.object({
    type: z.enum(['template', 'custom', 'hybrid'], {
      required_error: 'Selecciona un tipo de diseño',
    }),
    style: z.enum(['modern', 'classic', 'minimalist', 'bold', 'creative'], {
      required_error: 'Selecciona un estilo',
    }),
    colorScheme: z.enum(['brand', 'neutral', 'vibrant', 'dark', 'custom'], {
      required_error: 'Selecciona un esquema de colores',
    }),
    inspirationUrls: z.array(z.string().url('URL inválida')).optional().default([]),
    hasExistingBrand: z.boolean(),
  }),
});

// Step 4: Integrations
export const integrationsSchema = z.object({
  selectedIntegrations: z.array(z.string()).default([]),
});

// Step 5: Timeline
export const timelineSchema = z.object({
  timeline: z.object({
    desiredLaunchDate: z.date({
      required_error: 'Selecciona una fecha de lanzamiento',
    }).min(new Date(), 'La fecha debe ser futura'),
    priority: z.enum(['low', 'medium', 'high', 'urgent'], {
      required_error: 'Selecciona una prioridad',
    }),
    phases: z.object({
      design: z.boolean(),
      development: z.boolean(),
      testing: z.boolean(),
      launch: z.boolean(),
    }),
    availabilityForMeetings: z.enum(['flexible', 'business-hours', 'evenings', 'weekends'], {
      required_error: 'Selecciona tu disponibilidad',
    }),
  }),
});

// Step 6: Budget
export const budgetSchema = z.object({
  budget: z.object({
    range: z.tuple([z.number().min(500), z.number().max(50000)], {
      required_error: 'Selecciona un rango de presupuesto',
    }),
    paymentPreference: z.enum(['full', 'phases', 'monthly'], {
      required_error: 'Selecciona una preferencia de pago',
    }),
    hasFlexibility: z.boolean(),
  }),
});

// Step 7: Contact Info
export const contactInfoSchema = z.object({
  contactInfo: z.object({
    firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Teléfono inválido'),
    company: z.string().optional(),
    position: z.string().optional(),
    preferredContactMethod: z.enum(['email', 'phone', 'whatsapp', 'video-call'], {
      required_error: 'Selecciona un método de contacto',
    }),
    bestTimeToContact: z.enum(['morning', 'afternoon', 'evening', 'anytime'], {
      required_error: 'Selecciona el mejor horario',
    }),
    additionalComments: z.string().optional(),
  }),
});

// Complete form schema
export const quoteFormSchema = z.object({
  ...projectTypeSchema.shape,
  ...featuresSchema.shape,
  ...designPreferencesSchema.shape,
  ...integrationsSchema.shape,
  ...timelineSchema.shape,
  ...budgetSchema.shape,
  ...contactInfoSchema.shape,
});

export type ProjectTypeFormData = z.infer<typeof projectTypeSchema>;
export type FeaturesFormData = z.infer<typeof featuresSchema>;
export type DesignPreferencesFormData = z.infer<typeof designPreferencesSchema>;
export type IntegrationsFormData = z.infer<typeof integrationsSchema>;
export type TimelineFormData = z.infer<typeof timelineSchema>;
export type BudgetFormData = z.infer<typeof budgetSchema>;
export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;
export type QuoteFormData = z.infer<typeof quoteFormSchema>; 