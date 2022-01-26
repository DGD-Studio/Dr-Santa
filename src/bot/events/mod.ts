import { EventHandlers } from "../../../deps.ts"
import { logger } from "../../utils/logger.ts"

const log1 = logger({ name: "Santa Event Loader" })
const log2 = logger({ name: "Santa Events" })

export const eventData: { events: Partial<EventHandlers>, log: typeof log2, } = {
    events: {},
    log: log2,
}

export async function registerEvents() {
    log1.info(`Loading and Registering Events`)
    for await (const dirEntry of Deno.readDir("./src/bot/events")) {
        if (dirEntry.isFile && dirEntry.name != "mod.ts") {
            log1.info(`Loading Event file: ${dirEntry.name}`)
            await import(`./${dirEntry.name}`)
            log1.info(`Done loading: ${dirEntry.name}`)
        }
    }
}