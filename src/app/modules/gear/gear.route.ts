import { Gear } from './gear.model';
import express, { NextFunction, Request, Response } from 'express';

import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { GearControllers } from './gear.controller';
import { GearValidation } from './gear.validation';
import { parseBody } from '../../middlewares/bodyParser';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

router.post(
  '/create-gear',
  auth('admin'),
   multerUpload.fields([{ name: 'images' }]),
   parseBody,
  validateRequest(GearValidation.gearValidationSchema),

  GearControllers.createGear,
);
router.get('/:gearId', GearControllers.getSingleGear);
router.get('/', GearControllers.getAllGears);
router.delete('/:gearId', auth('admin'), GearControllers.deleteGear);


router.patch(
  '/:gearId',
  auth('admin'),

   multerUpload.fields([{ name: 'images' }]),
   parseBody,
  validateRequest(GearValidation.gearValidationUpdateSchema),
  GearControllers.updateGear,
);

export const GearRouter = router;
