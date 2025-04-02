"use client"
import React, { useState } from "react";
import InputField from "./InputField";
import AuthForm from "./AuthForm";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useRegister } from "@/hooks/useAuth"; 
import { checkmailduplicate } from "@/hooks/useAuth"; 

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

  const { mutateAsync: registerUser, isLoading } = useRegister();

  
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
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email đã tồn tại, vui lòng sử dụng email khác.",
        }));
      } else {
        setIsEmailDuplicate(false);
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    } catch (error) {
      console.error("Error checking email duplicate", error);
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
        // Thực hiện đăng ký người dùng
        await registerUser({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        router.push("/login");
      } catch (error: any) {
       
        setErrors({ general: "Đã xảy ra lỗi, vui lòng thử lại sau." });
      }
    } else if (isEmailDuplicate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email đã tồn tại, vui lòng sử dụng email khác.",
      }));
    }
  };
  

  return (
    <AuthForm title="Đăng Ký" onSubmit={handleSubmit}>
      <div className="w-full max-w-md flex flex-col items-center">
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
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-xl mt-4 hover:bg-blue-600 transition-all duration-300 shadow-lg text-lg font-semibold"
          disabled={isLoading || isEmailDuplicate}  // Disabled nếu đang đăng ký hoặc email trùng
        >
          {isLoading ? "Đang đăng ký..." : "Đăng Ký"}
        </button>

        {errors.general && (
          <p className="text-red-500 text-center mt-4">{errors.general}</p>
        )}

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
