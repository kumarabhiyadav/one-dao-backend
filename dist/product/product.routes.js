"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const JWT_1 = require("../jwtToken/JWT");
exports.ProductRoutes = express_1.default.Router();
exports.ProductRoutes.post("/createProduct", JWT_1.verifyJwtToken, product_controller_1.createProduct);
exports.ProductRoutes.put("/updateProduct", JWT_1.verifyJwtToken, product_controller_1.updateProduct);
exports.ProductRoutes.delete("/deleteProduct/:id", JWT_1.verifyJwtToken, product_controller_1.deleteProduct);
exports.ProductRoutes.get("/getProduct", JWT_1.verifyJwtToken, product_controller_1.getProduct);
