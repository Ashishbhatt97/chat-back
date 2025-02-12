import express from "express";
import userRoutes from "./users/user.routes";

// routes
const router = express.Router();

router.use("/users", userRoutes);
// router.use("/api/auth", authRoutes);
// router.use("/api/groups", groupRoutes);

export default router;
