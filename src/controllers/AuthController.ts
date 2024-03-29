import passport from 'passport'
import { NextFunction, Request, Response } from 'express'

import User from '../models/userModel'
import { post, controller, use } from '../decorators'
import { validateRequest } from '../middleware/validateRequest'
import {
  registerSchema,
  loginSchema,
} from '../models/validation/authValidationSchemas'
import { IUser } from '../types/user'

@controller('/api/v1')
class AuthController {
  @post('/signup')
  @use(validateRequest({ body: registerSchema }))
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      })

      console.log('New user:', newUser)

      //@ts-ignore
      newUser.password = undefined

      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      })
    } catch (error: any) {
      res.status(400).json({
        status: 'fail',
        message: error.message,
      })
    }
  }

  @post('/login')
  @use(validateRequest({ body: loginSchema }))
  login(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate(
      'local',
      (err: Error, user: IUser, info: { message?: string }) => {
        if (err) return next(err)
        if (!user) {
          console.log('Authentication failed:', info)
          return res.status(400).json({ message: info.message })
        }

        req.login(user, (err) => {
          if (err) return next(err)
 //@ts-ignore
          user.password = undefined

          return res.status(200).json({
            message: 'Successfully logged in',
            user,
          })
        })
      },
    )(req, res, next)
  }
  @post('/logout')
  logout(req: Request, res: Response, next: NextFunction): void {
     //@ts-ignore
    req.session.destroy(function () {
      res.clearCookie('connect.sid')
      res
        .status(200)
        .json({ message: 'Successfully logged out and session destroyed' })
    })
  }
}
