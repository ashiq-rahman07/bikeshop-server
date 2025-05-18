import { Gear } from './gear.model';
import express, { NextFunction, Request, Response } from 'express';

import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { GearControllers } from './gear.controller';
import { GearValidation } from './gear.validation';
import { parseBody } from '../../middlewares/bodyParser';

const router = express.Router();

router.post(
  '/create-gear',
  auth('admin'),
  validateRequest(GearValidation.gearValidationSchema),
  parseBody,
  GearControllers.createGear,
);
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
