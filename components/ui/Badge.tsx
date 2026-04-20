import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  accent?: boolean;
}

export default function Badge({ className, accent = false, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-3 text-xs font-medium uppercase tracking-[0.08em]",
        accent ? "bg-accent-muted text-accent" : "bg-surface-2 text-tertiary",
        className,
      )}
      {...props}
    />
  );
}
