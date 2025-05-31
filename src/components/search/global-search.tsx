"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSearch } from '@/lib/hooks/use-search';
import { useSearchAnalytics } from '@/lib/analytics/search-analytics';
import { POPULAR_SEARCHES, SEARCH_SUGGESTIONS } from '@/lib/data/search-data';
import { 
  SearchIcon, 
  CloseIcon, 
  TrendingUpIcon,
  ClockIcon,
  ArrowRightIcon,
  LoaderIcon
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  placeholder?: string;
  showSuggestions?: boolean;
}

export function GlobalSearch({ 
  isOpen, 
  onClose, 
  className,
  placeholder = "Buscar servicios, blog, portfolio...",
  showSuggestions = true
}: GlobalSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const analytics = useSearchAnalytics();
  
  const {
    query,
    setQuery,
    results,
    isSearching,
    searchHistory,
    addToHistory,
    suggestions,
    clearSearch,
    trackResultClick
  } = useSearch();

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Show dropdown when there's a query or when focused
  useEffect(() => {
    setShowDropdown(isOpen && (query.length > 0 || searchHistory.length > 0));
  }, [isOpen, query, searchHistory]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [results, suggestions]);

  const handleSearch = (searchQuery: string, source: 'header' | 'suggestion' | 'history' = 'header') => {
    if (!searchQuery.trim()) return;
    
    // Track analytics
    analytics.trackSearch({
      query: searchQuery,
      resultsCount: results.length,
      source
    });
    
    addToHistory(searchQuery);
    router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`);
    onClose();
    clearSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = suggestions.length + results.slice(0, 3).length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalItems);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          if (selectedIndex < suggestions.length) {
            const suggestion = suggestions[selectedIndex];
            setQuery(suggestion);
            handleSearch(suggestion, 'suggestion');
          } else {
            const resultIndex = selectedIndex - suggestions.length;
            const result = results[resultIndex];
            if (result) {
              trackResultClick(result, resultIndex);
              router.push(result.url);
              onClose();
              clearSearch();
            }
          }
        } else {
          handleSearch(query);
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion, 'suggestion');
  };

  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem);
    handleSearch(historyItem, 'history');
  };

  const handleResultClick = (result: any, index: number) => {
    trackResultClick(result, index);
    addToHistory(query);
    router.push(result.url);
    onClose();
    clearSearch();
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
      case 'service': return 'bg-blue-100 text-blue-800';
      case 'blog': return 'bg-green-100 text-green-800';
      case 'portfolio': return 'bg-purple-100 text-purple-800';
      case 'faq': return 'bg-orange-100 text-orange-800';
      case 'page': return 'bg-gray-100 text-gray-800';
      case 'team': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cn("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10"
          autoComplete="off"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearSearch();
              inputRef.current?.focus();
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <CloseIcon className="h-4 w-4" />
          </Button>
        )}
        {isSearching && (
          <LoaderIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {/* No query - show history and popular searches */}
            {!query && (
              <div className="p-4 space-y-4">
                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Búsquedas Recientes
                      </span>
                    </div>
                    <div className="space-y-1">
                      {searchHistory.slice(0, 5).map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleHistoryClick(item)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Búsquedas Populares
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.slice(0, 6).map((search, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleSuggestionClick(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* With query - show suggestions and results */}
            {query && (
              <div className="divide-y">
                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-3">
                      Sugerencias
                    </div>
                    <div className="space-y-1">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm flex items-center justify-between",
                            selectedIndex === index && "bg-muted"
                          )}
                        >
                          <span>{suggestion}</span>
                          <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Results */}
                {results.length > 0 && (
                  <div className="p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-3">
                      Resultados
                    </div>
                    <div className="space-y-2">
                      {results.slice(0, 3).map((result, index) => {
                        const adjustedIndex = suggestions.length + index;
                        return (
                          <button
                            key={result.id}
                            onClick={() => handleResultClick(result, index)}
                            className={cn(
                              "w-full text-left p-3 rounded-lg hover:bg-muted transition-colors",
                              selectedIndex === adjustedIndex && "bg-muted"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-lg">
                                {getCategoryIcon(result.category)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-sm truncate">
                                    {result.title}
                                  </h4>
                                  <Badge 
                                    variant="outline" 
                                    className={cn("text-xs", getCategoryColor(result.category))}
                                  >
                                    {result.category}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {result.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Show all results link */}
                    {results.length > 3 && (
                      <button
                        onClick={() => handleSearch(query)}
                        className="w-full mt-3 p-2 text-center text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        Ver todos los {results.length} resultados
                      </button>
                    )}
                  </div>
                )}

                {/* No results */}
                {query.length > 2 && !isSearching && results.length === 0 && suggestions.length === 0 && (
                  <div className="p-4 text-center">
                    <div className="text-muted-foreground mb-2">
                      No se encontraron resultados para "{query}"
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Intenta con términos diferentes o más generales
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 