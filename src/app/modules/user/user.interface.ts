import { Model, Types } from 'mongoose';

const USER_ROLE = {
  admin: 'admin',
  customer: 'customer',
};
export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  isActive: boolean;
  phone: string;
  address: string;
}

export interface UserModel extends Model<TUser> {
  isPasswordMatched(password: string, password1: any): unknown;
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if the user exist
  isUserExists(id: string): Promise<TUser>;
}

export type TUserRole = keyof typeof USER_ROLE;
