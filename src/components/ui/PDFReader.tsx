"use client";

import { useState, useEffect } from "react";
import { Worker, Viewer, ViewMode } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PDFReaderProps {
  slug?: string;
}

const PDFReader: React.FC<PDFReaderProps> = ({ slug }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1.5);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.DualPage);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setScale(0.8);
        setViewMode(ViewMode.SinglePage); // ✅ Mobile: Single page
      } else if (width < 1024) {
        setScale(1);
        setViewMode(ViewMode.DualPage); // ✅ Tablet: Dual page
      } else {
        setScale(1.5);
        setViewMode(ViewMode.DualPage); // ✅ PC: Dual page
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!slug) return;

    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/books/slug/${slug}`);
        const response = await res.json();
        const data = response.data;

        if (res.ok && data.formats?.pdf) {
          setFileUrl(data.formats.pdf);
        } else {
          setError("Không tìm thấy sách hoặc sách không có định dạng PDF.");
        }
      } catch (error) {
        console.error("Lỗi khi fetch sách:", error);
        setError("Lỗi khi lấy dữ liệu sách.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [slug]);

  if (loading) {
    return <p className="text-center text-gray-500 py-10">Đang tải dữ liệu sách...</p>;
  }

  if (error || !fileUrl) {
    return <p className="text-center text-red-500 py-10">{error || "Không thể hiển thị sách."}</p>;
  }

  return (
    <div className="w-full px-4 py-16">
      <div className="border shadow-lg rounded-lg overflow-hidden bg-white">
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
          <Viewer
            fileUrl={fileUrl}
            plugins={[defaultLayoutPluginInstance]}
            defaultScale={scale}
            viewMode={viewMode} // ✅ Dynamic view mode
          />
        </Worker>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <input
          type="text"
          value={fileUrl || ""}
          onChange={(e) => setFileUrl(e.target.value)}
          className="border rounded px-3 py-2 w-2/3 md:w-1/2"
          placeholder="Nhập đường dẫn file PDF..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => console.log("File URL:", fileUrl)}
        >
          Đọc sách
        </button>
      </div>
    </div>
  );
};

export default PDFReader;