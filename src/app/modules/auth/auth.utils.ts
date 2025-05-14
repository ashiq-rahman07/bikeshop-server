import jwt from 'jsonwebtoken';
import config from '../../config';

const secret = config.jwt_access_secret as string; // Replace with your actual secret or private key

const options: jwt.SignOptions = {
  expiresIn: '1D', // Token expires in 1 hour
  algorithm: 'HS256', // Specify the algorithm (optional)
};
export const createToken = (jwtPayload: { userId: string; role: string }) => {
  return jwt.sign(jwtPayload, secret, options);
};
