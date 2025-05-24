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
const http_status_codes_1 = require("http-status-codes");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const gear_constant_1 = require("./gear.constant");
const gear_model_1 = require("./gear.model");
const createGear = (gearData, gearImages, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { images } = gearImages;
    if (!images || images.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Gear images are required.');
    }
    gearData.images = images.map((image) => image.path);
    const createGear = new gear_model_1.Gear(Object.assign({}, gearData));
    const result = yield createGear.save();
    return result;
});
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
const updateGear = (gearId, gearData, gearImages) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedGear = yield gear_model_1.Gear.findByIdAndUpdate(gearId, Object.assign(Object.assign({}, gearData), ((gearImages === null || gearImages === void 0 ? void 0 : gearImages.images) && {
        images: gearImages.images.map((img) => img.path),
    })), { new: true, runValidators: true });
    return updatedGear;
});
exports.GearServices = {
    createGear,
    getAllGears,
    getSingleGear,
    deleteGear,
    updateGear,
};
