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
     productType:z.string().optional()
  }),
});

const bikeValidationUpdateSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Name is required and cannot be empty' })
      .optional(),
    brand: BikeBrandEnum.optional(),
    model: z
      .string()
      .min(1, { message: 'Model is required and cannot be empty' })
      .optional(),
    price: z
      .number()
      .min(0, { message: 'Price must be a positive number' })
      .optional(),
    category: BikeCategoryEnum.optional(),
    description: z
      .string()
      .min(1, { message: 'Description is required and cannot be empty' })
      .optional(),
    quantity: z
      .number()
      .int({ message: 'Quantity must be an integer' })
      .min(0, { message: 'Quantity cannot be negative' })
      .optional(),
    bikeImg: z.string().optional(),
    inStock: z
      .boolean({ required_error: 'InStock status is required' })
      .optional(),
  }),
});

export const bikeValidation = {
  bikeValidationCreateSchema,
  bikeValidationUpdateSchema,
};
