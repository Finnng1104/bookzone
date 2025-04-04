"use client";

import PDFReader from "@/components/ui/PDFReader";
import { useParams } from "next/navigation";

const ReadBookPage = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">
      <PDFReader slug={slug as string} />
    </div>
  );
};

export default ReadBookPage;