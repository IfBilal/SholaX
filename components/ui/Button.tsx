import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[13px] font-medium rounded-[8px]",
  md: "h-10 px-4 text-sm font-medium rounded-[10px]",
  lg: "h-12 px-5 text-[15px] font-medium rounded-[12px]",
  xl: "h-14 px-7 text-base font-medium rounded-[12px]",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[var(--text-inverse)] border border-transparent hover:bg-[var(--accent-hover)] active:bg-[var(--accent-pressed)]",
  secondary:
    "bg-surface-1 text-primary border border-[var(--border-default)] hover:bg-surface-2",
  ghost: "bg-transparent text-secondary border border-transparent hover:bg-[var(--overlay-hover)] hover:text-primary",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-200 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
