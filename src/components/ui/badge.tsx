import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "gold" | "success";
}

const badgeVariants = {
  default: "bg-[#10141B] text-white hover:bg-[#171C24] border border-[#171C24]",
  secondary: "bg-[#171C24] text-[#F5F5F5]",
  destructive: "bg-[#E45B5B] text-white",
  outline: "border border-[#171C24] text-[#8A919E]",
  gold: "bg-gradient-to-r from-[#D4AF37]/20 to-[#F4D77D]/20 text-[#F4D77D] border border-[#D4AF37]/30 backdrop-blur-sm",
  success: "bg-[#3CCB7F]/20 text-[#3CCB7F] border border-[#3CCB7F]/30",
};

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
