export interface IBook {
  _id?: string;
  title: string;
  author: string | string[];
  category: string[]; 
  description?: string;
  coverImage?: string;
  formats?: {
    azw3?: string;
    epub?: string;
    mobi?: string;
    pdf?: string;
  };
  views?: number;
  favorites?: number;
  rating?: number;
  series?: string;
  source?: string;
  slug: string;
}

  export default IBook;