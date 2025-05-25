"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
// import { products } from '@/data/products';
const http_status_1 = __importDefault(require("http-status"));
const bike_model_1 = require("../bikes/bike.model");
const gear_model_1 = require("../gear/gear.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const order_utils_1 = require("./order.utils");
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (user, orderInfo, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (!orderInfo.products || !orderInfo.products.length) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Order is not specified');
    }
    try {
        let totalPrice = 0;
        const products = [];
        for (const item of orderInfo.products) {
            // Use 'new' with ObjectId constructor
            const productIdObj = typeof item.productId === 'string' ? new (require('mongoose').Types.ObjectId)(item.productId) : item.productId;
            if (item.productType === 'bike') {
                const bike = yield bike_model_1.Bike.findById(productIdObj);
                if (!bike)
                    throw new AppError_1.default(401, 'Bike not found');
                if ((bike.stock || 0) < item.quantity)
                    throw new AppError_1.default(400, 'Not enough bike stock');
                yield bike_model_1.Bike.findByIdAndUpdate(productIdObj, { $inc: { stock: -item.quantity } });
                products.push(Object.assign(Object.assign({}, item), { productId: productIdObj }));
                totalPrice += (bike.price || 0) * item.quantity;
            }
            else if (item.productType === 'gear') {
                const gear = yield gear_model_1.Gear.findById(productIdObj);
                if (!gear)
                    throw new AppError_1.default(401, 'Gear not found');
                if ((gear.stock || 0) < item.quantity)
                    throw new AppError_1.default(400, 'Not enough gear stock');
                yield gear_model_1.Gear.findByIdAndUpdate(productIdObj, { $inc: { stock: -item.quantity } });
                products.push(Object.assign(Object.assign({}, item), { productId: productIdObj }));
                totalPrice += (gear.price || 0) * item.quantity;
            }
        }
        let order = yield order_model_1.default.create({
            user,
            products,
            totalPrice,
            shippingAddress: orderInfo.shippingAddress,
            orderDate: orderInfo.orderDate,
        });
        // Payment integration (optional)
        const shurjopayPayload = {
            amount: totalPrice,
            order_id: order._id,
            currency: 'BDT',
            customer_name: user.name,
            customer_address: ((_a = orderInfo.shippingAddress) === null || _a === void 0 ? void 0 : _a.streetAddress) || '',
            customer_email: user.email || '',
            customer_phone: ((_b = orderInfo.shippingAddress) === null || _b === void 0 ? void 0 : _b.phone) || '',
            customer_city: ((_c = orderInfo.shippingAddress) === null || _c === void 0 ? void 0 : _c.city) || '',
            client_ip,
        };
        const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
        if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
            yield order.updateOne({
                transaction: {
                    id: payment.sp_order_id,
                    transactionStatus: payment.transactionStatus,
                },
            });
        }
        return payment === null || payment === void 0 ? void 0 : payment.checkout_url;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find();
    return result;
});
const getUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({ user: userId });
    return result;
});
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
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == 'Success'
                ? 'Paid'
                : verifiedPayment[0].bank_status == 'Failed'
                    ? 'Pending'
                    : verifiedPayment[0].bank_status == 'Cancel'
                        ? 'Cancelled'
                        : '',
        });
    }
    return verifiedPayment;
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = order_model_1.default.findById(id);
    return result;
});
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUser = order_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updateUser;
});
const updateOrderStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield order_model_1.default.findByIdAndUpdate(id, { $set: payload }, {
        new: true,
        runValidators: true,
    });
    return updatedUser;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUser = order_model_1.default.findByIdAndDelete(id);
    return updateUser;
});
exports.OrderService = {
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
