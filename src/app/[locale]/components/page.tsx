"use client"

import { useState } from "react"
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Switch,
  Progress,
  CircularProgress,
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  Avatar,
  AvatarGroup,
} from "@/components/ui"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Link } from "@/lib/navigation"
import { useTranslations } from 'next-intl'
import { MainLayout } from '@/components/layout/main-layout'

export default function ComponentsPage() {
  const [progress, setProgress] = useState(60)
  const [switchValue, setSwitchValue] = useState(false)
  const { toast } = useToast()
  const t = useTranslations('Components')

  const showToast = (variant: "default" | "success" | "warning" | "destructive") => {
    toast({
      variant,
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
      description: `This is a ${variant} toast notification.`,
    })
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground">{t('title')}</h1>
              <p className="text-muted-foreground">
                {t('description')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  ← {t('backToHome')}
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>

          <div className="grid gap-8">
            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>{t('buttons.title')}</CardTitle>
                <CardDescription>
                  {t('buttons.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">🚀</Button>
                </div>
              </CardContent>
            </Card>

            {/* Inputs */}
            <Card>
              <CardHeader>
                <CardTitle>{t('inputs.title')}</CardTitle>
                <CardDescription>
                  {t('inputs.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label={t('inputs.defaultInput.label')} placeholder={t('inputs.defaultInput.placeholder')} />
                <Input 
                  label={t('inputs.errorState.label')} 
                  placeholder={t('inputs.errorState.placeholder')} 
                  error={t('inputs.errorState.error')}
                />
                <Input 
                  label={t('inputs.successState.label')} 
                  placeholder={t('inputs.successState.placeholder')} 
                  success={t('inputs.successState.success')}
                />
                <Input 
                  label={t('inputs.withHelperText.label')} 
                  placeholder={t('inputs.withHelperText.placeholder')} 
                  helperText={t('inputs.withHelperText.helperText')}
                />
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>{t('badges.title')}</CardTitle>
                <CardDescription>
                  {t('badges.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Error</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge removable onRemove={() => console.log('removed')}>
                    {t('badges.removable')}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Components */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('dialog.title')}</CardTitle>
                  <CardDescription>
                    {t('dialog.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t('dialog.title')}</DialogTitle>
                        <DialogDescription>
                          {t('dialog.description')}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p>{t('dialog.content')}</p>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Confirm</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('dropdownMenu.title')}</CardTitle>
                  <CardDescription>
                    {t('dropdownMenu.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>{t('dropdownMenu.myAccount')}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>{t('dropdownMenu.profile')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('dropdownMenu.settings')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('dropdownMenu.billing')}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>{t('dropdownMenu.logout')}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>{t('tabs.title')}</CardTitle>
                <CardDescription>
                  {t('tabs.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">{t('tabs.tab1')}</TabsTrigger>
                    <TabsTrigger value="tab2">{t('tabs.tab2')}</TabsTrigger>
                    <TabsTrigger value="tab3">{t('tabs.tab3')}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="mt-4">
                    <p>{t('tabs.content1')}</p>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-4">
                    <p>{t('tabs.content2')}</p>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-4">
                    <p>{t('tabs.content3')}</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Switch */}
            <Card>
              <CardHeader>
                <CardTitle>{t('switch.title')}</CardTitle>
                <CardDescription>
                  {t('switch.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Switch 
                  checked={switchValue}
                  onCheckedChange={setSwitchValue}
                  label={t('switch.enableNotifications')}
                  description={t('switch.receiveEmailNotifications')}
                />
                <Switch size="sm" label={t('switch.smallSwitch')} />
                <Switch size="lg" label={t('switch.largeSwitch')} />
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>{t('progress.title')}</CardTitle>
                <CardDescription>
                  {t('progress.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Progress value={progress} showValue label={t('progress.uploadProgress')} />
                  <Progress value={80} variant="success" showValue />
                  <Progress value={30} variant="warning" showValue />
                  <Progress value={90} variant="destructive" showValue />
                </div>
                <div className="flex justify-center">
                  <CircularProgress value={75} showValue />
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    -10%
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    +10%
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>{t('skeleton.title')}</CardTitle>
                <CardDescription>
                  {t('skeleton.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <SkeletonAvatar />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <SkeletonText lines={3} />
              </CardContent>
            </Card>

            {/* Avatar */}
            <Card>
              <CardHeader>
                <CardTitle>{t('avatar.title')}</CardTitle>
                <CardDescription>
                  {t('avatar.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar fallback="JD" size="sm" />
                  <Avatar fallback="AB" size="default" />
                  <Avatar fallback="CD" size="lg" />
                  <Avatar fallback="EF" size="xl" showStatus status="online" />
                </div>
                <AvatarGroup max={3} total={8}>
                  <Avatar fallback="U1" />
                  <Avatar fallback="U2" />
                  <Avatar fallback="U3" />
                  <Avatar fallback="U4" />
                  <Avatar fallback="U5" />
                </AvatarGroup>
              </CardContent>
            </Card>

            {/* Toast */}
            <Card>
              <CardHeader>
                <CardTitle>{t('toast.title')}</CardTitle>
                <CardDescription>
                  {t('toast.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => showToast("default")}>
                    {t('toast.defaultToast')}
                  </Button>
                  <Button onClick={() => showToast("success")}>
                    {t('toast.successToast')}
                  </Button>
                  <Button onClick={() => showToast("warning")}>
                    {t('toast.warningToast')}
                  </Button>
                  <Button onClick={() => showToast("destructive")}>
                    {t('toast.errorToast')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 