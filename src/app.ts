import express from "express";

import "./controllers";
import { AppRouter } from "./singletons/AppRouter";
import passport from "passport";
import session from 'express-session'
import authRoutes from './config/strategies/authRoutes'

const app = express();
app.use(express.json())

app.use(passport.initialize())
app.use(
  session({
    //@ts-ignore
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000 * 24, // 1 hour * 24 = 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
    // store: MongoStore.create({
    //   mongoUrl: dbConnectionURL(),
    //   collectionName: 'sessions',
    // }),
  }),
)
app.use(passport.session())

// Use the auth routes
app.use('/api/v1', authRoutes)

app.use(AppRouter.getInstance());

export default app;
