"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
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
const orderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z
            .instanceof(mongoose_1.default.Types.ObjectId)
            .or(zod_1.z.string().refine(val => mongoose_1.default.Types.ObjectId.isValid(val), {
            message: 'Invalid user ObjectId'
        })),
        products: zod_1.z.array(zod_1.z.object({
            productId: zod_1.z
                .instanceof(mongoose_1.default.Types.ObjectId)
                .or(zod_1.z.string().refine(val => mongoose_1.default.Types.ObjectId.isValid(val), {
                message: 'Invalid product ObjectId'
            })),
            productName: zod_1.z.string().min(1),
            productImg: zod_1.z.string().url(),
            quantity: zod_1.z.number().int().min(1),
            productType: zod_1.z.enum(['gear', 'bike'])
        })),
        totalPrice: zod_1.z.number().nonnegative(),
        status: zod_1.z.enum(['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled']).optional(),
        shippingAddress: zod_1.z.object({
            fullName: zod_1.z.string().min(1),
            streetAddress: zod_1.z.string().min(1),
            city: zod_1.z.string().min(1),
            state: zod_1.z.string().min(1),
            postalCode: zod_1.z.string().min(1),
            country: zod_1.z.string().min(1),
            phone: zod_1.z.string().min(1)
        }),
        orderDate: zod_1.z.coerce.date(), // accept string/date
        estimatedDeliveryDate: zod_1.z.coerce.date().optional()
    })
});
exports.default = orderValidationSchema;
