import { redis } from "./redis";

type Parameter<T> = T extends (...args: infer T) => Promise<any> ? Promise<T> : never;

function call<T, U extends unknown[]>(key: string, fn: (...args: U) => Promise<T>, expires: number, ...args: U): Promise<T> {
  return fn(...args);
}

const fetchCache = async<T, U extends unknown[]>(key: string, fn: (...args: U) => Promise<T>, expires: number, ...args: U): Promise<T> => {
  if(!isRedisConfigured()) return await fn(...args);

  const existingData = await checkIfDataIsCached<T>(key);

  if(existingData !== null) return existingData;

  return setDataToCache(key, fn, expires, ...args);
};

const checkIfDataIsCached = async<T>(key: string): Promise<T | null> => {
  if(!isRedisConfigured()) return null;

  //@ts-ignore
  const stringifiedData = await redis.get(key);
  if(stringifiedData === null) return null;

  return JSON.parse(stringifiedData);
}

const setDataToCache = async<T, P extends unknown[]>(key: string, fetchFunction: (...args: P) => T, expires: number, ...args: P): Promise<T> => {
  if(!isRedisConfigured()) return await fetchFunction(...args);

  const data = await fetchFunction(...args);

  //@ts-ignore
  await redis.set(key, JSON.stringify(data), "EX", expires);
  return data;
}

const isRedisConfigured = () => {
  return redis != null;
}

export default { fetchCache, checkIfDataIsCached, setDataToCache }