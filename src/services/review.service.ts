import Review from "../models/review.model";
import Book from "../models/book.model";

interface CreateReviewDto {
  userId: string;
  slug: string;
  rating: number;
  comment: string;
}

export const createReview = async (data: CreateReviewDto) => {
  const book = await Book.findOne({ slug: data.slug });
  if (!book) {
    throw new Error("Book not found");
  }

  const review = new Review({
    userId: data.userId,
    bookId: book._id,
    rating: data.rating,
    comment: data.comment,
  });

  return await review.save();
};

export const getReviewsBySlug = async (slug: string, page: number = 1, limit: number = 5) => {
  const skip = (page - 1) * limit;

  const book = await Book.findOne({ slug });
  if (!book) {
    throw new Error("Book not found");
  }

  const [reviews, total] = await Promise.all([
    Review.find({ bookId: book._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Review.countDocuments({ bookId: book._id }),
  ]);

  return {
    reviews,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateReview = async (
  reviewId: string,
  data: Partial<{ rating: number; comment: string }>
) => {
  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    { $set: data },
    { new: true }
  );

  return updatedReview;
};

export const deleteReview = async (reviewId: string) => {
  const deletedReview = await Review.findByIdAndDelete(reviewId);
  return deletedReview;
};