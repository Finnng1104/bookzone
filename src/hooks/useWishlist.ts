"use client"; 
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useQuery  } from '@tanstack/react-query';
import dotenv from "dotenv";
axios.defaults.withCredentials = true;

dotenv.config();
const BASE_URL_POST_WISHLIST = process.env.NEXT_PUBLIC_POSTWISHLIST;
const BASE_URL_GET_WISHLIST = process.env.NEXT_PUBLIC_GETWISHLIST;
const BASE_URL_DELETE_WISHLIST = process.env.NEXT_PUBLIC_DELETEWISHLIST;

  
  interface WishlistInput {
    bookId: string;
    userId: string;
  }
  
  export const usePostWishlist = () => {
    return useMutation({
      mutationFn: async (data: WishlistInput) => {
        const response = await axios.post(`${BASE_URL_POST_WISHLIST}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        return response.data;
      },
    });
  }; 
export const useDeleteWishlist = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${BASE_URL_DELETE_WISHLIST}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        },
    });
}
export const useGetWishlist = (userId: string) => {
    return useQuery({
      queryKey: ['wishlist', userId], 
      queryFn: async () => {
        const response = await axios.get(`${BASE_URL_GET_WISHLIST}/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        return response.data;
      },
      enabled: !!userId, 
    });
  };