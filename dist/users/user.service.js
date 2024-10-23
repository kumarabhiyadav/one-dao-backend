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
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("./user.model"));
const axios_1 = __importDefault(require("axios"));
const otp_model_1 = __importDefault(require("../auth/otp.model"));
class UserService {
    createUser({ name, email, password, country, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.create({ name, email, password, country });
                return user;
            }
            catch (error) {
                console.error("Error creating user:", error);
                throw error;
            }
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({
                    where: { email },
                });
                return user;
            }
            catch (error) {
                console.error("Error finding user by email:", error);
                throw error;
            }
        });
    }
    getUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({
                    where: { id },
                });
                return user;
            }
            catch (error) {
                console.error("Error fetching user by ID:", error);
                throw error;
            }
        });
    }
    validateOTP(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
            let otpValid;
            otpValid = yield otp_model_1.default.findOne({
                where: {
                    otp,
                    email,
                    createdAt: {
                        [sequelize_1.Op.gte]: threeMinutesAgo,
                    },
                },
            });
            if (otpValid)
                return true;
            return false;
        });
    }
    getUserCountry(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            let details = yield axios_1.default.get(`https://freeipapi.com/api/json/${ip}`);
            return details.data.countryName;
        });
    }
}
exports.default = UserService;
