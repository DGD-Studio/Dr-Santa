import { Bot } from "../../deps.ts"
import { BotWithRedisCache } from "./cache.ts"

export function extendBotWithCache(bot: Bot): BotWithRedisCache {
    const botWithRedisCache = bot as BotWithRedisCache
    botWithRedisCache.redisCache = null
    return botWithRedisCache
}