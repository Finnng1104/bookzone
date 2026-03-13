"use client";

import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`fixed bottom-6 right-6 z-[999] bg-accent text-white rounded-full p-4 shadow-lg transition-all duration-300 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <FaChevronUp size={20} />
    </button>
  );
};

export default BackToTop;
