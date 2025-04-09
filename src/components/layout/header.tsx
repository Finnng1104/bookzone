"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaSearch,
  FaHeart,
  FaBars,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaComments,
  FaUser,
  FaTimes,
  FaHeadset,
  FaChevronDown,
} from "react-icons/fa";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
const Header = () => {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<"title" | "author">("title");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{
    email?: string;
    fullname?: string;
    avatar?: string;
  } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const handleSearch = () => {
    if (!search.trim()) return;
    const query = encodeURIComponent(search.trim());
    window.location.href = `/danh-muc-sach?type=${searchType}&q=${query}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      console.log("userData", userData);
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    setUser(null);
    toast.success("Bạn đã đăng xuất thành công!");
  };
  return (
    <>
      <header className="bg-white text-black relative">
        <div className="hidden md:block bg-primary text-white text-sm py-2">
          <div className="w-full xl:container mx-auto flex justify-between px-4 flex-wrap">
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

            <div className="flex space-x-4">
              <Link
                href="/support"
                className="flex items-center space-x-2 hover:text-opacity-80"
              >
                <FaHeadset size={14} /> <span>Hỗ trợ</span>
              </Link>
              <Link
                href="/live-chat"
                className="flex items-center space-x-2 hover:text-opacity-80 hidden sm:flex"
              >
                <FaComments size={14} /> <span>Live Chat</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full xl:container mx-auto h-[80px] px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-primary overflow-hidden"
          >
            <Image
              src="/logo/logo.png"
              alt="BookZone"
              width={120}
              height={120}
              className="object-cover object-center"
            />
          </Link>
          <nav className="hidden lg:flex flex-grow justify-center space-x-8">
            {[
              { name: "Trang chủ", link: "/" },
              { name: "Danh mục sách", link: "/danh-muc-sach" },
              { name: "Bài viết", link: "/bai-viet" },
            ].map((item) => {
              const isActive = pathname === item.link;

              return (
                <Link
                  key={item.link}
                  href={item.link}
                  className={`relative font-medium transition-all duration-300 group
          ${isActive ? "text-black" : "text-primary hover:text-secondary"}
        `}
                >
                  {item.name}

                  <span
                    className={`absolute left-0 bottom-0 h-0.5 bg-secondary transition-all duration-300
            ${isActive ? "" : "w-0 group-hover:w-full"}
          `}
                  ></span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full w-1/3 h-[42px] shadow-sm relative overflow-hidden">
            <div className="relative h-full">
              <select
                className="w-28 h-full cursor-pointer pl-4 pr-6 text-sm text-gray-700 bg-transparent outline-none appearance-none border-r border-gray-300"
                value={searchType}
                onChange={(e) =>
                  setSearchType(e.target.value as "title" | "author")
                }
              >
                <option value="title">Tên sách</option>
                <option value="author">Tác giả</option>
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <FaChevronDown size={12} />
              </div>
            </div>

            <input
              type="text"
              placeholder={`Tìm theo ${
                searchType === "title" ? "tên sách" : "tác giả"
              }...`}
              className="flex-1 px-3 outline-none bg-transparent text-gray-700 text-sm h-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <button
              className="text-primary hover:text-opacity-80 flex items-center justify-center h-full px-4"
              onClick={handleSearch}
            >
              <FaSearch size={16} />
            </button>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              className="md:hidden text-primary hover:text-opacity-80"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <FaSearch size={20} />
            </button>
            <Link
              href="/wishlist"
              className="text-primary hover:text-opacity-80 hidden sm:block"
            >
              <FaHeart size={20} />
            </Link>

            {user ? (
              <div className="relative">
                {/* User icon */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 text-primary hover:text-opacity-80"
                >
                  <Image
                    src={user.avatar ?? "/default-avatar.jpg"}
                    alt="User profile picture"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span className="hidden md:inline-block">
                    {user.fullname}
                  </span>
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      onClick={handleLogout}
                      className="relative block w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-primary hover:text-opacity-80"
              >
                <FaUser size={20} />
              </Link>
            )}

            <button
              className="lg:hidden text-primary hover:text-opacity-80"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`absolute right-0 top-0 h-full w-64 bg-white transform transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
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
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-primary hover:text-opacity-80 font-medium py-2 border-b border-gray-100"
                >
                  Trang chủ
                </Link>
                <Link
                  href="/danh-muc-sach"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-primary hover:text-opacity-80 font-medium py-2 border-b border-gray-100"
                >
                  Danh mục sách
                </Link>
                <Link
                  href="/bai-viet"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-primary hover:text-opacity-80 font-medium py-2 border-b border-gray-100"
                >
                  Bài viết
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div className="block md:hidden px-4 mt-4">
        {isMobileSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4 animate-fadeIn">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl animate-scaleIn px-4 py-6 space-y-4">
              {/* Nút đóng */}
              <button
                className="absolute -top-3 -right-3 bg-white border border-gray-300 text-gray-600 hover:text-primary hover:border-primary rounded-full p-1 shadow-md transition-colors"
                onClick={() => setIsMobileSearchOpen(false)}
              >
                <FaTimes size={18} />
              </button>

              <div className="w-full">
                <select
                  className="w-full h-12 pl-4 pr-6 text-sm text-gray-700 bg-transparent outline-none appearance-none border border-gray-300 rounded-full focus:ring-0 focus:outline-none"
                  value={searchType}
                  onChange={(e) =>
                    setSearchType(e.target.value as "title" | "author")
                  }
                >
                  <option value="title">Tên sách</option>
                  <option value="author">Tác giả</option>
                </select>
              </div>

              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
                <input
                  autoFocus
                  type="text"
                  placeholder={`Tìm theo ${
                    searchType === "title" ? "tên sách" : "tác giả"
                  }...`}
                  className="flex-1 h-12 px-4 outline-none bg-transparent text-gray-700 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                      setIsMobileSearchOpen(false);
                    }
                  }}
                />
                <button
                  className="text-primary hover:text-opacity-80 px-4 transition-colors"
                  onClick={() => {
                    handleSearch();
                    setIsMobileSearchOpen(false);
                  }}
                >
                  <FaSearch size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
