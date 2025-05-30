"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const valueProps = [
  {
    icon: '⚡',
    title: 'Velocidad Extrema',
    description: 'Sitios web que cargan en menos de 2 segundos',
    benefits: [
      'Optimización de imágenes automática',
      'CDN global incluido',
      'Código limpio y eficiente',
      'Core Web Vitals optimizados'
    ],
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: '💎',
    title: 'Calidad Premium',
    description: 'Diseño profesional que convierte visitantes en clientes',
    benefits: [
      'Diseño responsive perfecto',
      'UX/UI optimizada para conversión',
      'Código validado W3C',
      'Compatibilidad total'
    ],
    color: 'from-blue-400 to-purple-500'
  },
  {
    icon: '🛡️',
    title: 'Soporte 24/7',
    description: 'Estamos aquí cuando nos necesites',
    benefits: [
      'Respuesta en menos de 2 horas',
      'Soporte técnico especializado',
      'Monitoreo continuo',
      'Actualizaciones automáticas'
    ],
    color: 'from-green-400 to-emerald-500'
  }
];

export function ValueProposition() {
  return (
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
            ¿Por qué elegir Plalz?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Nos diferenciamos por nuestro compromiso con la excelencia en cada proyecto
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/20">
                <CardContent className="p-8 text-center">
                  {/* Animated Icon */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative mb-6"
                  >
                    <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${prop.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                      <motion.span
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      >
                        {prop.icon}
                      </motion.span>
                    </div>
                    
                    {/* Pulse Effect */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      className={`absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${prop.color}`}
                    />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3">{prop.title}</h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    {prop.description}
                  </p>

                  <ul className="space-y-3 text-left">
                    {prop.benefits.map((benefit, benefitIndex) => (
                      <motion.li
                        key={benefitIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + benefitIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <span className="text-green-500 text-lg">✓</span>
                        <span className="text-sm">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold mb-4">
              Garantía de Satisfacción 100%
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Si no estás completamente satisfecho con tu proyecto, 
              te devolvemos tu dinero. Sin preguntas, sin complicaciones.
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>30 días de garantía</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Revisiones ilimitadas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Soporte post-entrega</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 