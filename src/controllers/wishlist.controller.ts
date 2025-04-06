import WishlistService from "../services/wishlist.service";
import { Request, Response } from "express";
import { IWishlist } from "../types/wishlist.interface";

export default class WishlistController {
  
  static async getAllWishlists(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; 
      if(!id){
         res.status(400).json({ message: "User ID is required", status: "Error" });
      }
      const wishlists = await WishlistService.getAllWishlists(id);
     res.status(200).json({ wishlists, status: "Success" });
    } catch (error) {
     res.status(500).json({
        message: (error as Error).message,
        status: "Error",
      });
    }
  }

  static async postWishlist(req: Request, res: Response): Promise<void> {
    try {
      const { bookId, userId }: IWishlist = req.body;

      if (!bookId || !userId) {
        res.status(400).json({ error: "Missing required fields" });
      }

      const newWishlist = await WishlistService.createWishlist(req.body);
       res.status(201).json({ newWishlist, status: "Success" });
    } catch (error) {
       res.status(500).json({
        message: (error as Error).message,
        status: "Error",
      });
    }
  }

  static async deleteWishlist(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

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


