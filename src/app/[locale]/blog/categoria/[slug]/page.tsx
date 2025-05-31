import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BlogPageClient } from '@/components/blog/blog-page-client';
import { BLOG_CATEGORIES, getPostsByCategory } from '@/lib/data/blog-data';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata dynamically
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = BLOG_CATEGORIES.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: 'Categoría no encontrada | Blog Plalz',
    };
  }

  return {
    title: category.seo.metaTitle,
    description: category.seo.metaDescription,
    keywords: category.seo.keywords,
    openGraph: {
      title: `${category.name} | Blog Plalz`,
      description: category.description,
      images: [
        {
          url: category.image || '/og-images/blog-category.jpg',
          width: 1200,
          height: 630,
          alt: `Categoría ${category.name}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | Blog Plalz`,
      description: category.description,
      images: [category.image || '/og-images/blog-category.jpg'],
    },
    alternates: {
      canonical: `/blog/categoria/${category.slug}`,
    },
  };
}

// Generate static params for static generation
export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = BLOG_CATEGORIES.find(c => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const categoryPosts = getPostsByCategory(category.slug);

  // Schema.org structured data for the category page
  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} | Blog Plalz`,
    "description": category.description,
    "url": `https://plalz.com/blog/categoria/${category.slug}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": categoryPosts.length,
      "itemListElement": categoryPosts.map((post, index) => ({
        "@type": "BlogPosting",
        "position": index + 1,
        "headline": post.title,
        "description": post.excerpt,
        "url": `https://plalz.com/blog/${post.slug}`,
        "image": post.featuredImage,
        "datePublished": post.publishedAt.toISOString(),
        "author": {
          "@type": "Person",
          "name": post.author.name
        }
      }))
    },
    "about": {
      "@type": "Thing",
      "name": category.name,
      "description": category.description
    },
    "breadcrumb": {
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
          "name": category.name,
          "item": `https://plalz.com/blog/categoria/${category.slug}`
        }
      ]
    }
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      
      <div className="min-h-screen bg-background">
        {/* Category Hero */}
        <section className="py-16 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-6">
                {/* Breadcrumb */}
                <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
                  <span>/</span>
                  <span className="text-foreground">Categoría: {category.name}</span>
                </nav>

                {/* Category Badge */}
                <div className="flex justify-center">
                  <div 
                    className="px-6 py-3 rounded-full text-white font-medium"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon} {category.name}
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  {category.name}
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{categoryPosts.length}</div>
                    <div>Artículos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(categoryPosts.reduce((acc, post) => acc + post.views, 0) / 1000)}K
                    </div>
                    <div>Lecturas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Content */}
        <div className="container mx-auto px-4 py-16">
          <BlogPageClient posts={categoryPosts} />
        </div>
      </div>
    </>
  );
} 