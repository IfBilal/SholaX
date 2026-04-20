import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export default function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-[shimmer_1.4s_ease-in-out_infinite] rounded-[10px]",
        "bg-[linear-gradient(90deg,var(--surface-1)_0%,var(--surface-2)_50%,var(--surface-1)_100%)] bg-size-[200%_100%]",
        className,
      )}
      {...props}
    />
  );
}
