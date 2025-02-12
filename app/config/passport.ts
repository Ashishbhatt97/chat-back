import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as userService from "../users/user.service"; // Adjust path based on your structure
import dotenv from "dotenv";

dotenv.config();

export const initPassport = () => {
  // Local Strategy for login
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await userService.getUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Invalid email or password" });
          }

          const { password: _p, ...userData } = user;
          return done(null, userData);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // JWT Strategy for protected routes
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: process.env.JWT_SECRET || "your_jwt_secret",
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (jwtPayload, done) => {
        try {
          const user = await userService.getUserById(jwtPayload.id);
          if (!user) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
