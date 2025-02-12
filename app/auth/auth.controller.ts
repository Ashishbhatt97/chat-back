import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import * as authService from "./auth.services";
import dotenv from "dotenv";

dotenv.config();

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "login",
    { session: false },
    (err: any, user: Express.User, info: { message: any }) => {
      if (err || !user) {
        return res
          .status(401)
          .json({ message: info?.message || "Login failed" });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return res.status(500).json({ message: "Server error" });

        const tokens = authService.createTokens(user);
        return res.json({ user, tokens });
      });
    }
  )(req, res, next);
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = authService.verifyRefreshToken(refreshToken) as {
      id: string;
    };
    const user = await authService.getUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const tokens = authService.createTokens({
      id: decoded.id,
      email: user.email,
    });
    return res.json(tokens);
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};
