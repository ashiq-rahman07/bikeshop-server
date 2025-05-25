"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: { type: mongoose_1.Types.ObjectId, required: true },
            productName: { type: String, required: true },
            productImg: { type: String, required: true },
            quantity: { type: Number, required: true },
            productType: { type: String, enum: ['bike', 'gear'], required: true }, // NEW
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    shippingAddress: { type: Object, required: true },
    orderDate: { type: Date, default: Date.now }, // default current time
    estimatedDeliveryDate: { type: Date },
    transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
OrderSchema.pre('save', function (next) {
    if (!this.estimatedDeliveryDate) {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7); // Add 7 days
        this.estimatedDeliveryDate = deliveryDate;
    }
    next();
});
const Order = (0, mongoose_1.model)('Order', OrderSchema);
exports.default = Order;
