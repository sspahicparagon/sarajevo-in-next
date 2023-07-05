import Redis from 'ioredis';

var redis: Redis | null = null;

if(process.env.REDIS_URL !== undefined) redis = new Redis(process.env.REDIS_URL);

export { redis };