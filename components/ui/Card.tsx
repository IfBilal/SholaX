import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-(--border-subtle) bg-surface-1 p-6 transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-(--border-default) hover:bg-surface-2",
        className,
      )}
      {...props}
    />
  );
}
