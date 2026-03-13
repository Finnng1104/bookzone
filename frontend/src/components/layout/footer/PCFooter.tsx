import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FaHandsHelping } from "react-icons/fa";

const PCFooter = () => {
  return (
    <footer className="bg-primary text-white pt-6 pb-8">
      <div className=" w-full xl:container mx-auto px-4">
        <div className="overflow-hidden h-[130px]">
            <Image
                src="/logo/logoamban.png"
                alt="logo"
                width={160}
                height={130}
                className="object-cover object-center"
              />
           </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.2fr_1fr_1.5fr_1fr] gap-8 text-sm">
          <div className="pt-2">
            <p className="text-sm leading-relaxed">
              BookZone là cửa hàng sách trực tuyến, chuyên cung cấp những đầu sách đa dạng về thể loại và hoàn toàn miễn phí cho cộng đồng yêu sách. Chúng tôi cam kết mang đến trải nghiệm đọc sách thân thiện, dễ dàng truy cập và luôn cập nhật kho sách mới mỗi ngày, giúp bạn mở rộng tri thức và nuôi dưỡng niềm đam mê đọc sách bền vững.
            </p>
            <p className="mt-4 text-sm">
              © 2025 Bookzone. All rights reserved.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-4">Điều Hướng</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-gray-300">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link href="/thu-vien-sach" className="hover:text-gray-300">
                    Thư viện sách
                  </Link>
                </li>
                <li>
                  <Link href="/bai-viet" className="hover:text-gray-300">
                    Bài viết
                  </Link>
                </li>
                <li>
                  <Link href="/lien-he" className="hover:text-gray-300">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-4">Đội Ngũ Phát Triển</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white">
                    <Image
                      src="/avatars/thanhtien.jpg"
                      alt="Nguyễn Tiến"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Nguyễn Thanh Tiến</p>
                    <a
                      href="https://www.linkedin.com/in/finnng1104/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white text-xs"
                    >
                      Frontend Developer • LinkedIn
                    </a>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white">
                    <Image
                      src="/avatars/giabao.jpg"
                      alt="Lâm Gia Bảo"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Lâm Gia Bảo</p>
                    <a
                      href="https://www.facebook.com/share/1F5YNfuEFH/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white text-xs"
                    >
                      Frontend Developer • Facebook
                    </a>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white">
                    <Image
                      src="/avatars/Ngocmy.png"
                      alt="Nguyễn Ngọc Mỹ"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Nguyễn Ngọc Mỹ</p>
                    <a
                      href="https://github.com/tran-minh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white text-xs"
                    >
                      Backend Developer • GitHub
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Liên Hệ</h4>
            <p className="text-sm">
              Hotline: <span className="font-semibold">0376 491 104</span>
            </p>
            <p className="text-sm">
              Email:{" "}
              <a
                href="mailto:tiennt1104@gmail.com"
                className="hover:text-gray-300"
              >
                tiennt1104@gmail.com
              </a>
            </p>
            <p className="text-sm">
              Địa chỉ: QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ
              Chí Minh
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-500 pt-6">
          <div className="text-sm text-white text-center md:text-left">
          <div className="flex items-center text-white text-sm">
  <FaHandsHelping className="mr-2 text-secondary" size={18} />
  <span>Cảm ơn bạn đã sử dụng BookZone!</span>
</div>
            <p className="mt-2">
              Chúng tôi luôn nỗ lực mỗi ngày để cập nhật kho sách phong phú và
              hữu ích dành cho cộng đồng.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PCFooter;
