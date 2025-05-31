"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearch, SearchResult } from '@/lib/hooks/use-search';
import { useSearchAnalytics } from '@/lib/analytics/search-analytics';
import { SEARCH_CATEGORIES } from '@/lib/data/search-data';
import { 
  SearchIcon, 
  FilterIcon,
  SortAscIcon,
  ClockIcon,
  TrendingUpIcon,
  StarIcon,
  ExternalLinkIcon,
  CalendarIcon
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface SearchResultsProps {
  initialQuery?: string;
  showFilters?: boolean;
  className?: string;
}

export function SearchResults({ 
  initialQuery = '', 
  showFilters = true,
  className 
}: SearchResultsProps) {
  const {
    query,
    setQuery,
    results,
    isSearching,
    filters,
    setFilters,
    totalResults,
    addToHistory,
    trackResultClick
  } = useSearch();

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const analytics = useSearchAnalytics();

  // Initialize query if provided
  useState(() => {
    if (initialQuery && !query) {
      setQuery(initialQuery);
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addToHistory(query);
      // Track search from page
      analytics.trackSearch({
        query,
        category: filters.category !== 'all' ? filters.category : undefined,
        resultsCount: results.length,
        source: 'page'
      });
    }
  };

  const handleResultClick = (result: SearchResult, index: number) => {
    trackResultClick(result, index);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'service': return '🛠️';
      case 'blog': return '📝';
      case 'portfolio': return '💼';
      case 'faq': return '❓';
      case 'page': return '📄';
      case 'team': return '👥';
      default: return '🔍';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'service': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'blog': return 'bg-green-100 text-green-800 border-green-200';
      case 'portfolio': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'faq': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'page': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'team': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mb-3">Categorías</h3>
        <div className="space-y-2">
          {SEARCH_CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => setFilters({ category: category.value })}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-between",
                filters.category === category.value 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              )}
            >
              <span>{category.label}</span>
              <Badge variant="outline" className="text-xs">
                {category.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 className="font-semibold mb-3">Ordenar por</h3>
        <Select value={filters.sortBy} onValueChange={(value: any) => setFilters({ sortBy: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">
              <div className="flex items-center gap-2">
                <StarIcon className="h-4 w-4" />
                Relevancia
              </div>
            </SelectItem>
            <SelectItem value="date">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Fecha
              </div>
            </SelectItem>
            <SelectItem value="priority">
              <div className="flex items-center gap-2">
                <TrendingUpIcon className="h-4 w-4" />
                Prioridad
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date Range Filter (for blog posts) */}
      {filters.category === 'blog' && (
        <div>
          <h3 className="font-semibold mb-3">Fecha de publicación</h3>
          <Select 
            value={filters.dateRange || 'all'} 
            onValueChange={(value: any) => setFilters({ dateRange: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las fechas</SelectItem>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mes</SelectItem>
              <SelectItem value="year">Último año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );

  const ResultCard = ({ result, index }: { result: SearchResult; index: number }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon/Image */}
          <div className="flex-shrink-0">
            {result.image ? (
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={result.image}
                  alt={result.title}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-2xl">
                {getCategoryIcon(result.category)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getCategoryColor(result.category))}
                >
                  {result.category}
                </Badge>
                {result.score && (
                  <Badge variant="outline" className="text-xs">
                    {Math.round((1 - result.score) * 100)}% match
                  </Badge>
                )}
              </div>
              {result.lastUpdated && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ClockIcon className="h-3 w-3" />
                  {formatDate(result.lastUpdated)}
                </div>
              )}
            </div>

            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              <Link 
                href={result.url}
                className="hover:text-primary transition-colors"
                onClick={() => handleResultClick(result, index)}
              >
                {result.title}
              </Link>
            </h3>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {result.description}
            </p>

            {/* Tags */}
            {result.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {result.tags.slice(0, 4).map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {result.tags.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{result.tags.length - 4} más
                  </Badge>
                )}
              </div>
            )}

            <Button variant="outline" size="sm" asChild>
              <Link 
                href={result.url}
                onClick={() => handleResultClick(result, index)}
              >
                Ver más
                <ExternalLinkIcon className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={cn("space-y-8", className)}>
      {/* Search Header */}
      <div className="space-y-4">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar servicios, blog, portfolio..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={isSearching}>
            {isSearching ? 'Buscando...' : 'Buscar'}
          </Button>
          {showFilters && (
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden"
            >
              <FilterIcon className="h-4 w-4" />
            </Button>
          )}
        </form>

        {/* Results Summary */}
        {query && (
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Resultados para "{query}"
              </h2>
              <p className="text-muted-foreground">
                {totalResults} resultado{totalResults !== 1 ? 's' : ''} encontrado{totalResults !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        {showFilters && (
          <>
            {/* Desktop Filters */}
            <div className="hidden lg:block">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FilterIcon className="h-5 w-5" />
                    Filtros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterSidebar />
                </CardContent>
              </Card>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="lg:hidden col-span-full">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FilterIcon className="h-5 w-5" />
                      Filtros
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FilterSidebar />
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}

        {/* Results */}
        <div className={cn("space-y-6", showFilters ? "lg:col-span-3" : "col-span-full")}>
          {!query ? (
            <div className="text-center py-12">
              <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Busca lo que necesites</h3>
              <p className="text-muted-foreground">
                Encuentra servicios, artículos del blog, proyectos del portfolio y más
              </p>
            </div>
          ) : isSearching ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Buscando...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
              <p className="text-muted-foreground mb-4">
                No encontramos nada para "{query}". Intenta con términos diferentes.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Sugerencias:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Verifica la ortografía</li>
                  <li>• Usa términos más generales</li>
                  <li>• Prueba con sinónimos</li>
                  <li>• Reduce el número de palabras</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Grouped Results */}
              {Object.entries(groupedResults).map(([category, categoryResults]) => (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">{getCategoryIcon(category)}</div>
                    <h3 className="text-xl font-semibold capitalize">
                      {SEARCH_CATEGORIES.find(c => c.value === category)?.label || category}
                    </h3>
                    <Badge variant="outline">
                      {categoryResults.length}
                    </Badge>
                  </div>
                  <div className="grid gap-4">
                    {categoryResults.map((result, index) => (
                      <ResultCard key={result.id} result={result} index={index} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 