import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { generalAccessToken, generalRefreshToken } from "../services/jwt.service";
import dotenv from 'dotenv';

dotenv.config();
class AuthController {
  checkEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      console.log("Email received:", email);  // Log email để kiểm tra
  
      // Kiểm tra email hợp lệ
      if (!email || typeof email !== "string" || !/\S+@\S+\.\S+/.test(email)) {
        res.status(400).json({ message: "Email không hợp lệ" });
        return;
      }
  
      const result = await AuthService.checkEmail(email);
      console.log("Check result:", result);  
  
      if (result.exists) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Email không tồn tại" });
      }
  
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Lỗi server" });
    }
  };   

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fullname, email, password } = req.body;
  
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
      // Kiểm tra email hợp lệ
      if (!regex.test(email)) {
        res.status(400).json({ message: "Email không hợp lệ" });
        return;
      }
  
      // Kiểm tra mật khẩu hợp lệ
      if (!passRegex.test(password)) {
        res.status(400).json({ message: "Mật khẩu phải có 8 kí tự bao gồm cả chữ và số" });
        return;
      }
  
      // Kiểm tra email đã tồn tại chưa
      const emailCheck = await AuthService.checkEmail(email);
      if (emailCheck.exists) {
        res.status(409).json({ message: "Email đã tồn tại" });
        return;
      }
  
      // Đăng ký người dùng
      const user = await AuthService.register({ fullname, email, password });
      if (user.status) {
        res.status(201).json({ message: user.message, user: user.user });
      } else {
        res.status(400).json({ message: user.message });
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message || "Lỗi server" });
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
  
      const result = await AuthService.login(email, password);
  
      if ("status" in result && result.status === false) {
        res.status(401).json({ message: result.message || "Unauthorized" });
        return;
      }
  
      const { access_token, refresh_token, user } = result;
      console.log("Access Token:", access_token);
      console.log("Refresh Token:", refresh_token);   
      console.log("NODE_ENV:", process.env.NODE_ENV);
      

      const { id, email: userEmail, role } = user!;
      
  
      // 👉 Lưu cookie
      res.cookie("access_token", access_token, {
        httpOnly: true, 
        secure: true,  
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 1000,
      });
  
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true, 
        secure: true,  
        sameSite: "none",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      res.status(200).json({
        status: "OK",
        message: "Login success",
        access_token, 
        user: {
          id,
          email: userEmail,
          role,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Internal Server Error" });
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
      const { otp, newPassword } = req.body;
      
      if (!otp || !newPassword) {
        res.status(400).json({ message: "OTP và mật khẩu mới là bắt buộc" });
        return;
      }
  
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
      if (!passwordRegex.test(newPassword)) {
        res.status(400).json({ message: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ thường, số và ký tự đặc biệt." });
        return;
      }
  
      const result = await AuthService.changePassword(otp, newPassword);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: true,
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

      res.cookie("access_token", access_token, {
        httpOnly: true, 
        secure: true,  
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 1000,
      });
  
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
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