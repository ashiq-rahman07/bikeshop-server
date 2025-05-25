import mongoose from 'mongoose';
import { z } from 'zod';

// const orderValidationSchema = z.object({
//   email: z
//     .string()
//     .email()
//     .trim()
//     .transform((str) => str.toLowerCase()), // Ensures lowercase and trims
//   product: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ObjectId'), // Validates a MongoDB ObjectId
//   quantity: z.number().int().min(1), // Must be an integer >= 1
//   totalPrice: z.number().min(0), // Total price must be non-negative
// });


const orderValidationSchema = z.object({
  body:z.object({
  user: z
    .instanceof(mongoose.Types.ObjectId)
    .or(z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid user ObjectId'
    })),

  products: z.array(
    z.object({
      productId: z
        .instanceof(mongoose.Types.ObjectId)
        .or(z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid product ObjectId'
        })),
      productName: z.string().min(1),
      productImg: z.string().url(),
      quantity: z.number().int().min(1),
      productType: z.enum(['gear', 'bike'])
    })
  ),

  totalPrice: z.number().nonnegative(),

  status: z.enum(['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled']).optional(),

  shippingAddress: z.object({
    fullName: z.string().min(1),
    streetAddress: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
    phone: z.string().min(1)
  }),

  orderDate: z.coerce.date(), // accept string/date
  estimatedDeliveryDate: z.coerce.date().optional()
})
})

export default orderValidationSchema;