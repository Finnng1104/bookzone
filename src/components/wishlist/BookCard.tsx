import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    coverImage: string;
  };
  onRemove: (id: string) => void;
}

const BookCard = ({ book, onRemove }: BookCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative h-full bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      {/* Overlay khi hover */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      
      {/* Nút xóa */}
      <button
        onClick={() => onRemove(book.id)}
        className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg
                 transform hover:scale-110 active:scale-95"
        aria-label="Xóa khỏi danh sách yêu thích"
      >
        <FaTrash className="w-4 h-4" />
      </button>

      {/* Ảnh sách */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Thông tin sách */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-teal-600 transition-colors duration-300">
          {book.title}
        </h3>
      </div>

      {/* Nút xem chi tiết */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <button className="w-full bg-white text-gray-900 py-2 rounded-lg font-medium
                         hover:bg-teal-50 transition-colors duration-300">
          Xem chi tiết
        </button>
      </div>
    </motion.div>
  );
};

export default BookCard;