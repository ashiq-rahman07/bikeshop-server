"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
const mongoose_1 = require("mongoose");
const bike_interface_1 = require("./bike.interface");
const bikeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    brand: {
        type: String,
        enum: Object.values(bike_interface_1.BikeBrand),
        required: true,
    },
    category: {
        type: String,
        enum: Object.values(bike_interface_1.BikeCategory),
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
}, {
    timestamps: true,
});
// Export model
exports.Bike = (0, mongoose_1.model)('Bike', bikeSchema);
// Add a static method to the schema
//   bikeSchema.statics.BikedExists = async function (id: string): Promise<TBike | null> {
//     return await this.findById(id);
//   };
// Create the model
// export const Bike = model<TBike, BikeModel>('Bike', bikeSchema);
//   export default Bike;
