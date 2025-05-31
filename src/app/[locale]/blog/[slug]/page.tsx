import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BlogPost } from '@/lib/types/blog';
import { BLOG_POSTS } from '@/lib/data/blog-data';
import { BlogPostDetail } from '@/components/blog/blog-post-detail';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata dynamically
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Artículo no encontrado | Blog Plalz',
    };
  }

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    authors: [{ name: post.author.name, url: post.author.website }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.seo.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name],
      section: post.category.name,
      tags: post.tags.map(tag => tag.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.seo.ogImage],
      creator: post.author.social.twitter,
    },
    alternates: {
      canonical: post.seo.canonicalUrl || `/blog/${post.slug}`,
    },
    other: {
      'article:author': post.author.name,
      'article:published_time': post.publishedAt.toISOString(),
      'article:modified_time': post.updatedAt.toISOString(),
      'article:section': post.category.name,
      'article:tag': post.tags.map(tag => tag.name).join(', '),
    },
  };
}

// Generate static params for static generation
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Schema.org structured data for the blog post
  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage,
    "url": `https://plalz.com/blog/${post.slug}`,
    "datePublished": post.publishedAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "url": post.author.website,
      "image": post.author.avatar,
      "jobTitle": post.author.role,
      "description": post.author.bio,
      "sameAs": [
        post.author.social.twitter && `https://twitter.com/${post.author.social.twitter.replace('@', '')}`,
        post.author.social.linkedin && `https://linkedin.com/in/${post.author.social.linkedin}`,
        post.author.website
      ].filter(Boolean)
    },
    "publisher": {
      "@type": "Organization",
      "name": "Plalz",
      "url": "https://plalz.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://plalz.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://plalz.com/blog/${post.slug}`
    },
    "articleSection": post.category.name,
    "keywords": post.seo.keywords.join(", "),
    "wordCount": post.wordCount,
    "timeRequired": `PT${post.readingTime}M`,
    "inLanguage": "es-ES",
    "isAccessibleForFree": true,
    "about": {
      "@type": "Thing",
      "name": post.category.name,
      "description": post.category.description
    },
    "mentions": post.tags.map(tag => ({
      "@type": "Thing",
      "name": tag.name,
      "url": `https://plalz.com/blog/tag/${tag.slug}`
    })),
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/ReadAction",
        "userInteractionCount": post.views
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/LikeAction",
        "userInteractionCount": post.likes
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/ShareAction",
        "userInteractionCount": post.shares
      }
    ]
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://plalz.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://plalz.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category.name,
        "item": `https://plalz.com/blog/categoria/${post.category.slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": `https://plalz.com/blog/${post.slug}`
      }
    ]
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <BlogPostDetail post={post} />
    </>
  );
} 