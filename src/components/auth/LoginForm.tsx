"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import AuthForm from "./AuthForm";
import { FcGoogle } from "react-icons/fc";
import ForgotPasswordModal from "./ForgotPasswordModal";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Đăng nhập thành công với:", formData);
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

          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-xl mt-4 hover:bg-blue-600 transition-all duration-300 shadow-lg text-lg font-semibold">
            Đăng Nhập
          </button>

          <div className="mt-6 text-center text-gray-600 font-medium">Hoặc đăng nhập bằng</div>
          <div className="flex justify-center mt-4">
            <button className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300">
              <FcGoogle size={24} />
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