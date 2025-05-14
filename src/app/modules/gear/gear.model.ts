import { model, Schema } from 'mongoose';
import { GearBrand, GearCategory, IGear } from './gear.interface';



const gearSchema = new Schema<IGear>(
  {
    name: { type: String, required: true },
    brand: {
      type: String,
      enum: Object.values(GearBrand),
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(GearCategory),
      required: true,
    },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    specifications: { type: Map, of: String },
    stock: { type: Number, required: true },
    images: {
      type: [String],
      required: true,
    },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isStock: { type: Boolean, default: true },
  },
  {
    
    timestamps: true,
  }
);

// Export model
export const Gear = model<IGear>("Gear", gearSchema);

// Add a static method to the schema
//   bikeSchema.statics.BikedExists = async function (id: string): Promise<TBike | null> {
//     return await this.findById(id);
//   };

// Create the model
// export const Bike = model<TBike, BikeModel>('Bike', bikeSchema);

//   export default Bike;
