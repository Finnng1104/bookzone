"use client";

import BookCard from '@/components/wishlist/BookCard';
import Sidebar from '@/components/wishlist/SideBarSection';
import { useDeleteWishlist, useGetWishlist } from '@/hooks/useWishlist';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query'; // để invalidate cache sau khi xoá

axios.defaults.withCredentials = true;

interface Book {
  _id: string;
  title: string;
  coverImage: string;
}

const Wishlist = () => {
  const queryClient = useQueryClient();

  const [books, setBooks] = useState<Book[]>([]);
  const userCookie = Cookies.get('user');
  const { data, isLoading, isError } = useGetWishlist(userCookie ? JSON.parse(userCookie).id : '');
  const deleteMutation = useDeleteWishlist();
  const handleRemove = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(['wishlists']);
      },
      onError: (error) => {
        console.error('Lỗi khi xoá wishlist:', error);
      },
    })
  }
  useEffect(() => {
    const fetchBookDetails = async () => {
      if (data?.wishlists?.length) {
        try {
          const bookDetails = await Promise.all(
            data.wishlists.map(async (item: any) => {
              const res = await axios.get(`${process.env.NEXT_PUBLIC_BOOK_DETAIL}/${item.bookId}`);
              const book = res.data.data;
              return {
                _id: item._id,
                title: book.title,
                coverImage: book.coverImage || "/images/default.jpg",
              };
            })
          );
          setBooks(bookDetails);
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết sách:", error);
        }
      }
    };

    fetchBookDetails();
  }, [data]);

  if (isLoading) return <div>Đang tải danh sách...</div>;
  if (isError) return <div>Có lỗi xảy ra khi lấy danh sách yêu thích</div>;

  return (
    <div className="container mx-auto p-6 py-10 flex flex-col md:flex-row gap-6">
      <Sidebar />
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-bold mb-4">Danh sách sách yêu thích</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onRemove={() => {
                handleRemove(book._id)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
