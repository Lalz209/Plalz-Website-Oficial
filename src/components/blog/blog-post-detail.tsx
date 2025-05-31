"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { BlogPost } from '@/lib/types/blog';
import { getRelatedPosts } from '@/lib/data/blog-data';
import { 
  CalendarIcon, 
  ClockIcon, 
  EyeIcon,
  HeartIcon,
  ShareIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedInIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  UserIcon,
  ExternalLinkIcon,
  PrinterIcon
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface BlogPostDetailProps {
  post: BlogPost;
}

function TableOfContents({ post }: { post: BlogPost }) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      if (!post.tableOfContents) return;

      const sections = post.tableOfContents.map(item => item.anchor);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.tableOfContents]);

  if (!post.tableOfContents || post.tableOfContents.length === 0) {
    return null;
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpenIcon className="h-5 w-5" />
          Tabla de Contenidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          {post.tableOfContents.map((item) => (
            <a
              key={item.id}
              href={`#${item.anchor}`}
              className={cn(
                "block py-2 px-3 rounded-lg text-sm transition-colors",
                item.level === 2 ? "ml-0" : "ml-4",
                activeSection === item.anchor
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}

function SocialSharing({ post }: { post: BlogPost }) {
  const [canShare, setCanShare] = useState(false);
  const url = `https://plalz.com/blog/${post.slug}`;
  const title = post.title;
  const description = post.excerpt;

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && 'share' in navigator);
  }, []);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: TwitterIcon,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.socialSharing.twitter || title)}&url=${encodeURIComponent(url)}`,
      color: '#1DA1F2',
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: '#1877F2',
    },
    {
      name: 'LinkedIn',
      icon: LinkedInIcon,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: '#0A66C2',
    },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShareIcon className="h-5 w-5" />
          Compartir Artículo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Social Share Buttons */}
        <div className="flex flex-wrap gap-2">
          {shareLinks.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open(link.url, '_blank', 'width=600,height=400')}
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </Button>
          ))}
        </div>

        {/* Native Share & Print */}
        <div className="flex gap-2">
          {canShare && (
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
              <ShareIcon className="h-4 w-4" />
              Compartir
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
            <PrinterIcon className="h-4 w-4" />
            Imprimir
          </Button>
        </div>

        {/* Stats */}
        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <EyeIcon className="h-4 w-4" />
              {post.views.toLocaleString()} vistas
            </div>
            <div className="flex items-center gap-1">
              <HeartIcon className="h-4 w-4" />
              {post.likes} likes
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AuthorBio({ post }: { post: BlogPost }) {
  const { author } = post;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          Sobre el Autor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={author.avatar}
              alt={author.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg">{author.name}</h4>
            <p className="text-sm text-muted-foreground mb-2">{author.role}</p>
            <p className="text-sm leading-relaxed mb-4">{author.bio}</p>
            
            {/* Social Links */}
            <div className="flex gap-2">
              {author.website && (
                <Button variant="outline" size="sm" asChild>
                  <a href={author.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLinkIcon className="h-4 w-4 mr-1" />
                    Website
                  </a>
                </Button>
              )}
              {author.social.twitter && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://twitter.com/${author.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                    <TwitterIcon className="h-4 w-4 mr-1" />
                    Twitter
                  </a>
                </Button>
              )}
              {author.social.linkedin && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://linkedin.com/in/${author.social.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon className="h-4 w-4 mr-1" />
                    LinkedIn
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RelatedPosts({ post }: { post: BlogPost }) {
  const relatedPosts = getRelatedPosts(post.id, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Artículos Relacionados</CardTitle>
        <CardDescription>
          Otros artículos que podrían interesarte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {relatedPosts.map((relatedPost) => (
          <a
            key={relatedPost.id}
            href={`/blog/${relatedPost.slug}`}
            className="block group"
          >
            <div className="flex gap-3">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={relatedPost.featuredImage}
                  alt={relatedPost.title}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {relatedPost.title}
                </h4>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {relatedPost.publishedAt.toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-3 w-3" />
                    {relatedPost.readingTime}m
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

function PostContent({ post }: { post: BlogPost }) {
  return (
    <article className="prose prose-lg max-w-none">
      {/* Article Header */}
      <header className="not-prose mb-12">
        <div className="space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
            <span>/</span>
            <a 
              href={`/blog/categoria/${post.category.slug}`}
              className="hover:text-primary transition-colors"
            >
              {post.category.name}
            </a>
            <span>/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>

          {/* Category and Meta */}
          <div className="flex items-center gap-4">
            <Badge 
              style={{ backgroundColor: post.category.color }}
              className="text-white border-0"
            >
              {post.category.icon} {post.category.name}
            </Badge>
            {post.featured && (
              <Badge className="bg-yellow-500 text-yellow-900 border-0">
                ⭐ Destacado
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
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
                <div className="font-medium text-foreground">{post.author.name}</div>
                <div className="text-xs">{post.author.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {post.publishedAt.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {post.readingTime} min de lectura
            </div>
            <div className="flex items-center gap-1">
              <EyeIcon className="h-4 w-4" />
              {post.views.toLocaleString()} vistas
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <a key={tag.id} href={`/blog/tag/${tag.slug}`}>
                <Badge
                  variant="outline"
                  className="text-xs cursor-pointer hover:bg-muted transition-colors"
                  style={{ borderColor: tag.color, color: tag.color }}
                >
                  {tag.name}
                </Badge>
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="not-prose mb-12">
        <div className="aspect-video rounded-xl overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={1200}
            height={675}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <div 
        className="prose-headings:scroll-mt-20"
        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
      />
    </article>
  );
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="gap-2">
          <a href="/blog">
            <ArrowLeftIcon className="h-4 w-4" />
            Volver al Blog
          </a>
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <PostContent post={post} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <TableOfContents post={post} />
            <SocialSharing post={post} />
            <AuthorBio post={post} />
            <RelatedPosts post={post} />
          </div>
        </div>
      </div>

      {/* Comments Section (Placeholder) */}
      {post.commentsEnabled && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Comentarios ({post.commentsCount})</CardTitle>
                  <CardDescription>
                    Comparte tu opinión sobre este artículo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Sistema de comentarios próximamente...</p>
                    <p className="text-sm mt-2">
                      Mientras tanto, puedes compartir tus pensamientos en nuestras redes sociales.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">
              ¿Te gustó este artículo?
            </h2>
            <p className="text-lg text-muted-foreground">
              Suscríbete a nuestro newsletter y recibe contenido similar 
              directamente en tu bandeja de entrada.
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
          </div>
        </div>
      </section>
    </div>
  );
} 