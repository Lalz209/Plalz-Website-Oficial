"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/lib/navigation';

const services = [
  {
    id: 'web-development',
    title: 'Desarrollo Web',
    description: 'Sitios web modernos, responsivos y optimizados para conversión',
    icon: '🚀',
    startingPrice: '$299',
    features: [
      'Diseño responsive',
      'Optimización SEO',
      'Velocidad optimizada',
      'Panel de administración',
      'Certificado SSL incluido'
    ],
    popular: true,
    href: '/services/web-development'
  },
  {
    id: 'maintenance',
    title: 'Mantenimiento Web',
    description: 'Soporte técnico continuo para mantener tu sitio siempre actualizado',
    icon: '🛠️',
    startingPrice: '$49/mes',
    features: [
      'Actualizaciones de seguridad',
      'Backups automáticos',
      'Monitoreo 24/7',
      'Soporte técnico',
      'Optimización continua'
    ],
    popular: false,
    href: '/services/maintenance'
  }
];

const additionalServices = [
  {
    title: 'SEO & Marketing',
    description: 'Posicionamiento en buscadores',
    icon: '📈',
    price: 'Desde $99/mes'
  },
  {
    title: 'Hosting Premium',
    description: 'Alojamiento rápido y seguro',
    icon: '☁️',
    price: 'Desde $19/mes'
  },
  {
    title: 'E-commerce',
    description: 'Tiendas online completas',
    icon: '🛒',
    price: 'Desde $599'
  },
  {
    title: 'Aplicaciones Web',
    description: 'Sistemas personalizados',
    icon: '⚡',
    price: 'Cotización'
  }
];

export function ServicesOverview() {
  return (
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
            Nuestros Servicios Principales
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Soluciones completas para tu presencia digital, desde el desarrollo hasta el mantenimiento continuo
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="relative h-full group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1">
                      ⭐ Más Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {service.description}
                  </CardDescription>
                  <div className="text-3xl font-bold text-primary mt-4">
                    {service.startingPrice}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <span className="text-green-500 text-lg">✓</span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="pt-6 space-y-3">
                    <Button className="w-full" size="lg" asChild>
                      <Link href={service.href}>
                        Solicitar Cotización
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={service.href}>
                        Ver Detalles
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold mb-4">Servicios Adicionales</h3>
          <p className="text-muted-foreground">
            Complementa tu proyecto con nuestros servicios especializados
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h4 className="font-semibold mb-2">{service.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {service.description}
                  </p>
                  <div className="text-primary font-semibold">
                    {service.price}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Ofrecemos soluciones personalizadas para cada necesidad. 
              Contáctanos y te ayudaremos a encontrar la mejor opción para tu proyecto.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Consulta Personalizada
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 