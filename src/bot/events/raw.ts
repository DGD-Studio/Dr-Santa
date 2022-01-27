import { eventData } from "./mod.ts"
import { Bot, GatewayPayload } from "../../../deps.ts"
import { guildMembersChunkEventHandler } from "./rawEvents/GUILD_MEMBER_CHUNK.ts"

export function setRawEvent() {
    return eventData.events.raw = async (_denobot: Bot, data: GatewayPayload, _shardId: number) => {
        eventData.log.info(`Recieved event: ${data.t}`)

        if (data.t === "GUILD_MEMBERS_CHUNK") {
            await guildMembersChunkEventHandler(data);
        }
    }
}