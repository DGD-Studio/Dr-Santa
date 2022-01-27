import { BOT_TOKEN, BOT_ID, GATEWAY_INTENTS } from "../../config.ts"
import { createBot, startBot, } from "../../deps.ts"
import { rest } from "../utils/rest.ts"
import { eventData, registerEvents } from "./events/mod.ts"
import { extendBotWithCache } from "../cache/mod.ts"

await registerEvents()
export const bot = extendBotWithCache(createBot({
    token: BOT_TOKEN,
    botId: BOT_ID,
    applicationId: BOT_ID,
    intents: GATEWAY_INTENTS,
    events: eventData.events,
}))
bot.rest = rest

await startBot(bot)