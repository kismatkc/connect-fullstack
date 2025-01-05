import Redis from "ioredis";
//@ts-ignore
const client = new Redis(
  "rediss://default:********@profound-orca-48859.upstash.io:6379"
);
