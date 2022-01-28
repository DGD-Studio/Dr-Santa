import { eventData } from "./mod.ts"
import { Bot, DiscordenoMember, DiscordenoUser } from "../../../deps.ts"
import { bot } from "../mod.ts"
import { fromMember } from "../../cache/models/member.ts"

export function setGuildMemberAddEvent() {
    eventData.log.info(`GuildMemberAdd event loaded`)
    return eventData.events.guildMemberAdd = async (_denobot: Bot, member: DiscordenoMember, user: DiscordenoUser) => {
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

        await bot.redisCache.set("Member", `${user.id.toString()}:${member.guildId}`, memberModel)
        return //might do more
    }
}