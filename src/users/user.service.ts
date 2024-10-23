import { Op } from "sequelize";
import User from "./user.model";

import axios from "axios";
import OTP from "../auth/otp.model";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  country: string;
}

class UserService {
  public async createUser({
    name,
    email,
    password,
    country,
  }: CreateUserInput): Promise<User> {
    try {
      const user = await User.create({ name, email, password, country });
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  }

  public async getUserByID(id: number): Promise<User | null> {
    try {
      const user = await User.findOne({
        where: { id },
      });
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }

  public async validateOTP(email: string, otp: number) {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

    let otpValid: OTP | null;

    otpValid = await OTP.findOne({
      where: {
        otp,
        email,
        createdAt: {
          [Op.gte]: oneMinuteAgo, // Greater than or equal to one minute ago
        },
      },
    });

    if (otpValid) return true;
    return false;
  }

  public async getUserCountry(ip: string): Promise<string> {
    let details = await axios.get(`https://freeipapi.com/api/json/${ip}`);
    return details.data.countryName;
  }
}

export default UserService;
