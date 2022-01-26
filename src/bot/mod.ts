import { BOT_TOKEN, BOT_ID, GATEWAY_INTENTS } from "../../config.ts"
import { createBot, startBot, enableCachePlugin, enableCacheSweepers } from "../../deps.ts"
import { rest } from "../utils/rest.ts"
import { eventData, registerEvents } from "./events/mod.ts"

await registerEvents()
export const bot = enableCachePlugin(createBot({
    token: BOT_TOKEN,
    botId: BOT_ID,
    applicationId: BOT_ID,
    intents: GATEWAY_INTENTS,
    events: eventData.events,
}))
bot.rest = rest
enableCacheSweepers(bot)
await startBot(bot)