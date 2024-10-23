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
    const forwarded = req.headers['x-forwarded-for'];
  const clientIp = Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket.remoteAddress;

  // If it's an IPv6-mapped IPv4 address, convert it
  const ip = clientIp && clientIp.includes("::ffff:")
    ? clientIp.split("::ffff:")[1]
    : clientIp;
    console.log(req);
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
