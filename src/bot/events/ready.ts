import { eventData } from "./mod.ts"
import { Bot, editBotStatus, ActivityTypes } from "../../../deps.ts"

eventData.events.ready = (bot: Bot, _payload) => {
    eventData.log.info(`Bot is online`)
    editBotStatus(bot, {
        status: "dnd",
        activities: [
            {
                name: "Giveaways being creating",
                type: ActivityTypes.Watching,
                createdAt: Date.now()
            }
        ]
    })
}