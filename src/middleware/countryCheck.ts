import { NextFunction, Request, Response } from "express";
import UserService from "../users/user.service";
import { AllowedCountry } from "../Helper/CountryList";

const userService = new UserService();

export const CountryCheck = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        let country = await userService.getUserCountry(req.ip ?? '');
        if (AllowedCountry.includes(country)) {
            return next();
        } else {
            return res
                .status(401)
                .json({ success: false, message: "Not allowed on your region" });
        }
    } catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "Something went wrong" });
    }
};