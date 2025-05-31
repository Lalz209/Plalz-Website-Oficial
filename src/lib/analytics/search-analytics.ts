"use client";

// Search analytics utility for tracking search behavior
// This prepares the foundation for analytics integration

export interface SearchEvent {
  query: string;
  category?: string;
  resultsCount: number;
  timestamp: Date;
  source: 'header' | 'page' | 'suggestion' | 'history';
  clickedResult?: {
    id: string;
    title: string;
    category: string;
    position: number;
  };
}

export interface SearchAnalytics {
  trackSearch: (event: Omit<SearchEvent, 'timestamp'>) => void;
  trackResultClick: (query: string, result: SearchEvent['clickedResult']) => void;
  trackNoResults: (query: string, source: SearchEvent['source']) => void;
  getSearchStats: () => SearchStats;
  getPopularQueries: (limit?: number) => string[];
  getFailedQueries: (limit?: number) => string[];
}

export interface SearchStats {
  totalSearches: number;
  uniqueQueries: number;
  averageResultsPerSearch: number;
  clickThroughRate: number;
  noResultsRate: number;
  topCategories: Array<{ category: string; count: number }>;
  searchSources: Array<{ source: string; count: number }>;
}

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

class SearchAnalyticsManager implements SearchAnalytics {
  private events: SearchEvent[] = [];
  private readonly STORAGE_KEY = 'plalz_search_analytics';
  private readonly MAX_EVENTS = 1000; // Limit stored events

  constructor() {
    if (isBrowser) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    if (!isBrowser) return;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.events = data.map((event: any) => ({
          ...event,
          timestamp: new Date(event.timestamp)
        }));
      }
    } catch (error) {
      console.error('Error loading search analytics:', error);
    }
  }

  private saveToStorage() {
    if (!isBrowser) return;
    
    try {
      // Keep only the most recent events
      const eventsToSave = this.events.slice(-this.MAX_EVENTS);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(eventsToSave));
    } catch (error) {
      console.error('Error saving search analytics:', error);
    }
  }

  trackSearch(event: Omit<SearchEvent, 'timestamp'>) {
    const searchEvent: SearchEvent = {
      ...event,
      timestamp: new Date()
    };

    this.events.push(searchEvent);
    this.saveToStorage();

    // Send to external analytics if configured
    this.sendToExternalAnalytics('search', searchEvent);
  }

  trackResultClick(query: string, result: SearchEvent['clickedResult']) {
    // Find the most recent search event for this query
    const searchEvent = this.events
      .slice()
      .reverse()
      .find(event => event.query === query && !event.clickedResult);

    if (searchEvent && result) {
      searchEvent.clickedResult = result;
      this.saveToStorage();

      // Send to external analytics
      this.sendToExternalAnalytics('result_click', {
        query,
        result,
        timestamp: new Date()
      });
    }
  }

  trackNoResults(query: string, source: SearchEvent['source']) {
    this.trackSearch({
      query,
      resultsCount: 0,
      source
    });

    // Send specific no results event
    this.sendToExternalAnalytics('no_results', {
      query,
      source,
      timestamp: new Date()
    });
  }

  getSearchStats(): SearchStats {
    const totalSearches = this.events.length;
    const uniqueQueries = new Set(this.events.map(e => e.query)).size;
    const totalResults = this.events.reduce((sum, e) => sum + e.resultsCount, 0);
    const averageResultsPerSearch = totalSearches > 0 ? totalResults / totalSearches : 0;
    
    const clickedSearches = this.events.filter(e => e.clickedResult).length;
    const clickThroughRate = totalSearches > 0 ? clickedSearches / totalSearches : 0;
    
    const noResultsSearches = this.events.filter(e => e.resultsCount === 0).length;
    const noResultsRate = totalSearches > 0 ? noResultsSearches / totalSearches : 0;

    // Top categories
    const categoryCount = new Map<string, number>();
    this.events.forEach(event => {
      if (event.category) {
        categoryCount.set(event.category, (categoryCount.get(event.category) || 0) + 1);
      }
    });
    const topCategories = Array.from(categoryCount.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Search sources
    const sourceCount = new Map<string, number>();
    this.events.forEach(event => {
      sourceCount.set(event.source, (sourceCount.get(event.source) || 0) + 1);
    });
    const searchSources = Array.from(sourceCount.entries())
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalSearches,
      uniqueQueries,
      averageResultsPerSearch,
      clickThroughRate,
      noResultsRate,
      topCategories,
      searchSources
    };
  }

  getPopularQueries(limit = 10): string[] {
    const queryCount = new Map<string, number>();
    
    this.events.forEach(event => {
      if (event.resultsCount > 0) { // Only count successful searches
        queryCount.set(event.query, (queryCount.get(event.query) || 0) + 1);
      }
    });

    return Array.from(queryCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([query]) => query);
  }

  getFailedQueries(limit = 10): string[] {
    const failedQueries = new Map<string, number>();
    
    this.events.forEach(event => {
      if (event.resultsCount === 0) {
        failedQueries.set(event.query, (failedQueries.get(event.query) || 0) + 1);
      }
    });

    return Array.from(failedQueries.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([query]) => query);
  }

  private sendToExternalAnalytics(eventType: string, data: any) {
    // Only send analytics in browser environment
    if (!isBrowser) return;
    
    // Placeholder for external analytics integration
    // This is where you would send data to Google Analytics, Mixpanel, etc.
    
    // Google Analytics 4 example
    if ('gtag' in window) {
      (window as any).gtag('event', eventType, {
        search_term: data.query,
        search_results: data.resultsCount,
        search_source: data.source,
        custom_parameter: data
      });
    }

    // Custom analytics endpoint example
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: eventType,
          data,
          timestamp: new Date().toISOString()
        })
      }).catch(error => {
        console.error('Failed to send analytics:', error);
      });
    }
  }

  // Clear analytics data (for privacy compliance)
  clearData() {
    this.events = [];
    if (isBrowser) {
      try {
        localStorage.removeItem(this.STORAGE_KEY);
      } catch (error) {
        console.error('Error clearing search analytics:', error);
      }
    }
  }

  // Export data for analysis
  exportData() {
    return {
      events: this.events,
      stats: this.getSearchStats(),
      popularQueries: this.getPopularQueries(20),
      failedQueries: this.getFailedQueries(20)
    };
  }
}

// Singleton instance
export const searchAnalytics = new SearchAnalyticsManager();

// React hook for using search analytics
export function useSearchAnalytics() {
  return searchAnalytics;
} 