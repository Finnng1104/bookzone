import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import { useForgotPassword } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const { mutateAsync: forgotPassword } = useForgotPassword(); 
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [hasShownError, setHasShownError] = useState(false);
  const [hasShownSuccess, setHasShownSuccess] = useState(false);

  useEffect(() => {
    setHasShownError(false);
    setHasShownSuccess(false);
  }, [email]);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBlocked && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setIsBlocked(false);
            localStorage.setItem("loginAttempts", "0");
            localStorage.removeItem("lockoutTime");
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBlocked, remainingTime]);
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
      const loginAttempts = localStorage.getItem("loginAttempts");
      const lockoutTime = localStorage.getItem("lockoutTime");

      if (loginAttempts && lockoutTime) {
        const attempts = parseInt(loginAttempts, 10);
        const lockoutExpiration = parseInt(lockoutTime, 10);
        const currentTime = Date.now();

        if (attempts >= 5 && currentTime < lockoutExpiration) {
          const remaining = (lockoutExpiration - currentTime) / 1000;
          setIsBlocked(true);
          setRemainingTime(Math.ceil(remaining)); 
        } else if (currentTime >= lockoutExpiration) {
          
          localStorage.setItem("loginAttempts", "0");
          localStorage.removeItem("lockoutTime");
          setIsBlocked(false);
          setRemainingTime(0);
        }
      }
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBlocked) {
      toast.error(`Bạn đã thử quá 5 lần. Vui lòng đợi ${remainingTime} phút nữa.`);
      return;
    }


    if (email.trim() === "") {
      toast.error("Vui lòng nhập email.");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Vui lòng nhập email hợp lệ.");
      return;
    }

    try {
      await forgotPassword(email); 
      toast.success("Yêu gửi email thành công!"); 
      setHasShownSuccess(true);
      setTimeout(() => {
        onClose();  
        setTimeout(() => router.push(`/reset-password?email=${encodeURIComponent(email)}`), 300); 
      }, 5000);  
    }
    catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        if (!hasShownError) {
          toast.error(error.response.data.message);
          setHasShownError(true);
        }
      } else {
        alert("Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu.");
      }
    }
  }
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
        <div className={`bg-white w-96 p-6 rounded-xl shadow-lg relative transform transition-all duration-300 ${
          show ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quên Mật Khẩu</h2>
          <p className="text-gray-600 text-sm mb-4">Nhập email để đặt lại mật khẩu.</p>

          <InputField label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {isBlocked && (
            <p className="text-red-500 text-sm mt-2">
              Bạn đã bị chặn. Vui lòng thử lại sau {Math.floor(remainingTime / 60)} phút {remainingTime % 60} giây.
            </p>
          )}
          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition" onClick={onClose}>
              Hủy
            </button>
            <button
              className={`ml-2 px-4 py-2 rounded-lg transition text-white ${
                isBlocked || !email.trim() || !email.includes("@") || hasShownSuccess
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={handleSubmit}
              disabled={isBlocked || !email.trim() || !email.includes("@")}
            >
              Gửi Yêu Cầu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModal;
