import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal, SiCashapp } from "react-icons/si";

const PCFooter = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-4">
      <div className=" w-full xl:container mx-auto px-4">
        {/* 🔹 Đăng ký nhận tin tức */}
        <div className="bg-gradient-to-r from-primary to-opacity-80 py-8 px-4 lg:px-8 rounded-lg mb-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <h4 className="text-2xl font-bold text-white mb-2">Đăng ký nhận tin tức!</h4>
            <p className="text-sm text-gray-200">
              Nhận các chương trình ưu đãi và thông tin khuyến mãi mới nhất từ chúng tôi.
            </p>
          </div>
          <form className="flex flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="p-3 rounded-md md:rounded-r-none border border-gray-400 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-white w-full md:w-72 h-[48px]"
            />
            <button
              type="submit"
              className="mt-2 ml-0 md:mt-0 lg:ml-2 bg-white text-primary font-semibold py-3 px-4 md:px-6 rounded-md md:rounded-l-none hover:bg-gray-200 transition w-full md:w-auto min-w-[120px] text-center h-[48px]"
            >
              Đăng ký
            </button>
          </form>
        </div>

        {/* 🔹 Điều hướng và thông tin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">BookZone</h4>
            <p className="text-sm leading-relaxed">
              Cửa hàng sách, mang đến những sản phẩm sách chất lượng và hoàn toàn miễn phí. Chúng tôi cam kết
              mang lại trải nghiệm mua sắm tốt nhất với các sản phẩm đa dạng.
            </p>
            <p className="mt-4 text-sm">© 2025 Bookzone. All rights reserved.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Điều Hướng</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-gray-300">Trang chủ</Link>
              </li>
              <li>
                <Link href="/thu-vien-sach" className="hover:text-gray-300">Thư viện sách</Link>
              </li>
              <li>
                <Link href="/bai-viet" className="hover:text-gray-300">Bài viết</Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-gray-300">Liên hệ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Chính Sách</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-gray-300">Chính sách bảo mật</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-300">Điều khoản sử dụng</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-gray-300">Chính sách giao hàng</Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-gray-300">Chính sách đổi trả</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Liên Hệ</h4>
            <p className="text-sm">
              Hotline: <span className="font-semibold">1900 277 237</span>
            </p>
            <p className="text-sm">
              Email:{" "}
              <a href="mailto:support@bookzone.vn" className="hover:text-gray-300">
                support@bookzone.vn
              </a>
            </p>
            <p className="text-sm">Địa chỉ: Tầng 4, Toà nhà X, TP Hà Nội</p>
          </div>
        </div>

        {/* 🔹 Thanh toán và mạng xã hội */}
        <div className="mt-8 border-t border-gray-500 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-white">Phương thức thanh toán:</span>
              <SiVisa className="h-6 w-6 text-white" />
              <SiMastercard className="h-6 w-6 text-white" />
              <SiPaypal className="h-6 w-6 text-white" />
              <SiCashapp className="h-6 w-6 text-white" />
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#">
                <FaFacebookF className="h-6 w-6 text-white hover:text-gray-300 transition" />
              </Link>
              <Link href="#">
                <FaInstagram className="h-6 w-6 text-white hover:text-gray-300 transition" />
              </Link>
              <Link href="#">
                <FaTwitter className="h-6 w-6 text-white hover:text-gray-300 transition" />
              </Link>
              <Link href="#">
                <FaYoutube className="h-6 w-6 text-white hover:text-gray-300 transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PCFooter;