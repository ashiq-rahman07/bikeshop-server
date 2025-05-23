import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { IImageFiles } from '../../interface/IImageFile';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { IJwtPayload } from '../auth/auth.interface';
import { IGear } from '../gear/gear.interface';
import { bikeSearchableFields } from './bike.constant';
import { IBike,  } from './bike.interface';
import { Bike } from './bike.model';

const createBike = async (bikData: Partial<IGear>,
   gearImages: IImageFiles,
   authUser: IJwtPayload
  ) => {
   const { images } = gearImages;
  if (!images || images.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Gear images are required.');
  }
  bikData.images = images.map((image) => image.path);
  const createGear = new Bike({
    ...bikData,
  });
  const result = await createGear.save();
  // houseData.images = images.map((image) => image.path);
  // const rentalHouse = await RentalHouse.create(houseData);
  // return rentalHouse;
  return result;
};

const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  const bikeQuery = new QueryBuilder(Bike.find(), query)
    .search(bikeSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await bikeQuery.countTotal();
  const result = await bikeQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleBike = async (id: string) => {
  const result = await Bike.findById(id);
  return result;
};

const deleteBikeFromDB = async (id: string) => {
  const result = await Bike.findByIdAndDelete(id);
  return result;
};

const updateBikeFromDB = async (bikeId : string,
     bikeData: Partial<IGear>,
      bikeImages: IImageFiles,) => {
  const updatedBike = await Bike.findByIdAndUpdate(
  bikeId,
  {
    ...bikeData,
    ...(bikeImages?.images && {
      images: bikeImages.images.map((img) => img.path),
    }),
  },
  { new: true, runValidators: true }
);

return updatedBike
};

export const BikeServices = {
  createBike,
  getAllBikesFromDB,
  getSingleBike,
  deleteBikeFromDB,
  updateBikeFromDB,
};
