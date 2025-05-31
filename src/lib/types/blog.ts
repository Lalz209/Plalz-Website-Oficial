export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishedAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  
  // Author information
  author: Author;
  
  // Categorization
  category: BlogCategory;
  tags: BlogTag[];
  
  // Content metadata
  readingTime: number;
  wordCount: number;
  
  // SEO
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
    canonicalUrl?: string;
  };
  
  // Social sharing
  socialSharing: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
  
  // Table of contents
  tableOfContents?: TableOfContentsItem[];
  
  // Related content
  relatedPosts?: string[];
  
  // Comments (prepared for future implementation)
  commentsEnabled: boolean;
  commentsCount: number;
  
  // Analytics
  views: number;
  likes: number;
  shares: number;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar: string;
  email: string;
  website?: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  role: string;
  joinedAt: Date;
  postsCount: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
  image?: string;
  postsCount: number;
  featured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postsCount: number;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  anchor: string;
  children?: TableOfContentsItem[];
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  featured?: boolean;
  status?: 'draft' | 'published' | 'archived';
}

export interface BlogSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: BlogFilters;
  sortBy?: 'publishedAt' | 'title' | 'views' | 'likes';
  sortOrder?: 'asc' | 'desc';
}

export interface BlogResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  totalTags: number;
  totalAuthors: number;
  totalViews: number;
  averageReadingTime: number;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  name?: string;
  subscribedAt: Date;
  status: 'active' | 'unsubscribed' | 'pending';
  source: string;
  tags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  parentId?: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
    website?: string;
  };
  content: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'approved' | 'spam' | 'rejected';
  likes: number;
  replies?: Comment[];
}

export interface BlogSidebar {
  categories: BlogCategory[];
  popularTags: BlogTag[];
  recentPosts: BlogPost[];
  featuredPosts: BlogPost[];
}

export interface RSSFeed {
  title: string;
  description: string;
  link: string;
  language: string;
  lastBuildDate: Date;
  items: RSSItem[];
}

export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: Date;
  author: string;
  category: string[];
  guid: string;
}

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// MDX Content types (for future CMS integration)
export interface MDXContent {
  source: string;
  frontmatter: {
    title: string;
    excerpt: string;
    publishedAt: string;
    updatedAt: string;
    author: string;
    category: string;
    tags: string[];
    featuredImage: string;
    featured: boolean;
    seo: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
  };
}

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
}

export interface ImageOptimization {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  lazy?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
} 