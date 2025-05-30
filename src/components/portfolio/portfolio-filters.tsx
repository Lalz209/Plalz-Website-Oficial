"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PortfolioFilters } from '@/lib/types/portfolio';
import { CATEGORY_CONFIG, INDUSTRY_CONFIG, TECHNOLOGIES } from '@/lib/data/portfolio-data';
import { SearchIcon, FilterIcon, XIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface PortfolioFiltersProps {
  filters: PortfolioFilters;
  onFiltersChange: (filters: PortfolioFilters) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResults: number;
}

export function PortfolioFiltersComponent({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange,
  totalResults,
}: PortfolioFiltersProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleFilterChange = (key: keyof PortfolioFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' ? undefined : value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
    onSearchChange('');
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined) || searchQuery;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      {/* Search and Quick Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar proyectos..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Quick Category Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!filters.category ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('category', 'all')}
              >
                Todos
              </Button>
              {Object.entries(CATEGORY_CONFIG).slice(0, 4).map(([key, config]) => (
                <Button
                  key={key}
                  variant={filters.category === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('category', key)}
                  className="gap-2"
                >
                  <span>{config.icon}</span>
                  {config.label}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="gap-2"
              >
                <FilterIcon className="h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {totalResults} proyecto{totalResults !== 1 ? 's' : ''} encontrado{totalResults !== 1 ? 's' : ''}
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
      {showAdvancedFilters && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filtros Avanzados</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(false)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                      {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{config.icon}</span>
                            {config.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Industria</label>
                  <Select
                    value={filters.industry || 'all'}
                    onValueChange={(value) => handleFilterChange('industry', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las industrias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las industrias</SelectItem>
                      {Object.entries(INDUSTRY_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{config.icon}</span>
                            {config.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Año</label>
                  <Select
                    value={filters.year?.toString() || 'all'}
                    onValueChange={(value) => handleFilterChange('year', value === 'all' ? 'all' : parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los años" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los años</SelectItem>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <Select
                    value={filters.status || 'all'}
                    onValueChange={(value) => handleFilterChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los estados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="completed">Completados</SelectItem>
                      <SelectItem value="in-progress">En Progreso</SelectItem>
                      <SelectItem value="concept">Conceptos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Technology Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Tecnologías</label>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={!filters.technology ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleFilterChange('technology', 'all')}
                  >
                    Todas
                  </Badge>
                  {TECHNOLOGIES.slice(0, 12).map((tech) => (
                    <Badge
                      key={tech.id}
                      variant={filters.technology === tech.id ? 'default' : 'outline'}
                      className="cursor-pointer gap-1"
                      onClick={() => handleFilterChange('technology', tech.id)}
                    >
                      <span>{tech.icon}</span>
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={filters.featured || false}
                  onChange={(e) => handleFilterChange('featured', e.target.checked || undefined)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Solo proyectos destacados
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="gap-2">
              Búsqueda: "{searchQuery}"
              <button
                onClick={() => onSearchChange('')}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.category && filters.category !== 'all' && (
            <Badge variant="secondary" className="gap-2">
              {CATEGORY_CONFIG[filters.category]?.icon} {CATEGORY_CONFIG[filters.category]?.label}
              <button
                onClick={() => handleFilterChange('category', 'all')}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.industry && filters.industry !== 'all' && (
            <Badge variant="secondary" className="gap-2">
              {INDUSTRY_CONFIG[filters.industry]?.icon} {INDUSTRY_CONFIG[filters.industry]?.label}
              <button
                onClick={() => handleFilterChange('industry', 'all')}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.year && (
            <Badge variant="secondary" className="gap-2">
              Año: {filters.year}
              <button
                onClick={() => handleFilterChange('year', 'all')}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.technology && (
            <Badge variant="secondary" className="gap-2">
              {TECHNOLOGIES.find(t => t.id === filters.technology)?.icon} {TECHNOLOGIES.find(t => t.id === filters.technology)?.name}
              <button
                onClick={() => handleFilterChange('technology', 'all')}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.featured && (
            <Badge variant="secondary" className="gap-2">
              ⭐ Destacados
              <button
                onClick={() => handleFilterChange('featured', undefined)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
} 