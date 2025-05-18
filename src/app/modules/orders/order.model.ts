import mongoose, { model, Schema, Types } from 'mongoose';
import { IOrder, TOrder } from './order.interface';

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
     {
        product: { type: Types.ObjectId, required: true },
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
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Order = model<IOrder>('Order', OrderSchema);
export default Order;
