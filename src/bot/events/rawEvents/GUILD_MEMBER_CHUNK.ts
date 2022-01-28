import { GatewayPayload, SnakeCasedPropertiesDeep, GuildMembersChunk } from "../../../../deps.ts"
import { fromMember } from "../../../cache/models/member.ts"
import { eventData } from "../mod.ts"
import { bot } from "../../mod.ts"

type DiscordGuildMembersChunk = SnakeCasedPropertiesDeep<GuildMembersChunk>;

export async function guildMembersChunkEventHandler(payload: GatewayPayload) {
    const chunk = payload.d as DiscordGuildMembersChunk;

    eventData.log.info(`Recieved Guild Member Chunk for Guild ${chunk.guild_id}`)

    const data: Record<string, string> = {}
    chunk.members.map(
        member => data[`Member:${member.user.id}:${chunk.guild_id}`] = JSON.stringify(fromMember({
            avatar: member.avatar,
            communicationDisabledUntil: member.communication_disabled_until,
            deaf: member.deaf,
            joinedAt: member.joined_at,
            mute: member.mute,
            nick: member.nick,
            pending: member.pending,
            permissions: member.permissions,
            premiumSince: member.premium_since,
            roles: member.roles,
            user: member.user
        }))
    )

    return await bot.redisCache.setMany(data)
}