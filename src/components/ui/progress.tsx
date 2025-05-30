"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-2",
        default: "h-4",
        lg: "h-6",
      },
      variant: {
        default: "",
        success: "[&>div]:bg-green-500",
        warning: "[&>div]:bg-yellow-500",
        destructive: "[&>div]:bg-red-500",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  /**
   * The progress value (0-100)
   */
  value?: number
  /**
   * Whether to show the percentage text
   */
  showValue?: boolean
  /**
   * Custom label for the progress
   */
  label?: string
  /**
   * Whether to animate the progress bar
   */
  animated?: boolean
}

/**
 * Progress component for showing completion status
 * 
 * @example
 * ```tsx
 * <Progress value={60} showValue />
 * <Progress value={80} variant="success" label="Upload Progress" />
 * <Progress value={30} size="lg" animated />
 * ```
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, showValue, label, size, variant, animated, ...props }, ref) => (
  <div className="w-full space-y-2">
    {(label || showValue) && (
      <div className="flex justify-between items-center text-sm">
        {label && <span className="font-medium">{label}</span>}
        {showValue && <span className="text-muted-foreground">{value || 0}%</span>}
      </div>
    )}
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ size, variant }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary transition-all",
          animated && "transition-transform duration-500 ease-out"
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  </div>
))
Progress.displayName = ProgressPrimitive.Root.displayName

/**
 * Circular progress component
 */
export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The progress value (0-100)
   */
  value?: number
  /**
   * Size of the circular progress
   */
  size?: number
  /**
   * Stroke width of the progress circle
   */
  strokeWidth?: number
  /**
   * Whether to show the percentage text
   */
  showValue?: boolean
  /**
   * Color variant
   */
  variant?: "default" | "success" | "warning" | "destructive"
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ 
    className, 
    value = 0, 
    size = 120, 
    strokeWidth = 8, 
    showValue, 
    variant = "default",
    ...props 
  }, ref) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (value / 100) * circumference

    const getColor = () => {
      switch (variant) {
        case "success":
          return "stroke-green-500"
        case "warning":
          return "stroke-yellow-500"
        case "destructive":
          return "stroke-red-500"
        default:
          return "stroke-primary"
      }
    }

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn("transition-all duration-300 ease-in-out", getColor())}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium">{value}%</span>
          </div>
        )}
      </div>
    )
  }
)
CircularProgress.displayName = "CircularProgress"

export { Progress, CircularProgress, progressVariants } 