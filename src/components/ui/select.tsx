import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex h-12 w-full appearance-none rounded-xl border border-zinc-300 bg-white px-4 pr-10 text-base text-zinc-900 shadow-sm transition focus-visible:border-prospere-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prospere-blue/20 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
      />
    </div>
  ),
);
Select.displayName = "Select";

export { Select };
