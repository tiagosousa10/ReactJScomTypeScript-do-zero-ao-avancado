import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#D97D55] text-white hover:bg-[#C86A42] focus-visible:ring-[#D97D55] shadow-md hover:shadow-lg active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-[#B8C4A9] bg-white text-[#6FA4AF] hover:bg-[#B8C4A9] hover:border-[#D97D55] hover:text-[#6FA4AF] focus-visible:ring-[#D97D55] focus-visible:border-[#D97D55]",
        secondary:
          "bg-[#B8C4A9] text-white hover:bg-[#A4B295] focus-visible:ring-[#B8C4A9] shadow-sm hover:shadow-md",
        ghost: "hover:bg-[#B8C4A9]/50 hover:text-[#6FA4AF] focus-visible:ring-[#D97D55] focus-visible:bg-[#B8C4A9]/50",
        link: "text-[#6FA4AF] underline-offset-4 hover:underline hover:text-[#D97D55] focus-visible:ring-[#D97D55]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

