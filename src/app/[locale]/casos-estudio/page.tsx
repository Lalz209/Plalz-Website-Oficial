import { Metadata } from 'next';
import { CaseStudiesPageClient } from '@/components/portfolio/case-studies-page-client';
import { CASE_STUDIES } from '@/lib/data/portfolio-data';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Casos de Estudio | Plalz - Análisis Detallados de Proyectos Exitosos',
  description: 'Explora nuestros casos de estudio detallados. Descubre las estrategias, procesos y resultados que han llevado al éxito a nuestros clientes.',
  keywords: [
    'casos de estudio',
    'análisis de proyectos',
    'resultados web',
    'estrategias digitales',
    'optimización conversión',
    'desarrollo web casos',
    'diseño ux casos',
    'plalz casos estudio'
  ],
  openGraph: {
    title: 'Casos de Estudio | Plalz',
    description: 'Análisis detallados de proyectos exitosos y las estrategias que los llevaron al éxito.',
    images: [
      {
        url: '/og-images/case-studies.jpg',
        width: 1200,
        height: 630,
        alt: 'Casos de Estudio Plalz',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casos de Estudio | Plalz',
    description: 'Descubre las estrategias y resultados de nuestros proyectos más exitosos.',
    images: ['/og-images/case-studies.jpg'],
  },
  alternates: {
    canonical: '/casos-estudio',
  },
};

// Schema.org structured data
const caseStudiesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Casos de Estudio - Plalz",
  "description": "Colección de casos de estudio detallados de proyectos exitosos realizados por Plalz.",
  "url": "https://plalz.com/casos-estudio",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": CASE_STUDIES.length,
    "itemListElement": CASE_STUDIES.map((caseStudy, index) => ({
      "@type": "Article",
      "position": index + 1,
      "headline": caseStudy.title,
      "description": caseStudy.description,
      "url": `/casos-estudio/${caseStudy.slug}`,
      "image": caseStudy.thumbnail,
      "datePublished": caseStudy.publishedAt.toISOString(),
      "author": {
        "@type": "Organization",
        "name": "Plalz",
        "url": "https://plalz.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Plalz",
        "url": "https://plalz.com",
        "logo": "https://plalz.com/logo.png"
      },
      "about": {
        "@type": "Thing",
        "name": caseStudy.industry
      },
      "keywords": caseStudy.seo.keywords.join(", ")
    }))
  }
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }}
      />
      
      <CaseStudiesPageClient />
    </>
  );
} 