import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(dateStr: string): string {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("vi-VN");
  const formattedDate = formatter.format(date);
  return formattedDate;
}

export function dateTimeFormat(dateStr: string): string {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  });
  return formatter.format(date);
}

export function formatVND(amount: number) {
  return amount.toLocaleString("vi-VN") + " VNĐ";
}
