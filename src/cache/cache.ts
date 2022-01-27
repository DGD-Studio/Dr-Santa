import { Bot, redisConnect, Bulk } from "../../deps.ts"
import { logger } from "../utils/logger.ts"
import { Entity } from "./entities/base.ts"
const log = logger({ name: "Cache" })
export type BotWithRedisCache = Bot & RedisCacheBot

export interface RedisCacheBot extends Bot {
    redisCache: RedisCache;
}

const redis = await redisConnect({
    port: 6379,
    hostname: Deno.env.get("REDIS_HOSTNAME") as string,
    password: "verysecretpassword69420"
})
log.info(`Connected to Redis`)

export function createRedisCache() {

    return {
        get: async (table: tableTypes, key: string) => {
            return await redis.get(`${table}:${key}`)
        },
        set: async (table: tableTypes, key: string, data: Entity) => {
            const toStore = JSON.stringify(data)
            return await redis.set(`${table}:${key}`, toStore)
        },
        delete: async (table: tableTypes, key: string) => {
            return await redis.del(`${table}:${key}`)
        }
    }
}

interface RedisCache {
    get: (table: tableTypes, key: string) => Promise<Bulk>;
    set: (table: tableTypes, key: string, data: Entity) => Promise<string>;
    delete: (table: tableTypes, key: string) => Promise<number>;
}

type tableTypes = "Guild" | "User" | "Member"