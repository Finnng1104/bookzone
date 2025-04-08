export interface IBlog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    author: string;
    date: string;
    content: string;
    category?: string;
    recommend: string;
  }