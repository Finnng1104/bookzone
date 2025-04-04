"use client"
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import dotenv from "dotenv"; 
import { GoogleLogin } from "@react-oauth/google";

dotenv.config(); 
const BASE_URL_LOGIN = process.env.NEXT_PUBLIC_LOGIN; 
const BASE_URL_REGISTER = process.env.NEXT_PUBLIC_REGISTER;
const BASE_URL_EMAILDUBPLICATE = process.env.NEXT_PUBLIC_EMAILDUPLICATE;
const BASE_URL_LOGIN_GOOGLE = process.env.NEXT_PUBLIC_LOGIN_GOOGLE;
const BASE_URL_FORGOTPASSWORD = process.env.NEXT_PUBLIC_FORGOTPASSWORD;
const BASE_URL_CONFIRMNEWPASSWORD = process.env.NEXT_PUBLIC_RESETPASSWORD; 
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
export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await axios.post(`${BASE_URL_REGISTER}`, data);
      return response.data;
    }
  });
}
export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await axios.post(`${BASE_URL_LOGIN}`, data);; 
      return response.data;
    }
  });
}
export const checkmailduplicate = async (email: string) => {
  try {
    const response = await axios.post(`${BASE_URL_EMAILDUBPLICATE}`, {
      email: email, 
    });
    return response.data; 
  } catch (error) {
    console.error("Error checking email:", error);
    throw error; 
  }
}
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
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: { otp: string; newpassword: string; confirmnewpassword: string}) => {
      const response = await axios.put(`${BASE_URL_CONFIRMNEWPASSWORD}`, {
        otp: data.otp, 
        newpassword: data.newpassword, 
        confirmnewpassword: data.confirmnewpassword, 
      })
      return response.data; 
    }
  })
}