import { createRestManager } from "../../deps.ts"
import { BOT_TOKEN, REST_AUTHORIZATION_KEY, REST_PORT } from "../../config.ts"
import log from "./logger.ts"

export const rest = createRestManager({
    token: BOT_TOKEN,
    secretKey: REST_AUTHORIZATION_KEY,
    customUrl: `http://localhost:${REST_PORT}`,
    debug: log.debug,
})