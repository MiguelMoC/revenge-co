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