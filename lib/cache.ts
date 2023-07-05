import { redis } from "./redis";

const fetchCache = async<T>(key: string, fetchFunction: () => Promise<T>, expires: number) => {
  if(!isRedisConfigured()) return await fetchFunction();

  const existingData = await checkIfDataIsCached<T>(key);

  if(existingData !== null) return existingData;

  return setDataToCache(key, fetchFunction, expires);
}

const checkIfDataIsCached = async<T>(key: string): Promise<T | null> => {
  if(!isRedisConfigured()) return null;

  //@ts-ignore
  const stringifiedData = await redis.get(key);
  if(stringifiedData === null) return null;

  return JSON.parse(stringifiedData);
}

const setDataToCache = async<T>(key: string, fetchFunction: () => T, expires: number) => {
  if(!isRedisConfigured()) return await fetchFunction();

  const data = await fetchFunction();

  //@ts-ignore
  await redis.set(key, JSON.stringify(data), "EX", expires);
  return data;
}

const isRedisConfigured = () => {
  return redis != null;
}

export default { fetchCache, checkIfDataIsCached, setDataToCache }