"use client";

import { useParams } from "next/navigation";
import CustomPDFViewer from "@/components/ui/CustomPDFViewer";
const ReadBookPage = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">

      <CustomPDFViewer slug={slug as string} />
    </div>
  );
};

export default ReadBookPage;