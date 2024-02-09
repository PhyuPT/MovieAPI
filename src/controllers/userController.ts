import { type ExpressFunction } from './../types/expressFunction.d'
import { Request, Response } from 'express';
import User from '../models/userModel'

export class UserController {
    // GET /users
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

    // GET /users/:id
    public async getfavMoviesbyUserID(req: Request, res: Response): Promise<void> {
      try {
        const userId = req.params.id;
        const user = await User.findById(userId);
  
        if (!user) {
          res.status(404).json({
            status: "fail",
            message: "User not found",
          });
          return;
        }
  
        const favoriteMoviesIds: number[] = user.favouriteContent; // Retrieve the favorite movies IDs array
  
        res.status(200).json({
          status: "success",
          data: {
            favoriteMoviesIds, // Send the favorite movies IDs array in the response
          },
        });
      } catch (err) {
        res.status(500).json({
          status: "fail",
          message: "Server error",
        });
      }
    }
 }