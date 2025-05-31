"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/lib/types/blog';
import { BLOG_STATS } from '@/lib/data/blog-data';
import { 
  CalendarIcon, 
  ClockIcon, 
  EyeIcon, 
  TrendingUpIcon,
  BookOpenIcon,
  UsersIcon,
  TagIcon
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface BlogHeroProps {
  featuredPosts: BlogPost[];
}

function FeaturedPostCard({ post, index }: { post: BlogPost; index: number }) {
  const isLarge = index === 0;
  
  return (
    <Card className={cn(
      "group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      isLarge ? "md:col-span-2 md:row-span-2" : ""
    )}>
      <div className="relative">
        {/* Featured Image */}
        <div className={cn(
          "relative overflow-hidden",
          isLarge ? "aspect-[16/10]" : "aspect-video"
        )}>
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={index === 0}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Featured Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground">
              ⭐ Destacado
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className={cn(
          "p-6 space-y-4",
          isLarge ? "md:p-8 md:space-y-6" : ""
        )}>
          {/* Category and Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Badge 
              variant="outline" 
              style={{ borderColor: post.category.color, color: post.category.color }}
            >
              {post.category.icon} {post.category.name}
            </Badge>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {post.publishedAt.toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {post.readingTime} min
            </div>
          </div>

          {/* Title and Excerpt */}
          <div className="space-y-3">
            <h3 className={cn(
              "font-bold leading-tight group-hover:text-primary transition-colors",
              isLarge ? "text-2xl md:text-3xl" : "text-xl"
            )}>
              {post.title}
            </h3>
            <p className={cn(
              "text-muted-foreground leading-relaxed",
              isLarge ? "text-lg" : "text-sm"
            )}>
              {post.excerpt}
            </p>
          </div>

          {/* Author and Stats */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <div className="font-medium text-sm">{post.author.name}</div>
                <div className="text-xs text-muted-foreground">{post.author.role}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <EyeIcon className="h-4 w-4" />
                {post.views.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Read More Button */}
          <Button 
            className="w-full" 
            variant={isLarge ? "default" : "outline"}
            asChild
          >
            <a href={`/blog/${post.slug}`}>
              Leer Artículo
            </a>
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}

function BlogStats() {
  const stats = [
    {
      icon: BookOpenIcon,
      value: BLOG_STATS.totalPosts,
      label: 'Artículos',
      description: 'Publicados',
    },
    {
      icon: TagIcon,
      value: BLOG_STATS.totalCategories,
      label: 'Categorías',
      description: 'Temáticas',
    },
    {
      icon: UsersIcon,
      value: BLOG_STATS.totalAuthors,
      label: 'Autores',
      description: 'Expertos',
    },
    {
      icon: TrendingUpIcon,
      value: `${Math.round(BLOG_STATS.totalViews / 1000)}K`,
      label: 'Lecturas',
      description: 'Mensuales',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-2 rounded-full bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm font-medium">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function BlogHero({ featuredPosts }: BlogHeroProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <Badge variant="outline" className="px-4 py-2">
                📝 Blog
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Conocimiento
                <span className="text-primary"> Digital</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Descubre las últimas tendencias, tutoriales y mejores prácticas en 
                desarrollo web, diseño UX/UI y marketing digital.
              </p>
            </div>

            {/* Blog Stats */}
            <BlogStats />
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Artículos Destacados</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Los artículos más populares y relevantes de nuestro blog
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2">
                {featuredPosts.slice(0, 3).map((post, index) => (
                  <FeaturedPostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                ¿Quieres estar al día con las últimas tendencias?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="#newsletter">
                    Suscribirse al Newsletter
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#posts">
                    Explorar Artículos
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 