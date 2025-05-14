"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userRegisterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
        role: zod_1.z.enum(['admin', 'customer']).default('customer').optional(),
        isActive: zod_1.z.boolean().default(true).optional(),
        phone: zod_1.z.string().optional().optional(),
        address: zod_1.z.string().optional(),
    }),
});
const userUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').optional(),
        email: zod_1.z.string().email('Invalid email address').optional(),
        password: zod_1.z
            .string()
            .min(6, 'Password must be at least 6 characters long')
            .optional(),
        role: zod_1.z.enum(['admin', 'customer']).default('customer').optional(),
        isActive: zod_1.z.boolean().default(true).optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    userRegisterValidationSchema,
    userUpdateValidationSchema,
};
