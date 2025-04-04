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

interface CredentialResponse {
  credential: string | undefined;
}

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
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();
  const { mutateAsync: registerUser, isPending } = useRegister();

  // Hàm validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullname.trim())
      newErrors.fullname = "Họ và tên không được để trống.";
    if (!formData.email.trim()) newErrors.email = "Email không được để trống.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email không hợp lệ.";
    if (!formData.password)
      newErrors.password = "Mật khẩu không được để trống.";
    else if (formData.password.length < 8)
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý đăng ký
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await registerUser(formData);
      if (response.message) {
        setErrors((prev) => ({ ...prev, general: response.message }));
        setSuccessMessage(""); // Reset success message
      } else {
        // Reset errors và hiển thị thông báo thành công
        setErrors({});
        setSuccessMessage("Đăng ký thành công!");

        // Đợi 2 giây trước khi chuyển hướng đến trang login
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          const serverError = error.response.data;

          // Nếu có lỗi từ server
          if (serverError.errors) {
            setErrors((prev) => ({ ...prev, ...serverError.errors }));
            setSuccessMessage("");
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

  // Xử lý đăng nhập bằng Google
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
    <AuthForm title="Đăng Ký" onSubmit={handleSubmit}>
      <div className="w-full bg-white shadow-xl rounded-2xl px-6 py-8">
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
          <p className="text-red-500 text-sm">{errors.fullname}</p>
        )}
        <InputField
          label="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <div className="relative flex justify-end">
          <InputField
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          <button
            type="button"
            className="absolute top-12 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
          </button>
        </div>
        <div className="relative flex justify-end">
        <InputField
          label="Xác nhận mật khẩu"
          type={showconfirmpassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
          <button
            type="button"
            className="absolute top-12 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirmPassword(!showconfirmpassword)}
          >
            { showconfirmpassword? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
          </button>
        </div>
       
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-xl mt-4"
          disabled={isPending}
        >
          {isPending ? "Đang đăng ký..." : "Đăng Ký"}
        </button>
        {errors.general && (
          <p className="text-red-500 text-center mt-4">{errors.general}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}{" "}
        {/* Show success message */}
        <div className="mt-6 text-center">Hoặc</div>
        <div className="flex justify-center mt-4">
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
          >
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} useOneTap />
          </GoogleOAuthProvider>
        </div>
        <p className="text-center text-gray-700 mt-6">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </AuthForm>
  );
};

export default RegisterForm;
