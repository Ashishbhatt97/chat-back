import { Request, Response, NextFunction } from "express";
import passport from "passport";
import prisma from "../services/database.service";

export const authenticateUser = passport.authenticate("jwt", {
  session: false,
});

/**
 * Checks if a user is an admin of a given group.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The Express next function.
 * @returns Nothing.
 */
export const checkGroupAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req.user as { id: string }).id;
  const groupId = req.params.groupId;

  const userGroup = await prisma.groupUser.findFirst({
    where: { userId, groupId, role: "ADMIN" },
  });

  if (!userGroup)
    return res
      .status(403)
      .json({ message: "Only admins can perform this action" });

  next();
};

// Middleware to protect routes using JWT
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  interface AuthenticatedRequest extends Request {
    user?: {
      id: string;
    };
  }

  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    (req as AuthenticatedRequest).user = user;
    next();
  })(req, res, next);
};
