// Search components exports
export { GlobalSearch } from './global-search';
export { SearchResults } from './search-results';

// Re-export search hooks and utilities
export { useSearch } from '@/lib/hooks/use-search';
export { useSearchAnalytics } from '@/lib/analytics/search-analytics';
export { useSearchShortcut, useKeyboardShortcut } from '@/lib/hooks/use-keyboard-shortcut';

// Re-export search data
export * from '@/lib/data/search-data'; 