import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { bikeSearchableFields } from './bike.constant';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (file: any, bikeData: TBike) => {
  if (file) {
    const imageName = `${bikeData?.brand}${bikeData?.name}`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    bikeData.bikeImg = secure_url as string;
  }
  const result = await Bike.create(bikeData);
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

const updateBikeFromDB = async (id: string, payload: Partial<TBike>) => {
  const result = await Bike.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getSingleBike,
  deleteBikeFromDB,
  updateBikeFromDB,
};
