"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/lib/navigation';
import { Service } from '@/lib/types/services';

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/servicios" className="hover:text-primary transition-colors">
              Servicios
            </Link>
            <span>/</span>
            <Link 
              href={`/servicios/${service.category}`} 
              className="hover:text-primary transition-colors"
            >
              {service.category === 'paginas-web' ? 'Páginas Web' : 'Mantenimiento'}
            </Link>
            <span>/</span>
            <span className="text-foreground">{service.name}</span>
          </div>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl`}>
                {service.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {service.hero.title}
                </h1>
                <p className="text-xl text-primary font-semibold">
                  {service.hero.subtitle}
                </p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {service.hero.description}
            </p>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Características principales:</h3>
              <div className="grid grid-cols-1 gap-2">
                {service.hero.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-green-500 text-lg">✓</span>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" asChild>
                <Link href="#paquetes">
                  Ver Precios
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  Consulta Gratuita
                </Link>
              </Button>
            </motion.div>

            {/* Price Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6"
            >
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 text-lg">
                Desde €{service.packages[0]?.price || 'Consultar'}
              </Badge>
            </motion.div>
          </motion.div>

          {/* Video/Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {service.hero.videoUrl ? (
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={service.hero.videoUrl}
                  title={`Video explicativo de ${service.name}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4 opacity-50">{service.icon}</div>
                  <p className="text-muted-foreground">Imagen del servicio</p>
                </div>
              </div>
            )}

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-background border border-border rounded-lg p-4 shadow-lg"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {service.packages.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Paquetes disponibles
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -top-6 -right-6 bg-background border border-border rounded-lg p-4 shadow-lg"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {service.process.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Pasos del proceso
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 