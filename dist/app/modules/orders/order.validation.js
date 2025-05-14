"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email()
        .trim()
        .transform((str) => str.toLowerCase()), // Ensures lowercase and trims
    product: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ObjectId'), // Validates a MongoDB ObjectId
    quantity: zod_1.z.number().int().min(1), // Must be an integer >= 1
    totalPrice: zod_1.z.number().min(0), // Total price must be non-negative
});
exports.default = orderValidationSchema;
