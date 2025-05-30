"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  personalInfoSchema,
  billingInfoSchema,
  type PersonalInfoFormData,
  type BillingInfoFormData,
} from '@/lib/validations/checkout';
import { UserIcon, MapPinIcon, CreditCardIcon } from '@/components/ui/icons';

const COUNTRIES = [
  { value: 'ES', label: 'España' },
  { value: 'FR', label: 'Francia' },
  { value: 'PT', label: 'Portugal' },
  { value: 'IT', label: 'Italia' },
  { value: 'DE', label: 'Alemania' },
  { value: 'UK', label: 'Reino Unido' },
];

const SPANISH_PROVINCES = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga',
  'Murcia', 'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Córdoba',
  'Valladolid', 'Vigo', 'Gijón', 'Hospitalet', 'Vitoria', 'Granada',
  'Elche', 'Oviedo', 'Badalona', 'Cartagena', 'Terrassa', 'Jerez',
];

interface CheckoutFormProps {
  onPersonalInfoSubmit: (data: PersonalInfoFormData) => void;
  onBillingInfoSubmit: (data: BillingInfoFormData) => void;
  personalInfo?: PersonalInfoFormData;
  billingInfo?: BillingInfoFormData;
  currentStep: number;
  className?: string;
}

export function CheckoutForm({
  onPersonalInfoSubmit,
  onBillingInfoSubmit,
  personalInfo,
  billingInfo,
  currentStep,
  className,
}: CheckoutFormProps) {
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const personalForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
    },
  });

  const billingForm = useForm<BillingInfoFormData>({
    resolver: zodResolver(billingInfoSchema),
    defaultValues: billingInfo || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'ES',
      taxId: '',
      sameAsShipping: true,
    },
  });

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked);
    billingForm.setValue('sameAsShipping', checked);
    
    if (checked && personalInfo) {
      // Copy personal info to billing
      billingForm.setValue('firstName', personalInfo.firstName);
      billingForm.setValue('lastName', personalInfo.lastName);
      billingForm.setValue('email', personalInfo.email);
      billingForm.setValue('phone', personalInfo.phone);
      billingForm.setValue('company', personalInfo.company || '');
    }
  };

  if (currentStep === 1) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon size={20} />
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...personalForm}>
            <form onSubmit={personalForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={personalForm.control}
                  name="firstName"
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
                  control={personalForm.control}
                  name="lastName"
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

              <FormField
                control={personalForm.control}
                name="email"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={personalForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono *</FormLabel>
                      <FormControl>
                        <Input placeholder="+34 600 000 000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={personalForm.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de tu empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Continuar a Facturación
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 2) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPinIcon size={20} />
            Información de Facturación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...billingForm}>
            <form onSubmit={billingForm.handleSubmit(onBillingInfoSubmit)} className="space-y-4">
              {/* Same as shipping checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sameAsShipping"
                  checked={sameAsShipping}
                  onCheckedChange={handleSameAsShippingChange}
                />
                <Label htmlFor="sameAsShipping">
                  Usar la misma información para envío
                </Label>
              </div>

              {!sameAsShipping && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={billingForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={billingForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellidos *</FormLabel>
                          <FormControl>
                            <Input placeholder="Apellidos" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={billingForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={billingForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono *</FormLabel>
                          <FormControl>
                            <Input placeholder="+34 600 000 000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={billingForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre de empresa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {/* Address Information */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Dirección de Facturación</h3>
                
                <FormField
                  control={billingForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección *</FormLabel>
                      <FormControl>
                        <Input placeholder="Calle, número, piso, puerta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={billingForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ciudad" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={billingForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provincia *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona provincia" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SPANISH_PROVINCES.map((province) => (
                              <SelectItem key={province} value={province}>
                                {province}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={billingForm.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código Postal *</FormLabel>
                        <FormControl>
                          <Input placeholder="28001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={billingForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>País *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona país" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COUNTRIES.map((country) => (
                              <SelectItem key={country.value} value={country.value}>
                                {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={billingForm.control}
                  name="taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIF/CIF (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="12345678A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Continuar al Pago
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  return null;
} 