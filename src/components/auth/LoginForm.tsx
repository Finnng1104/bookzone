"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import AuthForm from "./AuthForm";
import { FcGoogle } from "react-icons/fc";
import ForgotPasswordModal from "./ForgotPasswordModal";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <AuthForm title="Đăng Nhập" onSubmit={handleSubmit}>
        <div className="w-full max-w-md mx-auto ">
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
          <InputField label="Mật khẩu" type="password" name="password" value={formData.password} onChange={handleChange} />

          {/* Quên mật khẩu */}
          <div className="text-right text-blue-600 hover:underline text-sm mt-2">
            <button onClick={() => setForgotPasswordOpen(true)}>Quên mật khẩu?</button>
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl mt-4 hover:bg-blue-600 transition-all duration-300 shadow-lg text-lg font-semibold"
          >
            Đăng Nhập
          </button>

          {/* Hoặc đăng nhập bằng */}
          <div className="mt-6 text-center text-gray-600 font-medium">Hoặc đăng nhập bằng</div>
          <div className="flex justify-center mt-4">
            <button className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300">
              <FcGoogle size={24} />
              <span className="text-gray-700 font-semibold">Google</span>
            </button>
          </div>

          {/* Chưa có tài khoản */}
          <p className="text-center text-gray-700 mt-6 text-lg">
            Chưa có tài khoản?{" "}
            <a href="/register" className="text-blue-600 hover:underline font-semibold">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </AuthForm>

      {/* Modal Quên Mật Khẩu */}
      <ForgotPasswordModal isOpen={isForgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
    </>
  );
};

export default LoginForm;
