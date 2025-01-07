import RedisConstructor from "ioredis";
//@ts-ignore
export const Redis: RedisConstructor.Redis = new RedisConstructor(
  "rediss://default:AdM0AAIjcDE4ZWViMWRiMTU3MTY0NmQ2OWY0OGIwNGU1MGMwM2IwZXAxMA@right-porpoise-54068.upstash.io:6379"
);
