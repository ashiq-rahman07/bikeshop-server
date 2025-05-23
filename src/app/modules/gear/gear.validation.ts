import { z } from 'zod';

// Define the BikeCategory enum
// Enums
export const GearCategoryEnum = z.enum([
  'Helmet',
  'Gloves',
  'Jacket',
  'Boots',
  'Protection',
  'Accessories',
  'Rain Gear',
  'Electronics',
]);

export const GearBrandEnum = z.enum([
  'RideTalk',
  'ThermoTech',
  'AdventureGear',
  'RideReady',
  'RoadMaster',
  'RaceTech',
  'SafeRide',
]);
// Define the Zod schema
const gearValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    brand: GearBrandEnum,
    category: GearCategoryEnum,
    model: z.string().min(1),
    price: z.number().nonnegative(),
    description: z.string().min(1),
    features: z.array(z.string()),
    specifications: z.record(z.string()),
    stock: z.number().int().nonnegative(),
    // images: z.array(z.string().url()),
    rating: z.number().min(0).max(5).optional(),
    reviewCount: z.number().int().nonnegative().optional(),
    isStock: z.boolean().optional(),
    productType:z.string().optional()
  }),
});

const gearValidationUpdateSchema = z.object({
   body: z.object({
    name: z.string().min(1).optional(),
    brand: GearBrandEnum.optional(),
    category: GearCategoryEnum.optional(),
    model: z.string().min(1).optional(),
    price: z.number().nonnegative().optional(),
    description: z.string().min(1).optional(),
    features: z.array(z.string()).optional(),
    specifications: z.record(z.string()).optional(),
    stock: z.number().int().nonnegative().optional(),
    // images: z.array(z.string().url()),
    rating: z.number().min(0).max(5).optional(),
    reviewCount: z.number().int().nonnegative().optional(),
    isStock: z.boolean().optional(),
     
  }),
});
export const GearValidation = {
  gearValidationSchema,
  gearValidationUpdateSchema,
};
