import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/review.service";

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, slug, rating, comment } = req.body;

    if (!slug) {
      res.status(400).json({ success: false, message: "Slug is required" });
      return;
    }

    const newReview = await reviewService.createReview({
      userId,
      slug,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug, page = 1, limit = 5 } = req.query;

    if (!slug) {
      res.status(400).json({ success: false, message: "Slug is required" });
      return;
    }

    const result = await reviewService.getReviewsBySlug(
      slug as string,
      Number(page),
      Number(limit)
    );

    res.json({ success: true, ...result });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!rating && !comment) {
      res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp rating hoặc comment để cập nhật.",
      });
      return;
    }

    const updated = await reviewService.updateReview(id, { rating, comment });

    if (!updated) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy review để cập nhật.",
      });
      return;
    }

    res.json({
      success: true,
      message: "Cập nhật review thành công",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deleted = await reviewService.deleteReview(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy review để xoá.",
      });
      return;
    }

    res.json({ success: true, message: "Đã xoá review thành công." });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};