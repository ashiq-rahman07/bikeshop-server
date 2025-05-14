import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const tokenWithBearer = req.headers.authorization as string;
    // const token = tokenWithBearer.split(' ')[1];
    const token = req.headers.authorization as string;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userId, role } = decoded;

    //   checking if the user is exist

    req.user = await User.findById(userId).select('-password');
    //    console.log(user);
    if (!req.user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    //   const isDeleted = user?.isDeleted;

    //   if (userStatus === 'blocked') {
    //     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    //   }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }

    // req.user = decoded as JwtPayload;
    // req.user = {user,userId };
    next();
  });
};

export default auth;
