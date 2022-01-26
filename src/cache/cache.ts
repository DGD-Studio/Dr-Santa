import { Bot, redisConnect, RedisValue } from "../../deps.ts"

export type BotWithRedisCache = Bot & RedisCache

export interface RedisCache extends Bot {
    redisCache: null;
}

const redis = await redisConnect({
    port: 6379,
    hostname: Deno.env.get("REDIS_HOSTNAME") as string
})

export function createRedisCache() {

    return {
        get: async (table: string, key: string) => {
            return await redis.get(`${table}:${key}`)
        },
        set: async (table: string, key: string, data: RedisValue) => {
            return await redis.set(`${table}:${key}`, data)
        },
        delete: async (table: string, key: string) => {
            return await redis.del(`${table}:${key}`)
        }
    }
}