type IBook = {
    _id: string;
    title: string;
    author: string;
    category: string[];
    coverImage: string;
    favorites: number;
    views: number;
    rating: number;
    slug: string;
  };

  export default IBook;