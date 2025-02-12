import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as groupService from "./group.services";
import createError from "http-errors";

// ✅ Create a new group
export const create = asyncHandler(async (req: Request, res: Response) => {
  const { name, privacy } = req.body;
  const userId = req.user?.id;

  if (!userId) throw createError(401, "Unauthorized");
  if (!name) throw createError(400, "Group name is required");
  if (!privacy || !["PUBLIC", "PRIVATE"].includes(privacy)) {
    throw createError(400, "Invalid privacy type. Choose PUBLIC or PRIVATE");
  }

  // Check if group already exists
  const existingGroup = await groupService.getGroupByName(name);
  if (existingGroup) throw createError(409, "Group already exists");

  const group = await groupService.createGroup(userId, { name, privacy });
  res.status(201).json(group);
});

// ✅ Get all groups
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const groups = await groupService.getAllGroups();
  res.status(200).json(groups);
});

// ✅ Get a group by ID
export const getById = asyncHandler(async (req: Request, res: Response) => {
  const group = await groupService.getGroupById(req.params.id);
  if (!group) throw createError(404, "Group not found");

  res.status(200).json(group);
});

// ✅ Update a group
export const update = asyncHandler(async (req: Request, res: Response) => {
  const { name, privacy } = req.body;
  const groupId = req.params.id;

  const existingGroup = await groupService.getGroupById(groupId);
  if (!existingGroup) throw createError(404, "Group not found");

  const updatedGroup = await groupService.updateGroup(groupId, {
    name,
    privacy,
  });
  res.status(200).json(updatedGroup);
});

// ✅ Delete a group
export const remove = asyncHandler(async (req: Request, res: Response) => {
  const groupId = req.params.id;

  const existingGroup = await groupService.getGroupById(groupId);
  if (!existingGroup) throw createError(404, "Group not found");

  await groupService.deleteGroup(groupId);
  res.status(200).json({ message: "Group deleted successfully" });
});
