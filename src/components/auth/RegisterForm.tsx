"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import AuthForm from "./AuthForm";
import { useRouter } from "next/navigation";
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useRegister, checkmailduplicate, handleGoogleLogin } from "@/hooks/useAuth";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const router = useRouter();

  const { mutateAsync: registerUser, isPending } = useRegister();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullname.trim()) newErrors.fullname = "Họ và tên không được để trống.";
    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = async (email: string) => {
    setFormData({ ...formData, email });

    try {
      const result = await checkmailduplicate(email);
      if (result.exists) {
        setIsEmailDuplicate(true);
        setErrors((prev) => ({
          ...prev,
          email: "Email đã tồn tại, vui lòng sử dụng email khác.",
        }));
      } else {
        setIsEmailDuplicate(false);
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    } catch (error) {
      console.error("Lỗi kiểm tra email trùng:", error);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      await handleEmailChange(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && !isEmailDuplicate) {
      try {
        await registerUser({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        router.push("/login");
      } catch {
        setErrors({ general: "Đã xảy ra lỗi, vui lòng thử lại sau." });
      }
    } else if (isEmailDuplicate) {
      setErrors((prev) => ({
        ...prev,
        email: "Email đã tồn tại, vui lòng sử dụng email khác.",
      }));
    }
  };

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const credential = response.credential;
      if (!credential) return;

      const data = await handleGoogleLogin(credential);
      Cookies.set("user", JSON.stringify(data.user));
      Cookies.set("refresh_token", data.refresh_token);

      router.push("/");
    } catch (error) {
      console.error("Google login error:", error);
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
          onChange={handleChange}
        />
        {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <InputField
          label="Mật khẩu"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <InputField
          label="Xác nhận mật khẩu"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-xl mt-4 hover:bg-blue-600 transition-all duration-300 shadow-lg text-lg font-semibold"
          disabled={isPending || isEmailDuplicate}
        >
          {isPending ? "Đang đăng ký..." : "Đăng Ký"}
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
          Đã có tài khoản?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-semibold">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </AuthForm>
  );
};

export default RegisterForm;