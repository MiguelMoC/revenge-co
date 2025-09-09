import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert Prisma Object into Js Object
export function convertToPlainObject<T>(value: T): T{
  return JSON.parse(JSON.stringify(value));
}

// Format Number with decimal places
export function formatNumberWithDecimal(value: number): string {
	const [integerPart, decimalPart] = value.toString().split(".");
	return decimalPart
		? `${integerPart}.${decimalPart.padEnd(2, "0")}`
		: `${integerPart}.00`;
}

// Format Date to readable format
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(new Date(date));
}

// Format Currency
export function formatCurrency(value: number, locale: string = 'en-US', currency: string = 'USD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value);
}