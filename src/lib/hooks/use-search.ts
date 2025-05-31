"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import Fuse, { FuseResult, IFuseOptions } from 'fuse.js';
import { SearchItem, ALL_SEARCH_DATA } from '@/lib/data/search-data';
import { useSearchAnalytics } from '@/lib/analytics/search-analytics';

export interface SearchFilters {
  category: string;
  sortBy: 'relevance' | 'date' | 'priority';
  dateRange?: 'week' | 'month' | 'year' | 'all';
}

export interface SearchResult extends SearchItem {
  score?: number;
  matches?: FuseResult<SearchItem>['matches'];
}

export interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  totalResults: number;
  searchHistory: string[];
  clearHistory: () => void;
  addToHistory: (query: string) => void;
  suggestions: string[];
  clearSearch: () => void;
  trackResultClick: (result: SearchResult, position: number) => void;
}

// Fuse.js configuration for fuzzy search
const fuseOptions: IFuseOptions<SearchItem> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'content', weight: 0.2 },
    { name: 'tags', weight: 0.1 }
  ],
  threshold: 0.4, // Lower = more strict matching
  distance: 100,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  shouldSort: true,
  findAllMatches: true
};

const SEARCH_HISTORY_KEY = 'plalz_search_history';
const MAX_HISTORY_ITEMS = 10;

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFiltersState] = useState<SearchFilters>({
    category: 'all',
    sortBy: 'relevance'
  });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const analytics = useSearchAnalytics();

  // Initialize Fuse.js instance
  const fuse = useMemo(() => new Fuse(ALL_SEARCH_DATA, fuseOptions), []);

  // Load search history from localStorage
  useEffect(() => {
    if (!isBrowser) return;
    
    try {
      const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (saved) {
        setSearchHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, []);

  // Debounce search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Perform search
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [];
    }

    let searchResults: SearchResult[];

    // Use Fuse.js for fuzzy search
    const fuseResults = fuse.search(debouncedQuery);
    searchResults = fuseResults.map(result => ({
      ...result.item,
      score: result.score,
      matches: result.matches
    }));

    // Apply category filter
    if (filters.category !== 'all') {
      searchResults = searchResults.filter(item => item.category === filters.category);
    }

    // Apply date filter for blog posts
    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (filters.dateRange) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      searchResults = searchResults.filter(item => {
        if (!item.lastUpdated) return true;
        return new Date(item.lastUpdated) >= cutoffDate;
      });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'relevance':
        // Already sorted by Fuse.js score
        break;
      case 'date':
        searchResults.sort((a, b) => {
          const dateA = a.lastUpdated ? new Date(a.lastUpdated) : new Date(0);
          const dateB = b.lastUpdated ? new Date(b.lastUpdated) : new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'priority':
        searchResults.sort((a, b) => b.priority - a.priority);
        break;
    }

    return searchResults;
  }, [debouncedQuery, filters, fuse]);

  // Track search analytics when results change
  useEffect(() => {
    if (debouncedQuery.trim()) {
      analytics.trackSearch({
        query: debouncedQuery,
        category: filters.category !== 'all' ? filters.category : undefined,
        resultsCount: results.length,
        source: 'page' // This will be overridden by specific components
      });
    }
  }, [debouncedQuery, results.length, filters.category, analytics]);

  // Generate suggestions based on search data
  const suggestions = useMemo(() => {
    if (!query.trim() || query.length < 2) {
      return [];
    }

    const queryLower = query.toLowerCase();
    const suggestions = new Set<string>();

    // Add matching titles
    ALL_SEARCH_DATA.forEach(item => {
      if (item.title.toLowerCase().includes(queryLower)) {
        suggestions.add(item.title);
      }
      
      // Add matching tags
      item.tags.forEach(tag => {
        if (tag.toLowerCase().includes(queryLower)) {
          suggestions.add(tag);
        }
      });
    });

    return Array.from(suggestions).slice(0, 5);
  }, [query]);

  // Update filters
  const setFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Add to search history
  const addToHistory = useCallback((searchQuery: string) => {
    if (!searchQuery.trim() || !isBrowser) return;

    const newHistory = [
      searchQuery,
      ...searchHistory.filter(item => item !== searchQuery)
    ].slice(0, MAX_HISTORY_ITEMS);

    setSearchHistory(newHistory);
    
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }, [searchHistory]);

  // Clear search history
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    if (isBrowser) {
      try {
        localStorage.removeItem(SEARCH_HISTORY_KEY);
      } catch (error) {
        console.error('Error clearing search history:', error);
      }
    }
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  // Track result click
  const trackResultClick = useCallback((result: SearchResult, position: number) => {
    if (debouncedQuery.trim()) {
      analytics.trackResultClick(debouncedQuery, {
        id: result.id,
        title: result.title,
        category: result.category,
        position
      });
    }
  }, [debouncedQuery, analytics]);

  return {
    query,
    setQuery,
    results,
    isSearching,
    filters,
    setFilters,
    totalResults: results.length,
    searchHistory,
    clearHistory,
    addToHistory,
    suggestions,
    clearSearch,
    trackResultClick
  };
} 