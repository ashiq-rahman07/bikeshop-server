import { Gear } from './gear.model';
import express, { NextFunction, Request, Response } from 'express';

import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { GearControllers } from './gear.controller';
import { gearValidation } from './gear.validation';

const router = express.Router();

// router.post(
//   '/create-product',
//   auth('admin'),
//   validateRequest(bikeValidation.bikeValidationCreateSchema),
//   BikeControllers.createBike,
// );
router.get('/:gearId', GearControllers.getSingleGear);
router.get('/', GearControllers.getAllGears);
router.delete('/:gearId', auth('admin'), GearControllers.getAllGears);

router.patch(
  '/:productId',
  auth('admin'),
  // validateRequest(gearValidation.),
  GearControllers.updateGear,
);

export const GearRouter = router;
