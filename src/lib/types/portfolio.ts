export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  category: ProjectCategory;
  industry: Industry;
  year: number;
  technologies: Technology[];
  status: 'completed' | 'in-progress' | 'concept';
  featured: boolean;
  
  // Images
  thumbnail: string;
  heroImage: string;
  gallery: ProjectImage[];
  
  // Client information
  client: {
    name: string;
    logo?: string;
    website?: string;
    industry: string;
    size: 'startup' | 'small' | 'medium' | 'enterprise';
  };
  
  // Project details
  challenge: string;
  solution: string;
  results: ProjectResult[];
  metrics: ProjectMetric[];
  
  // Before/After
  beforeAfter?: {
    before: string;
    after: string;
    description: string;
  }[];
  
  // Testimonial
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    avatar?: string;
    rating: number;
  };
  
  // Project metadata
  duration: string;
  teamSize: number;
  budget?: string;
  launchDate: Date;
  
  // SEO
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
  
  // Awards and recognition
  awards?: Award[];
  
  // Related projects
  relatedProjects?: string[];
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  type: 'screenshot' | 'mockup' | 'photo' | 'diagram';
}

export interface ProjectResult {
  id: string;
  title: string;
  description: string;
  icon?: string;
  metric?: string;
}

export interface ProjectMetric {
  id: string;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  category?: string;
  image?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  industry: Industry;
  projectId: string;
  
  // Study content
  overview: string;
  challenge: string;
  approach: string;
  implementation: string;
  results: string;
  
  // Metrics and outcomes
  keyMetrics: CaseStudyMetric[];
  outcomes: string[];
  
  // Media
  thumbnail: string;
  images: ProjectImage[];
  
  // Timeline
  timeline: TimelineItem[];
  
  // SEO
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
  
  publishedAt: Date;
  readTime: number;
}

export interface CaseStudyMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  icon?: string;
  highlighted?: boolean;
}

export interface TimelineItem {
  id: string;
  phase: string;
  description: string;
  duration: string;
  deliverables: string[];
}

export interface PortfolioStats {
  totalProjects: number;
  totalClients: number;
  totalAwards: number;
  yearsExperience: number;
  industriesServed: number;
  technologiesUsed: number;
}

export interface PortfolioFilters {
  category?: ProjectCategory | 'all';
  industry?: Industry | 'all';
  year?: number | 'all';
  technology?: string | 'all';
  status?: 'completed' | 'in-progress' | 'concept' | 'all';
  featured?: boolean;
}

export type ProjectCategory = 
  | 'website'
  | 'ecommerce'
  | 'webapp'
  | 'mobile'
  | 'design'
  | 'branding'
  | 'seo'
  | 'marketing';

export type Industry = 
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'education'
  | 'retail'
  | 'manufacturing'
  | 'real-estate'
  | 'hospitality'
  | 'nonprofit'
  | 'government'
  | 'entertainment'
  | 'automotive'
  | 'food-beverage'
  | 'fashion'
  | 'sports'
  | 'other';

export interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'design' | 'marketing' | 'other';
  icon?: string;
  color?: string;
}

export interface PortfolioSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: PortfolioFilters;
  sortBy?: 'date' | 'title' | 'category' | 'featured';
  sortOrder?: 'asc' | 'desc';
}

export interface PortfolioResponse {
  projects: PortfolioProject[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
} 