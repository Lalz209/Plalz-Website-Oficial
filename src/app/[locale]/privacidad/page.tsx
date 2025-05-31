import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PrintButton } from '@/components/ui/print-button';
import { PRIVACY_POLICY } from '@/lib/data/legal-data';
import { COMPANY_INFO } from '@/lib/data/company-data';
import { 
  ShieldCheckIcon, 
  CalendarIcon, 
  MailIcon,
  BookOpenIcon
} from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Plalz - Protección de Datos',
  description: 'Política de privacidad de Plalz. Información sobre cómo recopilamos, utilizamos y protegemos tus datos personales según GDPR.',
  keywords: [
    'política privacidad plalz',
    'protección datos',
    'GDPR',
    'privacidad web',
    'datos personales'
  ],
  openGraph: {
    title: 'Política de Privacidad | Plalz',
    description: 'Conoce cómo protegemos tu privacidad y datos personales según las normativas GDPR.',
    type: 'article',
  },
  alternates: {
    canonical: '/privacidad',
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
          {PRIVACY_POLICY.sections.map((section) => (
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

function PolicyHeader() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Badge className="bg-primary/10 text-primary border-primary/20">
          <ShieldCheckIcon className="h-4 w-4 mr-2" />
          Política de Privacidad
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Política de Privacidad
        </h1>
        <p className="text-xl text-muted-foreground">
          En Plalz nos comprometemos a proteger y respetar tu privacidad. 
          Esta política explica cómo recopilamos y utilizamos tu información personal.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
          <CalendarIcon className="h-4 w-4" />
          <span>Última actualización: {PRIVACY_POLICY.lastUpdated}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
          <CalendarIcon className="h-4 w-4" />
          <span>Vigente desde: {PRIVACY_POLICY.effectiveDate}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <PrintButton />
        <Button variant="outline" asChild>
          <a href={`mailto:${COMPANY_INFO.contact.email}?subject=Consulta sobre Política de Privacidad`}>
            <MailIcon className="h-4 w-4 mr-2" />
            Contactar
          </a>
        </Button>
      </div>
    </div>
  );
}

function PolicyContent() {
  return (
    <div className="prose prose-lg max-w-none">
      {PRIVACY_POLICY.sections.map((section) => (
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
            <h3 className="text-2xl font-bold mb-2">¿Tienes Dudas sobre tu Privacidad?</h3>
            <p className="text-muted-foreground">
              Si tienes preguntas sobre esta política o quieres ejercer tus derechos de protección de datos, 
              no dudes en contactarnos.
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-center">
                <p className="font-medium">Email de Privacidad</p>
                <a 
                  href="mailto:privacy@plalz.com" 
                  className="text-primary hover:underline"
                >
                  privacy@plalz.com
                </a>
              </div>
              <div className="text-center">
                <p className="font-medium">Delegado de Protección de Datos</p>
                <a 
                  href="mailto:dpo@plalz.com" 
                  className="text-primary hover:underline"
                >
                  dpo@plalz.com
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

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <PolicyHeader />
          </div>

          {/* Content */}
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <TableOfContents />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              <PolicyContent />
              <ContactSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 