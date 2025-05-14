"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const secret = config_1.default.jwt_access_secret; // Replace with your actual secret or private key
const options = {
    expiresIn: '1D', // Token expires in 1 hour
    algorithm: 'HS256', // Specify the algorithm (optional)
};
const createToken = (jwtPayload) => {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, options);
};
exports.createToken = createToken;
