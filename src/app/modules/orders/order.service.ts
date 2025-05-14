import httpStatus from 'http-status';
import { Bike } from '../bikes/bike.model';

import { CreateOrderResponse, TOrder } from './order.interface';
import { Request, Response } from 'express';
// import { Order } from './order.model';
import { TUser } from '../user/user.interface';
import AppError from '../../errors/AppError';
import { orderUtils } from './order.utils';
import Order from './order.model';
import { clear } from 'console';
import { TBike } from '../bikes/bike.interface';

const createOrder = async (
  user: TUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  if (!payload?.products?.length)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');

  try {
    const products = payload.products;

    // Validate items and check stock
    for (const bike of products) {
      const product = await Bike.findById(bike.product);

      if (!product) {
        return new AppError(401, 'product not found');
      }

      await Bike.findByIdAndUpdate(bike.product, {
        $inc: { quantity: -bike.quantity }, // Reduce stock by the ordered quantity
      });
    }

    // for (const bike of products) {
    //   await Bike.findByIdAndUpdate(bike.product, {
    //     $inc: { quantity: -bike.quantity }, // Reduce stock by the ordered quantity
    //   });
    // }
    let totalPrice = 0;

    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await Bike.findById(item.product);
        if (product) {
          const subtotal = product ? (product.price || 0) * item.quantity : 0;
          totalPrice += subtotal;
          return item;
        }
      }),
    );

    let order = await Order.create({
      user,
      products: productDetails,
      totalPrice,
    });

    // payment integration
    const shurjopayPayload = {
      amount: totalPrice,
      order_id: order._id,
      currency: 'BDT',
      customer_name: user.name,
      customer_address: 'abccv',
      customer_email: 'dsgres',
      customer_phone: 'sdgersrgh',
      customer_city: 'rsdgersg',
      client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
      order = await order.updateOne({
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      });
    }

    return payment.checkout_url;
  } catch (error) {
    console.log(error);
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

const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await Order.aggregate([
      //stage-1
      {
        // Join orders with bikes to get bike details
        $lookup: {
          from: 'bikes',
          localField: 'product',
          foreignField: '_id',
          as: 'bikeDetails',
        },
      },
      //stage-2
      {
        // Unwind the bikeDetails array to simplify access
        $unwind: '$bikeDetails',
      },

      //stage-3
      {
        // Calculate total price for each order
        $addFields: {
          orderRevenue: { $multiply: ['$bikeDetails.price', '$quantity'] },
        },
      },

      //stage-4
      {
        // Group to calculate total revenue
        $group: {
          _id: null, // Group all documents together
          totalRevenue: { $sum: '$orderRevenue' },
        },
      },
    ]);
    return totalRevenue[0]?.totalRevenue || 0;
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate total revenue.',
      error: error.message,
    });
  }
};

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
  getTotalRevenue,
  verifyPayment,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
};
