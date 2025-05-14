"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gearValidation = exports.GearBrandEnum = exports.GearCategoryEnum = void 0;
const zod_1 = require("zod");
// Define the BikeCategory enum
// Enums
exports.GearCategoryEnum = zod_1.z.enum([
    'Helmet',
    'Gloves',
    'Jacket',
    'Boots',
    'Protection',
    'Accessories',
    'Rain Gear',
    'Electronics',
]);
exports.GearBrandEnum = zod_1.z.enum([
    'RideTalk',
    'ThermoTech',
    'AdventureGear',
    'RideReady',
    'RoadMaster',
    'RaceTech',
    'SafeRide',
]);
// Define the Zod schema
const gearValidationCreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        brand: exports.GearBrandEnum,
        category: exports.GearCategoryEnum,
        model: zod_1.z.string().min(1),
        price: zod_1.z.number().nonnegative(),
        description: zod_1.z.string().min(1),
        features: zod_1.z.array(zod_1.z.string()),
        specifications: zod_1.z.record(zod_1.z.string()),
        stock: zod_1.z.number().int().nonnegative(),
        // images: z.array(z.string().url()),
        rating: zod_1.z.number().min(0).max(5).optional(),
        reviewCount: zod_1.z.number().int().nonnegative().optional(),
        isStock: zod_1.z.boolean().optional(),
    }),
});
// const bikeValidationUpdateSchema = z.object({
//   body: z.object({
//     name: z
//       .string()
//       .min(1, { message: 'Name is required and cannot be empty' })
//       .optional(),
//     brand: BikeBrandEnum.optional(),
//     model: z
//       .string()
//       .min(1, { message: 'Model is required and cannot be empty' })
//       .optional(),
//     price: z
//       .number()
//       .min(0, { message: 'Price must be a positive number' })
//       .optional(),
//     category: BikeCategoryEnum.optional(),
//     description: z
//       .string()
//       .min(1, { message: 'Description is required and cannot be empty' })
//       .optional(),
//     quantity: z
//       .number()
//       .int({ message: 'Quantity must be an integer' })
//       .min(0, { message: 'Quantity cannot be negative' })
//       .optional(),
//     bikeImg: z.string().optional(),
//     inStock: z
//       .boolean({ required_error: 'InStock status is required' })
//       .optional(),
//   }),
// });
exports.gearValidation = {
    gearValidationCreateSchema,
    // bikeValidationUpdateSchema,
};
