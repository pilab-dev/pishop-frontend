import * as React from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const inputVariants = cva(
  `border-2 transition-all duration-300 border-gray-600 px-3 py-2 w-full bg-gray-800
  text-white active:border-primary active:outline-none
  focus:border-primary focus:outline-none`,
  {
    variants: {
      variant: {
        default: "bg-transparent text-black",
        dark: cn(`border-gray-600 bg-gray-800`,
          `placeholder:text-gray-500`,
          `text-gray-400`)
      },
    },
  },
);

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    variant?: "default" | "dark";
  }
>(({ className, type, variant = "default", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        inputVariants({ variant }),
        // "flex h-9 w-full border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
