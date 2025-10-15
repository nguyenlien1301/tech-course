import * as React from "react";

import { cn } from "@/shared/utils/common";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[20px] w-full h-10 p-3 font-medium rounded-md outline-none text-sm border focus:!border-primary transition-all dark:border-opacity-10 bg-white dark:bg-grayDark border-gray-200 disabled:bg-gray-300 dark:disabled:bg-zinc-900 disabled:cursor-not-allowed resize-none focus-primary",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
