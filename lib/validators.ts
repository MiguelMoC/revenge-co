import { z } from 'zod';
import { formatNumberWithDecimal } from '../lib/utils';
const currency = z
    .string()
    .refine(
        (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))), 'Invalid price format. Must be a number with up to two decimal places.'
    );

// Zod Schema for inserting products
export const insertProductSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
    category: z.string().min(3, "Category must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    images: z.array(z.string()).min(1, "At least one image URL is required"),
    price: currency, 
    brand: z.string().min(1, "Brand must be at least 2 characters long"),
    numReviews: z.coerce.number(),
    rating: z.number(),
    stock: z.coerce.number(),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
})

export const signInformSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"), 
});

export const signUpformSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"), 
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match", path: ["confirmPassword"],
});

// Cart Schemas
export const cartItemSchema = z.object({
    productId: z.string().min(1, 'Product is required'),
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Product is required'),
    qty: z.number().int().nonnegative('Qty must be a positive number'),
    image: z.string().min(1, 'Image is required'),
    price: currency
});

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    sessionCartId: z.string().min(1, 'Session cart id is required'),
    userId: z.string().optional().nullable(),
});

export const shippingAddressSchema = z.object({
    fullName: z.string().min(3, 'Name must be at least 3 characters'),
    streetAddress: z.string().min(3, 'Street Address must be at least 3 characters'),
    city: z.string().min(3, 'City must be at least 3 characters'),
    postalCode: z.string().min(3, 'Postal Code must be at least 3 characters'),
    country: z.string().min(3, 'Country must be at least 3 characters'),
    lat: z.number().optional(),
    lng: z.number().optional(),
})