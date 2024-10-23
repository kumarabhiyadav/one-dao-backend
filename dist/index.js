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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("./database/connection");
const user_model_1 = __importDefault(require("./users/user.model"));
const morgan_1 = __importDefault(require("morgan"));
const product_model_1 = __importDefault(require("./product/product.model"));
const globalErrorHandler_1 = require("./Helper/globalErrorHandler");
const otp_model_1 = __importDefault(require("./auth/otp.model"));
dotenv_1.default.config();
const mainRoutes = require("./mainroutes.routes");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    origin: "*",
}));
app.set('trust proxy', true);
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: "500mb" }));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.DataBaseConnect)();
    yield user_model_1.default.sync({
        force: true
    });
    yield product_model_1.default.sync({
        force: true
    });
    yield otp_model_1.default.sync({
        force: true
    });
    product_model_1.default.belongsTo(user_model_1.default, {
        foreignKey: 'user',
    });
}))();
app.use("/api", mainRoutes);
app.use(globalErrorHandler_1.errorHandler);
app.get("/", (req, res) => {
    res.send("Serving on port" + port);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
