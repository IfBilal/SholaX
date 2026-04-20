import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-[640px]",
  md: "max-w-[768px]",
  lg: "max-w-[1024px]",
  xl: "max-w-[1200px]",
  "2xl": "max-w-[1440px]",
  full: "max-w-[1680px]",
};

interface ContainerProps {
  as?: ElementType;
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
}

export default function Container({
  as: Component = "div",
  size = "2xl",
  className,
  children,
}: ContainerProps) {
  return (
    <Component className={cn("mx-auto w-full px-5 md:px-8 lg:px-12", sizeClasses[size], className)}>
      {children}
    </Component>
  );
}
