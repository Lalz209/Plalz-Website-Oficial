"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/lib/navigation';
import { 
  CheckCircleIcon, 
  MailIcon, 
  CalendarIcon, 
  PhoneIcon,
  DownloadIcon,
  ArrowRightIcon,
  ClockIcon
} from '@/components/ui/icons';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'PLZ-000000';
  const [currentTime] = useState(new Date());

  // Calculate estimated delivery date (5 business days from now)
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  const timeline = [
    {
      id: 1,
      title: 'Pedido confirmado',
      description: 'Tu pedido ha sido recibido y confirmado',
      status: 'completed',
      date: currentTime,
    },
    {
      id: 2,
      title: 'Análisis inicial',
      description: 'Nuestro equipo analizará tus requerimientos',
      status: 'upcoming',
      date: new Date(currentTime.getTime() + 24 * 60 * 60 * 1000), // +1 day
    },
    {
      id: 3,
      title: 'Desarrollo en progreso',
      description: 'Comenzamos el desarrollo de tu proyecto',
      status: 'upcoming',
      date: new Date(currentTime.getTime() + 2 * 24 * 60 * 60 * 1000), // +2 days
    },
    {
      id: 4,
      title: 'Entrega final',
      description: 'Tu proyecto estará listo para revisión',
      status: 'upcoming',
      date: estimatedDelivery,
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon size={48} className="text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">¡Pedido Confirmado!</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Gracias por confiar en nosotros. Tu pedido ha sido procesado correctamente.
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Pedido #{orderNumber}
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                {currentTime.toLocaleDateString('es-ES')}
              </Badge>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* What's Next */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClockIcon size={20} />
                      ¿Qué sigue ahora?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {timeline.map((step, index) => (
                        <div key={step.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`
                              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                              ${step.status === 'completed' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-muted text-muted-foreground'
                              }
                            `}>
                              {step.status === 'completed' ? (
                                <CheckCircleIcon size={20} />
                              ) : (
                                step.id
                              )}
                            </div>
                            {index < timeline.length - 1 && (
                              <div className="w-0.5 h-12 bg-muted mt-2" />
                            )}
                          </div>
                          
                          <div className="flex-1 pb-8">
                            <h3 className="font-semibold mb-1">{step.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {step.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              {step.date.toLocaleDateString('es-ES', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Important Information */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MailIcon size={20} />
                      Información Importante
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MailIcon size={16} className="text-blue-600" />
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                            Confirmación por Email
                          </h4>
                        </div>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          Recibirás un email de confirmación con todos los detalles de tu pedido en los próximos minutos.
                        </p>
                      </div>

                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <PhoneIcon size={16} className="text-green-600" />
                          <h4 className="font-semibold text-green-900 dark:text-green-100">
                            Contacto Directo
                          </h4>
                        </div>
                        <p className="text-sm text-green-800 dark:text-green-200">
                          Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para comenzar el proyecto.
                        </p>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Información de Contacto</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Email:</strong> proyectos@plalz.com
                        </div>
                        <div>
                          <strong>Teléfono:</strong> +34 900 123 456
                        </div>
                        <div>
                          <strong>WhatsApp:</strong> +34 600 123 456
                        </div>
                        <div>
                          <strong>Horario:</strong> L-V 9:00-18:00
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Acciones Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" asChild>
                      <Link href="/dashboard">
                        Ver Mi Dashboard
                        <ArrowRightIcon size={16} className="ml-2" />
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <DownloadIcon size={16} className="mr-2" />
                      Descargar Factura
                    </Button>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/servicios">
                        Explorar Más Servicios
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>¿Necesitas Ayuda?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
                    </p>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">
                        <PhoneIcon size={16} className="mr-2" />
                        Contactar Soporte
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/faq">
                        Preguntas Frecuentes
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Estimated Delivery */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon size={20} />
                      Entrega Estimada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {estimatedDelivery.toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long'
                        })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {estimatedDelivery.toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <Separator className="my-4" />
                      <div className="text-xs text-muted-foreground">
                        * Los tiempos pueden variar según la complejidad del proyecto
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 