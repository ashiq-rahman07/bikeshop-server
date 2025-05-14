import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .transform((str) => str.toLowerCase()), // Ensures lowercase and trims
  product: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ObjectId'), // Validates a MongoDB ObjectId
  quantity: z.number().int().min(1), // Must be an integer >= 1
  totalPrice: z.number().min(0), // Total price must be non-negative
});

export default orderValidationSchema;
