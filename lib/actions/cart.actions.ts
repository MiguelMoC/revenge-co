"use server";
import { cookies } from "next/headers";
import { CartItem } from "@/types";
import { auth } from "@/auth"; // Adjust the import path if your auth file is located elsewhere
import { convertToPlainObject, round2Dec } from "../utils";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";
// calculate cart prices

const calcPrice = (items: CartItem[]) => {
	const itemsPrice = round2Dec(
			items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
		),
		shippingPrice = round2Dec((itemsPrice ?? 0) > 100 ? 0 : 10),
		taxPrice = round2Dec(0.15 * (itemsPrice ?? 0)),
		totalPrice = round2Dec(
			(itemsPrice ?? 0) + (taxPrice ?? 0) + (shippingPrice ?? 0)
		);

	return {
		itemsPrice: itemsPrice?.toFixed(2),
		shippingPrice: shippingPrice?.toFixed(2),
		taxPrice: taxPrice?.toFixed(2),
		totalPrice: totalPrice?.toFixed(2),
	};
};

export async function addItemToCart(data: CartItem) {
	try {
		const sessionCartId = (await cookies()).get("sessionCartId")?.value;

		if (!sessionCartId) {
			throw new Error("No session cart id");
		}

		const session = await auth();
		const userId = session?.user?.id ? (session.user.id as string) : undefined;

		// Get Cart
		const cart = await getMyCart();

		// Parse and selected validate Item
		const item = cartItemSchema.parse(data);

		// Find Product in database
		const product = await prisma.product.findFirst({
			where: { id: item.productId },
		});

		if (!product) throw new Error("Product not found");

		if (!cart) {
			// Create new cart
			const newCart = insertCartSchema.parse({
				userId: userId,
				items: [item],
				sessionCartId: sessionCartId,
				...calcPrice([item]),
			});

			//Add to database
			await prisma.cart.create({
				data: newCart,
			});

			//Revalidate product
			revalidatePath("/product/${product.slug}");

			return {
				success: true,
				message: `Listo, ${product.name}, agregado!`,
			};
		} else {
			// Check if Icon is already in the cart
			const existItem = (cart.items as CartItem[]).find(
				(x) => x.productId === item.productId
			);

			if (existItem) {
				//Check Stock
				if (product.stock < existItem.qty + 1) {
					throw new Error("Not Enough stock");
				}

				//Increase Qty
				(cart.items as CartItem[]).find(
					(x) => x.productId === item.productId
				)!.qty = existItem.qty + 1;
			} else {
				// check stock
				if (product.stock < 1) throw new Error("Not Enough Stock");
				//Add Item to the cart.items
				(cart.items as CartItem[]).push(item);
			}

			await prisma.cart.update({
				where: {
					id: cart.id,
				},
				data: {
					items: cart.items as Prisma.CartUpdateitemsInput[],
					...calcPrice(cart.items as CartItem[]),
				},
			});
			revalidatePath("/product/${product.slug}");

			return {
				success: true,
				message: `${product.name} ${existItem ? "update in" : "added to cart"}`,
			};
		}
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Something went wrong",
		};
	}
}

export async function getMyCart() {
	const sessionCartId = (await cookies()).get("sessionCartId")?.value;

	if (!sessionCartId) {
		throw new Error("No session cart id");
	}
	const session = await auth();
	const userId = session?.user?.id ? (session.user.id as string) : undefined;

	// Get user cart from database
	const cart = await prisma.cart.findFirst({
		where: userId ? { userId } : { sessionCartId: sessionCartId },
	});

	if (!cart) {
		return undefined;
	}

	return convertToPlainObject({
		...cart,
		items: cart.items as CartItem[],
		itemsPrice: cart.itemsPrice.toString(),
		totalPrice: cart.totalPrice.toString(),
		shippingPrice: cart.shippingPrice.toString(),
		taxPrice: cart.taxPrice.toString(),
	});
}
// Remove item from cart
export async function removeItemFromCart(productId: string) { 
	try { 
		// Check for cart cookie
		const sessionCartId = (await cookies()).get("sessionCartId")?.value;
		if (!sessionCartId) {
			throw new Error("No session cart id");
		}
		// Find Product in database
		const product = await prisma.product.findFirst({
			where: { id: productId },
		});
		if (!product) throw new Error("Product not found");
		
		// Get user cart
		const cart = await getMyCart();
		if (!cart) { 
			throw new Error("No cart found");
		}

		// Check for item in cart
		const existItem = (cart.items as CartItem[]).find(
			(x) => x.productId === productId
		);
		if (!existItem) { 
			throw new Error("Item not found in cart");
		}

		// Check if only one item in cart
		if (existItem.qty === 1) { 
			cart.items = (cart.items as CartItem[]).filter(
				(x) => x.productId !== existItem.productId
			);
		} else {
			// Decrease qty
			(cart.items as CartItem[]).find(
				(x) => x.productId === productId
			)!.qty = existItem.qty - 1;
		}

		//Update cart in database
		await prisma.cart.update({
			where: {
				id: cart.id,
			},
			data: {
				items: cart.items as Prisma.CartUpdateitemsInput[],
				...calcPrice(cart.items as CartItem[]),
			},
		});
		revalidatePath("/product/${product.slug}");

		return {
			success: true,
			message: `${product.name} removed from cart`,
		}

	} catch (error) { 
		return {
			success: false,
			message: error instanceof Error ? error.message : "Something went wrong",
		};
	}
}

// Remove all items with same sku from cart
export async function removeAllItemsSameSkuFromCart(productId: string) { 
	try { 
		// Check for cart cookie
		const sessionCartId = (await cookies()).get("sessionCartId")?.value;
		if (!sessionCartId) {
			throw new Error("No session cart id");
		}
		// Find Product in database
		const product = await prisma.product.findFirst({
			where: { id: productId },
		});
		if (!product) throw new Error("Product not found");
		
		// Get user cart
		const cart = await getMyCart();
		if (!cart) { 
			throw new Error("No cart found");
		}

		// Check for item in cart
		const existItem = (cart.items as CartItem[]).find(
			(x) => x.productId === productId
		);

		if (!existItem) { 
			throw new Error("Item not found in cart");
		}

		// Check if only one item in cart
		if (existItem.qty === 1) { 
			cart.items = (cart.items as CartItem[]).filter(
				(x) => x.productId !== existItem?.productId
			);
		} else  {
			// Remove all existing Items
			(cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
				existItem.qty - existItem.qty;
		}
		//Update cart in database
		await prisma.cart.update({
			where: {
				id: cart.id,
			},
			data: {
				items: cart.items as Prisma.CartUpdateitemsInput[],
				...calcPrice(cart.items as CartItem[]),
			},
		});
		revalidatePath("/product/${product.slug}");

		return {
			success: true,
			message: `${product.name} removed from cart`,
		}

	} catch (error) { 
		return {
			success: false,
			message: error instanceof Error ? error.message : "Something went wrong",
		};
	}
}