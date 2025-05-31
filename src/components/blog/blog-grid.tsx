"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { BlogPost, BlogFilters } from '@/lib/types/blog';
import { 
  SearchIcon, 
  CalendarIcon, 
  ClockIcon, 
  EyeIcon,
  HeartIcon,
  ShareIcon,
  FilterIcon,
  XIcon
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface BlogGridProps {
  posts: BlogPost[];
  onPostClick?: (post: BlogPost) => void;
  showFilters?: boolean;
  showSearch?: boolean;
  itemsPerPage?: number;
}

interface BlogPostCardProps {
  post: BlogPost;
  onClick?: (post: BlogPost) => void;
}

function BlogPostCard({ post, onClick }: BlogPostCardProps) {
  return (
    <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        {/* Featured Image */}
        <div className="aspect-video overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={400}
            height={225}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              style={{ backgroundColor: post.category.color }}
              className="text-white border-0"
            >
              {post.category.icon} {post.category.name}
            </Badge>
          </div>

          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-yellow-500 text-yellow-900 border-0">
                ⭐ Destacado
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-6 space-y-4">
          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {post.publishedAt.toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {post.readingTime} min lectura
            </div>
          </div>

          {/* Title and Excerpt */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag.id}
                variant="outline"
                className="text-xs"
                style={{ borderColor: tag.color, color: tag.color }}
              >
                {tag.name}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
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
              <div className="flex items-center gap-1">
                <HeartIcon className="h-4 w-4" />
                {post.likes}
              </div>
            </div>
          </div>

          {/* Read More Button */}
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => onClick?.(post)}
            asChild
          >
            <a href={`/blog/${post.slug}`}>
              Leer Artículo Completo
            </a>
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}

function BlogFiltersComponent({ 
  onFiltersChange, 
  onSearchChange, 
  totalResults 
}: {
  onFiltersChange: (filters: BlogFilters) => void;
  onSearchChange: (query: string) => void;
  totalResults: number;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<BlogFilters>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleFilterChange = (key: keyof BlogFilters, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value === 'all' ? undefined : value,
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
    onFiltersChange({});
    onSearchChange('');
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined) || searchQuery;

  return (
    <div className="space-y-4">
      {/* Search and Quick Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar artículos..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="w-full lg:w-48">
              <Select defaultValue="publishedAt">
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publishedAt">Más recientes</SelectItem>
                  <SelectItem value="views">Más leídos</SelectItem>
                  <SelectItem value="likes">Más populares</SelectItem>
                  <SelectItem value="title">Alfabético</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Advanced Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="gap-2"
            >
              <FilterIcon className="h-4 w-4" />
              Filtros
            </Button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {totalResults} artículo{totalResults !== 1 ? 's' : ''} encontrado{totalResults !== 1 ? 's' : ''}
            </div>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-2"
              >
                <XIcon className="h-4 w-4" />
                Limpiar filtros
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showAdvanced && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filtros Avanzados</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(false)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoría</label>
                  <Select
                    value={filters.category || 'all'}
                    onValueChange={(value) => handleFilterChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="desarrollo-web">💻 Desarrollo Web</SelectItem>
                      <SelectItem value="diseno-ux-ui">🎨 Diseño UX/UI</SelectItem>
                      <SelectItem value="marketing-digital">📈 Marketing Digital</SelectItem>
                      <SelectItem value="ecommerce">🛒 E-commerce</SelectItem>
                      <SelectItem value="tecnologia">🚀 Tecnología</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Author Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Autor</label>
                  <Select
                    value={filters.author || 'all'}
                    onValueChange={(value) => handleFilterChange('author', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los autores" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los autores</SelectItem>
                      <SelectItem value="carlos-mendoza">Carlos Mendoza</SelectItem>
                      <SelectItem value="ana-garcia">Ana García</SelectItem>
                      <SelectItem value="miguel-torres">Miguel Torres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Featured Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo</label>
                  <Select
                    value={filters.featured ? 'featured' : 'all'}
                    onValueChange={(value) => handleFilterChange('featured', value === 'featured')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los artículos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los artículos</SelectItem>
                      <SelectItem value="featured">Solo destacados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function BlogGrid({ 
  posts, 
  onPostClick, 
  showFilters = true, 
  showSearch = true,
  itemsPerPage = 9 
}: BlogGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<BlogFilters>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower) ||
          post.tags.some(tag => tag.name.toLowerCase().includes(searchLower)) ||
          post.category.name.toLowerCase().includes(searchLower) ||
          post.author.name.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && post.category.slug !== filters.category) {
        return false;
      }

      // Author filter
      if (filters.author && post.author.slug !== filters.author) {
        return false;
      }

      // Featured filter
      if (filters.featured && !post.featured) {
        return false;
      }

      return true;
    });
  }, [posts, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const handlePostClick = (post: BlogPost) => {
    onPostClick?.(post);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <SearchIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">No hay artículos disponibles</h3>
        <p className="text-muted-foreground">
          Vuelve pronto para ver nuestras últimas publicaciones.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      {(showFilters || showSearch) && (
        <BlogFiltersComponent
          onFiltersChange={setFilters}
          onSearchChange={setSearchQuery}
          totalResults={filteredPosts.length}
        />
      )}

      {/* Posts Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              onClick={handlePostClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <SearchIcon className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">No se encontraron artículos</h3>
          <p className="text-muted-foreground mb-6">
            No hay artículos que coincidan con los filtros seleccionados.
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              setFilters({});
              setSearchQuery('');
              setCurrentPage(1);
            }}
          >
            Limpiar Filtros
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Anterior
          </Button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-10 h-10"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center text-sm text-muted-foreground">
        Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPosts.length)} de {filteredPosts.length} artículos
      </div>
    </div>
  );
} 