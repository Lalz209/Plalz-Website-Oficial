"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useQuoteStore } from '@/lib/stores/quote-store';
import { timelineSchema, TimelineFormData } from '@/lib/validations/quote';
import { PRIORITY_LEVELS } from '@/lib/data/quote-data';
import { Priority } from '@/lib/types/quote';
import { 
  CalendarIcon, 
  ClockIcon, 
  AlertTriangleIcon,
  CheckCircleIcon,
  PlayIcon,
  TestTubeIcon,
  RocketIcon 
} from '@/components/ui/icons';

const AVAILABILITY_OPTIONS = {
  'flexible': {
    name: 'Flexible',
    description: 'Disponible cuando sea necesario',
    icon: '🕐',
  },
  'business-hours': {
    name: 'Horario Comercial',
    description: 'Lunes a Viernes, 9:00 - 18:00',
    icon: '🏢',
  },
  'evenings': {
    name: 'Tardes/Noches',
    description: 'Después de las 18:00',
    icon: '🌙',
  },
  'weekends': {
    name: 'Fines de Semana',
    description: 'Sábados y Domingos',
    icon: '📅',
  },
};

const PHASES_CONFIG = {
  design: {
    name: 'Diseño',
    description: 'Wireframes, mockups y prototipo',
    icon: CheckCircleIcon,
    duration: '1-2 semanas',
  },
  development: {
    name: 'Desarrollo',
    description: 'Programación y construcción',
    icon: PlayIcon,
    duration: '3-6 semanas',
  },
  testing: {
    name: 'Testing',
    description: 'Pruebas y correcciones',
    icon: TestTubeIcon,
    duration: '1 semana',
  },
  launch: {
    name: 'Lanzamiento',
    description: 'Despliegue y puesta en marcha',
    icon: RocketIcon,
    duration: '1 semana',
  },
};

export function TimelineStep() {
  const { currentQuote, updateQuoteData } = useQuoteStore();

  const form = useForm<TimelineFormData>({
    resolver: zodResolver(timelineSchema),
    defaultValues: {
      timeline: {
        desiredLaunchDate: currentQuote.timeline?.desiredLaunchDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        priority: currentQuote.timeline?.priority || 'medium',
        phases: {
          design: currentQuote.timeline?.phases?.design ?? true,
          development: currentQuote.timeline?.phases?.development ?? true,
          testing: currentQuote.timeline?.phases?.testing ?? true,
          launch: currentQuote.timeline?.phases?.launch ?? true,
        },
        availabilityForMeetings: currentQuote.timeline?.availabilityForMeetings || 'business-hours',
      },
    },
  });

  const watchedTimeline = form.watch('timeline');

  // Update store when form values change
  form.watch((data) => {
    if (data.timeline && data.timeline.desiredLaunchDate && data.timeline.priority && data.timeline.phases && data.timeline.availabilityForMeetings) {
      const validTimeline = {
        desiredLaunchDate: data.timeline.desiredLaunchDate,
        priority: data.timeline.priority,
        phases: {
          design: data.timeline.phases.design || false,
          development: data.timeline.phases.development || false,
          testing: data.timeline.phases.testing || false,
          launch: data.timeline.phases.launch || false,
        },
        availabilityForMeetings: data.timeline.availabilityForMeetings,
      };
      updateQuoteData(5, { timeline: validTimeline });
    }
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getEstimatedDuration = () => {
    const selectedPhases = Object.entries(watchedTimeline.phases).filter(([_, selected]) => selected);
    const priority = PRIORITY_LEVELS[watchedTimeline.priority];
    return priority.timeline;
  };

  const getSelectedPhasesCount = () => {
    return Object.values(watchedTimeline.phases).filter(Boolean).length;
  };

  const getPriorityMultiplier = (priority: Priority) => {
    return PRIORITY_LEVELS[priority].multiplier;
  };

  const formatMultiplier = (multiplier: number) => {
    const percentage = Math.round((multiplier - 1) * 100);
    if (percentage === 0) return '';
    return percentage > 0 ? `+${percentage}%` : `${percentage}%`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Timeline y Urgencia</h2>
        <p className="text-muted-foreground">
          Define cuándo necesitas tu proyecto y cómo organizaremos el trabajo.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          {/* Desired Launch Date */}
          <FormField
            control={form.control}
            name="timeline.desiredLaunchDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  <CalendarIcon size={20} />
                  Fecha Deseada de Lanzamiento
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ? field.value.toISOString().split('T')[0] : ''}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </FormControl>
                <FormMessage />
                {field.value && (
                  <p className="text-sm text-muted-foreground">
                    Fecha seleccionada: {formatDate(field.value)}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Priority Level */}
          <FormField
            control={form.control}
            name="timeline.priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium flex items-center gap-2">
                  <AlertTriangleIcon size={20} />
                  Prioridad del Proyecto
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {Object.entries(PRIORITY_LEVELS).map(([key, priority]) => (
                      <div key={key} className="relative">
                        <RadioGroupItem value={key} id={key} className="peer sr-only" />
                        <Label htmlFor={key} className="cursor-pointer">
                          <Card className="h-full transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{priority.name}</h3>
                                <div className="flex items-center gap-2">
                                  <Badge 
                                    variant={key === 'urgent' ? 'destructive' : key === 'high' ? 'default' : 'secondary'}
                                  >
                                    {priority.timeline}
                                  </Badge>
                                  {priority.multiplier !== 1.0 && (
                                    <Badge variant="outline">
                                      {formatMultiplier(priority.multiplier)}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {priority.description}
                              </p>
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

          {/* Project Phases */}
          <div className="space-y-4">
            <Label className="text-base font-medium flex items-center gap-2">
              <ClockIcon size={20} />
              Fases del Proyecto
            </Label>
            <p className="text-sm text-muted-foreground">
              Selecciona las fases que quieres incluir en tu proyecto
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(PHASES_CONFIG).map(([phaseKey, phase]) => {
                const Icon = phase.icon;
                return (
                  <FormField
                    key={phaseKey}
                    control={form.control}
                    name={`timeline.phases.${phaseKey}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <Card className={`transition-all cursor-pointer hover:shadow-md ${
                          field.value ? 'ring-2 ring-primary border-primary' : ''
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Icon size={16} className="text-primary" />
                                  <Label className="font-medium cursor-pointer">
                                    {phase.name}
                                  </Label>
                                  <Badge variant="outline" className="text-xs">
                                    {phase.duration}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {phase.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </FormItem>
                    )}
                  />
                );
              })}
            </div>
          </div>

          {/* Availability for Meetings */}
          <FormField
            control={form.control}
            name="timeline.availabilityForMeetings"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Disponibilidad para Reuniones
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {Object.entries(AVAILABILITY_OPTIONS).map(([key, option]) => (
                      <div key={key} className="relative">
                        <RadioGroupItem value={key} id={key} className="peer sr-only" />
                        <Label htmlFor={key} className="cursor-pointer">
                          <Card className="transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{option.icon}</span>
                                <div>
                                  <h4 className="font-medium">{option.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {option.description}
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

          {/* Timeline Summary */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Resumen del Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Fecha objetivo:</span>
                  <p className="font-medium">
                    {watchedTimeline.desiredLaunchDate ? formatDate(watchedTimeline.desiredLaunchDate) : 'No definida'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Prioridad:</span>
                  <p className="font-medium">
                    {PRIORITY_LEVELS[watchedTimeline.priority].name}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Duración estimada:</span>
                  <p className="font-medium">
                    {getEstimatedDuration()}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Fases incluidas:</span>
                  <p className="font-medium">
                    {getSelectedPhasesCount()} de {Object.keys(PHASES_CONFIG).length}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-muted-foreground">Disponibilidad:</span>
                  <p className="font-medium">
                    {AVAILABILITY_OPTIONS[watchedTimeline.availabilityForMeetings].name}
                  </p>
                </div>
              </div>
              
              {getPriorityMultiplier(watchedTimeline.priority) !== 1.0 && (
                <div className="mt-3 pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <AlertTriangleIcon size={16} className="text-amber-500" />
                    <span className="text-sm">
                      La prioridad {PRIORITY_LEVELS[watchedTimeline.priority].name.toLowerCase()} 
                      {getPriorityMultiplier(watchedTimeline.priority) > 1.0 ? ' incrementa' : ' reduce'} 
                      el precio en {formatMultiplier(getPriorityMultiplier(watchedTimeline.priority))}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
} 