import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createAccessToken } from "../jwtToken/JWT";
import UserService from "../users/user.service";
import User from "../users/user.model";
import { AllowedCountry } from "../Helper/CountryList";
import { sendEmail } from "..//emails/emailSender";
import { generateSixDigitRandomNumber } from "../Helper/randNumber";
import { isValidEmail } from "../Helper/Validator";
import OTP from "./otp.model";
import { getIPFromReq } from "../Helper/getIP";

const userService = new UserService();

export const login = async (req: any, res: Response) => {
  let { email, password } = req.body;

  const user = await userService.findUserByEmail(email);
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      let token = await createAccessToken(user.id);

      user.password = "";

      res
        .status(200)
        .json({ success: true, result: user, token, message: "Logged in" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
  } else {
    res.status(401).json({ success: false, message: "User Not Exists" });
  }
};

export const sendotp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (isValidEmail(email)) {
      let otp = generateSixDigitRandomNumber();
      let sentemail = await sendEmail({
        to: email,
        subject: "OTP FOR VERIFICATION ONEDAO",
        text: `Your OTP  ${otp} `,
      });
      await OTP.create({
        otp,
        email,
        createdAt: new Date(),
      });

      return res.status(200).json({
        success: true,
        message: "OTP SENT",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Failed to Send OTP",
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name, otp } = req.body;

    let otpValid = await userService.validateOTP(email, otp);
    if (otpValid) {
      let user = await User.findOne({
        where: { email },
      });

      if (user) {
        return res.status(400).json({
          success: false,
          message: "User Already Exists with this email",
        });
      } else {

        // let ip = getIPFromReq(req);
        // let country = await userService.getUserCountry(ip?? "");

        const encpass = bcrypt.hashSync(password, 1);

        user = await userService.createUser({
          email,
          password: encpass,
          name,
          country:"",
        });

        if (user) {
          let { name, email, country, id } = user;
          return res.status(201).json({
            success: true,
            message: "User has been created",
            result: { name, email, country, id },
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "unable to create user",
          });
        }
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};
