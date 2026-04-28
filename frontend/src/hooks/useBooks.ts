import { useQuery } from "@tanstack/react-query";
import axios from "axios";  
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL_BOOK_DETAIL = API_BASE_URL ? `${API_BASE_URL}/api/books/id` : "";
const getBookDetail = async (id: string) => {
    const response = await axios.get(`${BASE_URL_BOOK_DETAIL}/${id}`)
    return response.data.data; 
}
export const useGetBookDetail = (id: string) => {
    return useQuery({
        queryKey: ['book-detail', id], 
        queryFn: () => getBookDetail(id), 
        enabled: !!id, 
    })
}
