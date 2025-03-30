"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import AuthForm from "./AuthForm";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register data:", formData);
    router.push("/dashboard");
  };

  return (
    <AuthForm title="Đăng Ký" onSubmit={handleSubmit}>
      <div className="w-full max-w-md flex flex-col items-center">
        <InputField label="Họ và tên" type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Mật khẩu" type="password" name="password" value={formData.password} onChange={handleChange} />
        <InputField
          label="Xác nhận mật khẩu"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {/* Nút đăng ký */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-xl mt-4 hover:bg-blue-600 transition-all duration-300 shadow-lg text-lg font-semibold"
        >
          Đăng Ký
        </button>

        {/* Hoặc đăng ký bằng */}
        <div className="mt-6 text-center text-gray-600 font-medium">Hoặc đăng nhập bằng</div>
        <div className="flex justify-center mt-4">
          <button className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300">
            <FcGoogle size={24} />
            <span className="text-gray-700 font-semibold">Google</span>
          </button>
        </div>

        {/* Đã có tài khoản */}
        <p className="text-center text-gray-700 mt-6 text-lg">
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
