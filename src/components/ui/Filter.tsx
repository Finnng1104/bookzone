import { useEffect, useRef, useState } from "react";

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

  const containerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (containerRef.current && activeButtonRef.current) {
      const container = containerRef.current;
      const activeButton = activeButtonRef.current;

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeButton.getBoundingClientRect();

      container.scrollLeft += activeRect.left - containerRect.left - containerRect.width / 2 + activeRect.width / 2;
    }
  }, [selectedFilter]);

  const handleMobileFilterClick = (value: string) => {
    onChange(value);
    setIsMobileMenuOpen(false); 
  };

  return (
    <>
      {/* Desktop & Tablet */}
      <div className="w-full mb-8 overflow-x-auto scroll-smooth relative hidden md:block">
        <div ref={containerRef} className="flex gap-3 min-w-max pb-3 relative">
          {filters.map((filter) => (
            <button
              key={filter.value}
              ref={filter.value === selectedFilter ? activeButtonRef : null}
              className={`flex-shrink-0 px-5 py-2 rounded-full border transition text-sm font-medium whitespace-nowrap
                ${
                  selectedFilter === filter.value
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                }
              `}
              onClick={() => onChange(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden mb-6">
        {/* Toggle Button */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-700 font-medium">Danh mục</span>
          <button
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-full transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "Ẩn danh mục" : "Hiện danh mục"}
          </button>
        </div>

        {/* Filter list with smooth transition */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                className={`px-4 py-2 rounded-full border transition text-sm font-medium
                  ${
                    selectedFilter === filter.value
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                  }
                `}
                onClick={() => handleMobileFilterClick(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;