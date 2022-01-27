import { eventData } from "./mod.ts"
import { Bot, GatewayPayload } from "../../../deps.ts"
import { guildMembersChunkEventHandler } from "./rawEvents/GUILD_MEMBER_CHUNK.ts"

export function setRawEvent() {
    eventData.log.info(`Raw Event loaded`)
    return eventData.events.raw = async (_denobot: Bot, data: GatewayPayload, _shardId: number) => {

        if (data.t === "GUILD_MEMBERS_CHUNK") {
            await guildMembersChunkEventHandler(data);
        }
    }
}