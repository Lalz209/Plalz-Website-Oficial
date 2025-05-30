export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
  recommended?: boolean;
  addOns?: AddOn[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
  details: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
    company: string;
    avatar: string;
  };
  images: {
    before: string;
    after: string;
  };
  technologies: string[];
  duration: string;
  url?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface QualificationQuestion {
  id: string;
  question: string;
  type: 'checkbox' | 'radio' | 'select';
  options: string[];
  weight: number;
  category: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  services: Service[];
  benefits: string[];
  industries: string[];
  startingPrice: number;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  icon: string;
  color: string;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    videoUrl?: string;
    imageUrl: string;
    features: string[];
  };
  benefits: string[];
  targetAudience: string[];
  qualificationQuestions: QualificationQuestion[];
  process: ProcessStep[];
  packages: ServicePackage[];
  caseStudies: CaseStudy[];
  faqs: FAQ[];
  relatedServices: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface ServiceFilter {
  priceRange: [number, number];
  industries: string[];
  features: string[];
  duration: string[];
}

export interface ServiceComparison {
  services: string[];
  features: string[];
} 