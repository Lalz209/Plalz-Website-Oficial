import { Metadata } from 'next';
import { PricingPlans } from '@/components/pricing/pricing-plans';
import { PricingComparison } from '@/components/pricing/pricing-comparison';
import { PricingFAQ } from '@/components/pricing/pricing-faq';
import { PricingGuarantee } from '@/components/pricing/pricing-guarantee';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PRICING_PLANS } from '@/lib/data/company-data';
import { 
  DollarSignIcon, 
  CheckCircleIcon, 
  SparklesIcon,
  ShieldCheckIcon,
  HeartIcon
} from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Precios | Plalz - Planes de Desarrollo Web desde €299',
  description: 'Descubre nuestros planes de desarrollo web: Starter (€299), Professional (€599), Enterprise (€1299). Garantía de satisfacción 30 días.',
  keywords: [
    'precios desarrollo web',
    'planes sitio web',
    'cotización desarrollo web',
    'presupuesto página web'
  ],
  openGraph: {
    title: 'Precios | Plalz - Planes de Desarrollo Web desde €299',
    description: 'Planes transparentes de desarrollo web con garantía de satisfacción.',
    images: ['/og-images/pricing.jpg'],
    type: 'website',
  },
  alternates: {
    canonical: '/precios',
  },
};

function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <DollarSignIcon className="h-4 w-4 mr-2" />
              Precios Transparentes
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Planes que se
              <span className="text-primary block">Adaptan a tu</span>
              Presupuesto
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Sin costos ocultos, sin sorpresas. Elige el plan perfecto para tu proyecto 
              y comienza a transformar tu presencia digital hoy mismo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background border">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Sin Costos Ocultos</div>
                <div className="text-sm text-muted-foreground">Todo incluido</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background border">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Garantía 30 Días</div>
                <div className="text-sm text-muted-foreground">100% satisfacción</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background border">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Consulta Gratuita</div>
                <div className="text-sm text-muted-foreground">Personalizada</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="#planes">Ver Planes</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contacto">Consulta Personalizada</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      
      <section id="planes" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Elige tu Plan Ideal
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Desde startups hasta grandes empresas, tenemos el plan perfecto para cada etapa de tu crecimiento
            </p>
          </div>
          
          <PricingPlans />
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comparación Detallada
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Todas las características y funcionalidades incluidas en cada plan
            </p>
          </div>
          
          <PricingComparison />
        </div>
      </section>

      <PricingGuarantee />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Respuestas a las dudas más comunes sobre nuestros planes y precios
            </p>
          </div>
          
          <PricingFAQ />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                ¿No Encuentras el Plan Perfecto?
              </h2>
              <p className="text-xl opacity-90">
                Creamos soluciones personalizadas que se adaptan exactamente a tus necesidades 
                y presupuesto. Hablemos de tu proyecto.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="/contacto">
                  <HeartIcon className="h-5 w-5 mr-2" />
                  Solicitar Cotización Personalizada
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <a href="/portfolio">Ver Proyectos Realizados</a>
              </Button>
            </div>

            <div className="pt-8 border-t border-white/20">
              <p className="text-sm opacity-75">
                Consulta gratuita • Propuesta en 24 horas • Sin compromiso
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 