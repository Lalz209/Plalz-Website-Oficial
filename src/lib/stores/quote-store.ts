import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuoteFormData, Quote, QuoteStatus } from '@/lib/types/quote';
import { PROJECT_TYPES, INDUSTRIES, FEATURES, INTEGRATIONS, PRIORITY_LEVELS } from '@/lib/data/quote-data';

interface QuoteStore {
  // Current quote form data
  currentQuote: Partial<QuoteFormData>;
  currentStep: number;
  estimatedPrice: number;
  
  // Saved quotes
  quotes: Quote[];
  
  // Hydration state
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  
  // Actions
  updateQuoteData: (step: number, data: Partial<QuoteFormData>) => void;
  setCurrentStep: (step: number) => void;
  calculatePrice: () => number;
  saveQuote: () => string;
  submitQuote: (quoteId: string) => void;
  clearCurrentQuote: () => void;
  loadQuote: (quoteId: string) => void;
  deleteQuote: (quoteId: string) => void;
  updateQuoteStatus: (quoteId: string, status: QuoteStatus) => void;
}

const calculateEstimatedPrice = (formData: Partial<QuoteFormData>): number => {
  let basePrice = 0;
  let multiplier = 1;

  // Base price from project type
  if (formData.projectType) {
    basePrice = PROJECT_TYPES[formData.projectType].basePrice;
  }

  // Industry multiplier
  if (formData.industry) {
    multiplier *= INDUSTRIES[formData.industry].multiplier;
  }

  // Features price impact
  let featuresPrice = 0;
  if (formData.selectedFeatures) {
    formData.selectedFeatures.forEach(featureId => {
      const feature = FEATURES.find(f => f.id === featureId);
      if (feature) {
        featuresPrice += feature.priceImpact;
      }
    });
  }

  // Integrations price impact
  let integrationsPrice = 0;
  if (formData.selectedIntegrations) {
    formData.selectedIntegrations.forEach(integrationId => {
      const integration = INTEGRATIONS.find(i => i.id === integrationId);
      if (integration) {
        integrationsPrice += integration.priceImpact;
      }
    });
  }

  // Priority multiplier
  if (formData.timeline?.priority) {
    multiplier *= PRIORITY_LEVELS[formData.timeline.priority].multiplier;
  }

  // Design type multiplier
  if (formData.designPreferences?.type) {
    switch (formData.designPreferences.type) {
      case 'template':
        multiplier *= 0.8;
        break;
      case 'custom':
        multiplier *= 1.5;
        break;
      case 'hybrid':
        multiplier *= 1.2;
        break;
    }
  }

  const totalPrice = (basePrice + featuresPrice + integrationsPrice) * multiplier;
  return Math.round(totalPrice);
};

// Helper function to create a safe timestamp
const createTimestamp = () => {
  // Use a consistent timestamp for SSR, will be updated on client
  if (typeof window === 'undefined') {
    return new Date('2024-01-01T00:00:00.000Z');
  }
  return new Date();
};

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      currentQuote: {},
      currentStep: 1,
      estimatedPrice: 0,
      quotes: [],
      _hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },

      updateQuoteData: (step: number, data: Partial<QuoteFormData>) => {
        set((state) => {
          const updatedQuote = { ...state.currentQuote, ...data };
          const estimatedPrice = calculateEstimatedPrice(updatedQuote);
          
          return {
            currentQuote: updatedQuote,
            estimatedPrice,
          };
        });
      },

      setCurrentStep: (step: number) => {
        set({ currentStep: step });
      },

      calculatePrice: () => {
        const { currentQuote } = get();
        const price = calculateEstimatedPrice(currentQuote);
        set({ estimatedPrice: price });
        return price;
      },

      saveQuote: () => {
        const { currentQuote, estimatedPrice } = get();
        const quoteId = `quote-${Date.now()}`;
        
        const newQuote: Quote = {
          id: quoteId,
          formData: currentQuote as QuoteFormData,
          status: 'draft',
          estimatedPrice,
          createdAt: createTimestamp(),
          updatedAt: createTimestamp(),
          versions: [],
        };

        set((state) => ({
          quotes: [...state.quotes, newQuote],
        }));

        return quoteId;
      },

      submitQuote: (quoteId: string) => {
        set((state) => ({
          quotes: state.quotes.map(quote =>
            quote.id === quoteId
              ? {
                  ...quote,
                  status: 'submitted' as QuoteStatus,
                  submittedAt: createTimestamp(),
                  updatedAt: createTimestamp(),
                }
              : quote
          ),
        }));
      },

      clearCurrentQuote: () => {
        set({
          currentQuote: {},
          currentStep: 1,
          estimatedPrice: 0,
        });
      },

      loadQuote: (quoteId: string) => {
        const { quotes } = get();
        const quote = quotes.find(q => q.id === quoteId);
        
        if (quote) {
          set({
            currentQuote: quote.formData,
            estimatedPrice: quote.estimatedPrice,
            currentStep: 1,
          });
        }
      },

      deleteQuote: (quoteId: string) => {
        set((state) => ({
          quotes: state.quotes.filter(quote => quote.id !== quoteId),
        }));
      },

      updateQuoteStatus: (quoteId: string, status: QuoteStatus) => {
        set((state) => ({
          quotes: state.quotes.map(quote =>
            quote.id === quoteId
              ? {
                  ...quote,
                  status,
                  updatedAt: createTimestamp(),
                  ...(status === 'quoted' && { quotedAt: createTimestamp() }),
                }
              : quote
          ),
        }));
      },
    }),
    {
      name: 'quote-storage',
      partialize: (state) => ({
        quotes: state.quotes,
        currentQuote: state.currentQuote,
        currentStep: state.currentStep,
        estimatedPrice: state.estimatedPrice,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
); 