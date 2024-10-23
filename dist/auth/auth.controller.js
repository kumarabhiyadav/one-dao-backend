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
exports.signup = exports.sendotp = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWT_1 = require("../jwtToken/JWT");
const user_service_1 = __importDefault(require("../users/user.service"));
const user_model_1 = __importDefault(require("../users/user.model"));
const emailSender_1 = require("..//emails/emailSender");
const randNumber_1 = require("../Helper/randNumber");
const Validator_1 = require("../Helper/Validator");
const otp_model_1 = __importDefault(require("./otp.model"));
const userService = new user_service_1.default();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    const user = yield userService.findUserByEmail(email);
    if (user) {
        if (bcrypt_1.default.compareSync(password, user.password)) {
            let token = yield (0, JWT_1.createAccessToken)(user.id);
            user.password = "";
            res
                .status(200)
                .json({ success: true, result: user, token, message: "Logged in" });
        }
        else {
            res
                .status(400)
                .json({ success: false, message: "Invalid email or password" });
        }
    }
    else {
        res.status(401).json({ success: false, message: "User Not Exists" });
    }
});
exports.login = login;
const sendotp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if ((0, Validator_1.isValidEmail)(email)) {
            let otp = (0, randNumber_1.generateSixDigitRandomNumber)();
            let sentemail = yield (0, emailSender_1.sendEmail)({
                to: email,
                subject: "OTP FOR VERIFICATION ONEDAO",
                text: `Your OTP  ${otp} `,
            });
            yield otp_model_1.default.create({
                otp,
                email,
                createdAt: new Date(),
            });
            return res.status(200).json({
                success: true,
                message: "OTP SENT",
            });
        }
        else {
            return res.status(200).json({
                success: false,
                message: "Failed to Send OTP",
            });
        }
    }
    catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message,
        });
    }
});
exports.sendotp = sendotp;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, otp } = req.body;
        let otpValid = yield userService.validateOTP(email, otp);
        if (otpValid) {
            let user = yield user_model_1.default.findOne({
                where: { email },
            });
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: "User Already Exists with this email",
                });
            }
            else {
                const encpass = bcrypt_1.default.hashSync(password, 1);
                user = yield userService.createUser({
                    email,
                    password: encpass,
                    name,
                    country: "",
                });
                if (user) {
                    let { name, email, country, id } = user;
                    return res.status(201).json({
                        success: true,
                        message: "User has been created",
                        result: { name, email, country, id },
                    });
                }
                else {
                    return res.status(400).json({
                        success: false,
                        message: "unable to create user",
                    });
                }
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }
    }
    catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message,
        });
    }
});
exports.signup = signup;
