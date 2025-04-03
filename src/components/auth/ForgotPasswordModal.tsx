import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import { useForgotPassword } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const { mutateAsync: forgotPassword } = useForgotPassword(); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") {
      alert("Vui lòng nhập email của bạn.");
      return;
    }
    try {
      await forgotPassword(email); 
      alert("Yêu cầu đặt lại mật khẩu đã được gửi đến email của bạn.");
      onClose(); 
      setTimeout(() => router.push(`/reset-password?email=${encodeURIComponent(email)}`), 300); 
    }
    catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại.");
    }
  }
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10); 
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div className={`bg-white w-96 p-6 rounded-xl shadow-lg relative transform transition-all duration-300 ${
        show ? "scale-100 opacity-100" : "scale-90 opacity-0"
      }`}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quên Mật Khẩu</h2>
        <p className="text-gray-600 text-sm mb-4">Nhập email để đặt lại mật khẩu.</p>

        {/* Input Email */}
        <InputField label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition" onClick={onClose}>
            Hủy
          </button>
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
           onClick={handleSubmit}>
            Gửi Yêu Cầu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
