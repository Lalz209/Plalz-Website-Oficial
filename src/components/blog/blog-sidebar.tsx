"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogCategory, BlogTag, BlogPost } from '@/lib/types/blog';
import { 
  CalendarIcon, 
  ClockIcon, 
  EyeIcon,
  MailIcon,
  TrendingUpIcon,
  TagIcon,
  FolderIcon
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface BlogSidebarProps {
  categories: BlogCategory[];
  popularTags: BlogTag[];
  recentPosts: BlogPost[];
  className?: string;
}

function CategoriesWidget({ categories }: { categories: BlogCategory[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderIcon className="h-5 w-5" />
          Categorías
        </CardTitle>
        <CardDescription>
          Explora artículos por temática
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`/blog/categoria/${category.slug}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <div>
                <div className="font-medium group-hover:text-primary transition-colors">
                  {category.icon} {category.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {category.postsCount} artículos
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {category.postsCount}
            </Badge>
          </a>
        ))}
      </CardContent>
    </Card>
  );
}

function PopularTagsWidget({ tags }: { tags: BlogTag[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TagIcon className="h-5 w-5" />
          Tags Populares
        </CardTitle>
        <CardDescription>
          Los temas más buscados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <a key={tag.id} href={`/blog/tag/${tag.slug}`}>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                style={{ 
                  borderColor: tag.color,
                  color: tag.color 
                }}
              >
                {tag.name} ({tag.postsCount})
              </Badge>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentPostsWidget({ posts }: { posts: BlogPost[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUpIcon className="h-5 w-5" />
          Artículos Recientes
        </CardTitle>
        <CardDescription>
          Las últimas publicaciones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <div className="flex gap-3">
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {post.publishedAt.toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-3 w-3" />
                    {post.readingTime}m
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
}

function NewsletterWidget() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubscribed) {
    return (
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <MailIcon className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">¡Suscripción Exitosa!</h3>
              <p className="text-sm opacity-90 mt-2">
                Gracias por suscribirte. Recibirás nuestras últimas publicaciones en tu email.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MailIcon className="h-5 w-5" />
          Newsletter
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Recibe las últimas tendencias y tutoriales directamente en tu email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            required
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Suscribiendo...
              </>
            ) : (
              'Suscribirse Gratis'
            )}
          </Button>
        </form>
        
        <div className="mt-4 text-xs text-primary-foreground/70 text-center">
          Sin spam. Cancela cuando quieras.
        </div>
      </CardContent>
    </Card>
  );
}

function BlogStatsWidget() {
  const stats = [
    { label: 'Artículos', value: '47+' },
    { label: 'Lectores', value: '12K+' },
    { label: 'Países', value: '25+' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas del Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function BlogSidebar({ 
  categories, 
  popularTags, 
  recentPosts, 
  className 
}: BlogSidebarProps) {
  return (
    <aside className={cn("space-y-6", className)}>
      {/* Newsletter */}
      <NewsletterWidget />
      
      {/* Categories */}
      <CategoriesWidget categories={categories} />
      
      {/* Popular Tags */}
      <PopularTagsWidget tags={popularTags} />
      
      {/* Recent Posts */}
      <RecentPostsWidget posts={recentPosts} />
      
      {/* Blog Stats */}
      <BlogStatsWidget />
    </aside>
  );
} 