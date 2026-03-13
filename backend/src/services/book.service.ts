import Book from "../models/book.model";
import { IBook } from "../types/book.interface";

export const createBook = async (data: IBook) => {
  const newBook = new Book(data);
  return await newBook.save();
};

export const getAllBooks = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [books, total] = await Promise.all([
    Book.find().skip(skip).limit(limit),
    Book.countDocuments(),
  ]);

  return { books, total };
};

export const getBookBySlug = async (slug: string) => {
  return await Book.findOne({ slug }).lean();
};

export const getBookById = async (id: string) => {
  return await Book.findById(id);
};

export const updateBook = async (id: string, data: Partial<IBook>) => {
  return await Book.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBook = async (id: string) => {
  return await Book.findByIdAndDelete(id);
};

export const searchBooksByTitle = async (title: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [books, total] = await Promise.all([
    Book.find({ title: { $regex: title, $options: "i" } }).skip(skip).limit(limit),
    Book.countDocuments({ title: { $regex: title, $options: "i" } }),
  ]);

  return { books, total };
};

export const searchBooksByAuthor = async (author: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [books, total] = await Promise.all([
    Book.find({ author: { $regex: author, $options: "i" } }).skip(skip).limit(limit),
    Book.countDocuments({ author: { $regex: author, $options: "i" } }),
  ]);

  return { books, total };
};

export const getBooksByCategory = async (category: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [books, total] = await Promise.all([
    Book.find({ category }).skip(skip).limit(limit),
    Book.countDocuments({ category }),
  ]);

  return { books, total };
};