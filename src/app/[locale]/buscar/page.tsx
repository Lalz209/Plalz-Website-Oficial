import { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchResults } from '@/components/search/search-results';
import { Card, CardContent } from '@/components/ui/card';
import { SearchIcon } from '@/components/ui/icons';

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string;
    sort?: string;
  };
}

// SEO Metadata
export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || '';
  
  return {
    title: query 
      ? `Resultados para "${query}" | Plalz - Búsqueda`
      : 'Búsqueda | Plalz - Encuentra lo que Necesitas',
    description: query
      ? `Resultados de búsqueda para "${query}". Encuentra servicios, artículos del blog, proyectos del portfolio y más en Plalz.`
      : 'Busca servicios de desarrollo web, artículos del blog, proyectos del portfolio, FAQ y más contenido en Plalz.',
    keywords: [
      'búsqueda plalz',
      'buscar servicios',
      'desarrollo web',
      'blog tecnología',
      'portfolio proyectos',
      query
    ].filter(Boolean),
    openGraph: {
      title: query 
        ? `Resultados para "${query}" | Plalz`
        : 'Búsqueda | Plalz',
      description: query
        ? `Resultados de búsqueda para "${query}" en Plalz`
        : 'Encuentra servicios, blog, portfolio y más en Plalz',
      type: 'website',
    },
    robots: {
      index: false, // Don't index search result pages
      follow: true,
    },
    alternates: {
      canonical: query ? `/buscar?q=${encodeURIComponent(query)}` : '/buscar',
    },
  };
}

// Schema.org structured data for search page
function generateSearchSchema(query?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "name": query ? `Resultados para "${query}"` : "Búsqueda",
    "description": query 
      ? `Resultados de búsqueda para "${query}" en Plalz`
      : "Página de búsqueda de Plalz",
    "url": `https://plalz.com/buscar${query ? `?q=${encodeURIComponent(query)}` : ''}`,
    "mainEntity": {
      "@type": "WebSite",
      "name": "Plalz",
      "url": "https://plalz.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://plalz.com/buscar?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  };
}

function SearchPageContent({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {query ? `Resultados para "${query}"` : 'Búsqueda Global'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {query 
                ? 'Encuentra exactamente lo que buscas en nuestros servicios, blog, portfolio y más'
                : 'Busca servicios, artículos del blog, proyectos del portfolio, FAQ y todo nuestro contenido'
              }
            </p>
          </div>

          {/* Search Results */}
          <SearchResults initialQuery={query} />
        </div>
      </div>
    </main>
  );
}

function SearchPageSkeleton() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-muted animate-pulse mx-auto mb-6"></div>
            <div className="h-12 bg-muted rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-muted rounded-lg w-2/3 mx-auto animate-pulse"></div>
          </div>

          {/* Search Bar Skeleton */}
          <div className="mb-8">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 h-12 bg-muted rounded-lg animate-pulse"></div>
              <div className="w-24 h-12 bg-muted rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Results Skeleton */}
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Filters Skeleton */}
            <div className="hidden lg:block">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="h-5 bg-muted rounded animate-pulse"></div>
                      <div className="space-y-2">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="h-10 bg-muted rounded animate-pulse"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Skeleton */}
            <div className="lg:col-span-3 space-y-6">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg animate-pulse"></div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-6 bg-muted rounded animate-pulse"></div>
                          <div className="w-20 h-6 bg-muted rounded animate-pulse"></div>
                        </div>
                        <div className="h-6 bg-muted rounded animate-pulse"></div>
                        <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                        <div className="flex gap-2">
                          <div className="w-16 h-6 bg-muted rounded animate-pulse"></div>
                          <div className="w-20 h-6 bg-muted rounded animate-pulse"></div>
                          <div className="w-14 h-6 bg-muted rounded animate-pulse"></div>
                        </div>
                        <div className="w-24 h-8 bg-muted rounded animate-pulse"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSearchSchema(query)) }}
      />
      
      <Suspense fallback={<SearchPageSkeleton />}>
        <SearchPageContent searchParams={searchParams} />
      </Suspense>
    </>
  );
} 