import { Request, Response, NextFunction } from "express";
import * as BookService from "../../src/services/book.service";

export const createBook = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  try {
    const savedBook = await BookService.createBook(req.body);
    res.status(201).json({ success: true, data: savedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi thêm sách", error });
  }
};

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 30;

    const { books, total } = await BookService.getAllBooks(page, limit);

    res.status(200).json({
      success: true,
      data: books,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách sách",
      error,
    });
  }
};

export const getBookBySlug = async (req: Request<{ slug: string }>, res: Response): Promise<void> => {
  try {
    const book = await BookService.getBookBySlug(req.params.slug);
    if (!book) {
      res.status(404).json({ success: false, message: "Không tìm thấy sách" });
      return;
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi lấy sách theo slug", error });
  }
};

export const getBookById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const book = await BookService.getBookById(req.params.id);
    if (!book) {
      res.status(404).json({ success: false, message: "Không tìm thấy sách" });
      return;
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi lấy sách", error });
  }
};

export const updateBook = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const updatedBook = await BookService.updateBook(req.params.id, req.body);
    if (!updatedBook) {
      res.status(404).json({ success: false, message: "Không tìm thấy sách để cập nhật" });
      return;
    }
    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi cập nhật sách", error });
  }
};

export const deleteBook = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const deletedBook = await BookService.deleteBook(req.params.id);
    if (!deletedBook) {
      res.status(404).json({ success: false, message: "Không tìm thấy sách để xóa" });
      return;
    }
    res.status(200).json({ success: true, message: "Xóa sách thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi xóa sách", error });
  }
};

export const searchBooksByTitle = async (req: Request<{ title: string }>, res: Response): Promise<void> => {
  try {
    const books = await BookService.searchBooksByTitle(req.params.title);
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi tìm kiếm sách theo tiêu đề", error });
  }
};

export const searchBooksByAuthor = async (req: Request<{ author: string }>, res: Response): Promise<void> => {
  try {
    const books = await BookService.searchBooksByAuthor(req.params.author);
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi tìm kiếm sách theo tác giả", error });
  }
};

export const getBooksByCategory = async (req: Request<{ category: string }>, res: Response): Promise<void> => {
  try {
    const books = await BookService.getBooksByCategory(req.params.category);
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi lấy sách theo danh mục", error });
  }
};