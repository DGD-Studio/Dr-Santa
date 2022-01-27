import { EventHandlers } from "../../../deps.ts"
import { logger } from "../../utils/logger.ts"
import { setGuildLoadedEvent } from "./guildLoaded.ts"
import { setGuildMemberUpdateEvent } from "./guildMemberUpdate.ts"
import { setRawEvent } from "./raw.ts"
import { setReadyEvent } from "./ready.ts"

const log1 = logger({ name: "Santa Event Loader" })
const log2 = logger({ name: "Santa Events" })

export const eventData: { events: Partial<EventHandlers>, log: typeof log2, } = {
    events: {},
    log: log2,
}

export function registerEvents() {
    log1.info(`Loading and Registering Events`)
    setGuildLoadedEvent()
    setGuildMemberUpdateEvent()
    setRawEvent()
    setReadyEvent()
}