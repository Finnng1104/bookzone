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

  // Plugin hiển thị giao diện PDF đẹp hơn
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    if (!slug) return;

    // 📡 Gọi API lấy sách theo slug
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/books/${slug}`);
        const data = await res.json();
        if (res.ok && data.formats?.pdf) {
          setFileUrl(data.formats.pdf);
        } else {
          setError("Không tìm thấy sách hoặc sách không có định dạng PDF.");
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
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
      {/* Hiển thị file PDF */}
      <div className="border shadow-lg rounded-lg overflow-hidden bg-white">
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
          <Viewer 
            fileUrl={fileUrl} 
            plugins={[defaultLayoutPluginInstance]} 
            defaultScale={1.5} 
            viewMode={ViewMode.DualPage} 
          />
        </Worker>
      </div>

      {/* Input để nhập link PDF khác */}
      <div className="mt-4 flex justify-center gap-2">
        <input
          type="text"
          value={fileUrl}
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