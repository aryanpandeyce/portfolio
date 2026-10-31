import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}

export function withBasePath(path: string): string {
  const base = getBasePath();
  if (!base) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
