import { z } from 'zod';

// Define the BikeCategory enum
// Enums
export const BikeCategoryEnum = z.enum([
  'Sport',
  'Cruiser',
  'Scooter',
  'Off-road',
  'Electric',
  'Classic',
  'Naked',
]);

export const BikeBrandEnum = z.enum([
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
const bikeValidationCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    brand: BikeBrandEnum,
    category: BikeCategoryEnum,
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
     
  }),
});

const bikeValidationUpdateSchema = z.object({
   body: z.object({
    name: z.string().min(1).optional(),
    brand: BikeBrandEnum.optional(),
    category: BikeCategoryEnum.optional(),
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

export const bikeValidation = {
  bikeValidationCreateSchema,
  bikeValidationUpdateSchema,
};
