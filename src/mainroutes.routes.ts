import express from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { ProductRoutes } from "./product/product.routes";

const app = express();

app.use("/auth", AuthRoutes);
app.use("/product", ProductRoutes);





module.exports = app;
