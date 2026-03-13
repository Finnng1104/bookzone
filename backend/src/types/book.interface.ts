export interface IBook {
  title: string;
  slug: string;
  author: string;
  category: string[];
  description: string;

  formats: {
    [key: string]: string;
  };

  views: number;
  favorites: number;
  rating: number;
  coverImage: string;
  source: string;

  downloadLink?: string;
  readOnlineLink?: string;

  createdAt?: Date;
  updatedAt?: Date;
}