"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import InputField from "@/components/auth/InputField";

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp. Vui lòng thử lại.");
      return;
    }
    console.log("Reset Password Data:", formData);
    router.push("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center relative" 
      style={{ backgroundImage: "url('/images/bookbg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Form đặt lại mật khẩu */}
      <div className="relative z-10 w-1/3">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Đặt Lại Mật Khẩu</h2>
          <p className="text-gray-600 text-sm mb-4">Nhập mật khẩu mới để tiếp tục.</p>
          
          <form onSubmit={handleSubmit}>
            <InputField label="Mật khẩu mới" type="password" name="password" value={formData.password} onChange={handleChange} />
            <InputField label="Xác nhận mật khẩu" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-600 transition-all">
              Xác Nhận
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
