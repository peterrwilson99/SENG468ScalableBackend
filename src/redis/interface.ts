import { redisClient } from './cache';

export async function setCache(key: string, value: any, expiration?: number): Promise<void> {
  const stringValue = JSON.stringify(value);
  if (expiration) {
    await redisClient.set(key, stringValue, { "EX" : expiration} );
  } else {
    await redisClient.set(key, stringValue);
  }
}

export async function getCache(key: string): Promise<any> {
  const stringValue = await redisClient.get(key);
  return stringValue ? JSON.parse(stringValue) : null;
}

export async function deleteCache(key: string): Promise<void> {
  await redisClient.del(key);
}

export async function existsCache(key: string): Promise<boolean> {
  const exists = await redisClient.exists(key);
  return exists === 1;
}