import { get, post, patch, del, controller } from "../decorators";
import { Request, Response } from "express";
import User from "../models/userModel";

@controller("/api/v1")
export class UserController {
  @get("/users")
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find(); // Use your User model to fetch users
      res.status(200).json({
        status: "success",
        count: users.length,
        data: {
          users,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }

  @get("/users/favs")
  public async getfavMoviesbyUserID(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const user = await User.findById(req.query.userId);
      const favoriteMoviesIds = user?.favouriteContent; // Retrieve the favorite movies IDs array
      res.status(200).json({
        status: "success",
        data: {
          favoriteMoviesIds, // Send the favorite movies IDs array in the response
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }

  @post("/users")
  public async addNewuser(req: Request, res: Response) {
    try {
      const newUser = await User.create(req.body);

      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  }

  @patch("/users/addFav") //update favourite movies
  public async addFav(req: Request, res: Response) {
    try {
      const user = await User.findById(req.query.userId);
      let favoriteMovies = user?.favouriteContent;
      if (favoriteMovies?.indexOf(req.body.contentId) == -1) {
        favoriteMovies.push(req.body.contentId);
      }
      await user?.updateOne({ favouriteContent: favoriteMovies });

      res.status(200).json({
        status: "success",
        data: {
          favoriteContent: favoriteMovies
        }
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  }

  @patch("/users/dropFav")
  public async dropFav(req: Request, res: Response) {
    try {
      const user = await User.findById(req.query.userId);
      let favoriteMovies = user?.favouriteContent;
      if (favoriteMovies?.indexOf(req.body.contentId) != -1) {
        favoriteMovies?.splice(favoriteMovies.indexOf(req.body.contentId),1)
      }
      await user?.updateOne({ favouriteContent: favoriteMovies });
      
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  }
}
