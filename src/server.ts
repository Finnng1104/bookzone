import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import bookRoutes from './routes/book.routes';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import wishlistRoutes from './routes/wishlist.routes';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});