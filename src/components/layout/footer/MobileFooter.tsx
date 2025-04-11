import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { FaHandsHelping } from "react-icons/fa";

const MobileFooter = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <footer className="bg-primary text-white py-8 px-4">
      <div className="flex justify-center mb-6 overflow-hidden h-[100px]">
        <Image
          src="/logo/logoamban.png"
          alt="logo"
          width={160}
          height={100}
          className="object-contain"
        />
      </div>

      <div>
        {[
          {
            title: "Giới Thiệu",
            content: (
              <p className="text-sm leading-relaxed">
                BookZone là cửa hàng sách trực tuyến, chuyên cung cấp những đầu sách đa dạng về thể loại và hoàn toàn miễn phí cho cộng đồng yêu sách. Chúng tôi cam kết mang đến trải nghiệm đọc sách thân thiện và luôn cập nhật kho sách mới mỗi ngày, giúp bạn mở rộng tri thức và nuôi dưỡng niềm đam mê đọc sách bền vững.
              </p>
            ),
          },
          {
            title: "Điều Hướng",
            content: (
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-gray-300">Trang chủ</Link>
                </li>
                <li>
                  <Link href="/danh-muc-sach" className="hover:text-gray-300">Danh mục sách</Link>
                </li>
                <li>
                  <Link href="/bai-viet" className="hover:text-gray-300">Bài viết</Link>
                </li>
                <li>
                  <Link href="/wishlist" className="hover:text-gray-300">Danh sách yêu thích</Link>
                </li>
              </ul>
            ),
          },
          {
            title: "Đội Ngũ Phát Triển",
            content: (
              <ul className="space-y-4 text-sm">
                {[
                  {
                    name: "Nguyễn Thanh Tiến",
                    role: "Frontend Developer • LinkedIn",
                    link: "https://www.linkedin.com/in/finnng1104/",
                    avatar: "/avatars/thanhtien.jpg",
                  },
                  {
                    name: "Lâm Gia Bảo",
                    role: "Frontend Developer • Facebook",
                    link: "https://www.facebook.com/share/1F5YNfuEFH/?mibextid=wwXIfr",
                    avatar: "/avatars/giabao.jpg",
                  },
                  {
                    name: "Nguyễn Ngọc Mỹ",
                    role: "Backend Developer • GitHub",
                    link: "https://github.com/tran-minh",
                    avatar: "/avatars/Ngocmy.png",
                  },
                ].map((member) => (
                  <li key={member.name} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <a
                        href={member.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white text-xs"
                      >
                        {member.role}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ),
          },
          {
            title: "Liên Hệ",
            content: (
              <div className="text-sm space-y-1">
                <p>Hotline: <span className="font-semibold">0376 491 104</span></p>
                <p>Email:{" "}
                  <a href="mailto:tiennt1104@gmail.com" className="hover:text-gray-300">
                    tiennt1104@gmail.com
                  </a>
                </p>
                <p>Địa chỉ: QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh</p>
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
                  ? "opacity-100 max-h-[500px] translate-y-0"
                  : "opacity-0 max-h-0 -translate-y-4"
              }`}
            >
              <div className="mt-2 text-sm px-4 py-2">{section.content}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-white">
        <div className="flex justify-center items-center mb-2">
          <FaHandsHelping className="mr-2 text-secondary" size={18} />
          <span>Cảm ơn bạn đã sử dụng BookZone!</span>
        </div>
        <p>Chúng tôi luôn nỗ lực mỗi ngày để cập nhật kho sách phong phú và hữu ích dành cho cộng đồng.</p>
      </div>
    </footer>
  );
};

export default MobileFooter;