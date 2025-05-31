import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheckIcon, 
  CheckCircleIcon, 
  ClockIcon,
  HeartIcon
} from '@/components/ui/icons';

export function PricingGuarantee() {
  const guaranteeFeatures = [
    {
      icon: ShieldCheckIcon,
      title: "100% Garantía de Satisfacción",
      description: "Si no estás completamente satisfecho con el resultado, te devolvemos el 100% de tu dinero."
    },
    {
      icon: ClockIcon,
      title: "30 Días para Decidir",
      description: "Tienes un mes completo para evaluar nuestro trabajo sin ningún riesgo."
    },
    {
      icon: CheckCircleIcon,
      title: "Sin Preguntas Incómodas",
      description: "Proceso de reembolso simple y directo, sin complicaciones ni letra pequeña."
    },
    {
      icon: HeartIcon,
      title: "Compromiso Total",
      description: "Trabajamos hasta que estés 100% satisfecho con tu proyecto web."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 border-green-200 mb-4">
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              Garantía de Satisfacción
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tu Inversión Está Protegida
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estamos tan seguros de la calidad de nuestro trabajo que ofrecemos una garantía 
              completa de satisfacción. Tu éxito es nuestro éxito.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {guaranteeFeatures.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Guarantee Card */}
          <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white overflow-hidden">
            <CardContent className="p-12 text-center relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
              </div>

              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                    <ShieldCheckIcon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">
                    Garantía de Devolución 30 Días
                  </h3>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    Si por cualquier motivo no estás satisfecho con nuestro trabajo, 
                    te devolvemos el 100% de tu inversión. Sin preguntas, sin complicaciones.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <a href="/contacto">
                      Empezar sin Riesgo
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                    <a href="/terminos">
                      Ver Términos Completos
                    </a>
                  </Button>
                </div>

                <div className="pt-8 border-t border-white/20">
                  <p className="text-sm opacity-75">
                    Más de 150 clientes han confiado en nosotros • 98% de satisfacción • 0 reembolsos solicitados
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Únete a empresas que ya confían en nosotros:
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Placeholder for client logos */}
              <div className="w-24 h-12 bg-muted rounded flex items-center justify-center text-xs">
                Cliente 1
              </div>
              <div className="w-24 h-12 bg-muted rounded flex items-center justify-center text-xs">
                Cliente 2
              </div>
              <div className="w-24 h-12 bg-muted rounded flex items-center justify-center text-xs">
                Cliente 3
              </div>
              <div className="w-24 h-12 bg-muted rounded flex items-center justify-center text-xs">
                Cliente 4
              </div>
              <div className="w-24 h-12 bg-muted rounded flex items-center justify-center text-xs">
                Cliente 5
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 