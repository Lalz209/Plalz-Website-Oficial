"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/lib/navigation';
import { MailIcon, PhoneIcon } from '@/components/ui/icons';
import { useToast } from '@/hooks/use-toast';

export function FinalCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      variant: "success",
      title: "¡Mensaje enviado!",
      description: "Te contactaremos en las próximas 2 horas.",
    });

    setFormData({ name: '', email: '', phone: '', project: '' });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Urgency Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 text-lg animate-pulse">
              🔥 Oferta Limitada - Solo este mes
            </Badge>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ¿Listo para Transformar
            </span>
            <br />
            <span className="text-foreground">
              tu Negocio Digital?
            </span>
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            No esperes más. Cada día que pases sin una presencia digital profesional 
            es una oportunidad perdida. <strong className="text-foreground">Actúa ahora</strong> y 
            obtén un <strong className="text-primary">20% de descuento</strong> en tu primer proyecto.
          </p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4 mb-8"
          >
            {[
              { label: 'Días', value: '15' },
              { label: 'Horas', value: '08' },
              { label: 'Min', value: '42' },
              { label: 'Seg', value: '33' }
            ].map((time, index) => (
              <div key={index} className="text-center bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-primary/20">
                <div className="text-2xl font-bold text-primary">{time.value}</div>
                <div className="text-xs text-muted-foreground">{time.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Quick Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-primary/20 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">
                  Consulta Gratuita en 2 Minutos
                </CardTitle>
                <p className="text-muted-foreground">
                  Completa el formulario y te contactaremos en menos de 2 horas
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Input
                    name="email"
                    type="email"
                    placeholder="Tu email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Tu teléfono (opcional)"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-input rounded-md bg-background"
                    required
                  >
                    <option value="">¿Qué tipo de proyecto necesitas?</option>
                    <option value="web-development">Desarrollo Web</option>
                    <option value="ecommerce">Tienda Online</option>
                    <option value="maintenance">Mantenimiento</option>
                    <option value="seo">SEO y Marketing</option>
                    <option value="other">Otro</option>
                  </select>

                  <Button 
                    type="submit" 
                    className="w-full text-lg py-6" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Enviando...
                      </>
                    ) : (
                      '🚀 Obtener Consulta Gratuita'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">✓</span>
                      Sin compromiso
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">✓</span>
                      100% gratuito
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">✓</span>
                      Respuesta rápida
                    </span>
                  </div>
                  <p>No spam. Tu información está segura con nosotros.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Options & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Direct Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">¿Prefieres contacto directo?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <PhoneIcon size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Llámanos ahora</div>
                    <div className="text-primary font-bold">+1 (555) 123-4567</div>
                    <div className="text-sm text-muted-foreground">Disponible 24/7</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-secondary/5 rounded-lg hover:bg-secondary/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <MailIcon size={20} className="text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Envíanos un email</div>
                    <div className="text-secondary font-bold">info@plalz.com</div>
                    <div className="text-sm text-muted-foreground">Respuesta en 2 horas</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Offer */}
            <Card className="border-2 border-accent/50 bg-gradient-to-br from-accent/5 to-accent/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-center">
                  🎁 Oferta Especial de Lanzamiento
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">✓</span>
                    <span><strong>20% descuento</strong> en tu primer proyecto</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">✓</span>
                    <span><strong>Consulta gratuita</strong> de 1 hora</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">✓</span>
                    <span><strong>Hosting gratis</strong> por 6 meses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">✓</span>
                    <span><strong>SSL certificado</strong> incluido</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">✓</span>
                    <span><strong>Soporte 24/7</strong> por 3 meses</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Guarantee */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="font-bold text-lg mb-2">Garantía de Satisfacción 100%</h3>
                <p className="text-sm text-muted-foreground">
                  Si no estás completamente satisfecho con tu proyecto, 
                  te devolvemos tu dinero. Sin preguntas.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Únete a más de <strong className="text-primary">500 empresas</strong> que ya 
            han transformado su presencia digital con nosotros
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/portfolio">
                Ver Casos de Éxito
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/about">
                Conocer el Equipo
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 