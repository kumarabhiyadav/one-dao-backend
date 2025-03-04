"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
exports.AuthRoutes = express_1.default.Router();
exports.AuthRoutes.post("/login", auth_controller_1.login);
exports.AuthRoutes.post("/sendotp", auth_controller_1.sendotp);
exports.AuthRoutes.post("/signup", auth_controller_1.signup);
