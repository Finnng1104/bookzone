"use client"; 
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import dotenv from "dotenv";
import Cookies from 'js-cookie';
dotenv.config();
const BASE_URL_POST_WISHLIST = process.env.NEXT_PUBLIC_POSTWISHLIST;
const BASE_URL_GET_WISHLIST = process.env.NEXT_PUBLIC_GETWISHLIST;
const BASE_URL_DELETE_WISHLIST = process.env.NEXT_PUBLIC_DELETEWISHLIST;
interface WishlistData {
    id: string;
    bookId: string;
    userId: string;
}
interface WishlistResponse {
    message: string;
    data: WishlistData[];
}
export const usePostWishlist = () => {
    return useMutation({
        mutationFn: async (data: WishlistResponse) => {
            const response = await axios.post(`${BASE_URL_POST_WISHLIST}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: "Bearer " + Cookies.get("access_token"),
                },
            });
            return response.data;
        },
    });
}
