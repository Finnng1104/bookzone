import Image from 'next/image';

interface Book {
  id: number;
  title: string;
  coverImage: string;
}

interface BookCardProps {
  book: Book;
  onRemove: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onRemove }) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-md w-full">
      <Image src={book.coverImage} alt={book.title} width={150} height={200} className="rounded-md w-full" />
      <h3 className="text-sm font-semibold mt-2 text-center">{book.title}</h3>
      <button
        onClick={() => onRemove(book.id)}
        className="mt-2 bg-red-500 text-white text-sm py-1 px-3 rounded hover:bg-red-600 w-full"
      >
        Xóa
      </button>
    </div>
  );
};

export default BookCard;