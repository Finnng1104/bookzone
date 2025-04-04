import { getAllBooks } from './../services/book.service';
import { Router } from "express";
import  WishlistController from "../controllers/wishlist.controller";
import { authUserMiddleware } from "../middlewares/auth.middleware";
const router = Router();
router.post("/postwishlist", authUserMiddleware, WishlistController.postWishlist);
router.get("/getallwishlists/:id", authUserMiddleware, WishlistController.getAllWishlists);
router.delete("/deletewishlist/:id", authUserMiddleware, WishlistController.deleteWishlist);
export default router;