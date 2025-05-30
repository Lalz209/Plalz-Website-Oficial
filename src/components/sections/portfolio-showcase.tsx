"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from '@/lib/navigation';

const projects = [
  {
    id: 1,
    title: 'Boutique Luna - E-commerce',
    category: 'E-commerce',
    image: '/portfolio/boutique-luna.jpg',
    description: 'Tienda online de moda femenina con sistema de pagos integrado',
    technologies: ['Next.js', 'Stripe', 'Tailwind CSS', 'MongoDB'],
    client: 'Boutique Luna',
    duration: '6 semanas',
    results: [
      '300% aumento en ventas online',
      '50% reducción en tiempo de carga',
      '95% satisfacción del cliente'
    ],
    liveUrl: 'https://boutiqueluna.com',
    featured: true
  },
  {
    id: 2,
    title: 'Consultoría CR - Sitio Corporativo',
    category: 'Corporativo',
    image: '/portfolio/consultoria-cr.jpg',
    description: 'Sitio web corporativo con sistema de gestión de contenidos',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    client: 'Consultoría CR',
    duration: '4 semanas',
    results: [
      '200% más leads calificados',
      'Primera página en Google',
      '40% más tiempo en sitio'
    ],
    liveUrl: 'https://consultoriacr.com',
    featured: true
  },
  {
    id: 3,
    title: 'Restaurante Sabores - Sistema de Reservas',
    category: 'Restaurante',
    image: '/portfolio/restaurante-sabores.jpg',
    description: 'Plataforma de reservas online con gestión de mesas',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Socket.io'],
    client: 'Restaurante Sabores',
    duration: '8 semanas',
    results: [
      '80% reservas online',
      '60% reducción en no-shows',
      'Gestión automatizada'
    ],
    liveUrl: 'https://restaurantesabores.com',
    featured: false
  },
  {
    id: 4,
    title: 'Inmobiliaria LF - Portal',
    category: 'Inmobiliaria',
    image: '/portfolio/inmobiliaria-lf.jpg',
    description: 'Portal inmobiliario con búsqueda avanzada y tours virtuales',
    technologies: ['Angular', 'Express.js', 'MongoDB', 'Cloudinary'],
    client: 'Inmobiliaria LF',
    duration: '10 semanas',
    results: [
      '150% más consultas',
      'Tours virtuales 360°',
      'CRM integrado'
    ],
    liveUrl: 'https://inmobiliarialf.com',
    featured: true
  },
  {
    id: 5,
    title: 'Clínica Dental Sonrisa - Gestión',
    category: 'Salud',
    image: '/portfolio/clinica-sonrisa.jpg',
    description: 'Sistema de gestión de pacientes y citas médicas',
    technologies: ['React', 'Django', 'PostgreSQL', 'Redis'],
    client: 'Clínica Dental Sonrisa',
    duration: '12 semanas',
    results: [
      '90% citas online',
      'Recordatorios automáticos',
      'Historial digital'
    ],
    liveUrl: 'https://clinicasonrisa.com',
    featured: false
  },
  {
    id: 6,
    title: 'TechStart - Landing Page',
    category: 'Startup',
    image: '/portfolio/techstart.jpg',
    description: 'Landing page de alta conversión para startup tecnológica',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
    client: 'TechStart',
    duration: '2 semanas',
    results: [
      '45% tasa de conversión',
      '98 PageSpeed Score',
      '500% más registros'
    ],
    liveUrl: 'https://techstart.com',
    featured: false
  }
];

const categories = ['Todos', 'E-commerce', 'Corporativo', 'Restaurante', 'Inmobiliaria', 'Salud', 'Startup'];

export function PortfolioShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = selectedCategory === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
            Nuestro Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Proyectos exitosos que han transformado negocios y generado resultados excepcionales
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={project.featured ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer">
                  <div className="relative overflow-hidden">
                    {/* Project Image */}
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                            ⭐ Destacado
                          </Badge>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      >
                        <div className="text-center text-white space-y-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="lg" 
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                                onClick={() => setSelectedProject(project)}
                              >
                                Ver Detalles
                              </Button>
                            </DialogTrigger>
                          </Dialog>
                          
                          <div className="flex gap-2 justify-center">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                              asChild
                            >
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                Ver Sitio
                              </a>
                            </Button>
                          </div>
                        </div>
                      </motion.div>

                      {/* Placeholder for actual image */}
                      <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                        {project.category === 'E-commerce' && '🛒'}
                        {project.category === 'Corporativo' && '🏢'}
                        {project.category === 'Restaurante' && '🍽️'}
                        {project.category === 'Inmobiliaria' && '🏠'}
                        {project.category === 'Salud' && '🏥'}
                        {project.category === 'Startup' && '🚀'}
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary" className="mb-2">
                          {project.category}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <strong>Cliente:</strong> {project.client}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center text-6xl opacity-20">
                    {selectedProject.category === 'E-commerce' && '🛒'}
                    {selectedProject.category === 'Corporativo' && '🏢'}
                    {selectedProject.category === 'Restaurante' && '🍽️'}
                    {selectedProject.category === 'Inmobiliaria' && '🏠'}
                    {selectedProject.category === 'Salud' && '🏥'}
                    {selectedProject.category === 'Startup' && '🚀'}
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <strong>Cliente:</strong> {selectedProject.client}
                    </div>
                    <div>
                      <strong>Duración:</strong> {selectedProject.duration}
                    </div>
                    <div>
                      <strong>Categoría:</strong> {selectedProject.category}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Tecnologías Utilizadas</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <h4 className="font-semibold mb-3">Resultados Obtenidos</h4>
                  <ul className="space-y-2 mb-6">
                    {selectedProject.results.map((result, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full">
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visitar Sitio Web
                    </a>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

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
              ¿Te gusta lo que ves?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Estos son solo algunos ejemplos de nuestro trabajo. 
              Cada proyecto es único y está diseñado específicamente para las necesidades del cliente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Iniciar Mi Proyecto
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/portfolio">
                  Ver Portfolio Completo
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 