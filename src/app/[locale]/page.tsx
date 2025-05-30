import { useTranslations } from 'next-intl';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/lib/navigation';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <MainLayout showBreadcrumbs={false}>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/services">
                {t('getStarted')}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">
                {t('learnMore')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos soluciones completas para tu presencia digital
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Desarrollo Web
                  <Badge variant="secondary">Popular</Badge>
                </CardTitle>
                <CardDescription>
                  Sitios web modernos y responsivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Creamos sitios web profesionales con las últimas tecnologías.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/web-development">
                    Ver más
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Mantenimiento</CardTitle>
                <CardDescription>
                  Soporte técnico continuo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Mantenemos tu sitio web actualizado y funcionando perfectamente.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/maintenance">
                    Ver más
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>SEO</CardTitle>
                <CardDescription>
                  Optimización para buscadores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Mejoramos tu posicionamiento en Google y otros buscadores.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/seo">
                    Ver más
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Hosting
                  <Badge variant="success">Nuevo</Badge>
                </CardTitle>
                <CardDescription>
                  Alojamiento web confiable
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Hosting rápido y seguro para tu sitio web.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/hosting">
                    Ver más
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contáctanos hoy mismo y descubre cómo podemos ayudarte a hacer crecer tu negocio en línea.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Contactar ahora
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
} 