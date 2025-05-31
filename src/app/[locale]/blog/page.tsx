import { Metadata } from 'next';
import { BlogPageClient } from '@/components/blog/blog-page-client';
import { BLOG_POSTS, BLOG_STATS } from '@/lib/data/blog-data';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Blog | Plalz - Desarrollo Web, Diseño UX/UI y Marketing Digital',
  description: 'Descubre las últimas tendencias en desarrollo web, diseño UX/UI y marketing digital. Tutoriales, guías y consejos de expertos para hacer crecer tu negocio online.',
  keywords: [
    'blog desarrollo web',
    'tutoriales programación',
    'diseño ux ui',
    'marketing digital',
    'tendencias tecnología',
    'nextjs react',
    'seo técnico',
    'ecommerce',
    'plalz blog'
  ],
  openGraph: {
    title: 'Blog | Plalz - Conocimiento Digital',
    description: 'Tutoriales, guías y tendencias en desarrollo web, diseño UX/UI y marketing digital.',
    images: [
      {
        url: '/og-images/blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Plalz - Conocimiento Digital',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Plalz - Conocimiento Digital',
    description: 'Descubre las últimas tendencias y tutoriales en desarrollo web y diseño digital.',
    images: ['/og-images/blog.jpg'],
  },
  alternates: {
    canonical: '/blog',
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
};

// Schema.org structured data
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog Plalz - Conocimiento Digital",
  "description": "Blog sobre desarrollo web, diseño UX/UI y marketing digital con tutoriales y guías prácticas.",
  "url": "https://plalz.com/blog",
  "publisher": {
    "@type": "Organization",
    "name": "Plalz",
    "url": "https://plalz.com",
    "logo": "https://plalz.com/logo.png"
  },
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": BLOG_STATS.totalPosts,
    "itemListElement": BLOG_POSTS.slice(0, 10).map((post, index) => ({
      "@type": "BlogPosting",
      "position": index + 1,
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://plalz.com/blog/${post.slug}`,
      "image": post.featuredImage,
      "datePublished": post.publishedAt.toISOString(),
      "dateModified": post.updatedAt.toISOString(),
      "author": {
        "@type": "Person",
        "name": post.author.name,
        "url": post.author.website
      },
      "publisher": {
        "@type": "Organization",
        "name": "Plalz",
        "url": "https://plalz.com",
        "logo": "https://plalz.com/logo.png"
      },
      "articleSection": post.category.name,
      "keywords": post.seo.keywords.join(", "),
      "wordCount": post.wordCount,
      "timeRequired": `PT${post.readingTime}M`
    }))
  },
  "blogPost": BLOG_POSTS.map(post => ({
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "url": `https://plalz.com/blog/${post.slug}`,
    "image": post.featuredImage,
    "datePublished": post.publishedAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "url": post.author.website
    },
    "publisher": {
      "@type": "Organization",
      "name": "Plalz",
      "url": "https://plalz.com",
      "logo": "https://plalz.com/logo.png"
    },
    "articleSection": post.category.name,
    "keywords": post.seo.keywords.join(", "),
    "wordCount": post.wordCount,
    "timeRequired": `PT${post.readingTime}M`
  }))
};

export default function BlogPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      
      <BlogPageClient />
    </>
  );
} 