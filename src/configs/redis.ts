import env from "@/data/env";
import Redis from "ioredis";

const client = new Redis(env.REDIS_URI);

export default client;
