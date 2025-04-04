const FilterBar = ({
    selectedFilter,
    onChange,
  }: {
    selectedFilter: string;
    onChange: (value: string) => void;
  }) => {
    const filters = [
      { label: "Tất cả", value: "all" },
      { label: "Hot", value: "Hot" },
      { label: "Tiểu thuyết", value: "Tiểu Thuyết" },
      { label: "Trinh thám", value: "Trinh Thám" },
      { label: "Kỹ năng sống", value: "Kỹ Năng Sống" },
      { label: "Thơ ca", value: "Thơ Ca" },
      { label: "Kinh tế - Tài chính", value: "Kinh Tế - Tài Chính" },
      { label: "Hài hước", value: "Hài hước" },
      { label: "Quản trị", value: "Quản Trị" },
      { label: "Văn Hoá - Xã Hội", value: "Văn Hoá - Xã Hội" },
      { label: "Truyện Ngắn", value: "Truyện Ngắn" },
      { label: "Tâm Lý Học", value: "Tâm Lý Học" },
    ];
  
    return (
      <div className="flex gap-3 justify-center mb-8 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`px-5 py-2 rounded-full border transition text-sm font-medium
              ${
                selectedFilter === filter.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
              }
            `}
            onClick={() => onChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    );
  };
  
  export default FilterBar;