import { Request, Response } from "express";
import Review from "../models/reviewModel";

export class ReviewController {
  async getReviewsByMovie(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await Review.find({
        contentId: req.query.contentId,
      }).sort({ timestamp: "asc" });

      res.status(200).json({
        status: "success",
        count: reviews.length,
        data: {
          reviews,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }

  async postReview(req: Request, res: Response): Promise<void> {
    try {
      const newReview = await Review.create(req.body);

      res.status(201).json({
        status: "success",
        data: {
          review: newReview,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  }

  async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      await Review.findOneAndDelete({ id: req.query.id });

      res.status(204);
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }
}
