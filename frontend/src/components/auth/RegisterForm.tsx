"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import AuthForm from "./AuthForm";
import { useRouter } from "next/navigation";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useRegister, handleGoogleLogin } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import type { CredentialResponse } from "@react-oauth/google";
import toast from "react-hot-toast";


const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmpassword, setShowConfirmPassword] = useState(false); 
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { mutateAsync: registerUser, isPending } = useRegister();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
  
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Họ và tên không được để trống.";
    }
  
    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }
  
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống.";
    } else {
      if (formData.password.length < 8) {
        newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = "Mật khẩu phải chứa ít nhất một chữ cái viết hoa.";
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = "Mật khẩu phải chứa ít nhất một chữ cái viết thường.";
      } else if (!/\d/.test(formData.password)) {
        newErrors.password = "Mật khẩu phải chứa ít nhất một số.";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        newErrors.password = "Mật khẩu phải chứa ít nhất một ký tự đặc biệt.";
      }
    }
  
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await registerUser(formData);

if (response?.user) {
  setErrors({});
  toast.success("Đăng ký thành công!");
  setTimeout(() => {
    router.push("/login");
  }, 2000);
} else {
  setErrors((prev) => ({ ...prev, general: response.message || "Có lỗi xảy ra." }));
}
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          const serverError = error.response.data;
  
          if (serverError.errors) {
            setErrors((prev) => ({ ...prev, ...serverError.errors }));
          } else {
            setErrors((prev) => ({
              ...prev,
              general: serverError.message || "Lỗi từ server.",
            }));
          }
        } else {
          setErrors((prev) => ({
            ...prev,
            general: "Không thể kết nối đến server.",
          }));
        }
      } else {
        setErrors((prev) => ({ ...prev, general: "Lỗi không xác định." }));
      }
    }
  };

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const { credential } = response;
      if (!credential) return;

      const data = await handleGoogleLogin(credential);
      Cookies.set("user", JSON.stringify(data.user));
      Cookies.set("refresh_token", data.refresh_token);
      router.push("/");
    } catch {
      setErrors((prev) => ({
        ...prev,
        general: "Đăng nhập Google thất bại. Vui lòng thử lại.",
      }));
    }
  };

  return (
    <>
  <AuthForm title="Đăng Ký" onSubmit={handleSubmit}>
    <div className="w-full bg-white shadow-xl rounded-2xl px-4 sm:px-6 py-6 sm:py-8">
      <InputField
        label="Họ và tên"
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={(e) =>
          setFormData({ ...formData, fullname: e.target.value })
        }
      />
      {errors.fullname && (
        <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
      )}

      <div className="mt-4">
        <InputField
          label="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="relative mt-4">
        <InputField
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          type="button"
          className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
        </button>
        <p className="text-gray-400 text-sm mt-1">Mật khẩu có ít nhất 8 ký tự bao gồm: <br></br>1 ký tự đặc biệt, 1 chữ in hoa, 1 in thường và 1 số</p>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <div className="relative mt-4">
        <InputField
          label="Xác nhận mật khẩu"
          type={showconfirmpassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        <button
          type="button"
          className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setShowConfirmPassword(!showconfirmpassword)}
        >
          {showconfirmpassword ? (
            <IoIosEyeOff size={20} />
          ) : (
            <IoIosEye size={20} />
          )}
        </button>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-xl mt-6 hover:bg-blue-600 transition-all duration-300 shadow-lg text-lg font-semibold"
        disabled={isPending}
      >
        {isPending ? "Đang đăng ký..." : "Đăng Ký"}
      </button>

      {errors.general && (
        <p className="text-red-500 text-center mt-4">{errors.general}</p>
      )}

      <div className="mt-6 text-center text-gray-600 font-medium">Hoặc</div>

      <div className="flex justify-center mt-4">
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            useOneTap
            shape="pill"
            width="100%"
          />
        </GoogleOAuthProvider>
      </div>

      <p className="text-center text-gray-700 mt-6 text-sm sm:text-base">
        Đã có tài khoản?{" "}
        <a
          href="/login"
          className="text-blue-600 hover:underline font-semibold"
        >
          Đăng nhập ngay
        </a>
      </p>
    </div>
  </AuthForm>
</>
  );
};

export default RegisterForm;
