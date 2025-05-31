import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { COMPANY_INFO, CONTACT_TYPES, FAQ_CONTACT } from '@/lib/data/company-data';
import { ContactForm } from '@/components/contact/contact-form';
import { WhatsAppButton } from '@/components/contact/whatsapp-button';
import { ContactMap } from '@/components/contact/contact-map';
import { 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
  MessageSquareIcon,
  HeartIcon,
  CheckCircleIcon,
  LinkedInIcon,
  TwitterIcon,
  InstagramIcon,
  FacebookIcon
} from '@/components/ui/icons';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Contacto | Plalz - Hablemos de tu Proyecto Web',
  description: 'Contáctanos para tu proyecto de desarrollo web. Consulta gratuita, respuesta en 24 horas. Teléfono: +34 900 123 456 | Email: hola@plalz.com',
  keywords: [
    'contacto plalz',
    'consulta desarrollo web',
    'cotización sitio web',
    'contacto agencia web madrid',
    'presupuesto desarrollo web',
    'consulta gratuita web'
  ],
  openGraph: {
    title: 'Contacto | Plalz - Hablemos de tu Proyecto',
    description: 'Contáctanos para tu proyecto de desarrollo web. Consulta gratuita y respuesta garantizada en 24 horas.',
    images: [
      {
        url: '/og-images/contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contacto Plalz - Desarrollo Web',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Plalz - Hablemos de tu Proyecto',
    description: 'Contáctanos para tu proyecto de desarrollo web. Consulta gratuita y respuesta en 24 horas.',
    images: ['/og-images/contact.jpg'],
  },
  alternates: {
    canonical: '/contacto',
  },
};

// Schema.org structured data
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contacto - Plalz",
  "description": "Página de contacto de Plalz para consultas sobre desarrollo web y servicios digitales.",
  "url": "https://plalz.com/contacto",
  "mainEntity": {
    "@type": "Organization",
    "name": COMPANY_INFO.name,
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": COMPANY_INFO.contact.phone,
        "contactType": "customer service",
        "availableLanguage": ["Spanish", "English"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "ContactPoint",
        "email": COMPANY_INFO.contact.email,
        "contactType": "customer service"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY_INFO.contact.address.street,
      "addressLocality": COMPANY_INFO.contact.address.city,
      "postalCode": COMPANY_INFO.contact.address.postalCode,
      "addressCountry": COMPANY_INFO.contact.address.country
    }
  }
};

function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <MessageSquareIcon className="h-4 w-4 mr-2" />
              Hablemos de tu Proyecto
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              ¿Tienes una
              <span className="text-primary block">Idea Increíble?</span>
              Hagámosla Realidad
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Estamos aquí para ayudarte a transformar tu visión en una experiencia digital excepcional. 
              Contáctanos y descubre cómo podemos impulsar tu negocio.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background border">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Consulta Gratuita</div>
                <div className="text-sm text-muted-foreground">Sin compromiso</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background border">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <ClockIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Respuesta 24h</div>
                <div className="text-sm text-muted-foreground">Garantizada</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background border">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <HeartIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Atención Personal</div>
                <div className="text-sm text-muted-foreground">Dedicada</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Cuéntanos tu Proyecto</h2>
              <p className="text-lg text-muted-foreground">
                Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas 
                con una propuesta personalizada.
              </p>
            </div>
            
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Información de Contacto</h2>
              <p className="text-lg text-muted-foreground">
                Múltiples formas de ponerte en contacto con nosotros. Elige la que más te convenga.
              </p>
            </div>

            <div className="space-y-6">
              {/* Phone */}
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Teléfono</h3>
                    <div className="space-y-1">
                      <a 
                        href={`tel:${COMPANY_INFO.contact.phone}`}
                        className="block text-lg font-medium hover:text-primary transition-colors"
                      >
                        {COMPANY_INFO.contact.phone}
                      </a>
                      <p className="text-sm text-muted-foreground">
                        Llamadas de lunes a viernes, 9:00 - 18:00
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Email */}
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <MailIcon className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Email</h3>
                    <div className="space-y-1">
                      <a 
                        href={`mailto:${COMPANY_INFO.contact.email}`}
                        className="block text-lg font-medium hover:text-primary transition-colors"
                      >
                        {COMPANY_INFO.contact.email}
                      </a>
                      <p className="text-sm text-muted-foreground">
                        Respuesta garantizada en 24 horas
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Address */}
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Oficina</h3>
                    <div className="space-y-1">
                      <address className="text-lg not-italic">
                        {COMPANY_INFO.contact.address.street}<br />
                        {COMPANY_INFO.contact.address.postalCode} {COMPANY_INFO.contact.address.city}<br />
                        {COMPANY_INFO.contact.address.country}
                      </address>
                      <p className="text-sm text-muted-foreground">
                        Visitas con cita previa
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Hours */}
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Horarios</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Lunes - Viernes:</span>
                        <span className="font-medium">9:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sábados:</span>
                        <span className="font-medium">10:00 - 14:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domingos:</span>
                        <span className="font-medium text-muted-foreground">Cerrado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Síguenos</h3>
              <div className="flex gap-4">
                <a 
                  href={COMPANY_INFO.contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors"
                >
                  <LinkedInIcon className="h-6 w-6 text-blue-600" />
                </a>
                <a 
                  href={COMPANY_INFO.contact.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center hover:bg-sky-200 transition-colors"
                >
                  <TwitterIcon className="h-6 w-6 text-sky-600" />
                </a>
                <a 
                  href={COMPANY_INFO.contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center hover:bg-pink-200 transition-colors"
                >
                  <InstagramIcon className="h-6 w-6 text-pink-600" />
                </a>
                <a 
                  href={COMPANY_INFO.contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors"
                >
                  <FacebookIcon className="h-6 w-6 text-blue-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestra Ubicación</h2>
          <p className="text-lg text-muted-foreground">
            Estamos ubicados en el corazón de Madrid, fácilmente accesible en transporte público
          </p>
        </div>
        
        <ContactMap />
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Respuestas a las consultas más comunes sobre nuestros servicios y proceso de trabajo
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {FAQ_CONTACT.map((faq, index) => (
            <Card key={index} className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿No encuentras la respuesta que buscas?
          </p>
          <a 
            href={`mailto:${COMPANY_INFO.contact.email}`}
            className="text-primary hover:underline font-medium"
          >
            Contáctanos directamente →
          </a>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      
      <main className="min-h-screen">
        <HeroSection />
        <ContactSection />
        <MapSection />
        <FAQSection />
        
        {/* WhatsApp Floating Button */}
        <WhatsAppButton />
      </main>
    </>
  );
} 