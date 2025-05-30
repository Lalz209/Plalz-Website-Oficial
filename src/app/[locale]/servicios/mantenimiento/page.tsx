"use client";

import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/lib/navigation';
import { serviceCategories, maintenanceServices } from '@/lib/data/services';

export default function MaintenanceCategoryPage() {
  const category = serviceCategories.find(cat => cat.slug === 'mantenimiento')!;
  const services = maintenanceServices;

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-500/10 via-background to-emerald-500/10">
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
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
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
                <div className="text-3xl font-bold text-primary mb-1">200+</div>
                <div className="text-sm text-muted-foreground">Sitios Mantenidos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">€49</div>
                <div className="text-sm text-muted-foreground">Precio Desde</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoreo</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
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
              ¿Por qué necesitas mantenimiento web profesional?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tu sitio web necesita cuidado constante para mantenerse seguro, rápido y actualizado
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
                        {index === 0 && '🔒'}
                        {index === 1 && '💾'}
                        {index === 2 && '👁️'}
                        {index === 3 && '⚡'}
                        {index === 4 && '🎯'}
                        {index === 5 && '📊'}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">{benefit}</h3>
                    <p className="text-sm text-muted-foreground">
                      {index === 0 && 'Protegemos tu sitio con las últimas actualizaciones de seguridad'}
                      {index === 1 && 'Copias de seguridad automáticas para que nunca pierdas información'}
                      {index === 2 && 'Vigilamos tu sitio constantemente para detectar problemas'}
                      {index === 3 && 'Optimizamos continuamente la velocidad de carga'}
                      {index === 4 && 'Atención especializada cuando más la necesitas'}
                      {index === 5 && 'Informes detallados del rendimiento de tu sitio'}
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
              Tipos de Mantenimiento Web
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Servicios especializados para mantener tu sitio web en perfectas condiciones
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                          Desde €{service.packages[0]?.price}/mes
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
                          <Link href={`/servicios/mantenimiento/${service.slug}`}>
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

            {/* Coming Soon Services */}
            {[
              {
                name: 'Mantenimiento SEO',
                description: 'Optimización continua para mantener y mejorar tu posicionamiento',
                icon: '📈',
                price: 149
              },
              {
                name: 'Mantenimiento de Seguridad',
                description: 'Protección avanzada contra amenazas y vulnerabilidades',
                icon: '🛡️',
                price: 199
              },
              {
                name: 'Soporte Técnico 24/7',
                description: 'Asistencia técnica inmediata cuando la necesites',
                icon: '🚨',
                price: 299
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: (services.length + index) * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-2 border-dashed border-muted-foreground/30">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-muted to-muted-foreground/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        <div className="text-primary font-bold">
                          Desde €{service.price}/mes
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Badge variant="outline" className="w-full justify-center">
                        Próximamente
                      </Badge>
                      <div className="pt-4">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/contact">
                            Notificarme
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
              Cómo Funciona Nuestro Mantenimiento
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un proceso automatizado y proactivo que mantiene tu sitio web siempre optimizado
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Auditoría Inicial',
                description: 'Analizamos el estado actual de tu sitio web',
                duration: '1-2 días',
                icon: '🔍'
              },
              {
                step: 2,
                title: 'Configuración',
                description: 'Implementamos sistemas de monitoreo y backup',
                duration: '1 día',
                icon: '⚙️'
              },
              {
                step: 3,
                title: 'Mantenimiento Continuo',
                description: 'Ejecutamos tareas de mantenimiento programadas',
                duration: 'Continuo',
                icon: '🔄'
              },
              {
                step: 4,
                title: 'Reportes y Optimización',
                description: 'Te enviamos reportes y optimizamos el rendimiento',
                duration: 'Mensual',
                icon: '📊'
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
              Mantenemos Sitios Web de Todos los Sectores
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestros servicios de mantenimiento se adaptan a las necesidades específicas de cada industria
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'E-commerce', icon: '🛒' },
              { name: 'Corporativo', icon: '🏢' },
              { name: 'Educación', icon: '🎓' },
              { name: 'Salud', icon: '🏥' },
              { name: 'Restaurantes', icon: '🍽️' },
              { name: 'Inmobiliaria', icon: '🏠' },
              { name: 'Tecnología', icon: '💻' },
              { name: 'Servicios', icon: '🔧' }
            ].map((industry, index) => (
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
                      {industry.icon}
                    </div>
                    <h3 className="font-semibold text-sm">{industry.name}</h3>
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
              ¿Tu sitio web necesita mantenimiento?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              No esperes a que surjan problemas. Mantén tu sitio web seguro, rápido y actualizado con nuestros servicios profesionales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Solicitar Auditoría Gratuita
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/portfolio">
                  Ver Casos de Éxito
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
} 