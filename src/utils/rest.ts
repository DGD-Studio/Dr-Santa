import { createRestManager } from "../../deps.ts"
import { BOT_TOKEN, REST_AUTHORIZATION_KEY, REST_PORT, REST_HANDLER_URL } from "../../config.ts"
import { logger } from "./logger.ts"

const log = logger({ name: "Global Rest Manager" })

export const rest = createRestManager({
    token: BOT_TOKEN,
    secretKey: REST_AUTHORIZATION_KEY,
    customUrl: `${REST_HANDLER_URL}:${REST_PORT}`,
    debug: log.debug,
})