import { AuthRoutes } from '../modules/auth/auth.route';
import { OrderRouter } from '../modules/orders/order.route';
import { BikeRouter } from '../modules/bikes/bike.route';
import { UserRoutes } from './../modules/user/user.route';
import { Router } from 'express';
import { GearRouter } from '../modules/gear/gear.route';

const router = Router();

const moduleRoutes = [
  // {
  //   path: '/auth',
  //   route: UserRoutes,
  // },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/orders',
    route: OrderRouter,
  },
  {
    path: '/bike',
    route: BikeRouter,
  },
  {
    path: '/gear',
    route: GearRouter,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
