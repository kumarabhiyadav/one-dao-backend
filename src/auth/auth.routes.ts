import express, { Router } from "express";
import {

    login,
    sendotp,
    signup,
} from "./auth.controller";
import { CountryCheck } from "../middleware/countryCheck";
export const AuthRoutes: Router = express.Router();
AuthRoutes.post("/login", login);
AuthRoutes.post("/sendotp", sendotp);
AuthRoutes.post("/signup", signup);

