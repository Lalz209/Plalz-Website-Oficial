import { useEffect, useState } from 'react';
import { useQuoteStore } from '@/lib/stores/quote-store';

/**
 * Hook to safely handle hydration with Zustand persist
 * Prevents hydration errors by ensuring client-side state is ready
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);
  const hasHydrated = useQuoteStore((state) => state._hasHydrated);

  useEffect(() => {
    // Set hydrated state once the component mounts on client
    setIsHydrated(true);
  }, []);

  return isHydrated && hasHydrated;
}

/**
 * Hook to safely access Zustand store after hydration
 * Returns default values during SSR and hydration
 */
export function useQuoteStoreHydrated() {
  const isHydrated = useHydration();
  const store = useQuoteStore();

  if (!isHydrated) {
    // Return safe default values during SSR/hydration
    return {
      currentQuote: {},
      currentStep: 1,
      estimatedPrice: 0,
      quotes: [],
      _hasHydrated: false,
      setHasHydrated: () => {},
      updateQuoteData: () => {},
      setCurrentStep: () => {},
      calculatePrice: () => 0,
      saveQuote: () => '',
      submitQuote: () => {},
      clearCurrentQuote: () => {},
      loadQuote: () => {},
      deleteQuote: () => {},
      updateQuoteStatus: () => {},
    };
  }

  return store;
} 