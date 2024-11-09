import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full max-w-full sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] rounded-lg px-4 py-2 text-sm shadow-sm ring-offset-2 transition-all duration-200 ease-in-out placeholder-gray-500 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-black dark:placeholder:text-white outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-transparent",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
