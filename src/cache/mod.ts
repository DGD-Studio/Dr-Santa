import { Bot } from "../../deps.ts"
import { BotWithRedisCache, createRedisCache } from "./cache.ts"

export function extendBotWithCache(bot: Bot): BotWithRedisCache {
    const botWithRedisCache = bot as BotWithRedisCache
    botWithRedisCache.redisCache = createRedisCache()
    return botWithRedisCache
}