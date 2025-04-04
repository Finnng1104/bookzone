import WishlistService from "../services/wishlist.service";
import { Request, Response } from "express";
import { IWishlist } from "../types/wishlist.interface";

export default class WishlistController {
  // Lấy wishlist theo id
  // Lấy tất cả wishlist
  static async  getAllWishlists(req: Request, res: Response): Promise<void> {
    try {
      const wishlists = await WishlistService.getAllWishlists();
     res.status(200).json({ wishlists, status: "Success" });
    } catch (error) {
     res.status(500).json({
        message: (error as Error).message,
        status: "Error",
      });
    }
  }

  // Tạo wishlist mới
  static async postWishlist(req: Request, res: Response): Promise<void> {
    try {
      const { id, bookId, userId }: IWishlist = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!id || !bookId || !userId) {
        res.status(400).json({ error: "Missing required fields" });
      }

      // Tạo wishlist mới
      const newWishlist = await WishlistService.createWishlist(req.body);
       res.status(201).json({ newWishlist, status: "Success" });
    } catch (error) {
       res.status(500).json({
        message: (error as Error).message,
        status: "Error",
      });
    }
  }

  // Xóa wishlist
  static async deleteWishlist(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Kiểm tra xem wishlist có tồn tại không
      const deletedWishlist = await WishlistService.deleteWishlist(id);

      if (!deletedWishlist) {
         res.status(404).json({
          message: "Wishlist not found",
          status: "Error",
        });
      }

       res.status(200).json({
        deletedWishlist,
        status: "Success",
      });
    } catch (error) {
       res.status(500).json({
        message: (error as Error).message,
        status: "Error",
      });
    }
  }
}


