import { EventHandlers } from "../../../deps.ts"
import { logger } from "../../utils/logger.ts"

const __dirname = new URL('.', import.meta.url).pathname.replace("/", "")
const log = logger({ name: "Santa Events" })

export const eventData: { events: Partial<EventHandlers>, log: typeof log, } = {
    events: {},
    log,
}

export async function applyEvents() {
    console.log(__dirname, Deno.cwd(), new URL('.', import.meta.url).pathname)
    for await (const dirEntry of Deno.readDir(__dirname)) {
        if (dirEntry.isFile && dirEntry.name != "mod.ts") {
            log.info(`Loading Event file: ${dirEntry.name}`)
            await import(`./${dirEntry.name}`)
        }
    }
}