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
exports.typeControler = void 0;
const bike_model_1 = require("../bikes/bike.model");
const gear_model_1 = require("../gear/gear.model");
const addProductTypeFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update bikes collection
        const bikeResult = yield bike_model_1.Bike.updateMany({ productType: { $exists: false } }, { $set: { productType: 'bike' } });
        console.log(`Bikes updated: ${bikeResult.modifiedCount}`);
        // Update gears collection
        const gearResult = yield gear_model_1.Gear.updateMany({ productType: { $exists: false } }, { $set: { productType: 'gear' } });
        console.log(`Gears updated: ${gearResult.modifiedCount}`);
        res.send({ message: 'succesfully update bike and gear filed' });
    }
    catch (error) {
        console.error('Error updating collections:', error);
    }
});
exports.typeControler = {
    addProductTypeFields
};
