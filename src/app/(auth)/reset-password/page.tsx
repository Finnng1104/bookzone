"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import InputField from "@/components/auth/InputField";
import { useResetPassword } from "@/hooks/useAuth";

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({otp: "", newpassword: "", confirmnewpassword: "" });
  const router = useRouter();
  const { mutateAsync: resetpassword } = useResetPassword();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newpassword !== formData.confirmnewpassword) {
      alert("Mật khẩu không khớp. Vui lòng thử lại.");
      return;
    }
    try {
      await resetpassword({
        otp: formData.otp,
        newpassword: formData.newpassword,
        confirmnewpassword: formData.confirmnewpassword,
      })
    } catch (error) {
      console.log("Error resetting password:", error);
      alert("Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.");
      
    }
    await router.push("/login");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-cover bg-center relative" 
      style={{ backgroundImage: "url('/images/bookbg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Form đặt lại mật khẩu */}
      <div className="relative z-10 w-1/3">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Đặt Lại Mật Khẩu</h2>
          <p className="text-gray-600 text-sm mb-4">Nhập mật khẩu mới để tiếp tục.</p>
          
          <form onSubmit={handleSubmit}>
            <InputField label="Nhập OTP" type="text" name="otp" value={formData.otp} onChange={handleChange} />
            <InputField label="Mật khẩu mới" type="password" name="newpassword" value={formData.newpassword} onChange={handleChange} />
            <InputField label="Xác nhận mật khẩu" type="password" name="confirmnewpassword" value={formData.confirmnewpassword} onChange={handleChange} />
            
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
