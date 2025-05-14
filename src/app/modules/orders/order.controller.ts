import httpStatus from 'http-status';
import { OrderService } from './order.service';

import { Request, Response } from 'express';
// import orderValidationSchema from './order.validation';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../errors/AppError';

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;

  const order = await OrderService.createOrder(user, req.body, req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created succesfully',
    data: order,
  });
});

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrders();

    res.status(200).json({
      message: 'Orders are retrieved succesfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getUserOrders(req.user._id);

    res.status(200).json({
      message: 'Orders are retrieved succesfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderService.getTotalRevenue(req, res);
    res.status(200).json({
      success: true,
      message: 'Total revenue calculated successfully.',
      data: {
        totalRevenue,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate total revenue.',
      error: error.message,
    });
  }
};

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order verified successfully',
    data: order,
    success: true,
  });
});

const getSingleUsers = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderService.getSingleOrder(id);

  sendResponse(res, {
    success: true,
    message: 'Order retrieve successfully',
    statusCode: 201,
    data: result,
  });
});
const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderService.updateOrder(id, req.body);

  sendResponse(res, {
    success: true,
    message: 'Order update successfully',
    statusCode: 201,
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  const result = await OrderService.updateOrderStatus(orderId, req.body);

  sendResponse(res, {
    success: true,
    message: 'User update successfully',
    statusCode: 201,
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  await OrderService.deleteOrder(orderId);

  sendResponse(res, {
    success: true,
    message: 'Order delete successfully',
    statusCode: 201,
    data: null,
  });
});

export const OrderControllers = {
  createOrder,
  getUserOrders,
  getAllOrders,
  getTotalRevenue,
  verifyPayment,
  getSingleUsers,
  updateOrder,
  deleteUser,
  updateOrderStatus,
};
