
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
}

export function getDirectionAwareClassName(ltrClass: string, rtlClass: string): string {
  const isRtl = document.documentElement.dir === "rtl";
  return isRtl ? rtlClass : ltrClass;
}
