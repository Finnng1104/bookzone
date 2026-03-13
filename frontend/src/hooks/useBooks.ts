import { useQuery } from "@tanstack/react-query";
import axios from "axios";  
const BASE_URL_BOOK_DETAIL = process.env.NEXT_PUBLIC_BOOK_DETAIL; 
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