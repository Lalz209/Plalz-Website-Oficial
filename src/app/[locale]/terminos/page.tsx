import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PrintButton } from '@/components/ui/print-button';
import { TERMS_CONDITIONS } from '@/lib/data/legal-data';
import { COMPANY_INFO } from '@/lib/data/company-data';
import { 
  FileTextIcon, 
  CalendarIcon, 
  MailIcon,
  BookOpenIcon,
  ExternalLinkIcon
} from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Plalz - Condiciones de Servicio',
  description: 'Términos y condiciones de Plalz. Conoce las condiciones de uso de nuestros servicios de desarrollo web y consultoría digital.',
  keywords: [
    'términos condiciones plalz',
    'condiciones servicio',
    'términos uso',
    'contrato desarrollo web',
    'condiciones legales'
  ],
  openGraph: {
    title: 'Términos y Condiciones | Plalz',
    description: 'Términos y condiciones de uso de los servicios de desarrollo web de Plalz.',
    type: 'article',
  },
  alternates: {
    canonical: '/terminos',
  },
  robots: {
    index: true,
    follow: true,
  },
};

function TableOfContents() {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpenIcon className="h-5 w-5" />
          Índice de Contenidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          {TERMS_CONDITIONS.sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block py-2 px-3 rounded-lg text-sm hover:bg-muted transition-colors"
            >
              {section.title}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}

function TermsHeader() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Badge className="bg-primary/10 text-primary border-primary/20">
          <FileTextIcon className="h-4 w-4 mr-2" />
          Términos y Condiciones
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Términos y Condiciones
        </h1>
        <p className="text-xl text-muted-foreground">
          Estos términos rigen el uso de nuestros servicios de desarrollo web y consultoría digital. 
          Al contratar nuestros servicios, aceptas estas condiciones.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
          <CalendarIcon className="h-4 w-4" />
          <span>Última actualización: {TERMS_CONDITIONS.lastUpdated}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
          <CalendarIcon className="h-4 w-4" />
          <span>Vigente desde: {TERMS_CONDITIONS.effectiveDate}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <PrintButton />
        <Button variant="outline" asChild>
          <a href={`mailto:${COMPANY_INFO.contact.email}?subject=Consulta sobre Términos y Condiciones`}>
            <MailIcon className="h-4 w-4 mr-2" />
            Contactar
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/privacidad">
            <ExternalLinkIcon className="h-4 w-4 mr-2" />
            Política de Privacidad
          </a>
        </Button>
      </div>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="prose prose-lg max-w-none">
      {TERMS_CONDITIONS.sections.map((section) => (
        <section key={section.id} id={section.id} className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            {section.title}
          </h2>
          <div 
            className="text-muted-foreground leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ 
              __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
            }}
          />
        </section>
      ))}
    </div>
  );
}

function ContactSection() {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <MailIcon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">¿Tienes Dudas Legales?</h3>
            <p className="text-muted-foreground">
              Si tienes preguntas sobre estos términos o necesitas aclaraciones sobre nuestros servicios, 
              nuestro equipo legal está disponible para ayudarte.
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-center">
                <p className="font-medium">Consultas Legales</p>
                <a 
                  href="mailto:legal@plalz.com" 
                  className="text-primary hover:underline"
                >
                  legal@plalz.com
                </a>
              </div>
              <div className="text-center">
                <p className="font-medium">Teléfono</p>
                <a 
                  href={`tel:${COMPANY_INFO.contact.phone}`} 
                  className="text-primary hover:underline"
                >
                  {COMPANY_INFO.contact.phone}
                </a>
              </div>
            </div>
            <Button asChild>
              <a href="/contacto">Contactar Ahora</a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RelatedDocuments() {
  const documents = [
    {
      title: "Política de Privacidad",
      description: "Cómo protegemos y utilizamos tu información personal",
      href: "/privacidad",
      icon: FileTextIcon
    },
    {
      title: "Precios y Planes",
      description: "Información detallada sobre nuestros servicios y precios",
      href: "/precios",
      icon: FileTextIcon
    },
    {
      title: "Proceso de Trabajo",
      description: "Conoce cómo trabajamos en cada proyecto",
      href: "/sobre-nosotros",
      icon: FileTextIcon
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos Relacionados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {documents.map((doc, index) => (
          <a
            key={index}
            href={doc.href}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
          >
            <doc.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium group-hover:text-primary transition-colors">
                {doc.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {doc.description}
              </p>
            </div>
            <ExternalLinkIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto flex-shrink-0 mt-0.5" />
          </a>
        ))}
      </CardContent>
    </Card>
  );
}

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <TermsHeader />
          </div>

          {/* Content */}
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Table of Contents */}
            <div className="lg:col-span-1 space-y-6">
              <TableOfContents />
              <RelatedDocuments />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              <TermsContent />
              <ContactSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 