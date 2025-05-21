import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { IImageFiles } from '../../interface/IImageFile';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { IJwtPayload } from '../auth/auth.interface';
import { bikeSearchableFields } from './gear.constant';
import { IGear } from './gear.interface';
import { Gear } from './gear.model';

const createGear = async (   gearData: Partial<IGear>,
   gearImages: IImageFiles,
   authUser: IJwtPayload
  ) => {
   const { images } = gearImages;
  if (!images || images.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Gear images are required.');
  }
  gearData.images = images.map((image) => image.path);
  const createGear = new Gear({
    ...gearData,
  });
  const result = await createGear.save();

  return result;
};

const getAllGears = async (query: Record<string, unknown>) => {
  const gearQuery = new QueryBuilder(Gear.find(), query)
    .search(bikeSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await gearQuery.countTotal();
  const result = await gearQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleGear = async (id: string) => {
  const result = await Gear.findById(id);
  return result;
};

const deleteGear = async (id: string) => {
  const result = await Gear.findByIdAndDelete(id);
  return result;
};

const updateGear = async (id: string, payload: Partial<IGear>) => {
  const result = await Gear.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const GearServices = {
  createGear,
  getAllGears,
  getSingleGear,
  deleteGear,
  updateGear,
};
