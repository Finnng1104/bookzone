"use client";
import Image from "next/image";
import Link from "next/link";

const BookDetail = () => {
  return (
    <div className="w-full lg:container mx-auto px-4 py-8 mt-24">
      {/* Phần trên: Ảnh & thông tin sách */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Ảnh bìa sách */}
        <div className="col-span-1 flex justify-center">
        <Image
          src="/images/book-cover.jpg"
          width={300}
          height={450}
          alt="Beartown 2 - Chúng Tôi Đấu Với Các Bạn"
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Nút hành động */}
      <div className="col-span-2 flex flex-col gap-4">
        {/* Thêm vào danh sách yêu thích */}
        <button
          onClick={toggleFavorite}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white ${
            isFavorite ? "bg-red-600 hover:bg-red-700" : "bg-gray-500 hover:bg-gray-600"
          } transition`}
        >
          <FaHeart />
          {isFavorite ? "Đã Yêu Thích" : "Thêm vào Yêu Thích"}
        </button>

        {/* Xem danh sách yêu thích */}
        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition">
          <FaBookOpen />
          Xem Danh Sách Yêu Thích
        </button>
      </div>

        {/* Thông tin sách */}
        <div className="col-span-2">
          <h1 className="text-2xl font-bold">
            Beartown 2 – Chúng Tôi Đấu Với Các Bạn
          </h1>
          <p className="text-gray-500 text-sm mt-1">4K xem • 3.1K yêu thích • ⭐ 4.5</p>

          <p className="mt-4">
            Sách Beartown 2 – Chúng Tôi Đấu Với Các Bạn của tác giả
            <Link href="#" className="text-pink-600 font-semibold">
              Fredrik Backman
            </Link>
            . Mời các bạn tải về hoặc đọc online.
          </p>

          <div className="mt-6 space-y-2">
            <p><strong>Thể loại:</strong> Tiểu Thuyết, Hot</p>
            <p><strong>Định dạng:</strong> Azw3, Epub, Mobi, Pdf</p>
            <p><strong>Tác giả:</strong> Fredrik Backman</p>
            <p><strong>Bộ sách:</strong> Beartown</p>
            <p><strong>Nguồn:</strong> Cộng Hoan</p>
          </div>

          {/* Nút hành động */}
          <div className="mt-6 flex space-x-4">
            <button className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700">
              📖 Đọc Sách Online
            </button>
            <button className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700">
              ⬇️ Tải Xuống Ngay
            </button>
          </div>
        </div>
      </div>

      {/* Review sách */}
      <div className="mt-12">
        <h2 className="text-xl font-bold">📚 Tóm tắt & Review</h2>
        <p className="mt-2 text-gray-600">
          “Beartown Tập 2: Chúng Tôi Đấu Với Các Bạn” là phần tiếp theo của tiểu thuyết “Beartown”
          của Fredrik Backman, tiếp tục kể về cuộc sống của những nhân vật chính sau sự kiện bi thảm đã làm rung chuyển thị trấn Beartown.
        </p>
      </div>

      {/* Giới thiệu tác giả */}
      <div className="mt-12">
        <h2 className="text-xl font-bold">✍️ Giới thiệu tác giả</h2>
        <p className="mt-2 text-gray-600">
          Fredrik Backman sinh năm 1981 tại Thụy Điển, là một nhà văn nổi tiếng với phong cách viết
          giàu cảm xúc và sâu sắc, thường tập trung vào những nhân vật bình dị trong cuộc sống.
        </p>
      </div>

      {/* Danh sách sách cùng tác giả */}
      <div className="mt-12">
        <h2 className="text-xl font-bold">📖 Sách cùng tác giả</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          {/** Sách mẫu */}
          {[
            { title: "BearTown", img: "/images/book1.jpg" },
            { title: "Những Kẻ Âu Lo", img: "/images/book2.jpg" },
            { title: "Bà Ngoại Tôi Gửi Lời Xin Lỗi", img: "/images/book3.jpg" },
            { title: "Người Đàn Ông Mang Tên Ove", img: "/images/book4.jpg" },
          ].map((book, index) => (
            <div key={index} className="text-center">
              <Image
                src={book.img}
                width={160}
                height={220}
                alt={book.title}
                className="rounded-lg shadow-md mx-auto"
              />
              <p className="mt-2 text-sm font-medium">{book.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;