import prisma from ".././common/services/database.service";
/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<any[]>} A promise that resolves to an array of user objects.
 */

export const getAllUsers = async (): Promise<any[]> => {
  const result = await prisma.user.findMany();
  return result;
};

/**
 * Retrieves a single user from the database by ID.
 *
 * @param {string} id The ID of the user to retrieve.
 *
 * @returns {Promise<any>} A promise that resolves to the user object if found,
 *  or rejects with an error if user not found.
 */
export const getUserById = async (id: string): Promise<any> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

/**
 * Checks if a user exists in the database by ID.
 *
 * @param {string} id - The ID of the user to check.
 * @returns {Promise<any>} A promise that resolves to the user object if found,
 * or null if not found.
 */

const existingUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

/**
 * Creates a new user in the database.
 *
 * @param {object} data - User data to be inserted. Must contain the following
 *  properties: email, name, password.
 *
 * @returns {Promise<any>} A promise that resolves to the inserted user object if
 *  successful, or rejects with an error if a user with the same email already
 *  exists.
 */
export const createUser = async (data: any) => {
  const userExist = await existingUser(data.email);

  if (userExist) {
    throw new Error("User already exists");
  }

  const result = await prisma.user.create({
    data,
  });
  return result;
};

/**
 * Updates an existing user in the database by ID.
 *
 * @param {string} id - The ID of the user to update.
 * @param {object} data - An object containing the fields to update. Must contain
 *  valid user properties.
 *
 * @returns {Promise<any>} A promise that resolves to the updated user object if
 *  successful, or rejects with an error if the user is not found.
 */

export const updateUser = async (id: string, data: any) => {
  const user = await existingUser(id);
  if (!user) {
    throw new Error("User not found");
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

/**
 * Deletes an existing user from the database by ID.
 *
 * @param {string} id - The ID of the user to delete.
 *
 * @returns {Promise<any>} A promise that resolves to the deleted user object if
 *  successful, or rejects with an error if the user is not found.
 */

export const deleteUser = async (id: string) => {
  const user = await existingUser(id);
  if (!user) {
    throw new Error("User not found");
  }

  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};
