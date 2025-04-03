import { Request, Response } from "express";
import AuthService from "../services/auth.service";

class AuthController {
  checkEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.query;
      if (!email || typeof email !== "string") {
        res.status(400).json({ message: "Email required" });
        return;
      }
      const user = await AuthService.checkEmail(email);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fullname, email, password } = req.body;
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if (!regex.test(email)) {
        res.status(400).json({ message: "Email invalid" });
        return;
      }
      if (!passRegex.test(password)) {
        res.status(400).json({ message: "Password invalid" });
        return;
      }

      const user = await AuthService.register({ fullname, email, password });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

      if (!email || !password) {
        res.status(400).json({ message: "Email and password required" });
        return;
      }

      if (!reg.test(email)) {
        res.status(400).json({ message: "Invalid email format" });
        return;
      }

      const user = await AuthService.login(email, password);
      const { refresh_token, access_token, ...newResponse } = user;

      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        status: "OK",
        message: "Login success",
        refresh_token,
        user: newResponse.user,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  forgotpassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ message: "Email required" });
        return;
      }

      const result = await AuthService.forgotPassword(email);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  changepassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { otp, newpassword } = req.body;
      if (!otp || !newpassword) {
        res.status(400).json({ message: "OTP and new password required" });
        return;
      }

      const result = await AuthService.changePassword(otp, newpassword);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      });

      res.status(200).json({ message: "Logout success" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  googleCallback = async (req: Request, res: Response): Promise<void> => {
    try {
      const { code } = req.query;
      if (!code || typeof code !== "string") {
        res.status(400).json({ message: "Code required" });
        return;
      }

      const result = await AuthService.handleGoogleCallBack(code);

      res.status(200).json({
        message: "Google login successful",
        token: result.accessToken,
        user: result.user,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  googleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const googleUser = req.body.googleUser;
      if (!googleUser) {
        res.status(400).json({ message: "Google user required" });
        return;
      }
  
      const { email, name, avatar, sub } = googleUser;
  
      const { user, access_token, refresh_token } = await AuthService.googleLogin({
        email,
        name,
        avatar,
        sub,
      });
  
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 1 ngày
      });
  
      res.status(200).json({
        message: "Google login successful",
        user,
        access_token,
        refresh_token,
      });
    } catch (error: any) {
      res.status(400).json({
        message: "Error during Google login",
        error: error.message,
      });
    }
  };

  verifyOtpEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { otp } = req.body;
      if (!otp) {
        res.status(400).json({ message: "OTP required" });
        return;
      }

      const result = await AuthService.verifyOtpEmail(otp);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new AuthController();