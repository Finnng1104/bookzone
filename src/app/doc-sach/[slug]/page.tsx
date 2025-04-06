"use client";

import { useParams } from "next/navigation";
import CustomPDFViewer from "@/components/ui/CustomPDFViewer";
import { FaArrowLeft, FaBookOpen } from "react-icons/fa";
import Link from "next/link";

const ReadBookPage = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/wishlist"
              className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              <FaArrowLeft className="w-5 h-5" />
              <span className="sr-only">Quay lại</span>
            </Link>
            <div className="flex items-center gap-2">
              <FaBookOpen className="text-teal-600 w-5 h-5" />
              <h1 className="text-xl font-semibold text-gray-900">
                Đọc sách trực tuyến
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Mục lục
            </button>
            <button className="text-sm bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
              Tải PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <CustomPDFViewer slug={slug as string} />
        </div>
      </main>
    </div>
  );
};

export default ReadBookPage;