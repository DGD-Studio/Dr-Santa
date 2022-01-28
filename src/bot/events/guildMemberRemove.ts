import { eventData } from "./mod.ts"
import { Bot, DiscordenoUser } from "../../../deps.ts"
import { bot } from "../mod.ts"

export function setGuildMemberRemoveEvent() {
    eventData.log.info(`GUildMemberRemove Event loaded`)
    return eventData.events.guildMemberRemove = async (_denobot: Bot, user: DiscordenoUser, guildId: bigint) => {
        eventData.log.info(`Member Removed, Removing from cache`)
        if (await bot.redisCache.has("Member", `${user.id.toString()}:${guildId.toString()}`)) await bot.redisCache.delete("Member", `${user.id.toString()}:${guildId.toString()}`)
        return //maybe do smth
    }
}