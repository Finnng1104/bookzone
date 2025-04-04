"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/auth/InputField";
import { useChangePassword } from "@/hooks/useAuth";

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");  

  const router = useRouter();
  const { mutate, status } = useChangePassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const formErrors = { otp: "", newPassword: "", confirmPassword: "" };
    let isValid = true;

    // Kiểm tra nếu có trường nào còn thiếu
    if (!formData.otp) {
      formErrors.otp = "❌ OTP là bắt buộc.";
      isValid = false;
    }

    if (!formData.newPassword) {
      formErrors.newPassword = "❌ Mật khẩu mới là bắt buộc.";
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      formErrors.newPassword = "❌ Mật khẩu mới phải có ít nhất 8 ký tự.";
      isValid = false;
    }

    // Kiểm tra mật khẩu xác nhận có khớp với mật khẩu mới không
    if (formData.newPassword !== formData.confirmPassword) {
      formErrors.confirmPassword = "❌ Mật khẩu không khớp.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Kiểm tra form
    if (!validateForm()) return;
  
    // Gọi API đổi mật khẩu
    mutate({ otp: formData.otp, newPassword: formData.newPassword }, {
      onSuccess: (data) => {
        if (data.status) {
          setMessage(`✅ ${data.message || "Đổi mật khẩu thành công!"}`);
          setTimeout(() => router.push("/login"), 2000); // Chuyển hướng sau 2 giây
        } else {
          // Nếu status là false thì là lỗi, hiển thị thông báo lỗi
          setMessage(`❌ ${data.message || "Có lỗi xảy ra!"}`);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        // Xử lý lỗi chung
        setMessage(`❌ ${error.message || "Có lỗi xảy ra!"}`);
      }
    });
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/bookbg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 w-1/3">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Đặt Lại Mật Khẩu
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Nhập mật khẩu mới để tiếp tục.
          </p>

          {message && (
            <p className={`text-sm ${message.startsWith("❌") ? "text-red-500" : "text-green-500"} mb-4`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Nhập OTP"
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
            />
            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

            <InputField
              label="Mật khẩu mới"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}

            <InputField
              label="Xác nhận mật khẩu"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-600 transition-all"
              disabled={status === "pending"}
            >
              {status === "pending" ? "Đang xử lý..." : "Xác Nhận"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
