import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Convert Prisma Object into Js Object
export function convertToPlainObject<T>(value: T): T {
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
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "2-digit",
	}).format(new Date(date));
}

// Format Currency
// export function formatCurrency(
// 	value: number,
// 	locale: string = "en-US",
// 	currency: string = "USD"
// ): string {
// 	return new Intl.NumberFormat(locale, {
// 		style: "currency",
// 		currency: currency,
// 	}).format(value);
// }

// Round number to decimal places
export function round2Dec(value: number | string) {
	if (typeof value === 'number') {
		return Math.round((value + Number.EPSILON) * 100) / 100;
	} else if (typeof value === 'string') {
		return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
	}
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('EN-US', {
	currency: "USD",
	style: "currency",
	minimumFractionDigits: 2,
});

export function formatCurrency(amount: number | string | null) {
	if (typeof amount === 'number') {
		return CURRENCY_FORMATTER.format(amount);
	} else if (typeof amount === 'string') {
		return CURRENCY_FORMATTER.format(Number(amount));
	} else {
		return NaN;
	}
}