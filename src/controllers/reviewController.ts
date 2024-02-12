import { Request, Response } from "express";
import Review from "../models/reviewModel";
import { get, post, patch, del, controller } from "../decorators";

@controller("/api/v1")
export class ReviewController {
  @get("/reviews")
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
  @post("/reviews")
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
  @del("/reviews")
  async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      await Review.findOneAndDelete({ contentId: req.query.contentId });

      res.status(204).end();
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }
}
