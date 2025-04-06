"use client";

import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from "pdfjs-dist";
import { FaSearchPlus, FaSearchMinus, FaDownload, FaArrowLeft, FaArrowRight, FaBookOpen } from "react-icons/fa";

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
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [dualPage, setDualPage] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setDualPage(true);
      } else {
        setDualPage(false);
      }
      const pageWidth = dualPage ? width / 2 - 40 : width - 40;
      const scaleFactor = pageWidth / 570;
      setScale(scaleFactor);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dualPage]);

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
        const res = await fetch(`http://localhost:8080/api/books/slug/${slug}`);
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

        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);

        renderPage(pdf, currentPage);
      } catch (err) {
        console.error(err);
        setError("Không thể tải sách.");
      }
    };

    renderPDF();
  }, [fileUrl, scale, currentPage, dualPage]);

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
    return <p className="text-center text-gray-500 py-10">Đang tải dữ liệu sách...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  return (
    <div className="w-full px-4">
      <div className="flex flex-wrap justify-between items-center bg-white border shadow-md rounded-lg px-4 py-2 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setScale((prev) => prev + 0.2)} className="p-2 bg-gray-100 rounded hover:bg-gray-200">
            <FaSearchPlus />
          </button>
          <button onClick={() => setScale((prev) => Math.max(0.4, prev - 0.2))} className="p-2 bg-gray-100 rounded hover:bg-gray-200">
            <FaSearchMinus />
          </button>
          <button onClick={() => setDualPage(!dualPage)} className="p-2 bg-gray-100 rounded hover:bg-gray-200 flex items-center gap-1">
            <FaBookOpen />
            <span className="hidden sm:inline">{dualPage ? "Single" : "Dual"}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <button onClick={goToPrevPage} className="p-2 bg-gray-100 rounded hover:bg-gray-200">
            <FaArrowLeft />
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button onClick={goToNextPage} className="p-2 bg-gray-100 rounded hover:bg-gray-200">
            <FaArrowRight />
          </button>
        </div>

        <div>
          <button onClick={handleDownload} className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
            <FaDownload />
            <span className="hidden sm:inline">Tải xuống</span>
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div
          ref={containerRef}
          className={`pdf-container flex ${dualPage ? "flex-row" : "flex-col"} w-full gap-4 border shadow-lg rounded-lg overflow-hidden bg-white p-4`}
        />
      </div>
    </div>
  );
};

export default CustomPDFViewer;