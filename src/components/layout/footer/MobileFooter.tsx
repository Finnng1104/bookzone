import Link from "next/link";
import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const MobileFooter = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <footer className="bg-primary text-white py-8 px-4">
      {/* 🔹 Đăng ký nhận tin */}
      <div className="bg-gradient-to-r from-primary to-opacity-80 py-6 px-4 rounded-lg text-center mb-6">
        <h4 className="text-lg font-bold text-white mb-2">Đăng ký nhận tin tức!</h4>
        <p className="text-sm text-gray-200 mb-4">
          Nhận các chương trình ưu đãi và thông tin khuyến mãi mới nhất từ chúng tôi.
        </p>
        <form className="flex flex-col items-center gap-3">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="p-3 rounded-md border border-gray-400 bg-white text-black text-sm focus:outline-none w-full"
          />
          <button
            type="submit"
            className="bg-white text-primary font-semibold py-2 px-6 rounded-md hover:bg-gray-200 transition"
          >
            Đăng ký
          </button>
        </form>
      </div>

      {/* 🔹 Điều hướng và thông tin */}
      <div>
        {[
          {
            title: "Bookzone",
            content: "Cửa hàng sách, mang đến những sản phẩm sách chất lượng và hoàn toàn miễn phí.",
          },
          {
            title: "Điều Hướng",
            content: (
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
            ),
          },
          {
            title: "Chính Sách",
            content: (
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
            ),
          },
          {
            title: "Liên Hệ",
            content: (
              <div className="text-sm">
                <p>
                  Hotline: <span className="font-semibold">1900 277 237</span>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:support@bookzone.vn" className="hover:text-gray-300">
                    support@bookzone.vn
                  </a>
                </p>
                <p>Địa chỉ: Tầng 4, Toà nhà X, TP Hà Nội</p>
              </div>
            ),
          },
        ].map((section) => (
          <div key={section.title} className="border-b border-gray-500 py-3">
            <button
              className="flex justify-between w-full text-left font-semibold text-sm items-center"
              onClick={() => toggleSection(section.title)}
            >
              <span>{section.title}</span>
              <div
                className={`text-3xl flex items-center justify-center w-8 h-8 transition-transform transform ${
                  activeSection === section.title ? "rotate-180" : "rotate-0"
                }`}
              >
                {activeSection === section.title ? "-" : "+"}
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${
                activeSection === section.title
                  ? "opacity-100 max-h-[400px] translate-y-0"
                  : "opacity-0 max-h-0 -translate-y-4"
              }`}
            >
              <div className="mt-2 text-sm px-4 py-2">{section.content}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Mạng xã hội */}
      <div className="mt-6 flex justify-center space-x-4">
        <Link href="#" className="hover:text-gray-300">
          <FaFacebookF className="h-6 w-6 text-white" />
        </Link>
        <Link href="#" className="hover:text-gray-300">
          <FaInstagram className="h-6 w-6 text-white" />
        </Link>
        <Link href="#" className="hover:text-gray-300">
          <FaTwitter className="h-6 w-6 text-white" />
        </Link>
        <Link href="#" className="hover:text-gray-300">
          <FaYoutube className="h-6 w-6 text-white" />
        </Link>
      </div>
    </footer>
  );
};

export default MobileFooter;