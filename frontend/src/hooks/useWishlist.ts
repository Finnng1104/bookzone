"use client"; 
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useQuery  } from '@tanstack/react-query';
axios.defaults.withCredentials = true;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL_POST_WISHLIST = API_BASE_URL ? `${API_BASE_URL}/api/wishlist/postwishlist` : "";
const BASE_URL_GET_WISHLIST = API_BASE_URL ? `${API_BASE_URL}/api/wishlist/getallwishlists` : "";
const BASE_URL_DELETE_WISHLIST = API_BASE_URL ? `${API_BASE_URL}/api/wishlist/deletewishlist` : "";

  
  interface WishlistInput {
    bookId: string;
    userId: string;
  }
  
  export const usePostWishlist = () => {
    return useMutation({
      mutationFn: async (data: WishlistInput) => {
        console.log("Data gửi lên Wishlist API:", data);
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
