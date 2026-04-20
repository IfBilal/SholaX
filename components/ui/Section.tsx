import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export default function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-6 md:py-8 lg:py-10", className)} {...props} />;
}
