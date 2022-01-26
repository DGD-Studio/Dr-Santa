import { BOT_TOKEN, BOT_ID, GATEWAY_INTENTS, EVENT_HANDLER_PORT } from "../../config.ts"
import { createBot, startBot, ActivityTypes } from "../../deps.ts"
import { rest } from "../utils/rest.ts"
import log from "../utils/logger.ts"
import { handleRequest } from "./handleRequest.ts"

export const bot = createBot({
    token: BOT_TOKEN,
    botId: BOT_ID,
    applicationId: BOT_ID,
    intents: GATEWAY_INTENTS,
    events: {
        ready: (bot, _payload) => {
            log.info(`Bot is now online`)
        }
    },
})

bot.rest = rest
bot.gateway.presence = {
    status: "dnd",
    activities: [
        {
            name: "Giveaways",
            type: ActivityTypes.Watching,
            createdAt: Date.now()
        }
    ]
}

const server = Deno.listen({ port: EVENT_HANDLER_PORT });
log.info(
    `HTTP webserver running.  Access it at:  http://localhost:${EVENT_HANDLER_PORT}/`,
);
for await (const conn of server) {
    // In order to not be blocking, we need to handle each connection individually
    // in its own async function.
    handleRequest(conn);
}
startBot(bot)