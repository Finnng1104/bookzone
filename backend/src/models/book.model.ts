import mongoose, { Schema, Document } from "mongoose";
import { IBook } from "../types/book.interface";

interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true, trim: true },
    category: { type: [String], required: true },
    description: { type: String, required: true },
    formats: {
      type: Map,
      of: String,
      default: {},
    },
    views: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    coverImage: { type: String, default: "/images/default-book-cover.jpg" },
    source: { type: String, default: "Cộng Hoan" },
    downloadLink: { type: String, required: false },
    readOnlineLink: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IBookModel>("Book", BookSchema);