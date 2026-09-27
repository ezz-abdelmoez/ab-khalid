import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number | string): string {
  if (typeof value === "string") return value;
  return new Intl.NumberFormat("ar-EG").format(value);
}
