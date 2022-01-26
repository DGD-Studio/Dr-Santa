import { rest } from "../utils/rest.ts"
import { endpoints, createGatewayManager } from "../../deps.ts"
import { BOT_TOKEN, GATEWAY_INTENTS, EVENT_HANDLER_SECRET_KEY } from "../../config.ts"
import { handleDiscordPayload } from "./handleDiscordPayload.ts"
import log from "../utils/logger.ts"

const result = await rest.runMethod(rest, "get", endpoints.GATEWAY_BOT).then((
    res,
) => ({
    url: res.url,
    shards: res.shards,
    sessionStartLimit: {
        total: res.session_start_limit.total,
        remaining: res.session_start_limit.remaining,
        resetAfter: res.session_start_limit.reset_after,
        maxConcurrency: res.session_start_limit.max_concurrency,
    },
}));

const gateway = createGatewayManager({
    debug: log.debug,
    secretKey: EVENT_HANDLER_SECRET_KEY,
    token: BOT_TOKEN,
    intents: GATEWAY_INTENTS,
    shardsRecommended: result.shards,
    sessionStartLimitTotal: result.sessionStartLimit.total,
    sessionStartLimitRemaining: result.sessionStartLimit.remaining,
    sessionStartLimitResetAfter: result.sessionStartLimit.resetAfter,
    maxConcurrency: result.sessionStartLimit.maxConcurrency,
    maxShards: result.shards,
    lastShardId: result.shards,
    handleDiscordPayload,
});

log.info(`Gateway is live.`)
gateway.spawnShards(gateway);