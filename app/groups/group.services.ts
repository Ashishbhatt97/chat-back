import prisma from "../common/services/database.service"; // Import Prisma Client

// ✅ Create a new group
export const createGroup = async (
  userId: string,
  data: { name: string; privacy: string }
) => {
  return await prisma.group.create({
    data: {
      name: data.name,
      privacy: data.privacy as "PUBLIC" | "PRIVATE",
      inviteLink: generateInviteLink(),
      users: { create: { userId, role: "ADMIN" } }, // Auto-assign creator as ADMIN
    },
  });
};

// ✅ Generate a unique invite link
const generateInviteLink = () => {
  return `https://app.com/invite/${crypto.randomUUID()}`;
};

// ✅ Check if group already exists by name
export const getGroupByName = async (name: string) => {
  return await prisma.group.findUnique({
    where: { name },
  });
};

// ✅ Get all groups
export const getAllGroups = async () => {
  return await prisma.group.findMany({
    include: { users: true, messages: true },
  });
};

// ✅ Get a single group by ID
export const getGroupById = async (id: string) => {
  return await prisma.group.findUnique({
    where: { id },
    include: { users: true, messages: true },
  });
};

// ✅ Update a group
export const updateGroup = async (
  id: string,
  data: { name?: string; privacy?: string }
) => {
  return await prisma.group.update({
    where: { id },
    data: {
      ...data,
      privacy: data.privacy as "PUBLIC" | "PRIVATE",
    },
  });
};

// ✅ Delete a group
export const deleteGroup = async (id: string) => {
  return await prisma.group.delete({
    where: { id },
  });
};
