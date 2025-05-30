"use client";

import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/lib/navigation';
import { serviceCategories, webDevelopmentServices } from '@/lib/data/services';

export default function WebDevelopmentCategoryPage() {
  const category = serviceCategories.find(cat => cat.slug === 'paginas-web')!;
  const services = webDevelopmentServices;

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-500/10 via-background to-cyan-500/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-4xl`}>
                {category.icon}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {category.name}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {category.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link href="#servicios">
                  Ver Servicios
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  Consulta Gratuita
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">300+</div>
                <div className="text-sm text-muted-foreground">Sitios Web Creados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">€299</div>
                <div className="text-sm text-muted-foreground">Precio Desde</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">2-6</div>
                <div className="text-sm text-muted-foreground">Semanas Entrega</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Satisfacción</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué elegir nuestros servicios de desarrollo web?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos soluciones completas que van más allá del diseño
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">
                        {index === 0 && '📱'}
                        {index === 1 && '🔍'}
                        {index === 2 && '⚡'}
                        {index === 3 && '⚙️'}
                        {index === 4 && '🔒'}
                        {index === 5 && '🛠️'}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">{benefit}</h3>
                    <p className="text-sm text-muted-foreground">
                      {index === 0 && 'Tu sitio se ve perfecto en móviles, tablets y computadoras'}
                      {index === 1 && 'Optimizamos tu sitio para aparecer en los primeros resultados de Google'}
                      {index === 2 && 'Sitios que cargan en menos de 2 segundos para mejor experiencia'}
                      {index === 3 && 'Actualiza tu contenido fácilmente sin conocimientos técnicos'}
                      {index === 4 && 'Protección completa con certificados SSL incluidos'}
                      {index === 5 && 'Estamos aquí cuando nos necesites, las 24 horas del día'}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicios" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tipos de Páginas Web que Desarrollamos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada tipo de sitio web está diseñado específicamente para cumplir objetivos únicos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        <div className="text-primary font-bold">
                          Desde €{service.packages[0]?.price}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Ideal para:</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.targetAudience.slice(0, 3).map((audience, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {audience}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Beneficios principales:</h4>
                        <ul className="space-y-1">
                          {service.benefits.slice(0, 3).map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <span className="text-green-500">✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 space-y-2">
                        <Button className="w-full" asChild>
                          <Link href={`/servicios/paginas-web/${service.slug}`}>
                            Ver Detalles y Precios
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/contact">
                            Solicitar Cotización
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestro Proceso de Desarrollo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un proceso probado que garantiza resultados excepcionales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Análisis y Estrategia',
                description: 'Entendemos tu negocio, objetivos y audiencia',
                duration: '2-3 días',
                icon: '🔍'
              },
              {
                step: 2,
                title: 'Diseño y Prototipo',
                description: 'Creamos el diseño visual y la experiencia de usuario',
                duration: '5-7 días',
                icon: '🎨'
              },
              {
                step: 3,
                title: 'Desarrollo',
                description: 'Programamos tu sitio con las mejores tecnologías',
                duration: '7-15 días',
                icon: '💻'
              },
              {
                step: 4,
                title: 'Lanzamiento',
                description: 'Probamos todo y lanzamos tu sitio web',
                duration: '2-3 días',
                icon: '🚀'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                      {step.step}
                    </div>
                    <div className="text-3xl mb-4">{step.icon}</div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {step.description}
                    </p>
                    <Badge variant="outline">{step.duration}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Industrias que Atendemos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tenemos experiencia desarrollando sitios web para diversos sectores
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {category.industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {index === 0 && '🏢'}
                      {index === 1 && '🛒'}
                      {index === 2 && '🎓'}
                      {index === 3 && '🏥'}
                      {index === 4 && '🍽️'}
                      {index === 5 && '🏠'}
                    </div>
                    <h3 className="font-semibold text-sm">{industry}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para crear tu sitio web?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comienza tu proyecto hoy mismo. Te ayudamos a elegir la mejor opción para tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Empezar Mi Proyecto
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/portfolio">
                  Ver Ejemplos
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
} 