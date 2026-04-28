"use client"
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
// import { GoogleLogin } from "@react-oauth/google";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL_LOGIN = API_BASE_URL ? `${API_BASE_URL}/api/auth/login` : "";
const BASE_URL_REGISTER = API_BASE_URL ? `${API_BASE_URL}/api/auth/register` : "";
const BASE_URL_LOGIN_GOOGLE = API_BASE_URL ? `${API_BASE_URL}/api/auth/google-login` : "";
const BASE_URL_FORGOTPASSWORD = API_BASE_URL ? `${API_BASE_URL}/api/auth/forgotpassword` : "";
const BASE_URL_CHANGE_PASSWORD = API_BASE_URL ? `${API_BASE_URL}/api/auth/changepassword` : "";
interface RegisterData {
  fullname: string;
  email: string; 
  password: string;
  confirmPassword: string;
}
interface LoginData {
  email: string;
  password: string;
  fullname?: string;
}

interface ChangePasswordPayload {
  otp: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  status: boolean;
  message: string;
}
export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      // Gửi yêu cầu POST đến server
      const response = await axios.post(`${BASE_URL_REGISTER}`, data, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      return response.data;
    },
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await axios.post(`${BASE_URL_LOGIN}`, data, {
        withCredentials: true, 
      });
      return response.data;
    },
  });
};

export const handleGoogleLogin = async (token: string) => {
  try {
    const response = await axios.post(`${BASE_URL_LOGIN_GOOGLE}`, {
      token: token 
    });
    return response.data; 
  } catch (error) {
    console.error("Error during Google login:", error);
    throw error; 
  }
}
export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: async (credential: string) => {
      const response = await handleGoogleLogin(credential); 
      return response.data; 
    }
  });
}
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post(`${BASE_URL_FORGOTPASSWORD}`, {
        email: email, 
      });
      return response.data;
    }
  });
}
export const useChangePassword = () => {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload>({
    mutationFn: async (data: ChangePasswordPayload) => {
      console.log("Sending data to API:", data); 
      const response = await axios.put(`${BASE_URL_CHANGE_PASSWORD}`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    },
  });
};
