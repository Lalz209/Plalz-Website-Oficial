"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@/lib/navigation';
import { serviceCategories, allServices } from '@/lib/data/services';
import { ServiceFilter } from '@/lib/types/services';

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<ServiceFilter>({
    priceRange: [0, 2000],
    industries: [],
    features: [],
    duration: []
  });
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedTab === 'all' || service.category === selectedTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      {/* Hero Section with Search */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Nuestros Servicios
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Soluciones digitales completas para hacer crecer tu negocio. 
              Desde desarrollo web hasta mantenimiento continuo.
            </p>

            {/* Intelligent Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Input
                  placeholder="¿Qué tipo de servicio necesitas? Ej: tienda online, página corporativa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-lg py-6 pl-12"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  🔍
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfacción</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Soporte</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">€299</div>
                <div className="text-sm text-muted-foreground">Desde</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
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
              Categorías de Servicios
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explora nuestras principales categorías de servicios digitales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{category.name}</CardTitle>
                        <div className="text-primary font-bold">
                          Desde €{category.startingPrice}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-lg">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Beneficios principales:</h4>
                        <ul className="space-y-1">
                          {category.benefits.slice(0, 3).map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <span className="text-green-500">✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Industrias:</h4>
                        <div className="flex flex-wrap gap-1">
                          {category.industries.slice(0, 3).map((industry, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {industry}
                            </Badge>
                          ))}
                          {category.industries.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{category.industries.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button className="w-full" asChild>
                          <Link href={`/servicios/${category.slug}`}>
                            Explorar {category.name}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Service Filters and Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Todos los Servicios</TabsTrigger>
                <TabsTrigger value="paginas-web">Páginas Web</TabsTrigger>
                <TabsTrigger value="mantenimiento">Mantenimiento</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>
                              {service.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{service.name}</CardTitle>
                              <div className="text-sm text-primary font-semibold">
                                Desde €{service.packages[0]?.price || 'Consultar'}
                              </div>
                            </div>
                          </div>
                          <CardDescription>
                            {service.shortDescription}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2 text-sm">Ideal para:</h4>
                              <div className="flex flex-wrap gap-1">
                                {service.targetAudience.slice(0, 2).map((audience, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {audience}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="pt-2">
                              <Button variant="outline" className="w-full" asChild>
                                <Link href={`/servicios/${service.category}/${service.slug}`}>
                                  Ver Detalles
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
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
              Preguntas Frecuentes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Respuestas a las preguntas más comunes sobre nuestros servicios
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: '¿Cuánto tiempo toma desarrollar un proyecto?',
                answer: 'El tiempo varía según el tipo de proyecto. Una página web básica toma 2-3 semanas, mientras que un e-commerce completo puede tomar 4-8 semanas. Te damos un cronograma detallado antes de comenzar.'
              },
              {
                question: '¿Qué incluye el precio del desarrollo?',
                answer: 'Incluye análisis, diseño, desarrollo, testing, lanzamiento, capacitación y soporte inicial. También incluimos hosting por el primer año y certificado SSL.'
              },
              {
                question: '¿Ofrecen garantía en sus servicios?',
                answer: 'Sí, ofrecemos garantía de satisfacción 100%. Si no estás completamente satisfecho, trabajamos hasta que lo estés o te devolvemos tu dinero.'
              },
              {
                question: '¿Puedo actualizar mi sitio web después?',
                answer: 'Absolutamente. Todos nuestros sitios incluyen panel de administración fácil de usar. También ofrecemos servicios de mantenimiento y actualizaciones continuas.'
              },
              {
                question: '¿Trabajan con empresas de cualquier tamaño?',
                answer: 'Sí, trabajamos desde emprendedores individuales hasta grandes empresas. Adaptamos nuestros servicios y precios según las necesidades específicas de cada cliente.'
              },
              {
                question: '¿Qué pasa si necesito cambios durante el desarrollo?',
                answer: 'Incluimos revisiones en cada fase del proyecto. Cambios menores están incluidos, y para cambios mayores te damos un presupuesto transparente antes de proceder.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
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
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ofrecemos soluciones personalizadas para cada necesidad. 
              Contáctanos y te ayudaremos a encontrar la mejor opción para tu proyecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Consulta Personalizada
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