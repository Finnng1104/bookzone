"use client"
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import dotenv from "dotenv"; 
// import { GoogleLogin } from "@react-oauth/google";

dotenv.config(); 
const BASE_URL_LOGIN = process.env.NEXT_PUBLIC_LOGIN; 
const BASE_URL_REGISTER = process.env.NEXT_PUBLIC_REGISTER;
// const BASE_URL_EMAILDUBPLICATE = process.env.NEXT_PUBLIC_EMAILDUPLICATE;
const BASE_URL_LOGIN_GOOGLE = process.env.NEXT_PUBLIC_LOGIN_GOOGLE;
const BASE_URL_FORGOTPASSWORD = process.env.NEXT_PUBLIC_FORGOTPASSWORD;
const BASE_URL_CHANGE_PASSWORD = process.env.NEXT_PUBLIC_CHANGEPASSWORD
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
      console.log("Sending data to API:", data);  // Log the data being sent to the server
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

