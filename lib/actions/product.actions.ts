"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMITS } from "../constants";
// Get Latest Products
export async function getLatestProducts() {
	const data = await prisma.product.findMany({
		take: LATEST_PRODUCTS_LIMITS,
		orderBy: { createdAt: "desc" },
	});
	return convertToPlainObject(data);
}

// Get Product details by slug
export async function getProductBySlug(slug: string) {
	const product = await prisma.product.findUnique({
		where: { slug },
	});
	return product ? convertToPlainObject(product) : null;
}
