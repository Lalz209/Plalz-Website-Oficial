"use client";

import { BlogHero } from '@/components/blog/blog-hero';
import { BlogGrid } from '@/components/blog/blog-grid';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { BlogPost, BlogCategory, BlogTag } from '@/lib/types/blog';
import { 
  BLOG_POSTS, 
  BLOG_CATEGORIES, 
  getFeaturedPosts, 
  getRecentPosts, 
  getPopularTags 
} from '@/lib/data/blog-data';

interface BlogPageClientProps {
  posts?: BlogPost[];
  categories?: BlogCategory[];
  tags?: BlogTag[];
}

export function BlogPageClient({ 
  posts = BLOG_POSTS,
  categories = BLOG_CATEGORIES,
  tags = getPopularTags()
}: BlogPageClientProps) {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts();

  const handlePostClick = (post: BlogPost) => {
    // Navigation is handled by the anchor tag in BlogPostCard
    console.log('Navigating to post:', post.slug);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <BlogHero featuredPosts={featuredPosts} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Section Header */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-4" id="posts">
                  Todos los Artículos
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  Explora nuestra colección completa de artículos sobre desarrollo web, 
                  diseño UX/UI, marketing digital y las últimas tendencias tecnológicas.
                </p>
              </div>

              {/* Blog Grid */}
              <BlogGrid
                posts={posts}
                onPostClick={handlePostClick}
                showFilters={true}
                showSearch={true}
                itemsPerPage={9}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar
              categories={categories}
              popularTags={tags}
              recentPosts={recentPosts}
            />
          </div>
        </div>
      </div>

      {/* Newsletter CTA Section */}
      <section className="py-16 bg-muted/30" id="newsletter">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">
              ¿Te gustó lo que leíste?
            </h2>
            <p className="text-lg text-muted-foreground">
              Suscríbete a nuestro newsletter y recibe las últimas tendencias, 
              tutoriales y consejos directamente en tu bandeja de entrada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Suscribirse
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Sin spam. Cancela cuando quieras. 📧
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">
              ¿Necesitas ayuda con tu proyecto?
            </h2>
            <p className="text-lg text-muted-foreground">
              Nuestro equipo de expertos está listo para ayudarte a llevar 
              tu idea al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/cotizar"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Solicitar Cotización
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Ver Nuestro Trabajo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 