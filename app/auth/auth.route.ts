import express from "express";
import { authenticateJWT } from "../common/middleware/auth-middleware";
import { login, refreshToken } from "./auth.controller";
import { userValidation } from "../users/user.validation";
const router = express.Router();

router.post("/login", userValidation.login, login);

// router.post("/refresh-token", refreshToken);

router.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

export default router;
