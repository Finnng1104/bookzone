import { FaHeart, FaBookOpen, FaDownload, FaStar, FaFilter } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="space-y-6">
      {/* Thống kê */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FaHeart className="text-red-500" />
          Thống kê yêu thích
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-teal-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-teal-600 mb-1">
              <FaBookOpen className="text-lg" />
              <span className="text-sm font-medium">Đang đọc</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-purple-600 mb-1">
              <FaDownload className="text-lg" />
              <span className="text-sm font-medium">Đã tải</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">8</p>
          </div>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FaFilter className="text-gray-600" />
          Bộ lọc
        </h2>
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Thể loại</label>
            <select className="w-full rounded-lg border-gray-200 focus:border-teal-500 focus:ring-teal-500">
              <option value="">Tất cả thể loại</option>
              <option value="fiction">Tiểu thuyết</option>
              <option value="nonfiction">Phi hư cấu</option>
              <option value="science">Khoa học</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Sắp xếp theo</label>
            <select className="w-full rounded-lg border-gray-200 focus:border-teal-500 focus:ring-teal-500">
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="name">Tên sách</option>
            </select>
          </div>
        </div>
      </div>

      {/* Đánh giá */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FaStar className="text-yellow-400" />
          Đánh giá
        </h2>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex text-yellow-400">
                {Array.from({ length: rating }).map((_, i) => (
                  <FaStar key={i} className="w-4 h-4" />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-gray-200" />
                ))}
              </div>
              <span className="text-sm text-gray-600">({rating} sao)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Nút lọc */}
      <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-medium
                        hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                        transition-colors duration-300">
        Áp dụng bộ lọc
      </button>
    </div>
  );
};

export default Sidebar;
  