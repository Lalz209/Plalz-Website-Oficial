import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PortfolioProject } from '@/lib/types/portfolio';
import { PORTFOLIO_PROJECTS } from '@/lib/data/portfolio-data';
import { ProjectDetailClient } from '@/components/portfolio/project-detail-client';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

// This would normally be generated dynamically
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = PORTFOLIO_PROJECTS.find(p => p.slug === params.slug);
  
  if (!project) {
    return {
      title: 'Proyecto no encontrado | Plalz',
    };
  }

  return {
    title: project.seo.metaTitle,
    description: project.seo.metaDescription,
    keywords: project.seo.keywords,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.seo.ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.seo.ogImage],
    },
    alternates: {
      canonical: `/portfolio/${project.slug}`,
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = PORTFOLIO_PROJECTS.find(p => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  // Schema.org structured data for the project
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "url": `https://plalz.com/portfolio/${project.slug}`,
    "image": project.heroImage,
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
    "keywords": project.seo.keywords.join(", "),
    "client": {
      "@type": "Organization",
      "name": project.client.name,
      "url": project.client.website
    }
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <ProjectDetailClient project={project} />
    </>
  );
} 