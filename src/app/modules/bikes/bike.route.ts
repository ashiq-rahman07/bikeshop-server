import express, { NextFunction, Request, Response } from 'express';
import { BikeControllers } from './bike.controller';
import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';

import { bikeValidation } from './bike.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-product',
  auth('admin'),
  validateRequest(bikeValidation.bikeValidationCreateSchema),
  BikeControllers.createBike,
);
router.get('/:productId', BikeControllers.getSingleBike);
router.get('/', BikeControllers.getAllBikes);
router.delete('/:productId', auth('admin'), BikeControllers.deleteBike);

router.patch(
  '/:productId',
  auth('admin'),
  validateRequest(bikeValidation.bikeValidationUpdateSchema),
  BikeControllers.updateBike,
);

export const BikeRouter = router;
