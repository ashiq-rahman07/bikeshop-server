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
exports.BikeServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const bike_constant_1 = require("./bike.constant");
const bike_model_1 = require("./bike.model");
const createBikeIntoDB = (file, bikeData) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const imageName = `${bikeData === null || bikeData === void 0 ? void 0 : bikeData.brand}${bikeData === null || bikeData === void 0 ? void 0 : bikeData.name}`;
        const path = file === null || file === void 0 ? void 0 : file.path;
        //send image to cloudinary
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        bikeData.bikeImg = secure_url;
    }
    const result = yield bike_model_1.Bike.create(bikeData);
    return result;
});
const getAllBikesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const bikeQuery = new QueryBuilder_1.default(bike_model_1.Bike.find(), query)
        .search(bike_constant_1.bikeSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield bikeQuery.countTotal();
    const result = yield bikeQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getSingleBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.findById(id);
    return result;
});
const deleteBikeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.findByIdAndDelete(id);
    return result;
});
const updateBikeFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.BikeServices = {
    createBikeIntoDB,
    getAllBikesFromDB,
    getSingleBike,
    deleteBikeFromDB,
    updateBikeFromDB,
};
