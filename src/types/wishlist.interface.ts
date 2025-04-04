import { Document } from 'mongoose';

export interface IWishlist extends Document {
    id: string;
    userId?: string;
    bookId?: string;
  }