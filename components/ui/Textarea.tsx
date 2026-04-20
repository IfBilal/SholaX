import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export default function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-30 w-full rounded-md border border-(--border-default) bg-surface-1 px-3 py-3 text-sm text-primary placeholder:text-tertiary",
        "focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent-muted focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
}
