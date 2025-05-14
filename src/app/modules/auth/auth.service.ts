import config from '../../config';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = (await User.isUserExistsByEmail(payload.email)) as any;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  // const isDeleted = user?.isDeleted;

  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  // }

  // checking if the user is blocked

  // const userStatus = user?.isBlocked;

  // if (!userStatus) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  // }

  // checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  // create token and sent to the  client

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(jwtPayload);

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.jwt_refresh_secret as string,
  //   config.jwt_refresh_expires_in as string,
  // );

  return {
    accessToken,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // console.log(userData)
  const user = await User.findById({ _id: userData._id });
  console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findByIdAndUpdate(
    {
      _id: userData._id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
    },
  );

  return null;
};
export const AuthServices = {
  loginUser,
  changePassword,
};
