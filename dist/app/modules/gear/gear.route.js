"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const gear_controller_1 = require("./gear.controller");
const router = express_1.default.Router();
// router.post(
//   '/create-product',
//   auth('admin'),
//   validateRequest(bikeValidation.bikeValidationCreateSchema),
//   BikeControllers.createBike,
// );
router.get('/:gearId', gear_controller_1.GearControllers.getSingleGear);
router.get('/', gear_controller_1.GearControllers.getAllGears);
router.delete('/:gearId', (0, auth_1.default)('admin'), gear_controller_1.GearControllers.getAllGears);
router.patch('/:productId', (0, auth_1.default)('admin'), 
// validateRequest(gearValidation.),
gear_controller_1.GearControllers.updateGear);
exports.GearRouter = router;
