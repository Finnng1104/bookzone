"use client";

import BookCard from '@/components/wishlist/BookCard';
import Sidebar from '@/components/wishlist/SideBarSection';
import { useDeleteWishlist, useGetWishlist } from '@/hooks/useWishlist';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';

axios.defaults.withCredentials = true;

interface Book {
  id: string;
  title: string;
  coverImage: string;
}

interface WishlistItem {
  _id: string;
  bookId: string;
}

const Wishlist = () => {
  const queryClient = useQueryClient();
  const [books, setBooks] = useState<Book[]>([]);
  const userCookie = Cookies.get('user');
  const { data, isLoading, isError } = useGetWishlist(userCookie ? JSON.parse(userCookie).id : '');
  const deleteMutation = useDeleteWishlist();
 
  useEffect(() => {
    const fetchBookDetails = async () => {
      if (data?.wishlists?.length) {
        try {
          const bookDetails = await Promise.all(
            data.wishlists.map(async (item: WishlistItem) => { 
              const res = await axios.get(`${process.env.NEXT_PUBLIC_BOOK_DETAIL}/${item.bookId}`);
              const book = res.data.data;
              return {
                id: item._id,
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

  const handleRemove = (id: string) => {
    console.log('Xoá sản phẩm với ID: ', id);
    deleteMutation.mutate(id, {
      onSuccess: () => {
        const updatedBooks = books.filter(book => book.id !== id);
        setBooks(updatedBooks);
        queryClient.invalidateQueries({ queryKey: ['wishlists'] });
      },
      onError: (error) => {
        console.error('Lỗi khi xoá wishlist:', error);
      },
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-600">
        <FaSpinner className="animate-spin text-4xl text-teal-600 mb-4" />
        <p className="text-lg">Đang tải danh sách yêu thích...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-600">
        <div className="text-center max-w-md mx-auto">
          <FaHeart className="text-4xl text-red-500 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Rất tiếc!</h2>
          <p className="text-gray-600">Có lỗi xảy ra khi tải danh sách yêu thích. Vui lòng thử lại sau.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Danh sách yêu thích
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Khám phá và quản lý bộ sưu tập những cuốn sách bạn yêu thích
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <Sidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {books.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center">
                  <FaHeart className="text-3xl text-gray-300" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Chưa có sách yêu thích
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Hãy khám phá thư viện và thêm những cuốn sách bạn yêu thích vào đây để dễ dàng theo dõi và quản lý
                </p>
                <Link 
                  href="/" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent 
                           text-base font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                           transition-colors duration-300"
                >
                  Khám phá sách ngay
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                    Hiển thị <span className="font-medium text-gray-900">{books.length}</span> cuốn sách
                  </p>
                  <div className="flex gap-4">
                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                      <span className="sr-only">Grid view</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                      <span className="sr-only">List view</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {books.map((book) => (
                    <div key={book.id} className="h-full">
                      <BookCard
                        book={book}
                        onRemove={() => handleRemove(book.id)}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
