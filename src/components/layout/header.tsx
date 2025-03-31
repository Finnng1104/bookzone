"use client";
import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaHeart, FaBars, FaPhone, FaEnvelope, FaClock, FaComments, FaUser, FaTimes, FaHeadset } from "react-icons/fa";

const Header = () => {
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white text-black relative">
      {/* 🔹 Thanh thông tin liên hệ */}
      <div className="bg-primary text-white text-sm py-2">
        <div className=" w-full xl:container mx-auto flex justify-between px-4 flex-wrap">
          {/* 🔸 Thông tin liên hệ */}
          <div className="flex space-x-4 hidden md:flex">
            <span className="flex items-center space-x-2">
            <FaPhone size={14} /> <span>+208-666-0112</span>
            </span>
            <span className="flex items-center space-x-2">
              <FaEnvelope size={14} /> <span>info@example.com</span>
            </span>
            <span className="flex items-center space-x-2 hidden lg:flex">
              <FaClock size={14} /> <span>Sun - Fri: 9 AM - 6 PM</span>
            </span>
          </div>

          {/* 🔸 Hỗ trợ & Live Chat */}
          <div className="flex space-x-4">
            <Link href="/support" className="flex items-center space-x-2 hover:text-opacity-80">
              <FaHeadset size={14} /> <span>Hỗ trợ</span>
            </Link>
            <Link href="/live-chat" className="flex items-center space-x-2 hover:text-opacity-80 hidden sm:flex">
              <FaComments size={14} /> <span>Live Chat</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 🔹 Main Header */}
      <div className=" w-full xl:container mx-auto px-4 py-4 flex items-center justify-between">
        {/* 🔸 Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold text-primary">BOOKZONE</Link>

        {/* 🔸 Navbar - Desktop */}
        <nav className="hidden lg:flex flex-grow justify-center space-x-8">
          <Link href="/" className="text-primary hover:text-opacity-80 font-medium">Trang chủ</Link>
          <Link href="/thu-vien-sach" className="text-primary hover:text-opacity-80 font-medium">Thư viện sách</Link>
          <Link href="/bai-viet" className="text-primary hover:text-opacity-80 font-medium">Bài viết</Link>
          <Link href="/lien-he" className="text-primary hover:text-opacity-80 font-medium">Liên hệ</Link>
        </nav>

        {/* 🔸 Thanh tìm kiếm */}
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 w-1/3 shadow-sm">
          <input
            type="text"
            placeholder="Tìm kiếm sách, tác giả..."
            className="flex-1 outline-none bg-transparent text-gray-700 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="text-primary hover:text-opacity-80">
            <FaSearch size={16} />
          </button>
        </div>

        {/* 🔸 Icons & Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Search Icon - Mobile */}
          <button className="md:hidden text-primary hover:text-opacity-80">
            <FaSearch size={20} />
          </button>
          
          <Link href="/favorites" className="text-primary hover:text-opacity-80 hidden sm:block">
            <FaHeart size={20} />
          </Link>
          <Link href="/login" className="text-primary hover:text-opacity-80">
            <FaUser size={20} />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-primary hover:text-opacity-80"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Menu */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute right-0 top-0 h-full w-64 bg-white transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-primary">Menu</h2>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 hover:text-primary"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-primary hover:text-opacity-80 font-medium py-2 border-b border-gray-100">Trang chủ</Link>
              <Link href="/book" className="text-primary hover:text-opacity-80 font-medium py-2 border-b border-gray-100">Thư viện sách</Link>
              <Link href="/blog" className="text-primary hover:text-opacity-80 font-medium py-2 border-b border-gray-100">Bài viết</Link>
              <Link href="/contact" className="text-primary hover:text-opacity-80 font-medium py-2 border-b border-gray-100">Liên hệ</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;