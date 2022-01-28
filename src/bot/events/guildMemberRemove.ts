import { eventData } from "./mod.ts"
import { Bot, DiscordenoUser } from "../../../deps.ts"
import { bot } from "../mod.ts"

export function setGuildMemberRemoveEvent() {
    return eventData.events.guildMemberRemove = async (_denobot: Bot, user: DiscordenoUser, guildId: bigint) => {
        if (await bot.redisCache.has("Member", `${user.id.toString()}:${guildId.toString()}`)) await bot.redisCache.delete("Member", `${user.id.toString()}:${guildId.toString()}`)
        return //maybe do smth
    }
}