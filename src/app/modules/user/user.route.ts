import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.userRegisterValidationSchema),
  UserControllers.registerUserIntoDB,
);
router.get('/:id', auth('admin', 'customer'), UserControllers.getSingleUsers);
router.patch(
  '/:id',
  auth('admin', 'customer'),
  validateRequest(UserValidation.userUpdateValidationSchema),
  UserControllers.updateUser,
);
router.patch(
  '/status/:userId',
  auth('admin'),
  validateRequest(UserValidation.userUpdateValidationSchema),
  UserControllers.updateUserStatus,
);
router.delete('/:id', auth('admin'), UserControllers.deleteUser);
router.get('/', auth('admin', 'customer'), UserControllers.getAllUsers);
router.patch(
  '/update/:id',
  validateRequest(UserValidation.userUpdateValidationSchema),
);
export const UserRoutes = router;
