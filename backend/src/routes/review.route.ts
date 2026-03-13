import { Router } from "express";
import * as reviewController from "../controllers/review.controller";

const router = Router();

import { authCombinedMiddleware } from "../middlewares/combinedAuth.middleware";

router.post("/", authCombinedMiddleware, reviewController.createReview);
router.put("/:id", authCombinedMiddleware, reviewController.updateReview);
router.delete("/:id", authCombinedMiddleware, reviewController.deleteReview);
router.get("/", reviewController.getReviews);
export default router;