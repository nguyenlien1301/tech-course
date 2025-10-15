import * as React from "react";

import { cn } from "@/shared/utils/common";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 px-3 w-full font-medium rounded-md outline-none text-sm border focus:!border-primary transition-all dark:border-opacity-10 bg-white dark:bg-grayDark border-gray-200 disabled:bg-gray-300 dark:disabled:bg-zinc-900 focus-primary disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
