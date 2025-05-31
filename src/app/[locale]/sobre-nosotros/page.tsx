import { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/data/company-data';
import { 
  UsersIcon, 
  TrendingUpIcon, 
  AwardIcon,
  LinkedInIcon,
  CalendarIcon,
  CheckCircleIcon,
  SparklesIcon,
  HeartIcon,
  RocketIcon
} from '@/components/ui/icons';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Sobre Nosotros | Plalz - Conoce Nuestro Equipo y Historia',
  description: 'Descubre la historia de Plalz, nuestro equipo de expertos en desarrollo web y nuestra misión de transformar ideas en experiencias digitales excepcionales.',
  keywords: [
    'sobre nosotros plalz',
    'equipo desarrollo web',
    'historia empresa',
    'misión visión valores',
    'agencia desarrollo web madrid',
    'equipo expertos web',
    'cultura empresa'
  ],
  openGraph: {
    title: 'Sobre Nosotros | Plalz - Conoce Nuestro Equipo',
    description: 'Conoce la historia, misión y equipo detrás de Plalz. Especialistas en desarrollo web con más de 4 años transformando ideas en realidades digitales.',
    images: [
      {
        url: '/og-images/about.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipo Plalz - Sobre Nosotros',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nosotros | Plalz - Conoce Nuestro Equipo',
    description: 'Descubre la historia y equipo detrás de Plalz, especialistas en desarrollo web y soluciones digitales.',
    images: ['/og-images/about.jpg'],
  },
  alternates: {
    canonical: '/sobre-nosotros',
  },
};

// Schema.org structured data
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Sobre Nosotros - Plalz",
  "description": "Conoce la historia, misión y equipo de Plalz, especialistas en desarrollo web y soluciones digitales.",
  "url": "https://plalz.com/sobre-nosotros",
  "mainEntity": {
    "@type": "Organization",
    "name": COMPANY_INFO.name,
    "description": COMPANY_INFO.description,
    "foundingDate": COMPANY_INFO.founded.toString(),
    "numberOfEmployees": COMPANY_INFO.employees,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY_INFO.contact.address.street,
      "addressLocality": COMPANY_INFO.contact.address.city,
      "postalCode": COMPANY_INFO.contact.address.postalCode,
      "addressCountry": COMPANY_INFO.contact.address.country
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": COMPANY_INFO.contact.phone,
      "email": COMPANY_INFO.contact.email,
      "contactType": "customer service"
    },
    "sameAs": Object.values(COMPANY_INFO.contact.social),
    "employee": COMPANY_INFO.team.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role,
      "description": member.bio,
      "sameAs": member.linkedin
    }))
  }
};

function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <SparklesIcon className="h-4 w-4 mr-2" />
                Desde {COMPANY_INFO.founded}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transformamos
                <span className="text-primary block">Ideas en Realidad</span>
                Digital
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {COMPANY_INFO.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{COMPANY_INFO.projects}</div>
                <div className="text-sm text-muted-foreground">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{COMPANY_INFO.clients}</div>
                <div className="text-sm text-muted-foreground">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{COMPANY_INFO.employees}</div>
                <div className="text-sm text-muted-foreground">Expertos</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a href="/contacto">Conoce Más</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/portfolio">Ver Proyectos</a>
              </Button>
            </div>
          </div>

          {/* Team Photo */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
              <Image
                src="/team/team-photo.jpg"
                alt="Equipo Plalz"
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-background rounded-xl p-4 shadow-lg border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">100% Satisfacción</div>
                  <div className="text-sm text-muted-foreground">Garantizada</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-background rounded-xl p-4 shadow-lg border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <AwardIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">Premiados</div>
                  <div className="text-sm text-muted-foreground">2023 & 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionVisionValues() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestra Filosofía
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Los principios que guían cada decisión y proyecto que emprendemos
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          {/* Mission */}
          <Card className="p-8">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <RocketIcon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Nuestra Misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {COMPANY_INFO.mission}
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="p-8">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <TrendingUpIcon className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Nuestra Visión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {COMPANY_INFO.vision}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Nuestros Valores
            </h3>
            <p className="text-lg text-muted-foreground">
              Los pilares fundamentales que definen nuestra cultura y forma de trabajar
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COMPANY_INFO.values.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="text-4xl">{value.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestro Crecimiento
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un viaje de innovación, crecimiento y éxitos compartidos con nuestros clientes
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-primary rounded-full hidden lg:block"></div>

          <div className="space-y-12">
            {COMPANY_INFO.timeline.map((item, index) => (
              <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Content */}
                <div className="flex-1 lg:text-right lg:pr-8 lg:first:text-left lg:first:pl-8">
                  <Card className="p-6">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-2">
                        <Badge className="bg-primary/10 text-primary">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {item.year}
                        </Badge>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {item.milestone}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:block w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg z-10"></div>

                {/* Spacer */}
                <div className="flex-1 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conoce a los expertos que hacen posible cada proyecto excepcional
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {COMPANY_INFO.team.map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Reconocimientos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nuestro trabajo ha sido reconocido por la industria y nuestros clientes
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {COMPANY_INFO.awards.map((award, index) => (
            <Card key={index} className="p-6 text-center">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                  <AwardIcon className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <Badge className="mb-2">{award.year}</Badge>
                  <h3 className="text-lg font-semibold mb-2">{award.title}</h3>
                  <p className="text-sm text-muted-foreground">{award.organization}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="text-center space-y-8">
          <h3 className="text-2xl font-bold">Certificaciones</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {COMPANY_INFO.certifications.map((cert, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              ¿Listo para Trabajar Juntos?
            </h2>
            <p className="text-xl opacity-90">
              Únete a más de {COMPANY_INFO.clients} empresas que han confiado en nosotros 
              para transformar sus ideas en experiencias digitales excepcionales.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="/contacto">
                <HeartIcon className="h-5 w-5 mr-2" />
                Hablemos de tu Proyecto
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <a href="/portfolio">Ver Nuestro Trabajo</a>
            </Button>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-sm opacity-75">
              Consulta gratuita • Respuesta en 24 horas • Sin compromiso
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      
      <main className="min-h-screen">
        <HeroSection />
        <MissionVisionValues />
        <Timeline />
        <TeamSection />
        <AwardsSection />
        <CTASection />
      </main>
    </>
  );
} 