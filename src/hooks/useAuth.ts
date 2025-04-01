import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import dotenv from "dotenv"; 
dotenv.config(); 
const BASE_URL_LOGIN = process.env.NEXT_PUBLIC_LOGIN; 
const BASE_URL_REGISTER = process.env.NEXT_PUBLIC_REGISTER;
const BASE_URL_EMAILDUBPLICATE = process.env.NEXT_PUBLIC_EMAILDUPLICATE;
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