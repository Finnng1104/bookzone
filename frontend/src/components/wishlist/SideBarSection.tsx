import { FaFilter } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="space-y-6">
      {/* Bộ lọc */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FaFilter className="text-gray-600" />
          Bộ lọc
        </h2>
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Thể loại
            </label>
            <select className="w-full rounded-lg border-gray-200 focus:border-teal-500 focus:ring-teal-500">
              <option value="">Tất cả thể loại</option>
              <option value="fiction">Tiểu thuyết</option>
              <option value="nonfiction">Phi hư cấu</option>
              <option value="science">Khoa học</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Sắp xếp theo
            </label>
            <select className="w-full rounded-lg border-gray-200 focus:border-teal-500 focus:ring-teal-500">
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="name">Tên sách</option>
            </select>
          </div>
        </div>
      </div>

      {/* Nút lọc */}
      <button
        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-medium
                        hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                        transition-colors duration-300"
      >
        Áp dụng bộ lọc
      </button>
    </div>
  );
};

export default Sidebar;
