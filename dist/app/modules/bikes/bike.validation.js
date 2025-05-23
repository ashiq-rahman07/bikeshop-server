"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeValidation = exports.BikeBrandEnum = exports.BikeCategoryEnum = void 0;
const zod_1 = require("zod");
// Define the BikeCategory enum
// Enums
exports.BikeCategoryEnum = zod_1.z.enum([
    'Sport',
    'Cruiser',
    'Scooter',
    'Off-road',
    'Electric',
    'Classic',
    'Naked',
]);
exports.BikeBrandEnum = zod_1.z.enum([
    'Velocity',
    'Cruiser King',
    'UrbanScoot',
    'DirtDevil',
    'ElectroMoto',
    'ClassicMotors',
    'MotoMax',
    'Yamaha',
    'Honda',
    'Suzuki',
    'Hero',
]);
// Define the Zod schema
const bikeValidationCreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        brand: exports.BikeBrandEnum,
        category: exports.BikeCategoryEnum,
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
const bikeValidationUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        brand: exports.BikeBrandEnum.optional(),
        category: exports.BikeCategoryEnum.optional(),
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
exports.bikeValidation = {
    bikeValidationCreateSchema,
    bikeValidationUpdateSchema,
};
