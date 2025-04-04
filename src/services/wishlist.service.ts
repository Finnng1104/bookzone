import Wishlist from "../models/wishlish.model"; // Sửa chính tả: "wishlish" thành "wishlist"
import { IWishlist } from "../types/wishlist.interface";

export class WishlistService {
  // Lấy tất cả wishlist
  async getAllWishlists(): Promise<IWishlist[]> {
    try {
      const wishlists = await Wishlist.find();
      return wishlists;
    } catch (error) {
      throw new Error("Error fetching wishlists: " + (error as Error).message);
    }
  }

  // Tạo wishlist mới
  async createWishlist(wishlist: IWishlist): Promise<IWishlist> {
    try {
      const newWishlist = new Wishlist(wishlist);
      await newWishlist.save();
      return newWishlist;
    } catch (error) {
      throw new Error("Error creating wishlist: " + (error as Error).message);
    }
  }

  // Xóa wishlist
  async deleteWishlist(id: string): Promise<IWishlist | null> {
    try {
      const deletedWishlist = await Wishlist.findByIdAndDelete(id);
      return deletedWishlist;
    } catch (error) {
      throw new Error("Error deleting wishlist: " + (error as Error).message);
    }
  }
}

export default new WishlistService();
