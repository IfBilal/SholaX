import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export default function Eyebrow({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-[0.08em] text-accent",
        className,
      )}
      {...props}
    />
  );
}
