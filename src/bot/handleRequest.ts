import { bot } from "./mod.ts"
import { EVENT_HANDLER_SECRET_KEY } from "../../config.ts"
import { GatewayPayload, SnakeCasedPropertiesDeep } from "../../deps.ts"
import log from "../utils/logger.ts"

export async function handleRequest(conn: Deno.Conn) {
    // This "upgrades" a network connection into an HTTP connection.
    const httpConn = Deno.serveHttp(conn);
    // Each request sent over the HTTP connection will be yielded as an async
    // iterator from the HTTP connection.
    for await (const requestEvent of httpConn) {
        if (
            !EVENT_HANDLER_SECRET_KEY ||
            EVENT_HANDLER_SECRET_KEY !==
            requestEvent.request.headers.get("AUTHORIZATION")
        ) {
            return requestEvent.respondWith(
                new Response(JSON.stringify({ error: "Invalid secret key." }), {
                    status: 401,
                }),
            );
        }

        if (requestEvent.request.method !== "POST") {
            return requestEvent.respondWith(
                new Response(JSON.stringify({ error: "Method not allowed." }), {
                    status: 405,
                }),
            );
        }

        const json = (await requestEvent.request.json()) as {
            data: SnakeCasedPropertiesDeep<GatewayPayload>;
            shardId: number;
        };

        bot.events.raw(bot, json.data, json.shardId);

        if (json.data.t && json.data.t !== "RESUMED") {
            log.debug(`Event: ${json.data.t} Recieved`)
            if (!["READY", "GUILD_LOADED_DD"].includes(json.data.t)) {
                await bot.events.dispatchRequirements(bot, json.data, json.shardId);
            }

            bot.handlers[json.data.t]?.(bot, json.data, json.shardId);
        }

        requestEvent.respondWith(
            new Response(undefined, {
                status: 204,
            }),
        );
    }
}