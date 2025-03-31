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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Họ và tên không được để trống.";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Register data:", formData);
      router.push("/dashboard");
    }
  };

  return (
    <AuthForm title="Đăng Ký" onSubmit={handleSubmit}>
      <div className="w-full max-w-md flex flex-col items-center">
        <InputField 
          label="Họ và tên" 
          type="text" 
          name="fullName" 
          value={formData.fullName} 
          onChange={handleChange} 
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

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
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

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
