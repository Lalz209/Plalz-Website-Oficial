"use client";

import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { ServiceHero } from '@/components/services/service-hero';
import { ServiceQualification } from '@/components/services/service-qualification';
import { ServicePackages } from '@/components/services/service-packages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { webDevelopmentServices } from '@/lib/data/services';

export default function EcommercePage() {
  const service = webDevelopmentServices.find(s => s.slug === 'e-commerce')!;

  return (
    <MainLayout>
      {/* Hero Section */}
      <ServiceHero service={service} />

      {/* Target Audience & Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Target Audience */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <span className="text-3xl">🎯</span>
                    ¿Para quién es este servicio?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.targetAudience.map((audience, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <span className="text-primary">✓</span>
                        <span>{audience}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <span className="text-3xl">🚀</span>
                    Beneficios principales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg"
                      >
                        <span className="text-green-500">✓</span>
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Qualification Section */}
      <ServiceQualification 
        questions={service.qualificationQuestions}
        packages={service.packages}
        serviceName={service.name}
      />

      {/* Process Timeline */}
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
              Proceso de Desarrollo E-commerce
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un proceso especializado que garantiza una tienda online exitosa y rentable
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20 hidden lg:block" />

            <div className="space-y-12">
              {service.process.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {step.id}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{step.title}</CardTitle>
                            <Badge variant="outline">{step.duration}</Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <span className="text-green-500">✓</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Icon */}
                  <div className="hidden lg:flex w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full items-center justify-center text-4xl relative z-10">
                    {step.icon}
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <ServicePackages packages={service.packages} serviceName={service.name} />

      {/* E-commerce Features Showcase */}
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
              Características Avanzadas de E-commerce
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Funcionalidades profesionales que hacen que tu tienda online destaque
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Gestión de Inventario',
                description: 'Control completo de stock, variantes y alertas automáticas',
                icon: '📦',
                features: ['Control de stock en tiempo real', 'Gestión de variantes', 'Alertas de stock bajo', 'Sincronización multi-canal']
              },
              {
                title: 'Pagos Seguros',
                description: 'Múltiples métodos de pago con máxima seguridad',
                icon: '💳',
                features: ['Stripe y PayPal integrados', 'Pagos con tarjeta', 'Bizum y transferencias', 'Certificado SSL incluido']
              },
              {
                title: 'Envíos Inteligentes',
                description: 'Sistema avanzado de cálculo y gestión de envíos',
                icon: '🚚',
                features: ['Cálculo automático de costos', 'Múltiples transportistas', 'Tracking de pedidos', 'Zonas de envío personalizadas']
              },
              {
                title: 'Marketing Integrado',
                description: 'Herramientas de marketing para aumentar ventas',
                icon: '📈',
                features: ['Cupones y descuentos', 'Email marketing', 'Productos relacionados', 'Abandono de carrito']
              },
              {
                title: 'Analytics Avanzado',
                description: 'Métricas detalladas para optimizar tu negocio',
                icon: '📊',
                features: ['Dashboard de ventas', 'Análisis de productos', 'Comportamiento de usuarios', 'Reportes automáticos']
              },
              {
                title: 'SEO Optimizado',
                description: 'Optimización completa para aparecer en Google',
                icon: '🔍',
                features: ['URLs amigables', 'Meta tags automáticos', 'Schema markup', 'Sitemap XML']
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground text-center">{feature.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="text-green-500">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
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
              Casos de Éxito E-commerce
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tiendas online que han transformado negocios y generado resultados excepcionales
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-1 gap-8">
            {service.caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                          {caseStudy.industry}
                        </Badge>
                        <Badge variant="outline">{caseStudy.duration}</Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{caseStudy.title}</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="font-semibold mb-2">Desafío:</h4>
                          <p className="text-muted-foreground">{caseStudy.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Solución:</h4>
                          <p className="text-muted-foreground">{caseStudy.solution}</p>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {caseStudy.results.map((result, i) => (
                          <div key={i} className="text-center p-4 bg-primary/5 rounded-lg">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {result.improvement}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {result.metric}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {result.before} → {result.after}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Tecnologías utilizadas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.technologies.map((tech, i) => (
                            <Badge key={i} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                      </div>

                      {caseStudy.url && (
                        <Button asChild>
                          <a href={caseStudy.url} target="_blank" rel="noopener noreferrer">
                            Visitar Tienda
                          </a>
                        </Button>
                      )}
                    </div>

                    {/* Testimonial */}
                    <div className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                      <div className="text-center mb-6">
                        <div className="text-6xl text-primary/20 mb-4">"</div>
                        <blockquote className="text-lg italic mb-6">
                          {caseStudy.testimonial.quote}
                        </blockquote>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {caseStudy.testimonial.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold">{caseStudy.testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">
                            {caseStudy.testimonial.position} en {caseStudy.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Preguntas Frecuentes sobre E-commerce
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Respuestas a las preguntas más comunes sobre tiendas online
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
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
              Servicios Relacionados
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complementa tu tienda online con estos servicios adicionales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Mantenimiento de Contenido',
                description: 'Mantén tu catálogo actualizado y optimizado',
                icon: '📝',
                href: '/servicios/mantenimiento/contenido'
              },
              {
                name: 'Marketing Digital',
                description: 'Aumenta las ventas con estrategias de marketing',
                icon: '📈',
                href: '/servicios/marketing'
              },
              {
                name: 'Páginas Web Corporativas',
                description: 'Complementa tu tienda con un sitio corporativo',
                icon: '🏢',
                href: '/servicios/paginas-web/corporativas'
              }
            ].map((relatedService, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {relatedService.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{relatedService.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {relatedService.description}
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={relatedService.href}>
                        Más Información
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para lanzar tu tienda online?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comienza a vender online las 24 horas del día con una tienda profesional que convierte visitantes en clientes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Empezar Mi Tienda Online
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#paquetes">
                  Ver Precios
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
} 