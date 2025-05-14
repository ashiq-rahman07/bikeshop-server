"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = require("../modules/auth/auth.route");
const order_route_1 = require("../modules/orders/order.route");
const bike_route_1 = require("../modules/bikes/bike.route");
const user_route_1 = require("./../modules/user/user.route");
const express_1 = require("express");
const gear_route_1 = require("../modules/gear/gear.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    // {
    //   path: '/auth',
    //   route: UserRoutes,
    // },
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRouter,
    },
    {
        path: '/bike',
        route: bike_route_1.BikeRouter,
    },
    {
        path: '/gear',
        route: gear_route_1.GearRouter,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
