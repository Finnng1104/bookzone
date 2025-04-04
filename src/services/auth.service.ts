import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import * as jwt from "../services/jwt.service";
import axios from "axios";
import dotenv from "dotenv";
import UserModel from "../models/user.model";
import { GoogleUserPayload } from "../types/google.interface";

dotenv.config();

class AuthService {
  async checkEmail(email: string): Promise<{ exists: boolean; message?: string }> {
    try {
      const user = await UserModel.findOne({ email }).select("email");
      if (!user) {
        return { exists: false, message: "Email không tồn tại" };
      }
      return { exists: true, message: "Email đã tồn tại" };
    } catch (error) {
      throw new Error("Lỗi server");
    }
  }   

  async register(data: { fullname: string; email: string; password: string }) {
    const { fullname, email, password } = data;
    const existing = await UserModel.findOne({ email });
    if (existing) return { status: false, message: "Email đã tồn tại" };

    const hash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ fullname, email, password: hash });
    await newUser.save();
    return { status: true, message: "Đăng ký thành công", user: newUser };
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email }).select("fullname email password role");
  
    if (!user) return { status: false, message: "Email không tồn tại" };
  
    const match = await bcrypt.compare(password, user.password || "");
    if (!match) throw new Error("Mật khẩu không đúng");
  
    const access_token = jwt.generalAccessToken({
      id: user._id.toString(),
      email: user.email,
      isAdmin: user.role === "admin", 
    });
  
    const refresh_token = jwt.generalRefreshToken({
      id: user._id.toString(),
      email: user.email,
      isAdmin: user.role === "admin", 
    });
  
    return {
      access_token,
      refresh_token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    };
  }
  

  async forgotPassword(email: string) {
    const user = await UserModel.findOne({ email });
    if (!user) return { status: false, message: "Email không tồn tại" };

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    if ((user.otpSentCount ?? 0) >= 5 && user.lastOtpSentAt && user.lastOtpSentAt > oneHourAgo) {
      return { status: false, message: "Vượt quá giới hạn gửi OTP. Vui lòng thử lại sau" };
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpiry = new Date(now.getTime() + 5 * 60 * 1000);
    user.otpSentCount = (user.otpSentCount ?? 0) + 1;
    user.lastOtpSentAt = now;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_ENCRYPTION === "ssl",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: email,
      subject: "OTP xác nhận đặt lại mật khẩu",
      text: `OTP của bạn là ${otp}. Hiệu lực trong 5 phút.`,
    });

    return { status: true, message: "OTP đã được gửi về email" };
  }

  async verifyOtpEmail(otp: string) {
    const user = await UserModel.findOne({
      otp,
      otpExpiry: { $gt: new Date() },
    });

    if (!user) {
      return { status: false, message: "OTP không hợp lệ hoặc đã hết hạn" };
    }

    return { status: true, message: "Xác thực OTP thành công" };
  }

  async changePassword(otp: string, newPassword: string) {
    const user = await UserModel.findOne({
      otp,
      otpExpiry: { $gt: new Date() },
    });

    if (!user) {
      return { status: false, message: "OTP không hợp lệ hoặc đã hết hạn" };
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return { status: true, message: "Đổi mật khẩu thành công" };
  }

  async handleGoogleCallBack(code: string) {
    const { GG_CLIENT_ID, GG_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;

    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: GG_CLIENT_ID,
      client_secret: GG_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token } = tokenRes.data;

    const userInfo = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { email, name, picture, id } = userInfo.data;

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = new UserModel({
        email,
        fullname: name,
        avatar: picture,
        googleId: id,
      });
      await user.save();
    }

    return { user, accessToken: access_token };
  }

  async googleLogin(googleUser: GoogleUserPayload) {
    const { email, sub, name, avatar } = googleUser;

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = new UserModel({
        email,
        googleId: sub,
        fullname: name,
        avatar,
      });
      await user.save();
    }

    const access_token = jwt.generalAccessToken({
      id: user._id.toString(),
      email: user.email,
    });

    const refresh_token = jwt.generalRefreshToken({
      id: user._id.toString(),
      email: user.email,
    });

    return {
      status: true,
      message: "Đăng nhập thành công",
      access_token,
      refresh_token,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        avatar: user.avatar,
      },
    };
  }
}

export default new AuthService();
