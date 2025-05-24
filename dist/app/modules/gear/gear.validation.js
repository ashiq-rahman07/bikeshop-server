"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearValidation = exports.GearBrandEnum = exports.GearCategoryEnum = void 0;
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
const gearValidationSchema = zod_1.z.object({
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
        productType: zod_1.z.string().optional()
    }),
});
const gearValidationUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        brand: exports.GearBrandEnum.optional(),
        category: exports.GearCategoryEnum.optional(),
        model: zod_1.z.string().min(1).optional(),
        price: zod_1.z.number().nonnegative().optional(),
        description: zod_1.z.string().min(1).optional(),
        features: zod_1.z.array(zod_1.z.string()).optional(),
        specifications: zod_1.z.record(zod_1.z.string()).optional(),
        stock: zod_1.z.number().int().nonnegative().optional(),
        // images: z.array(z.string().url()),
        rating: zod_1.z.number().min(0).max(5).optional(),
        reviewCount: zod_1.z.number().int().nonnegative().optional(),
        isStock: zod_1.z.boolean().optional(),
    }),
});
exports.GearValidation = {
    gearValidationSchema,
    gearValidationUpdateSchema,
};
