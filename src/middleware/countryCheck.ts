import { NextFunction, Request, Response } from "express";
import UserService from "../users/user.service";
import { AllowedCountry } from "../Helper/CountryList";
import { getIPFromReq } from "src/Helper/getIP";

const userService = new UserService();

export const CountryCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let ip = getIPFromReq(req);
    let country = await userService.getUserCountry(ip ?? "");
    console.log(country);
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
