"use client";

import { useParams } from "next/navigation";
import CustomPDFViewer from "@/components/ui/CustomPDFViewer";

const ReadBookPage = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">

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