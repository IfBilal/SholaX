import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speedSeconds?: number;
}

export default function Marquee({ children, className, speedSeconds = 40 }: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="flex w-max animate-[marquee_linear_infinite] gap-8 whitespace-nowrap"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        <div className="flex items-center gap-8">{children}</div>
        <div className="flex items-center gap-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
