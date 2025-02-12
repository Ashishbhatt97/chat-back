import express from "express";
import userRoutes from "./users/user.routes";
import authRoutes from "./auth/auth.route";

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
// router.use("/api/groups", groupRoutes);

export default router;
