"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  {
    id: 'projects',
    number: 500,
    suffix: '+',
    label: 'Proyectos Completados',
    description: 'Sitios web exitosos entregados',
    icon: '🚀',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'clients',
    number: 98,
    suffix: '%',
    label: 'Clientes Satisfechos',
    description: 'Tasa de satisfacción comprobada',
    icon: '😊',
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'experience',
    number: 8,
    suffix: '+',
    label: 'Años de Experiencia',
    description: 'Desarrollando soluciones web',
    icon: '⭐',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 'support',
    number: 24,
    suffix: '/7',
    label: 'Soporte Disponible',
    description: 'Horas del día, días de la semana',
    icon: '🛡️',
    color: 'from-purple-400 to-purple-600'
  }
];

const comparisons = [
  {
    metric: 'Velocidad de Carga',
    us: '< 2 seg',
    competition: '4-6 seg',
    improvement: '200% más rápido'
  },
  {
    metric: 'Tiempo de Entrega',
    us: '2-4 semanas',
    competition: '2-3 meses',
    improvement: '300% más rápido'
  },
  {
    metric: 'Soporte Post-Entrega',
    us: '24/7 incluido',
    competition: 'Costo adicional',
    improvement: 'Siempre incluido'
  },
  {
    metric: 'Revisiones',
    us: 'Ilimitadas',
    competition: '2-3 máximo',
    improvement: 'Sin límites'
  }
];

function AnimatedCounter({ 
  target, 
  suffix = '', 
  duration = 2000 
}: { 
  target: number; 
  suffix?: string; 
  duration?: number; 
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(target * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold">
      {count}{suffix}
    </div>
  );
}

export function StatsSection() {
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
            Números que Hablan por Nosotros
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Resultados comprobados que demuestran nuestro compromiso con la excelencia
          </p>
        </motion.div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/20">
                <CardContent className="p-6">
                  {/* Animated Icon */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative mb-4"
                  >
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <motion.span
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        {stat.icon}
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Animated Counter */}
                  <div className="text-primary mb-2">
                    <AnimatedCounter 
                      target={stat.number} 
                      suffix={stat.suffix}
                      duration={2000 + index * 200}
                    />
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Por qué somos diferentes?
            </h3>
            <p className="text-muted-foreground">
              Comparación directa con la competencia
            </p>
          </div>

          <div className="grid gap-6">
            {comparisons.map((comparison, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <div className="font-semibold text-lg">
                        {comparison.metric}
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Plalz</div>
                        <div className="font-bold text-primary text-lg bg-primary/10 rounded-lg py-2 px-3">
                          {comparison.us}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Competencia</div>
                        <div className="font-bold text-muted-foreground text-lg bg-muted rounded-lg py-2 px-3">
                          {comparison.competition}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-green-600 font-semibold bg-green-50 dark:bg-green-900/20 rounded-lg py-2 px-3">
                          {comparison.improvement}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-bold mb-8">Reconocimientos y Certificaciones</h3>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <div className="flex items-center gap-2 text-lg">
              <span>🏆</span>
              <span>Google Partner</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <span>🔒</span>
              <span>SSL Certified</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <span>✅</span>
              <span>ISO 9001</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <span>⚡</span>
              <span>Core Web Vitals</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <span>🌟</span>
              <span>5★ Rating</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold mb-8 text-center">Nuestras Fortalezas</h3>
          <div className="space-y-6">
            {[
              { skill: 'Desarrollo Frontend', percentage: 95 },
              { skill: 'Optimización SEO', percentage: 90 },
              { skill: 'Diseño UX/UI', percentage: 88 },
              { skill: 'Soporte Técnico', percentage: 98 }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{item.skill}</span>
                  <span className="text-primary font-bold">{item.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 