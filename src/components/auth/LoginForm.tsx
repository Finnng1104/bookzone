"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import AuthForm from "./AuthForm";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useRouter } from "next/navigation";
import { handleGoogleLogin, useLogin } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google";
import SuccessModal from "@/components/ui/SuccessModal";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword ] = useState(false); 

  const router = useRouter();
  
  const [isSuccess, setIsSuccess] = useState(false); 

  const [formData, setFormData] = useState({ email: "", password: "", fullname: "" });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    fullname?: string;
    general?: string;
  }>({});
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const { mutateAsync: loginUser, isPending } = useLogin();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        const loginResponse = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        const { user, access_token } = loginResponse;
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
        Cookies.set("access_token", access_token, { expires: 7 });
        setIsSuccess(true);
        router.push("/");
      } catch {
        setErrors({ general: "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập." });
      }
    }
  };

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const credential = response.credential;
      if (!credential) return;
      console.log("credential:", credential);
      
      const data = await handleGoogleLogin(credential);
      Cookies.set("user", JSON.stringify(data.user));
      Cookies.set("refresh_token", data.refresh_token);

      router.push("/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
    router.push("/"); 
  };
  
  return (
    <>
      <AuthForm title="Đăng Nhập" onSubmit={handleSubmit}>
        <div className="w-full bg-white shadow-xl rounded-2xl px-6 py-8">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <div className="relative flex justify-end">
          <InputField
            label="Mật khẩu"
            type={showPassword ? "text": "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
           <button
          type="button"
          className="absolute top-12 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
          >
          {showPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
        </button>
          </div>
          
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <div className="text-right text-blue-600 hover:underline text-sm mt-2">
            <button type="button" onClick={() => setForgotPasswordOpen(true)}>
              Quên mật khẩu?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl mt-4 hover:bg-blue-600 transition-all duration-300 shadow-lg text-lg font-semibold"
            disabled={isPending}
          >
            {isPending ? "Đang đăng nhập..." : "Đăng Nhập"}
          </button>

          {errors.general && (
            <p className="text-red-500 text-center mt-4">{errors.general}</p>
          )}

          <div className="mt-6 text-center text-gray-600 font-medium">Hoặc</div>

          <div className="flex justify-center mt-4">
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
              <GoogleLogin onSuccess={handleGoogleLoginSuccess} useOneTap />
            </GoogleOAuthProvider>
          </div>

          <p className="text-center text-gray-700 mt-6 text-sm sm:text-base">
            Chưa có tài khoản?{" "}
            <a href="/register" className="text-blue-600 hover:underline font-semibold">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </AuthForm>

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
      <SuccessModal
        isOpen={isSuccess}
        message="Bạn đã đăng nhập thành công!"
        onClose={handleSuccessClose}
      />
    </>
  );
};

export default LoginForm;