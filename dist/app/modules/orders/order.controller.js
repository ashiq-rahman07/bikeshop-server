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
exports.OrderControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const order_service_1 = require("./order.service");
// import orderValidationSchema from './order.validation';
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const order = yield order_service_1.OrderService.createOrder(user, req.body, req.ip);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order created succesfully',
        data: order,
    });
}));
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderService.getAllOrders();
        res.status(200).json({
            message: 'Orders are retrieved succesfully',
            status: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderService.getUserOrders(req.user._id);
        res.status(200).json({
            message: 'Orders are retrieved succesfully',
            status: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getTotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield order_service_1.OrderService.getTotalRevenue(req, res);
        res.status(200).json({
            success: true,
            message: 'Total revenue calculated successfully.',
            data: {
                totalRevenue,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to calculate total revenue.',
            error: error.message,
        });
    }
});
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.OrderService.verifyPayment(req.query.order_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: 'Order verified successfully',
        data: order,
        success: true,
    });
}));
const getSingleUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield order_service_1.OrderService.getSingleOrder(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Order retrieve successfully',
        statusCode: 201,
        data: result,
    });
}));
const updateOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield order_service_1.OrderService.updateOrder(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Order update successfully',
        statusCode: 201,
        data: result,
    });
}));
const updateOrderStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield order_service_1.OrderService.updateOrderStatus(orderId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'User update successfully',
        statusCode: 201,
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    yield order_service_1.OrderService.deleteOrder(orderId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Order delete successfully',
        statusCode: 201,
        data: null,
    });
}));
exports.OrderControllers = {
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
