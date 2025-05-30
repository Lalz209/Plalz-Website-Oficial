"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  /**
   * Source URL for the avatar image
   */
  src?: string
  /**
   * Alt text for the avatar image
   */
  alt?: string
  /**
   * Fallback text to display when image fails to load
   */
  fallback?: string
  /**
   * Whether to show online status indicator
   */
  showStatus?: boolean
  /**
   * Online status
   */
  status?: "online" | "offline" | "away" | "busy"
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, src, alt, fallback, showStatus, status = "offline", ...props }, ref) => (
  <div className="relative">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarPrimitive.Root>
    {showStatus && (
      <div
        className={cn(
          "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
          {
            "bg-green-500": status === "online",
            "bg-gray-400": status === "offline",
            "bg-yellow-500": status === "away",
            "bg-red-500": status === "busy",
          }
        )}
        aria-label={`Status: ${status}`}
      />
    )}
  </div>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

/**
 * Avatar group component for displaying multiple avatars
 */
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of avatars to show before showing count
   */
  max?: number
  /**
   * Total number of items (for showing +N indicator)
   */
  total?: number
  /**
   * Size of avatars in the group
   */
  size?: VariantProps<typeof avatarVariants>["size"]
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max = 3, total, size = "default", ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    const visibleChildren = childrenArray.slice(0, max)
    const remainingCount = total ? total - max : childrenArray.length - max

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-2", className)}
        {...props}
      >
        {visibleChildren.map((child, index) =>
          React.cloneElement(child as React.ReactElement, {
            key: index,
            size,
            className: cn(
              "border-2 border-background",
              (child as React.ReactElement).props.className
            ),
          })
        )}
        {remainingCount > 0 && (
          <Avatar size={size} className="border-2 border-background">
            <AvatarFallback>+{remainingCount}</AvatarFallback>
          </Avatar>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

/**
 * Avatar component for displaying user profile images
 * 
 * @example
 * ```tsx
 * <Avatar src="/avatar.jpg" alt="User" fallback="JD" />
 * <Avatar size="lg" showStatus status="online" fallback="AB" />
 * 
 * <AvatarGroup max={3} total={10}>
 *   <Avatar src="/user1.jpg" fallback="U1" />
 *   <Avatar src="/user2.jpg" fallback="U2" />
 *   <Avatar src="/user3.jpg" fallback="U3" />
 * </AvatarGroup>
 * ```
 */
export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants } 