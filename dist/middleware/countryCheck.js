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
exports.CountryCheck = void 0;
const user_service_1 = __importDefault(require("../users/user.service"));
const CountryList_1 = require("../Helper/CountryList");
const userService = new user_service_1.default();
const CountryCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forwarded = req.headers['x-forwarded-for'];
        const clientIp = Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket.remoteAddress;
        const ip = clientIp && clientIp.includes("::ffff:")
            ? clientIp.split("::ffff:")[1]
            : clientIp;
        console.log(req);
        let country = yield userService.getUserCountry(ip !== null && ip !== void 0 ? ip : "");
        console.log(country);
        if (CountryList_1.AllowedCountry.includes(country)) {
            return next();
        }
        else {
            return res
                .status(401)
                .json({ success: false, message: "Not allowed on your region" });
        }
    }
    catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "Something went wrong" });
    }
});
exports.CountryCheck = CountryCheck;
