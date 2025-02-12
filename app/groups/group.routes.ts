import express from "express";
import * as groupController from "./group.controller";
import passport from "passport";

const router = express.Router();

// Require authentication for all group routes
router.use(passport.authenticate("jwt", { session: false }));

router.post("/", groupController.create);
router.get("/", groupController.getAll);
router.get("/:id", groupController.getById);
router.put("/:id", groupController.update);
router.delete("/:id", groupController.remove);

export default router;
