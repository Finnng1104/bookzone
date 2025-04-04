"use client"

import BookCard from '@/components/wishlist/BookCard';
import Sidebar from '@/components/wishlist/SideBarSection';
import { useGetWishlist } from '@/hooks/useWishlist';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';  
import axios from 'axios';
axios.defaults.withCredentials = true;

interface Book {
  id: number;
  title: string;
  image: string;
}


const Wishlist = () => {
  // const [books, setBooks] = useState<Book[]>([
  //   {
  //     id: 1,
  //     title: 'Diễn Trò - Đông Nhật Anh Đào',
  //     image: '/images/dien-tro.jpg',
  //   },
  //   {
  //     id: 2,
  //     title: '14 Ngày Đẫm Máu',
  //     image: '/images/14-ngay-dam-mau.jpg',
  //   },
  //   {
  //     id: 3,
  //     title: 'Thoát Khỏi Bẫy Nhân Cách',
  //     image: '/images/thoa-khoi-bay-nhan-cach.jpg',
  //   },
  //   {
  //       id: 4,
  //       title: 'Thoát Khỏi Bẫy Nhân Cách',
  //       image: '/images/thoa-khoi-bay-nhan-cach.jpg',
  //     },
    
  // ]);
  const [books, setBooks] = useState(); 
  const {mutateAsync: getBooks } = useGetWishlist();
  const fetchBooks = async () => {
    try {
    
      const response = await getBooks();
      setBooks(response.data); 
      console.log("Fetched books:", response.data);
      
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  useEffect(() => {
    fetchBooks(); 
  }
  , []);

  // const handleRemove = (id: number) => {
  //   setBooks(books.filter((book) => book.id !== id));
  // };

  return (
    <div className="container mx-auto p-6 py-10 flex flex-col md:flex-row gap-6">
      <Sidebar />
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-bold mb-4">Danh sách sách</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* {books?.map((book) => (
            <BookCard key={book.id} book={book} onRemove={handleRemove} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
