import * as React from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const textareaVariants = cva(
  `border-2 transition-all duration-300 border-gray-600 px-3 py-2 w-full bg-gray-800 
  text-white active:border-primary active:outline-none 
  focus:border-primary focus:outline-none`,
  {
    variants: {
      variant: {
        default: "bg-transparent text-black",
        dark: "border-primary",
      },
    },
  },
);

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & {
    variant?: "default" | "dark";
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <textarea
      className={cn(textareaVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
