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
exports.getProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, price, user } = req.body;
    try {
        if (!(name && price)) {
            return res.status(500).json({
                success: false,
                message: "Invalid Values",
            });
        }
        else {
            let product = yield product_model_1.default.create({
                name,
                price,
                user,
            });
            if (product) {
                return res.status(200).json({
                    success: true,
                    message: "Product Created Success ",
                    result: product,
                });
            }
            else {
                return res
                    .status(500)
                    .json({ success: false, message: "Falied to create product " });
            }
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Falied to create product ", error });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, name, price, user } = req.body;
    try {
        let product = yield product_model_1.default.findOne({ where: { id, user } });
        if (product) {
            if (!(name && price)) {
                return res.status(500).json({
                    success: false,
                    message: "Invalid Values",
                });
            }
            else {
                let product = yield product_model_1.default.update({
                    name,
                    price,
                    user,
                }, {
                    where: { id },
                    returning: true,
                });
                if (product) {
                    return res.status(200).json({
                        success: true,
                        message: "Product update Success ",
                        result: product,
                    });
                }
                else {
                    return res
                        .status(500)
                        .json({ success: false, message: "Product with id is not found " });
                }
            }
        }
        else {
            return res
                .status(500)
                .json({ success: false, message: "Falied to update product " });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Falied to update product " });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { user } = req.body;
    let { id, } = req.params;
    try {
        let product = yield product_model_1.default.findOne({ where: { id, user } });
        if (product) {
            let deletedCount = yield product_model_1.default.destroy({
                where: { id },
            });
            if (deletedCount) {
                return res
                    .status(200)
                    .json({ success: true, message: "product Deleted" });
            }
            else {
                return res
                    .status(500)
                    .json({ success: false, message: "Falied to update product " });
            }
        }
        else {
            return res
                .status(500)
                .json({ success: false, message: "product Not Found" });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Falied to update product " });
    }
});
exports.deleteProduct = deleteProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products = yield product_model_1.default.findAll({
            order: [["createdAt", "DESC"]],
        });
        return res
            .status(200)
            .json({ success: true, message: "Product", result: products });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Falied to fetch product " });
    }
});
exports.getProduct = getProduct;
