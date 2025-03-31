"use client";

import { useState } from "react";
import { Worker, Viewer, ScrollMode, ViewMode } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFReader = () => {
    const [fileUrl, setFileUrl] = useState("/doc-sach/Bao Người Chờ Đợi - Romain Gary & Đỗ Tử Trình (dịch).pdf");

    // Plugin cho layout đẹp hơn
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div className="w-full px-4 py-16">
            <h2 className="text-2xl font-bold text-center mb-4">📖 Trình Đọc Sách PDF</h2>

            {/* Hiển thị file PDF */}
            <div className="border shadow-lg rounded-lg overflow-hidden bg-white">
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                    <Viewer 
                        fileUrl={fileUrl} 
                        plugins={[defaultLayoutPluginInstance]} 
                        defaultScale={1.5}  // 🔹 Mặc định zoom 150%
                        viewMode={ViewMode.DualPage} // 🔹 Mặc định hiển thị 2 trang (Dual Page)
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