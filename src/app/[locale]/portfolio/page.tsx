import { Metadata } from 'next';
import { PortfolioPageClient } from '@/components/portfolio/portfolio-page-client';
import { PORTFOLIO_PROJECTS } from '@/lib/data/portfolio-data';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Portfolio de Proyectos | Plalz - Desarrollo Web y Diseño Digital',
  description: 'Explora nuestro portfolio de proyectos exitosos. Desde e-commerce hasta aplicaciones web complejas, descubre cómo transformamos ideas en experiencias digitales.',
  keywords: [
    'portfolio desarrollo web',
    'proyectos web',
    'diseño digital',
    'casos de estudio',
    'desarrollo ecommerce',
    'aplicaciones web',
    'diseño ux ui',
    'plalz portfolio'
  ],
  openGraph: {
    title: 'Portfolio de Proyectos | Plalz',
    description: 'Descubre nuestros proyectos exitosos y casos de estudio en desarrollo web y diseño digital.',
    images: [
      {
        url: '/og-images/portfolio.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Plalz - Proyectos de Desarrollo Web',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio de Proyectos | Plalz',
    description: 'Explora nuestros proyectos exitosos en desarrollo web y diseño digital.',
    images: ['/og-images/portfolio.jpg'],
  },
  alternates: {
    canonical: '/portfolio',
  },
};

// Schema.org structured data
const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Portfolio de Proyectos - Plalz",
  "description": "Colección de proyectos exitosos de desarrollo web y diseño digital realizados por Plalz.",
  "url": "https://plalz.com/portfolio",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": PORTFOLIO_PROJECTS.length,
    "itemListElement": PORTFOLIO_PROJECTS.map((project, index) => ({
      "@type": "CreativeWork",
      "position": index + 1,
      "name": project.title,
      "description": project.description,
      "url": `/portfolio/${project.slug}`,
      "image": project.thumbnail,
      "dateCreated": project.launchDate.toISOString(),
      "creator": {
        "@type": "Organization",
        "name": "Plalz",
        "url": "https://plalz.com"
      },
      "about": {
        "@type": "Thing",
        "name": project.category
      },
      "keywords": project.seo.keywords.join(", ")
    }))
  },
  "provider": {
    "@type": "Organization",
    "name": "Plalz",
    "url": "https://plalz.com",
    "logo": "https://plalz.com/logo.png"
  }
};

export default function PortfolioPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      
      <PortfolioPageClient />
    </>
  );
} 