import { Document, Model, Types } from 'mongoose';

export type CreateOrderResponse =
  | { success: false; message: string }
  | { success: true; data: IOrder };


export type TOrder = {
  productId: Types.ObjectId;
    productName: string;
    productImg: string;
    quantity: number;
    productType: 'gear' | 'bike';
};

export interface IOrder extends Document {
  user: Types.ObjectId;
  products: {
    productId: Types.ObjectId;
    productName: string;
    productImg: string;
    quantity: number;
    productType: 'gear' | 'bike';
  }[];
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  shippingAddress: {
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  orderDate: Date; // ISO date string
  estimatedDeliveryDate?: Date; // ISO date string
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  
}

// export type OrderModel = Model<TOrder, Record<string, unknown>>;
interface Order {
  id: string;
  userId: string;
  items: Array<{
    product: {
      id: string;
      name: string;
      brand: string;
      category: string;
      model: string;
      price: number;
      originalPrice: number;
      description: string;
      features: string[];
      specifications: Record<string, string>;
      stock: number;
      images: string[];
      rating: number;
      reviewCount: number;
      isFeatured: boolean;
    };
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  orderDate: string; // ISO date string
  estimatedDeliveryDate: string; // ISO date string
}
