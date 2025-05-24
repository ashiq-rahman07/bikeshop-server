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
const http_status_codes_1 = require("http-status-codes");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bike_constant_1 = require("./bike.constant");
const bike_model_1 = require("./bike.model");
const createBike = (bikData, gearImages, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { images } = gearImages;
    if (!images || images.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Gear images are required.');
    }
    bikData.images = images.map((image) => image.path);
    const createGear = new bike_model_1.Bike(Object.assign({}, bikData));
    const result = yield createGear.save();
    // houseData.images = images.map((image) => image.path);
    // const rentalHouse = await RentalHouse.create(houseData);
    // return rentalHouse;
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
const updateBikeFromDB = (bikeId, bikeData, bikeImages) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBike = yield bike_model_1.Bike.findByIdAndUpdate(bikeId, Object.assign(Object.assign({}, bikeData), ((bikeImages === null || bikeImages === void 0 ? void 0 : bikeImages.images) && {
        images: bikeImages.images.map((img) => img.path),
    })), { new: true, runValidators: true });
    return updatedBike;
});
exports.BikeServices = {
    createBike,
    getAllBikesFromDB,
    getSingleBike,
    deleteBikeFromDB,
    updateBikeFromDB,
};
