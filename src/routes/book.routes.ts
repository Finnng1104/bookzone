import { Router } from "express";
import * as BookController from "../controllers/book.controller";

const router = Router();

router.post("/", BookController.createBook);
router.get("/", BookController.getAllBooks);
router.get("/id/:id", BookController.getBookById);
router.get("/slug/:slug", BookController.getBookBySlug);
router.put("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);
router.get("/search/title/:title", BookController.searchBooksByTitle);
router.get("/search/author/:author", BookController.searchBooksByAuthor);
router.get("/category/:category", BookController.getBooksByCategory);

export default router;