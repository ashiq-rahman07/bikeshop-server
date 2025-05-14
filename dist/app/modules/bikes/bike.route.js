"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeRouter = void 0;
const express_1 = __importDefault(require("express"));
const bike_controller_1 = require("./bike.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bike_validation_1 = require("./bike.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-product', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(bike_validation_1.bikeValidation.bikeValidationCreateSchema), bike_controller_1.BikeControllers.createBike);
router.get('/:productId', bike_controller_1.BikeControllers.getSingleBike);
router.get('/', bike_controller_1.BikeControllers.getAllBikes);
router.delete('/:productId', (0, auth_1.default)('admin'), bike_controller_1.BikeControllers.deleteBike);
router.patch('/:productId', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(bike_validation_1.bikeValidation.bikeValidationUpdateSchema), bike_controller_1.BikeControllers.updateBike);
exports.BikeRouter = router;
