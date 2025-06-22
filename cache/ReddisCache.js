import redis from "redis"
import { redisConfig } from "../config/RedisConfig.js";

export class ReddisCache {
    constructor() {
        const config = redisConfig();
        this.redisClient = redis.createClient(config);
        this.redisClient.on('error', (error) => {
            console.log(`problem in connecting with redis : ${error}`);
        })
    }

    async connect() {
        await this.redisClient.connect();
        console.log("✅ Connected to Redis");
    }

    set(key, value) {
        this.redisClient.set(key, value);
    }

    get(key) {
        return this.redisClient.get(key);
    }
}