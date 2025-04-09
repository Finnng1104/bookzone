import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/book.routes';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import wishlistRoutes from './routes/wishlist.routes';
import cookieParser from 'cookie-parser';
  import reviewRoutes from './routes/review.route';
const app = express();
app.use(cookieParser());
dotenv.config();
connectDB();
app.use(cors({
  origin: ['https://bookzone-black.vercel.app/', 'bookzone.io.vn', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});