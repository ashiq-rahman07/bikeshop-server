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
const http_status_1 = __importDefault(require("http-status"));
const bike_model_1 = require("../bikes/bike.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const order_utils_1 = require("./order.utils");
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (user, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length))
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Order is not specified');
    try {
        const products = payload.products;
        // Validate items and check stock
        for (const bike of products) {
            const product = yield bike_model_1.Bike.findById(bike.product);
            if (!product) {
                return new AppError_1.default(401, 'product not found');
            }
            yield bike_model_1.Bike.findByIdAndUpdate(bike.product, {
                $inc: { quantity: -bike.quantity }, // Reduce stock by the ordered quantity
            });
        }
        // for (const bike of products) {
        //   await Bike.findByIdAndUpdate(bike.product, {
        //     $inc: { quantity: -bike.quantity }, // Reduce stock by the ordered quantity
        //   });
        // }
        let totalPrice = 0;
        const productDetails = yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield bike_model_1.Bike.findById(item.product);
            if (product) {
                const subtotal = product ? (product.price || 0) * item.quantity : 0;
                totalPrice += subtotal;
                return item;
            }
        })));
        let order = yield order_model_1.default.create({
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
        const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
        if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
            order = yield order.updateOne({
                transaction: {
                    id: payment.sp_order_id,
                    transactionStatus: payment.transactionStatus,
                },
            });
        }
        return payment.checkout_url;
    }
    catch (error) {
        console.log(error);
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
const getTotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const totalRevenue = yield order_model_1.default.aggregate([
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
        return ((_a = totalRevenue[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to calculate total revenue.',
            error: error.message,
        });
    }
});
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
    getTotalRevenue,
    verifyPayment,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
};
