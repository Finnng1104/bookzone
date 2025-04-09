"use client";

import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from "pdfjs-dist";
import { FaSearchPlus, FaSearchMinus, FaDownload, FaArrowLeft, FaArrowRight, FaBookOpen, FaSpinner } from "react-icons/fa";

GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

interface CustomPDFViewerProps {
  slug?: string;
}

const CustomPDFViewer: React.FC<CustomPDFViewerProps> = ({ slug }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [dualPage, setDualPage] = useState<boolean>(true);

  useEffect(() => {
    const width = window.innerWidth;
    const isDualPage = width >= 1024;
  
    setDualPage(isDualPage);
    setScale(calculateScaleFactor(isDualPage));
  
    const handleResize = () => {
      const isDualPageNow = window.innerWidth >= 1024;
      setDualPage(isDualPageNow);
      setScale(calculateScaleFactor(isDualPageNow));
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNextPage();
      if (e.key === "ArrowLeft") goToPrevPage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages, dualPage]);

  useEffect(() => {
    if (!slug) return;

    const fetchBook = async () => {
      try {
        const res = await fetch(`https://bookzone-server.onrender.com/api/books/slug/${slug}`);
        const response = await res.json();
        const data = response.data;

        if (res.ok && data.formats?.pdf) {
          setFileUrl(data.formats.pdf);
        } else {
          setError("Không tìm thấy sách hoặc sách không có định dạng PDF.");
        }
      } catch (error) {
        console.error(error);
        setError("Lỗi khi lấy dữ liệu sách.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [slug]);

  useEffect(() => {
    if (!fileUrl || !containerRef.current) return;

    const renderPDF = async () => {
      try {
        const loadingTask = getDocument(fileUrl);
        const pdf = await loadingTask.promise;

        setTotalPages(pdf.numPages);

        renderPage(pdf, currentPage);
      } catch (err) {
        console.error(err);
        setError("Không thể tải sách.");
      }
    };

    renderPDF();
  }, [fileUrl, scale, currentPage, dualPage]);

  const calculateScaleFactor = (dualPageMode: boolean) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    const pageWidth = dualPageMode ? width / 2 - 40 : width - 40;
    const pageHeight = height - 200;
  
    const baseWidth = 794;
    const baseHeight = 1123;
  
    const scaleFactorWidth = pageWidth / baseWidth;
    const scaleFactorHeight = pageHeight / baseHeight;
  
    return Math.min(scaleFactorWidth, scaleFactorHeight);
  };

  const renderPage = async (pdf: PDFDocumentProxy, pageNumber: number) => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const renderSinglePage = async (pageNum: number) => {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context!, viewport }).promise;

      const canvasWrapper = document.createElement("div");
      canvasWrapper.style.flex = "1";
      canvasWrapper.style.display = "flex";
      canvasWrapper.style.justifyContent = "center";
      canvasWrapper.appendChild(canvas);

      containerRef.current!.appendChild(canvasWrapper);
    };

    await renderSinglePage(pageNumber);

    if (dualPage && pageNumber + 1 <= pdf.numPages) {
      await renderSinglePage(pageNumber + 1);
    }
  };

  const handleDownload = () => {
    if (!fileUrl) return;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${slug}.pdf`;
    link.click();
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(1, dualPage ? prev - 2 : prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, dualPage ? prev + 2 : prev + 1));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600">
        <FaSpinner className="animate-spin text-4xl text-teal-600 mb-4" />
        <p className="text-lg font-medium">Đang tải dữ liệu sách...</p>
        <p className="text-sm text-gray-500 mt-2">Vui lòng đợi trong giây lát</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm">
          <FaBookOpen className="text-4xl text-red-500 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Rất tiếc!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      {/* Toolbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm px-4 py-3">
  <div className="flex justify-between items-center xl:container mx-auto">

    {/* Zoom Controls */}
    <div className="flex items-center gap-2">
      <button 
        onClick={() => setScale((prev) => prev + 0.2)}
        className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition"
        title="Phóng to"
      >
        <FaSearchPlus className="text-gray-600" />
        <span className="hidden md:inline">Phóng to</span>
      </button>
      <button 
        onClick={() => setScale((prev) => Math.max(0.4, prev - 0.2))}
        className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition"
        title="Thu nhỏ"
      >
        <FaSearchMinus className="text-gray-600" />
        <span className="hidden md:inline">Thu nhỏ</span>
      </button>
    </div>

    {/* Page Navigation */}
    <div className="flex items-center gap-2">
      <button 
        onClick={goToPrevPage}
        disabled={currentPage <= 1}
        className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 
                   disabled:cursor-not-allowed rounded-lg text-sm transition"
      >
        <FaArrowLeft className="text-gray-600" />
        <span className="hidden md:inline">Trang trước</span>
      </button>
      <span className="text-sm text-gray-700">
        Trang <span className="text-teal-600">{currentPage}</span> / {totalPages}
      </span>
      <button 
        onClick={goToNextPage}
        disabled={currentPage >= totalPages}
        className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 
                   disabled:cursor-not-allowed rounded-lg text-sm transition"
      >
        <span className="hidden md:inline">Trang sau</span>
        <FaArrowRight className="text-gray-600" />
      </button>
    </div>

    {/* Download Button */}
    <button 
      onClick={handleDownload}
      className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white 
               rounded-lg text-sm transition shadow-sm"
    >
      <FaDownload />
      <span className="hidden md:inline">Tải PDF</span>
    </button>

  </div>
</div>

      {/* PDF Viewer */}
      <div className="w-full flex justify-center">
        <div
          ref={containerRef}
          className={`pdf-container flex ${dualPage ? "flex-row" : "flex-col"} w-full gap-6 
                     bg-white border border-gray-200 shadow-lg rounded-xl p-8`}
        />
      </div>
    </div>
  );
};

export default CustomPDFViewer;