import { deleteCache, getCache, setCache } from '../redis/interface';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from '../mongo/methods/Users';
import { IUser } from '../mongo/models/User';

export async function getUserHelper(userId: string): Promise<IUser | null> {
  const cacheKey = `user:${userId}`;

  // Check if the user exists in the cache
  const cachedUser: IUser | null = await getCache(cacheKey);

  if (cachedUser) {
    console.log('User found in cache');
    return cachedUser;
  }

  // If the user is not in the cache, fetch it from MongoDB
  const user = await getUserById(userId);

  if (user) {
    console.log('User fetched from MongoDB');
    // Update the cache with the user data
    setCache(cacheKey, user, 60 * 60); // Cache for 1 hour
    return user;
  }

  console.log('User not found');
  return null;
}

export async function createUserHelper(userData: Partial<IUser>): Promise<IUser | null> {
  const newUser = await createUser(userData);

  if (newUser) {
    console.log('User created');
    return newUser;
  }

  console.log('User creation failed');
  return null;
}

export async function updateUserHelper(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
  const updatedUser = await updateUser(userId, userData);

  if (updatedUser) {
    console.log('User updated');
    // Update the cache with the new user data
    const cacheKey = `user:${userId}`;
    setCache(cacheKey, updatedUser, 60 * 60); // Cache for 1 hour
    return updatedUser;
  }

  console.log('User update failed');
  return null;
}

export async function deleteUserHelper(userId: string): Promise<boolean> {
  const result = await deleteUser(userId);

  if (result) {
    console.log('User deleted');
    // Remove the user from the cache
    const cacheKey = `user:${userId}`;
    await deleteCache(cacheKey);
    return true;
  }

  console.log('User deletion failed');
  return false;
}
