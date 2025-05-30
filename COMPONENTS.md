# UI Component System Documentation

A complete, accessible, and customizable UI component library built with Radix UI, Tailwind CSS, and TypeScript.

## 🎯 Overview

This component system provides a comprehensive set of reusable UI components designed for modern web applications. All components are:

- **Fully Accessible** - Built with ARIA standards and keyboard navigation
- **Theme Aware** - Support for light/dark mode out of the box
- **Type Safe** - Complete TypeScript coverage with proper prop types
- **Customizable** - Variants and sizes using class-variance-authority
- **Animated** - Smooth transitions and micro-interactions

## 📦 Components

### Base Components

#### Button
Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui/button'

// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🚀</Button>

// As child component
<Button asChild>
  <Link href="/somewhere">Navigate</Link>
</Button>
```

**Props:**
- `variant`: "default" | "secondary" | "outline" | "ghost" | "destructive"
- `size`: "default" | "sm" | "lg" | "icon"
- `asChild`: boolean - Renders as child component

#### Input
Form input with validation states and accessibility features.

```tsx
import { Input } from '@/components/ui/input'

<Input 
  label="Email" 
  placeholder="Enter your email"
  error="Invalid email format"
  helperText="We'll never share your email"
/>
```

**Props:**
- `label`: string - Input label
- `error`: string - Error message
- `success`: string - Success message
- `helperText`: string - Helper text
- `variant`: "default" | "error" | "success"
- `size`: "default" | "sm" | "lg"

#### Card
Container component for grouping related content.

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card'

<Card interactive>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Props:**
- `variant`: "default" | "elevated" | "outlined" | "ghost"
- `size`: "default" | "sm" | "lg"
- `interactive`: boolean - Adds hover effects

#### Badge
Small status indicators and tags.

```tsx
import { Badge } from '@/components/ui/badge'

<Badge variant="success">Active</Badge>
<Badge variant="destructive" removable onRemove={() => {}}>
  Error
</Badge>
<Badge icon={<Icon />}>With Icon</Badge>
```

**Props:**
- `variant`: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"
- `size`: "default" | "sm" | "lg"
- `removable`: boolean - Shows close button
- `onRemove`: () => void - Remove callback
- `icon`: ReactNode - Icon element

### Interactive Components

#### Dialog
Modal dialogs for important interactions.

```tsx
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <div>Content</div>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### DropdownMenu
Contextual menus with keyboard navigation.

```tsx
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Tabs
Navigation between different sections.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Switch
Toggle controls for binary options.

```tsx
import { Switch } from '@/components/ui/switch'

<Switch 
  label="Dark Mode"
  description="Toggle dark mode theme"
  checked={isDark}
  onCheckedChange={setIsDark}
/>
```

**Props:**
- `label`: string - Switch label
- `description`: string - Description text
- `size`: "default" | "sm" | "lg"

### Feedback Components

#### Toast
Notification messages with different variants.

```tsx
import { useToast } from '@/hooks/use-toast'

const { toast } = useToast()

// Show toast
toast({
  title: "Success!",
  description: "Your changes have been saved.",
  variant: "success"
})
```

**Variants:**
- `default`: Standard notification
- `success`: Success message
- `warning`: Warning message
- `destructive`: Error message

#### Progress
Progress indicators for loading states.

```tsx
import { Progress, CircularProgress } from '@/components/ui/progress'

<Progress 
  value={60} 
  showValue 
  label="Upload Progress"
  variant="success"
/>

<CircularProgress 
  value={75} 
  showValue 
  size={120}
  variant="default"
/>
```

**Props:**
- `value`: number (0-100) - Progress value
- `showValue`: boolean - Show percentage
- `label`: string - Progress label
- `variant`: "default" | "success" | "warning" | "destructive"
- `size`: "sm" | "default" | "lg"

#### Skeleton
Loading placeholders for content.

```tsx
import { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonButton 
} from '@/components/ui/skeleton'

<Skeleton className="w-[100px] h-[20px]" />
<SkeletonText lines={3} />
<SkeletonAvatar />
<SkeletonButton />
```

### Display Components

#### Avatar
User profile images with fallbacks and status indicators.

```tsx
import { Avatar, AvatarGroup } from '@/components/ui/avatar'

<Avatar 
  src="/avatar.jpg" 
  alt="User" 
  fallback="JD"
  size="lg"
  showStatus
  status="online"
/>

<AvatarGroup max={3} total={10}>
  <Avatar fallback="U1" />
  <Avatar fallback="U2" />
  <Avatar fallback="U3" />
</AvatarGroup>
```

**Props:**
- `src`: string - Image URL
- `alt`: string - Alt text
- `fallback`: string - Fallback text
- `size`: "sm" | "default" | "lg" | "xl" | "2xl"
- `showStatus`: boolean - Show status indicator
- `status`: "online" | "offline" | "away" | "busy"

## 🎨 Theming

All components automatically adapt to light/dark themes using CSS variables defined in `globals.css`.

### Custom Colors
```css
:root {
  --primary: 18 53 91;     /* #12355B */
  --secondary: 96 129 95;   /* #60815F */
  --accent: 192 189 15;     /* #C0BD0F */
}

.dark {
  --primary: 51 150 255;    /* #3396FF */
  --secondary: 0 208 132;   /* #00D084 */
  --accent: 220 223 82;     /* #DCDF52 */
}
```

## 🔧 Customization

### Variants
Components use `class-variance-authority` for type-safe variants:

```tsx
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        custom: "custom-classes"
      }
    }
  }
)
```

### Extending Components
```tsx
// Extend existing component
const CustomButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { customProp?: string }
>(({ customProp, ...props }, ref) => (
  <Button ref={ref} {...props} />
))
```

## 📱 Responsive Design

All components are mobile-first and responsive:

```tsx
<Card className="w-full md:w-1/2 lg:w-1/3">
  <CardContent className="p-4 md:p-6">
    Content adapts to screen size
  </CardContent>
</Card>
```

## ♿ Accessibility

Components follow WCAG guidelines:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: Meets WCAG AA standards

## 🚀 Performance

- **Tree Shaking**: Import only what you need
- **Lazy Loading**: Components load on demand
- **Optimized Animations**: Hardware-accelerated transitions
- **Bundle Size**: Minimal impact on bundle size

## 📖 Usage Examples

### Form with Validation
```tsx
function ContactForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          placeholder="your@email.com"
        />
        <Button className="w-full">
          Send Message
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Dashboard Layout
```tsx
function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={75} showValue />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Team</CardTitle>
        </CardHeader>
        <CardContent>
          <AvatarGroup max={4} total={12}>
            <Avatar fallback="JD" />
            <Avatar fallback="AB" />
            <Avatar fallback="CD" />
          </AvatarGroup>
        </CardContent>
      </Card>
    </div>
  )
}
```

## 🔗 Related

- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Class Variance Authority](https://cva.style/)
- [Framer Motion](https://www.framer.com/motion/)

---

For more examples and live demos, visit `/components` in your application. 