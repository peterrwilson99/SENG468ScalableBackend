import user, { IUser } from "../models/User";

export async function createUser(userData: Partial<IUser>): Promise<IUser | null> {
  try {
    const userObj = new user(userData);
    await userObj.save();
    return userObj;
  } catch (error) {
    console.error(`Error creating user in MongoDB: ${error}`);
    return null;
  }
}

export async function getUserById(userId: string): Promise<IUser | null> {
  try {
    const userObj = await user.findById(userId);
    return userObj;
  } catch (error) {
    console.error(`Error fetching user from MongoDB: ${error}`);
    return null;
  }
}

export async function updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
  try {
    const userObj = await user.findByIdAndUpdate(userId, userData, { new: true });
    return userObj;
  } catch (error) {
    console.error(`Error updating user in MongoDB: ${error}`);
    return null;
  }
}

export async function deleteUser(userId: string): Promise<boolean> {
  try {
    await user.findByIdAndDelete(userId);
    return true;
  } catch (error) {
    console.error(`Error deleting user from MongoDB: ${error}`);
    return false;
  }
}

export async function getUsers(): Promise<IUser[] | null> {
  try {
    const userObjects = await user.find();
    return userObjects;
  } catch (error) {
    console.error(`Error getting users from MongoDB: ${error}`);
    return null;
  }
}

