import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { bikeSearchableFields } from './gear.constant';
import { IGear } from './gear.interface';
import { Gear } from './gear.model';



const createGearIntoDB = async (file: any, bikeData: IGear) => {
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

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getSingleBike,
  deleteBikeFromDB,
  updateBikeFromDB,
};
