import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gold";
  size?: "default" | "sm" | "lg" | "icon";
}

const buttonVariants = {
  variant: {
    default: "bg-[#10141B] text-white hover:bg-[#171C24] dark:bg-white dark:text-black dark:hover:bg-[#F5F5F5]",
    destructive: "bg-[#E45B5B] text-white hover:bg-[#E45B5B]/90",
    outline: "border border-[#171C24] bg-transparent hover:bg-[#10141B] hover:text-white dark:border-[#2a303c] dark:hover:bg-[#171C24]",
    secondary: "bg-[#171C24] text-[#F5F5F5] hover:bg-[#10141B]",
    ghost: "hover:bg-[#10141B]/10 dark:hover:bg-white/10",
    link: "text-[#D4AF37] underline-offset-4 hover:underline",
    gold: "bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] text-black font-bold hover:from-[#F4D77D] hover:to-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
