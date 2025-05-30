import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "",
        text: "h-4",
        avatar: "rounded-full",
        button: "h-10",
        card: "h-32",
      },
      size: {
        default: "",
        sm: "h-3",
        lg: "h-6",
        xl: "h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /**
   * Number of skeleton lines to render (for text variant)
   */
  lines?: number
  /**
   * Width of the skeleton
   */
  width?: string | number
  /**
   * Height of the skeleton
   */
  height?: string | number
}

/**
 * Skeleton component for loading states
 * 
 * @example
 * ```tsx
 * <Skeleton className="w-[100px] h-[20px]" />
 * <Skeleton variant="text" lines={3} />
 * <Skeleton variant="avatar" className="w-12 h-12" />
 * ```
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, size, lines = 1, width, height, style, ...props }, ref) => {
    const skeletonStyle = {
      ...style,
      ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    }

    if (variant === "text" && lines > 1) {
      return (
        <div className="space-y-2" ref={ref}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                skeletonVariants({ variant, size }),
                index === lines - 1 && "w-3/4", // Last line is shorter
                className
              )}
              style={skeletonStyle}
              {...props}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, size }), className)}
        style={skeletonStyle}
        {...props}
      />
    )
  }
)
Skeleton.displayName = "Skeleton"

/**
 * Skeleton text component for multiple lines
 */
const SkeletonText = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'> & { lines?: number }
>(({ lines = 3, ...props }, ref) => (
  <Skeleton ref={ref} variant="text" lines={lines} {...props} />
))
SkeletonText.displayName = "SkeletonText"

/**
 * Skeleton avatar component
 */
const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>(({ className, ...props }, ref) => (
  <Skeleton
    ref={ref}
    variant="avatar"
    className={cn("w-10 h-10", className)}
    {...props}
  />
))
SkeletonAvatar.displayName = "SkeletonAvatar"

/**
 * Skeleton button component
 */
const SkeletonButton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>(({ className, ...props }, ref) => (
  <Skeleton
    ref={ref}
    variant="button"
    className={cn("w-20", className)}
    {...props}
  />
))
SkeletonButton.displayName = "SkeletonButton"

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonButton,
  skeletonVariants 
} 