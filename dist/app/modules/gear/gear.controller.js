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
exports.GearControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
// import bikeValidationSchema from './bike.validation';
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const gear_service_1 = require("./gear.service");
const createGear = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  const files = req.files;
    //  const user = req.user
    const result = yield gear_service_1.GearServices.createGear(req.body, req.files, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Product are created successfully',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const getAllGears = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gear_service_1.GearServices.getAllGears(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Gear are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleGear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gearId } = req.params;
        const result = yield gear_service_1.GearServices.getSingleGear(gearId);
        res.status(200).json({
            message: 'Gear are retrieved successfully',
            status: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const deleteGear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gearId } = req.params;
        yield gear_service_1.GearServices.deleteGear(gearId);
        res.status(200).json({
            message: 'Gear are delete successfully',
            status: true,
            data: {},
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const updateGear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gearId } = req.params;
        const result = yield gear_service_1.GearServices.updateGear(gearId, req.body, req.files);
        res.status(200).json({
            message: 'Gear are update successfully',
            status: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
exports.GearControllers = {
    createGear,
    getAllGears,
    getSingleGear,
    deleteGear,
    updateGear,
};
