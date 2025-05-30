"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useQuoteStore } from '@/lib/stores/quote-store';
import { contactInfoSchema, ContactInfoFormData } from '@/lib/validations/quote';
import { ContactMethod } from '@/lib/types/quote';
import { 
  UserIcon, 
  MailIcon, 
  PhoneIcon, 
  BuildingIcon,
  MessageSquareIcon,
  VideoIcon,
  ClockIcon 
} from '@/components/ui/icons';

const CONTACT_METHODS = {
  email: {
    name: 'Email',
    description: 'Comunicación por correo electrónico',
    icon: MailIcon,
    color: 'bg-blue-100 text-blue-800',
  },
  phone: {
    name: 'Teléfono',
    description: 'Llamadas telefónicas',
    icon: PhoneIcon,
    color: 'bg-green-100 text-green-800',
  },
  whatsapp: {
    name: 'WhatsApp',
    description: 'Mensajes por WhatsApp',
    icon: MessageSquareIcon,
    color: 'bg-green-100 text-green-800',
  },
  'video-call': {
    name: 'Videollamada',
    description: 'Reuniones por Zoom/Meet',
    icon: VideoIcon,
    color: 'bg-purple-100 text-purple-800',
  },
};

const TIME_OPTIONS = {
  morning: {
    name: 'Mañana',
    description: '9:00 - 12:00',
    icon: '🌅',
  },
  afternoon: {
    name: 'Tarde',
    description: '12:00 - 18:00',
    icon: '☀️',
  },
  evening: {
    name: 'Noche',
    description: '18:00 - 21:00',
    icon: '🌙',
  },
  anytime: {
    name: 'Cualquier momento',
    description: 'Flexible con horarios',
    icon: '🕐',
  },
};

export function ContactStep() {
  const { currentQuote, updateQuoteData } = useQuoteStore();

  const form = useForm<ContactInfoFormData>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      contactInfo: {
        firstName: currentQuote.contactInfo?.firstName || '',
        lastName: currentQuote.contactInfo?.lastName || '',
        email: currentQuote.contactInfo?.email || '',
        phone: currentQuote.contactInfo?.phone || '',
        company: currentQuote.contactInfo?.company || '',
        position: currentQuote.contactInfo?.position || '',
        preferredContactMethod: currentQuote.contactInfo?.preferredContactMethod || 'email',
        bestTimeToContact: currentQuote.contactInfo?.bestTimeToContact || 'anytime',
        additionalComments: currentQuote.contactInfo?.additionalComments || '',
      },
    },
  });

  const watchedContactInfo = form.watch('contactInfo');

  // Update store when form values change
  form.watch((data) => {
    if (data.contactInfo && data.contactInfo.firstName && data.contactInfo.lastName && 
        data.contactInfo.email && data.contactInfo.phone) {
      const validContactInfo = {
        firstName: data.contactInfo.firstName,
        lastName: data.contactInfo.lastName,
        email: data.contactInfo.email,
        phone: data.contactInfo.phone,
        company: data.contactInfo.company || '',
        position: data.contactInfo.position || '',
        preferredContactMethod: data.contactInfo.preferredContactMethod || 'email',
        bestTimeToContact: data.contactInfo.bestTimeToContact || 'anytime',
        additionalComments: data.contactInfo.additionalComments || '',
      };
      updateQuoteData(7, { contactInfo: validContactInfo });
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Información de Contacto</h2>
        <p className="text-muted-foreground">
          Completa tus datos para que podamos contactarte y comenzar tu proyecto.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <UserIcon size={20} />
              Información Personal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contactInfo.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre *</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactInfo.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos *</FormLabel>
                    <FormControl>
                      <Input placeholder="Tus apellidos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contactInfo.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactInfo.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono *</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+34 600 000 000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <BuildingIcon size={20} />
              Información de la Empresa (Opcional)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contactInfo.company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de tu empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactInfo.position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu posición en la empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Contact Preferences */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Preferencias de Contacto</h3>
            
            <FormField
              control={form.control}
              name="contactInfo.preferredContactMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Contacto Preferido</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {Object.entries(CONTACT_METHODS).map(([key, method]) => {
                        const Icon = method.icon;
                        return (
                          <div key={key} className="relative">
                            <RadioGroupItem value={key} id={key} className="peer sr-only" />
                            <Label htmlFor={key} className="cursor-pointer">
                              <Card className="transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${method.color}`}>
                                      <Icon size={20} />
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{method.name}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        {method.description}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactInfo.bestTimeToContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <ClockIcon size={16} />
                    Mejor Horario para Contactarte
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {Object.entries(TIME_OPTIONS).map(([key, time]) => (
                        <div key={key} className="relative">
                          <RadioGroupItem value={key} id={key} className="peer sr-only" />
                          <Label htmlFor={key} className="cursor-pointer">
                            <Card className="transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{time.icon}</span>
                                  <div>
                                    <h4 className="font-medium">{time.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {time.description}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Additional Comments */}
          <FormField
            control={form.control}
            name="contactInfo.additionalComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentarios Adicionales</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cuéntanos más sobre tu proyecto, expectativas especiales, o cualquier información adicional que consideres importante..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <p className="text-sm text-muted-foreground">
                  Opcional: Comparte cualquier detalle adicional que nos ayude a entender mejor tu proyecto
                </p>
              </FormItem>
            )}
          />

          {/* Contact Summary */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Resumen de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Nombre completo:</span>
                  <p className="font-medium">
                    {watchedContactInfo.firstName && watchedContactInfo.lastName
                      ? `${watchedContactInfo.firstName} ${watchedContactInfo.lastName}`
                      : 'No especificado'
                    }
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <p className="font-medium">
                    {watchedContactInfo.email || 'No especificado'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Teléfono:</span>
                  <p className="font-medium">
                    {watchedContactInfo.phone || 'No especificado'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Empresa:</span>
                  <p className="font-medium">
                    {watchedContactInfo.company || 'No especificada'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Método preferido:</span>
                  <p className="font-medium">
                    {CONTACT_METHODS[watchedContactInfo.preferredContactMethod as ContactMethod]?.name}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Mejor horario:</span>
                  <p className="font-medium">
                    {TIME_OPTIONS[watchedContactInfo.bestTimeToContact]?.name}
                  </p>
                </div>
              </div>
              
              {watchedContactInfo.additionalComments && (
                <div className="mt-3 pt-3 border-t">
                  <span className="text-muted-foreground text-sm">Comentarios:</span>
                  <p className="text-sm mt-1">{watchedContactInfo.additionalComments}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm">🔒</span>
                </div>
                <div className="text-sm">
                  <h4 className="font-medium text-blue-900 mb-1">Protección de Datos</h4>
                  <p className="text-blue-800">
                    Tus datos personales están protegidos y solo serán utilizados para contactarte 
                    sobre este proyecto. No compartimos tu información con terceros y cumplimos 
                    con el RGPD.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
} 