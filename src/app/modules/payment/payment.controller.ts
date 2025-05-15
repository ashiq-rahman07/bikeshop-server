import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentService } from './payment.service';

const createPayment  = catchAsync(async (req, res) => {
  const {amount} = req.body

  const order = await PaymentService.createPayment(amount);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment created succesfully',
    data: order,
  });
});