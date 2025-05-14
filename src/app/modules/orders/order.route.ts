import { OrderService } from './order.service';
import express from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-order', auth('customer'), OrderControllers.createOrder);
router.get(
  '/verify',
  auth('admin', 'customer'),
  OrderControllers.verifyPayment,
);
router.get('/:userId', auth('customer'), OrderControllers.getUserOrders);
router.get('/', auth('admin'), OrderControllers.getAllOrders);

router.patch(
  '/status/:orderId',
  auth('admin'),
  OrderControllers.updateOrderStatus,
);
router.delete('/:orderId', auth('admin'), OrderControllers.deleteUser);
router.get('/revenue', OrderControllers.getTotalRevenue);

export const OrderRouter = router;
