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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = user_model_1.User.create(payload);
    return newUser;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.User.find();
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.User.findById(id).select('-password');
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, payload);
    const updateUser = user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updateUser;
});
const updateUserStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id,payload)
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, { $set: payload }, {
        new: true,
        runValidators: true,
    });
    return updatedUser;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const updateUser = user_model_1.User.findByIdAndDelete(id);
    return updateUser;
});
exports.UserServices = {
    registerUserIntoDB,
    getAllUsers,
    updateUser,
    deleteUser,
    getSingleUser,
    updateUserStatus,
};
