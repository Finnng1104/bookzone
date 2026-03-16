import Wishlist from "../models/wishlist.model"; // Sửa chính tả: "wishlish" thành "wishlist"
import { IWishlist } from "../types/wishlist.interface";

export class WishlistService {
  async getAllWishlists(id?: unknown): Promise<IWishlist[]> {
    try {
      const wishlists = await Wishlist.find({ userId: id });
      return wishlists;
    } catch (error) {
      throw new Error("Error fetching wishlists: " + (error as Error).message);
    }
  }

  // Tạo wishlist mới
  async createWishlist(wishlist: IWishlist): Promise<IWishlist> {
    try {
      let existingWishlist = await Wishlist.findOne({
        bookId: wishlist.bookId,
        userId: wishlist.userId,
      });
      if (existingWishlist) {
        throw new Error("Sản phẩm đã có trong danh sách yêu thích.");
      }
      const newWishlist = new Wishlist(wishlist);
      await newWishlist.save();

      return newWishlist;
    } catch (error) {
      throw new Error((error as Error).message);
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
