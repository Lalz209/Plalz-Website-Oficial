"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import { PasswordInput } from '@/components/ui/password-input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardBreadcrumbs } from '@/components/dashboard/dashboard-breadcrumbs';
import { useAuth } from '@/lib/contexts/auth-context';
import {
  UserIcon,
  LockIcon,
  BellIcon,
  CreditCardIcon,
  TrashIcon,
  SaveIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  UploadIcon,
} from '@/components/ui/icons';

function PersonalInfoTab() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    company: '',
    position: '',
    bio: '',
  });

  const handleSave = () => {
    // Here you would save the data
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>
            Actualiza tu información personal y de contacto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <Avatar size="lg" fallback={`${formData.firstName[0] || 'U'}${formData.lastName[0] || 'S'}`} />
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                <UploadIcon className="h-4 w-4 mr-2" />
                Cambiar Foto
              </Button>
              <p className="text-sm text-muted-foreground">
                JPG, PNG o GIF. Máximo 2MB.
              </p>
            </div>
          </div>

          <Separator />

          {/* Form Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Cargo</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografía</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              placeholder="Cuéntanos un poco sobre ti..."
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave}>
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Editar Información
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      return;
    }
    // Here you would change the password
    setShowSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cambiar Contraseña</CardTitle>
          <CardDescription>
            Actualiza tu contraseña para mantener tu cuenta segura
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {showSuccess && (
            <Alert>
              <CheckCircleIcon className="h-4 w-4" />
              <AlertDescription>
                Tu contraseña ha sido actualizada exitosamente.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="currentPassword">Contraseña Actual</Label>
            <PasswordInput
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Ingresa tu contraseña actual"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">Nueva Contraseña</Label>
            <PasswordInput
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Ingresa tu nueva contraseña"
              showStrength
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
            <PasswordInput
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu nueva contraseña"
            />
          </div>

          <Button 
            onClick={handlePasswordChange}
            disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
          >
            <LockIcon className="h-4 w-4 mr-2" />
            Cambiar Contraseña
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Autenticación de Dos Factores</CardTitle>
          <CardDescription>
            Agrega una capa extra de seguridad a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Autenticación de Dos Factores</p>
              <p className="text-sm text-muted-foreground">
                Requiere un código adicional al iniciar sesión
              </p>
            </div>
            <Switch />
          </div>
          <Button variant="outline" disabled>
            Configurar 2FA
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationsTab() {
  const [notifications, setNotifications] = useState({
    emailProjects: true,
    emailMarketing: false,
    emailSecurity: true,
    pushProjects: true,
    pushMarketing: false,
    pushSecurity: true,
    smsProjects: false,
    smsMarketing: false,
    smsSecurity: true,
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferencias de Notificaciones</CardTitle>
          <CardDescription>
            Configura cómo y cuándo quieres recibir notificaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Notifications */}
          <div className="space-y-4">
            <h4 className="font-medium">Notificaciones por Email</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Actualizaciones de Proyectos</p>
                  <p className="text-sm text-muted-foreground">
                    Recibe emails sobre el progreso de tus proyectos
                  </p>
                </div>
                <Switch
                  checked={notifications.emailProjects}
                  onCheckedChange={(value) => handleNotificationChange('emailProjects', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing y Promociones</p>
                  <p className="text-sm text-muted-foreground">
                    Recibe ofertas especiales y noticias de productos
                  </p>
                </div>
                <Switch
                  checked={notifications.emailMarketing}
                  onCheckedChange={(value) => handleNotificationChange('emailMarketing', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alertas de Seguridad</p>
                  <p className="text-sm text-muted-foreground">
                    Recibe alertas sobre actividad sospechosa en tu cuenta
                  </p>
                </div>
                <Switch
                  checked={notifications.emailSecurity}
                  onCheckedChange={(value) => handleNotificationChange('emailSecurity', value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Push Notifications */}
          <div className="space-y-4">
            <h4 className="font-medium">Notificaciones Push</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Actualizaciones de Proyectos</p>
                  <p className="text-sm text-muted-foreground">
                    Notificaciones instantáneas sobre tus proyectos
                  </p>
                </div>
                <Switch
                  checked={notifications.pushProjects}
                  onCheckedChange={(value) => handleNotificationChange('pushProjects', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing y Promociones</p>
                  <p className="text-sm text-muted-foreground">
                    Notificaciones sobre ofertas y promociones
                  </p>
                </div>
                <Switch
                  checked={notifications.pushMarketing}
                  onCheckedChange={(value) => handleNotificationChange('pushMarketing', value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* SMS Notifications */}
          <div className="space-y-4">
            <h4 className="font-medium">Notificaciones SMS</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alertas de Seguridad</p>
                  <p className="text-sm text-muted-foreground">
                    SMS para verificación y alertas críticas
                  </p>
                </div>
                <Switch
                  checked={notifications.smsSecurity}
                  onCheckedChange={(value) => handleNotificationChange('smsSecurity', value)}
                />
              </div>
            </div>
          </div>

          <Button>
            <SaveIcon className="h-4 w-4 mr-2" />
            Guardar Preferencias
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function BillingTab() {
  const [billingInfo, setBillingInfo] = useState({
    companyName: '',
    taxId: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información de Facturación</CardTitle>
          <CardDescription>
            Configura tu información de facturación y métodos de pago
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nombre de la Empresa</Label>
              <Input
                id="companyName"
                value={billingInfo.companyName}
                onChange={(e) => setBillingInfo({ ...billingInfo, companyName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">RFC / Tax ID</Label>
              <Input
                id="taxId"
                value={billingInfo.taxId}
                onChange={(e) => setBillingInfo({ ...billingInfo, taxId: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={billingInfo.address}
                onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                value={billingInfo.city}
                onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Select value={billingInfo.country} onValueChange={(value) => setBillingInfo({ ...billingInfo, country: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mx">México</SelectItem>
                  <SelectItem value="us">Estados Unidos</SelectItem>
                  <SelectItem value="ca">Canadá</SelectItem>
                  <SelectItem value="es">España</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Código Postal</Label>
              <Input
                id="postalCode"
                value={billingInfo.postalCode}
                onChange={(e) => setBillingInfo({ ...billingInfo, postalCode: e.target.value })}
              />
            </div>
          </div>

          <Button>
            <SaveIcon className="h-4 w-4 mr-2" />
            Guardar Información
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Métodos de Pago</CardTitle>
          <CardDescription>
            Gestiona tus métodos de pago guardados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CreditCardIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              No tienes métodos de pago guardados
            </p>
            <Button variant="outline">
              Agregar Método de Pago
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DangerZoneTab() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleDeleteAccount = () => {
    if (deleteConfirmText === 'ELIMINAR') {
      // Here you would delete the account
      console.log('Account deletion confirmed');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Zona de Peligro</CardTitle>
          <CardDescription>
            Acciones irreversibles que afectarán permanentemente tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertDescription>
              <strong>Advertencia:</strong> Estas acciones no se pueden deshacer. 
              Procede con precaución.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="p-4 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-600 mb-2">Eliminar Cuenta</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, 
                asegúrate de que realmente quieres hacer esto.
              </p>
              
              {!showDeleteConfirm ? (
                <Button 
                  variant="destructive" 
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Eliminar Cuenta
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deleteConfirm">
                      Escribe <strong>ELIMINAR</strong> para confirmar:
                    </Label>
                    <Input
                      id="deleteConfirm"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      placeholder="ELIMINAR"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      disabled={deleteConfirmText !== 'ELIMINAR'}
                    >
                      Confirmar Eliminación
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteConfirmText('');
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs />
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Gestiona tu cuenta, preferencias y configuración de seguridad
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <LockIcon className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellIcon className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4" />
            Facturación
          </TabsTrigger>
          <TabsTrigger value="danger" className="flex items-center gap-2">
            <TrashIcon className="h-4 w-4" />
            Peligro
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoTab />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="billing">
          <BillingTab />
        </TabsContent>

        <TabsContent value="danger">
          <DangerZoneTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function SettingsPageWrapper() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <SettingsPage />
      </DashboardLayout>
    </ProtectedRoute>
  );
} 