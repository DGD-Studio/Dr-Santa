import { GatewayPayload, GatewayManager } from "../../deps.ts"
import { EVENT_HANDLER_PORT, EVENT_HANDLER_URL } from "../../config.ts"

export async function handleDiscordPayload(gateway: GatewayManager, data: GatewayPayload, shardId: number) {
    if (!data.t) return;

    await fetch(`${EVENT_HANDLER_URL}:${EVENT_HANDLER_PORT}`, {
        headers: {
            Authorization: gateway.secretKey,
        },
        method: "POST",
        body: JSON.stringify({
            shardId,
            data,
        }),
    })
        // BELOW IS FOR DENO MEMORY LEAK
        .then((res) => console.log(res.text()))
        .catch(() => null);
}