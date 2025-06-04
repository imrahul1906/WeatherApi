import dotenv from "dotenv"
dotenv.config()

export const redisConfig = () => {
    const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
    console.log(`redis url is  : ${url}`);
    return {
        url
    }
}