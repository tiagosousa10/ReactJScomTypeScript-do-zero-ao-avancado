import * as React from "react"

import { cn } from "../../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-2 border-[#B8C4A9] bg-white px-3 py-2 text-sm text-[#6FA4AF] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#B8C4A9] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97D55] focus-visible:ring-offset-2 focus-visible:border-[#D97D55] hover:border-[#D97D55] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

