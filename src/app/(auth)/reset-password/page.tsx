"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/auth/InputField";
import { useChangePassword } from "@/hooks/useAuth";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword ] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    
    if (!formData.otp) {
      formErrors.otp = "❌ OTP là bắt buộc.";
      isValid = false;
    } else if (formData.otp.length !== 6) { 
      formErrors.otp = "❌ OTP không đúng.";
      isValid = false;
    }

    if (!formData.newPassword) {
      formErrors.newPassword = "❌ Mật khẩu mới là bắt buộc.";
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      formErrors.newPassword = "❌ Mật khẩu mới phải có ít nhất 8 ký tự.";
      isValid = false;
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      formErrors.newPassword = "❌ Mật khẩu mới phải chứa ít nhất một chữ cái viết hoa.";
      isValid = false;
    } else if (!/[a-z]/.test(formData.newPassword)) {
      formErrors.newPassword = "❌ Mật khẩu mới phải chứa ít nhất một chữ cái viết thường.";
      isValid = false;
    } else if (!/\d/.test(formData.newPassword)) {
      formErrors.newPassword = "❌ Mật khẩu mới phải chứa ít nhất một số.";
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)) {
      formErrors.newPassword = "❌ Mật khẩu mới phải chứa ít nhất một ký tự đặc biệt.";
      isValid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      formErrors.confirmPassword = "❌ Mật khẩu không khớp.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // log dữ liệu khi submit
    console.log("Submitted Data:", formData);
    if (!validateForm()) return;
    
    mutate({ otp: formData.otp, newPassword: formData.newPassword }, {
      onSuccess: (data) => {
        if (data.status) {
          setMessage(`✅ ${data.message || "Đổi mật khẩu thành công!"}`);
          setTimeout(() => router.push("/login"), 2000); 
        } else {
        
          setMessage(`❌ ${data.message || "Có lỗi xảy ra!"}`);
        }
      },
      onError: (error: any) => {
        if (error?.response?.data?.message?.includes('OTP không đúng')) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            otp: "❌ OTP không đúng. Vui lòng kiểm tra lại."
          }));
        } else {
          setMessage(`❌ ${error.message || "Có lỗi xảy ra!"}`);
        }
      }
    });
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/bookbg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 w-full sm:w-96 md:w-4/5 lg:w-3/5 xl:w-1/2 2xl:w-1/3">
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

            <div className="relative flex justify-end mt-4">
            <InputField
              label="Mật khẩu mới"
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            
             <button
                      type="button"
                      className="absolute top-12 right-3 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
             </button>
            </div>
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
            <div className="relative flex justify-end mt-4">
            <InputField
              label="Xác nhận mật khẩu"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
                      type="button"
                      className="absolute top-12 right-3 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
             </button>
            </div>
           
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
