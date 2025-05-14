"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const gear_constant_1 = require("./gear.constant");
const gear_model_1 = require("./gear.model");
// const createGear = async (file: any, bikeData: IGear) => {
//   if (file) {
//     const imageName = `${bikeData?.brand}${bikeData?.name}`;
//     const path = file?.path;
//     //send image to cloudinary
//     const { secure_url } = await sendImageToCloudinary(imageName, path);
//     bikeData.bikeImg = secure_url as string;
//   }
//   const result = await Bike.create(bikeData);
//   return result;
// };
const getAllGears = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const gearQuery = new QueryBuilder_1.default(gear_model_1.Gear.find(), query)
        .search(gear_constant_1.bikeSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield gearQuery.countTotal();
    const result = yield gearQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getSingleGear = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gear_model_1.Gear.findById(id);
    return result;
});
const deleteGear = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gear_model_1.Gear.findByIdAndDelete(id);
    return result;
});
const updateGear = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gear_model_1.Gear.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.GearServices = {
    getAllGears,
    getSingleGear,
    deleteGear,
    updateGear,
};
