import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.hepler";
createResponse;
import * as userService from "./user.service";

export const getAllUsers = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      res.json(createResponse(users, "Users fetched successfully"));
    } catch (error) {
      next(error);
    }
  }
);

export const getUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json(createResponse(user, "User fetched successfully"));
    } catch (error) {
      next(error);
    }
  }
);

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.createUser(req.body);

      res.json(createResponse(user, "User created successfully"));
    } catch (error) {
      next(error);
    }
  }
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(createResponse(user, "User updated successfully"));
    } catch (error) {
      next(error);
    }
  }
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.deleteUser(req.params.id);
      res.json(createResponse(null, "User deleted successfully"));
    } catch (error) {
      next(error);
    }
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.login(req.body);
      res.json(createResponse(user, "User logged in successfully"));
    } catch (error) {
      next(error);
    }
  }
);
