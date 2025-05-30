export type ProjectType = 
  | 'website'
  | 'ecommerce'
  | 'webapp'
  | 'mobile'
  | 'landing'
  | 'redesign';

export type Industry = 
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'education'
  | 'retail'
  | 'restaurant'
  | 'real-estate'
  | 'consulting'
  | 'nonprofit'
  | 'other';

export type FeatureCategory = 'basic' | 'advanced' | 'premium';

export interface Feature {
  id: string;
  name: string;
  description: string;
  category: FeatureCategory;
  priceImpact: number;
  required?: boolean;
}

export type DesignType = 'template' | 'custom' | 'hybrid';

export interface DesignPreferences {
  type: DesignType;
  style: 'modern' | 'classic' | 'minimalist' | 'bold' | 'creative';
  colorScheme: 'brand' | 'neutral' | 'vibrant' | 'dark' | 'custom';
  inspirationUrls?: string[];
  hasExistingBrand: boolean;
  brandAssets?: {
    logo?: File;
    brandGuide?: File;
    images?: File[];
  };
}

export interface Integration {
  id: string;
  name: string;
  category: 'crm' | 'email' | 'analytics' | 'payment' | 'social' | 'other';
  complexity: 'simple' | 'medium' | 'complex';
  priceImpact: number;
}

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Timeline {
  desiredLaunchDate: Date;
  priority: Priority;
  phases: {
    design: boolean;
    development: boolean;
    testing: boolean;
    launch: boolean;
  };
  availabilityForMeetings: 'flexible' | 'business-hours' | 'evenings' | 'weekends';
}

export type PaymentPreference = 'full' | 'phases' | 'monthly';

export interface Budget {
  range: [number, number];
  paymentPreference: PaymentPreference;
  hasFlexibility: boolean;
}

export type ContactMethod = 'email' | 'phone' | 'whatsapp' | 'video-call';

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  preferredContactMethod: ContactMethod;
  bestTimeToContact: 'morning' | 'afternoon' | 'evening' | 'anytime';
  additionalComments?: string;
}

export interface QuoteFormData {
  // Step 1
  projectType: ProjectType;
  industry: Industry;
  
  // Step 2
  selectedFeatures: string[];
  
  // Step 3
  designPreferences: DesignPreferences;
  
  // Step 4
  selectedIntegrations: string[];
  
  // Step 5
  timeline: Timeline;
  
  // Step 6
  budget: Budget;
  
  // Step 7
  contactInfo: ContactInfo;
}

export type QuoteStatus = 'draft' | 'submitted' | 'in-review' | 'quoted' | 'approved' | 'rejected';

export interface Quote {
  id: string;
  formData: QuoteFormData;
  status: QuoteStatus;
  estimatedPrice: number;
  finalPrice?: number;
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  quotedAt?: Date;
  notes?: string;
  adminNotes?: string;
  versions: QuoteVersion[];
}

export interface QuoteVersion {
  id: string;
  version: number;
  price: number;
  description: string;
  features: string[];
  timeline: string;
  createdAt: Date;
  isActive: boolean;
}

export interface QuoteMessage {
  id: string;
  quoteId: string;
  sender: 'client' | 'admin';
  message: string;
  timestamp: Date;
  attachments?: string[];
} 