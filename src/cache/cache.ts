import { Bot, redisConnect, Bulk } from "../../deps.ts"
import { logger } from "../utils/logger.ts"
import { Model } from "./models/base.ts"
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
redis.flushall()

export const MemberIds: Set<string> = new Set()
export const GuildIds: Set<string> = new Set()

export function createRedisCache() {
    const handleInAppSetCache = (table: string, key: string, del: boolean) => {
        const set = table === "Guild" ? GuildIds : MemberIds
        if (set.has(key) && del) return set.delete(key)
        else return set.add(key)
    }

    return {
        get: async (table: tableTypes, key: string) => {
            return await redis.get(`${table}:${key}`)
        },
        set: async (table: tableTypes, key: string, data: Model) => {
            handleInAppSetCache(table, key, false)
            const toStore = JSON.stringify(data)
            return await redis.set(`${table}:${key}`, toStore)
        },
        delete: async (table: tableTypes, key: string) => {
            handleInAppSetCache(table, key, true)
            return await redis.del(`${table}:${key}`)
        },
        setMany: async (data: Record<string, string>) => {
            Object.keys(data).map((d) => handleInAppSetCache(d.split(":")[0], d.split(":")[1], false))
            return await redis.mset(data)
        },
        has: async (table: tableTypes, key: string) => {
            return (await redis.exists(`${table}:${key}`) > 0)
        }
    }
}

interface RedisCache {
    get: (table: tableTypes, key: string) => Promise<Bulk>;
    set: (table: tableTypes, key: string, data: Model) => Promise<string>;
    delete: (table: tableTypes, key: string) => Promise<number>;
    setMany: (data: Record<string, string>) => Promise<string>;
    has: (table: tableTypes, key: string) => Promise<boolean>;
}

type tableTypes = "Guild" | "User" | "Member"