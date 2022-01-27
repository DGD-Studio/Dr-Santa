import { eventData } from "./mod.ts"
import { Bot, editBotStatus, ActivityTypes } from "../../../deps.ts"

export function setReadyEvent() {
    eventData.log.info(`Ready Event loaded`)
    return eventData.events.ready = (denobot: Bot, _payload) => {
        eventData.log.info(`Bot is online`)
        editBotStatus(denobot, {
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
}