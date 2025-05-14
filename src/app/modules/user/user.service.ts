import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';

const registerUserIntoDB = async (payload: TUser) => {
  const newUser = User.create(payload);
  return newUser;
};

const getAllUsers = async () => {
  const result = User.find();
  return result;
};
const getSingleUser = async (id: string) => {
  const result = User.findById(id).select('-password');
  return result;
};

const updateUser = async (id: string, payload: Partial<TUser>) => {
  console.log(id, payload);
  const updateUser = User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updateUser;
};
const updateUserStatus = async (id: string, payload: Partial<TUser>) => {
  // console.log(id,payload)
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: payload },
    {
      new: true,
      runValidators: true,
    },
  );
  return updatedUser;
};
const deleteUser = async (id: string) => {
  console.log(id);
  const updateUser = User.findByIdAndDelete(id);
  return updateUser;
};

export const UserServices = {
  registerUserIntoDB,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser,

  updateUserStatus,
};
