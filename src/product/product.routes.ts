import express, { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from "./product.controller";
import { CountryCheck } from "../middleware/countryCheck";
import { verifyJwtToken } from "../jwtToken/JWT";
export const ProductRoutes: Router = express.Router();
ProductRoutes.post("/createProduct", verifyJwtToken, createProduct);
ProductRoutes.put("/updateProduct", verifyJwtToken, updateProduct);
ProductRoutes.delete("/deleteProduct", verifyJwtToken, deleteProduct);
ProductRoutes.get("/getProduct", verifyJwtToken, getProduct);
