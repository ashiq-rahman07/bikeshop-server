// import { products } from '@/data/products';
import httpStatus from 'http-status';
import { Bike } from '../bikes/bike.model';
import { Gear } from '../gear/gear.model';
import { TUser } from '../user/user.interface';
import AppError from '../../errors/AppError';
import { orderUtils } from './order.utils';
import Order from './order.model';
import { TOrder } from './order.interface';


const createOrder = async (
  user: TUser,
  orderInfo: {
    products: Array<{
      productId: string;
      productName: string;
      productImg: string;
      quantity: number;
      productType: 'bike' | 'gear';
      price: number;
    }>;
    totalPrice: number;
    shippingAddress: any;
    orderDate: string;
  },
  client_ip: string,
) => {
  if (!orderInfo.products || !orderInfo.products.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');
  }

  try {
    let totalPrice = 0;
    const products: TOrder[] = [];

    for (const item of orderInfo.products) {
      // Use 'new' with ObjectId constructor
      const productIdObj = typeof item.productId === 'string' ? new (require('mongoose').Types.ObjectId)(item.productId) : item.productId;
      if (item.productType === 'bike') {
        const bike = await Bike.findById(productIdObj);
        if (!bike) throw new AppError(401, 'Bike not found');
        if ((bike.stock || 0) < item.quantity) throw new AppError(400, 'Not enough bike stock');
        await Bike.findByIdAndUpdate(productIdObj, { $inc: { stock: -item.quantity } });
        products.push({ ...item, productId: productIdObj });
        totalPrice += (bike.price || 0) * item.quantity;
      } else if (item.productType === 'gear') {
        const gear = await Gear.findById(productIdObj);
        if (!gear) throw new AppError(401, 'Gear not found');
        if ((gear.stock || 0) < item.quantity) throw new AppError(400, 'Not enough gear stock');
        await Gear.findByIdAndUpdate(productIdObj, { $inc: { stock: -item.quantity } });
        products.push({ ...item, productId: productIdObj });
        totalPrice += (gear.price || 0) * item.quantity;
      }
    }

    let order = await Order.create({
      user,
      products,
      totalPrice,
      shippingAddress: orderInfo.shippingAddress,
      orderDate: orderInfo.orderDate,
    });

    // Payment integration (optional)
    const shurjopayPayload: any = {
      amount: totalPrice,
      order_id: order._id,
      currency: 'BDT',
      customer_name: user.name,
      customer_address: orderInfo.shippingAddress?.streetAddress || '',
      customer_email: user.email || '',
      customer_phone: orderInfo.shippingAddress?.phone || '',
      customer_city: orderInfo.shippingAddress?.city || '',
      client_ip,
    };

    const payment: any = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
      await order.updateOne({
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      });
    }

    return payment?.checkout_url;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllOrders = async () => {
  const result = await Order.find();
  return result;
};

const getUserOrders = async (userId: string) => {
  const result = await Order.find({ user: userId });
  return result;
};

// const getTotalRevenue = async (req: Request, res: Response) => {
//   try {
//     const totalRevenue = await Order.aggregate([
//       //stage-1
//       {
//         // Join orders with bikes to get bike details
//         $lookup: {
//           from: 'bikes',
//           localField: 'product',
//           foreignField: '_id',
//           as: 'bikeDetails',
//         },
//       },
//       //stage-2
//       {
//         // Unwind the bikeDetails array to simplify access
//         $unwind: '$bikeDetails',
//       },

//       //stage-3
//       {
//         // Calculate total price for each order
//         $addFields: {
//           orderRevenue: { $multiply: ['$bikeDetails.price', '$quantity'] },
//         },
//       },

//       //stage-4
//       {
//         // Group to calculate total revenue
//         $group: {
//           _id: null, // Group all documents together
//           totalRevenue: { $sum: '$orderRevenue' },
//         },
//       },
//     ]);
//     return totalRevenue[0]?.totalRevenue || 0;
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to calculate total revenue.',
//       error: error.message,
//     });
//   }
// };

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

const getSingleOrder = async (id: string) => {
  const result = Order.findById(id);
  return result;
};

const updateOrder = async (id: string, payload: Partial<TUser>) => {
  const updateUser = Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updateUser;
};

const updateOrderStatus = async (id: string, payload: Partial<TOrder>) => {
  const updatedUser = await Order.findByIdAndUpdate(
    id,
    { $set: payload },
    {
      new: true,
      runValidators: true,
    },
  );
  return updatedUser;
};
const deleteOrder = async (id: string) => {
  const updateUser = Order.findByIdAndDelete(id);
  return updateUser;
};

export const OrderService = {
  createOrder,
  getUserOrders,
  getAllOrders,
  // getTotalRevenue,
  verifyPayment,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
};
