import { Router } from "express";
import * as userController from "./user.controller";
import { userValidation } from "./user.validation";
const router = Router();

router
  .get("/", userController.getAllUsers)
  .post("/", userValidation.register, userController.createUser)
  .get("/:id", userController.getUserById)
  .put("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser)
  .post("/login", userValidation.login, userController.login);

export default router;
