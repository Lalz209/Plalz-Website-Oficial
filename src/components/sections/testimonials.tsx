"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDownIcon } from '@/components/ui/icons';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    company: 'Boutique Luna',
    role: 'Propietaria',
    avatar: '/testimonials/maria.jpg',
    rating: 5,
    quote: 'Plalz transformó completamente mi negocio online. Las ventas aumentaron un 300% en los primeros 3 meses. Su equipo es increíblemente profesional y siempre están disponibles.',
    project: 'E-commerce de moda'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    company: 'Consultoría CR',
    role: 'CEO',
    avatar: '/testimonials/carlos.jpg',
    rating: 5,
    quote: 'La velocidad de carga de nuestro sitio mejoró drásticamente. Ahora aparecemos en la primera página de Google y hemos triplicado nuestros leads. Excelente trabajo.',
    project: 'Sitio web corporativo'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    company: 'Restaurante Sabores',
    role: 'Gerente',
    avatar: '/testimonials/ana.jpg',
    rating: 5,
    quote: 'El sistema de reservas online que desarrollaron es fantástico. Nuestros clientes pueden reservar fácilmente y nosotros gestionamos todo desde un panel súper intuitivo.',
    project: 'Sistema de reservas'
  },
  {
    id: 4,
    name: 'Luis Fernández',
    company: 'Inmobiliaria LF',
    role: 'Director',
    avatar: '/testimonials/luis.jpg',
    rating: 5,
    quote: 'Llevamos 2 años trabajando con Plalz y el soporte es excepcional. Cualquier problema se resuelve en minutos. Su mantenimiento preventivo nos ha ahorrado muchos dolores de cabeza.',
    project: 'Portal inmobiliario'
  },
  {
    id: 5,
    name: 'Sofia Herrera',
    company: 'Clínica Dental Sonrisa',
    role: 'Doctora',
    avatar: '/testimonials/sofia.jpg',
    rating: 5,
    quote: 'El diseño de nuestro sitio web es hermoso y funcional. Los pacientes pueden agendar citas online y el sistema de recordatorios automáticos ha reducido las ausencias significativamente.',
    project: 'Sitio web médico'
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

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
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Más de 500 empresas confían en nosotros para su presencia digital
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div 
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-2 border-primary/10 shadow-xl">
                  <CardContent className="p-8 md:p-12">
                    <div className="text-center mb-8">
                      {/* Quote */}
                      <div className="text-6xl text-primary/20 mb-4">"</div>
                      <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-6">
                        {testimonials[currentIndex].quote}
                      </blockquote>
                      
                      {/* Rating */}
                      <div className="flex justify-center mb-6">
                        {renderStars(testimonials[currentIndex].rating)}
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                      <Avatar className="w-16 h-16">
                        <AvatarImage 
                          src={testimonials[currentIndex].avatar} 
                          alt={testimonials[currentIndex].name}
                        />
                        <AvatarFallback className="text-lg">
                          {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="text-center md:text-left">
                        <h4 className="font-semibold text-lg">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-muted-foreground">
                          {testimonials[currentIndex].role} en {testimonials[currentIndex].company}
                        </p>
                        <p className="text-sm text-primary font-medium">
                          {testimonials[currentIndex].project}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={prevTestimonial}
            >
              <ChevronDownIcon className="rotate-90" size={20} />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={nextTestimonial}
            >
              <ChevronDownIcon className="rotate-[-90deg]" size={20} />
            </Button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Navigation */}
          <div className="grid grid-cols-5 gap-4 mt-8">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => goToTestimonial(index)}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-muted/50 hover:bg-muted border-2 border-transparent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="w-12 h-12 mx-auto mb-2">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <p className="text-xs font-medium truncate">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground truncate">{testimonial.company}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">4.9/5</div>
            <div className="text-sm text-muted-foreground">Rating promedio</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">500+</div>
            <div className="text-sm text-muted-foreground">Clientes felices</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">98%</div>
            <div className="text-sm text-muted-foreground">Satisfacción</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">24h</div>
            <div className="text-sm text-muted-foreground">Tiempo respuesta</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 