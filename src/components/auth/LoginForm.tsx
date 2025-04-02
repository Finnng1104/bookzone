"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import AuthForm from "./AuthForm";
// import { FcGoogle } from "react-icons/fc";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useRouter } from "next/navigation";
import { handleGoogleLogin, useLogin } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"; 
import dotenv from "dotenv";
dotenv.config();
const LoginForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", fullname: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string; fullname?: string; general?: string }>({});
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string; fullname?: string } | null>(null);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const {mutateAsync: loginUser, isLoading} = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (validate()) {
      try {
        const loginResponse = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        const { user, refresh_token } = loginResponse;   
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
        Cookies.set("refresh_token", refresh_token, { expires: 7 });
        router.push("/"); 
      } catch (error) {
        setErrors({ general: "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập." });
      }
    }
  };
  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const credential = response.credential; 
      console.log("Google credential:", credential);
      const data = await handleGoogleLogin(credential); 
      Cookies.set("user", JSON.stringify(data.user)); 
      setUser(data.user);
      router.push("/"); 
    } catch (error) {
      console.error("Google login error:", error);
    }
  };
  return (
    <>
      <AuthForm title="Đăng Nhập" onSubmit={handleSubmit}>
        <div className="w-full max-w-md mx-auto">
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="text-red-500 text-sm ">{errors.email}</p>}

          <InputField label="Mật khẩu" type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="text-red-500 text-sm ">{errors.password}</p>}

          <div className="text-right text-blue-600 hover:underline text-sm mt-2">
            <button type="button" onClick={() => setForgotPasswordOpen(true)}>Quên mật khẩu?</button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl mt-4 hover:bg-blue-600 transition-all duration-300 shadow-lg text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </button>
          {/* Hiển thị lỗi tổng quan */}
          {errors.general && (
            <p className="text-red-500 text-center mt-4">{errors.general}</p>
          )}
          <div className="mt-6 text-center text-gray-600 font-medium">Hoặc đăng nhập bằng</div>
          <div className="flex justify-center mt-4">
            <button className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300">
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                useOneTap
              />
            </GoogleOAuthProvider>
              <span className="text-gray-700 font-semibold">Google</span>
            </button>
          </div>

          <p className="text-center text-gray-700 mt-6 text-lg">
            Chưa có tài khoản? <a href="/register" className="text-blue-600 hover:underline font-semibold">Đăng ký ngay</a>
          </p>
        </div>
      </AuthForm>

      <ForgotPasswordModal isOpen={isForgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
    </>
  );
};

export default LoginForm;


