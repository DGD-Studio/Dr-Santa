import { eventData } from "./mod.ts"
import { Bot, DiscordenoMember, DiscordenoUser } from "../../../deps.ts"
import { bot } from "../mod.ts"
import { fromMember } from "../../cache/models/member.ts"

export function setGuildMemberUpdateEvent() {
    eventData.log.info(`Guild Member Update Event loaded`)
    return eventData.events.guildMemberUpdate = async (_denobot: Bot, member: DiscordenoMember, user: DiscordenoUser) => {
        eventData.log.info(`Guild Member Update, Updating Cache`)
        const isInCache = await bot.redisCache.has("Member", user.id.toString())
        if (isInCache) {
            await bot.redisCache.delete("Member", user.id.toString())
        }

        const memberModel = fromMember({
            avatar: member.avatar?.toString(),
            communicationDisabledUntil: member.communicationDisabledUntil,
            deaf: member.deaf,
            joinedAt: member.joinedAt.toString(),
            mute: member.mute,
            nick: member.nick,
            pending: member.pending,
            permissions: member.permissions?.toString(),
            premiumSince: member.premiumSince?.toString(),
            roles: member.roles.map((id) => id.toString()),
            // @ts-ignore dumb
            user: { id: user.id.toString(), discriminator: user.discriminator.toString(), username: user.username, avatar: user.avatar?.toString() }
        })

        return bot.redisCache.set("Member", user.id.toString(), memberModel)
    }
}