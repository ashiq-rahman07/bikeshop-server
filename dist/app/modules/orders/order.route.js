"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-order', (0, auth_1.default)('customer'), order_controller_1.OrderControllers.createOrder);
router.get('/verify', (0, auth_1.default)('admin', 'customer'), order_controller_1.OrderControllers.verifyPayment);
router.get('/:userId', (0, auth_1.default)('customer'), order_controller_1.OrderControllers.getUserOrders);
router.get('/', (0, auth_1.default)('admin'), order_controller_1.OrderControllers.getAllOrders);
router.patch('/status/:orderId', (0, auth_1.default)('admin'), order_controller_1.OrderControllers.updateOrderStatus);
router.delete('/:orderId', (0, auth_1.default)('admin'), order_controller_1.OrderControllers.deleteUser);
router.get('/revenue', order_controller_1.OrderControllers.getTotalRevenue);
exports.OrderRouter = router;
