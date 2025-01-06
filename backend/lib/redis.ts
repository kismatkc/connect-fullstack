import RedisConstructor from "ioredis";
//@ts-ignore
export const Redis: RedisConstructor.Redis = new RedisConstructor(
  "rediss://default:Ab7bAAIjcDFlNTg4MzVlOTk2ZTM0MjIzOWExNjE2MWIyZGE4NTczZHAxMA@profound-orca-48859.upstash.io:6379"
);
