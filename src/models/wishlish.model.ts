import mongoose, { Document, Schema } from "mongoose";
import { IWishlist } from "../types/wishlist.interface";
const wishlistSchema = new Schema<IWishlist>({
    
    bookId: {
        type: String, 
        ref: "Book", 
        required: true, 
    }, 
    userId: {
        type: String, 
        ref: "User",
        required: true,
    }
})
const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
export default Wishlist;

