import { body, param } from "express-validator";

export const groupValidation = {
  createGroup: [
    body("name")
      .isString()
      .withMessage("Group name must be a string")
      .isLength({ min: 3 })
      .withMessage("Group name must be at least 3 characters long"),

    body("privacy")
      .isIn(["PUBLIC", "PRIVATE"])
      .withMessage("Privacy must be either PUBLIC or PRIVATE"),

    body("inviteLink").isString().withMessage("Invite link must be a string"),
  ],

  groupIdParam: [
    param("groupId").isUUID().withMessage("Invalid group ID format"),
  ],
};
