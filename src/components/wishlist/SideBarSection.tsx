const Sidebar = () => {
    return (
      <div className="w-full md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-md self-start space-y-4">
        <div className="transition-all duration-300 hover:bg-purple-100 p-2 rounded-lg">
          <h2 className="text-lg font-bold text-purple-700">📚 Sách đã đọc</h2>
          <button className="text-sm text-purple-500 hover:text-purple-700 hover:underline transition-all duration-300">
            Xem thêm
          </button>
        </div>
        <hr className="my-2" />
  
        <div className="transition-all duration-300 hover:bg-pink-100 p-2 rounded-lg">
          <h2 className="text-lg font-bold text-pink-700">❤️ Danh sách yêu thích</h2>
          <button className="text-sm text-pink-500 hover:text-pink-700 hover:underline transition-all duration-300">
            Thêm mới
          </button>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  