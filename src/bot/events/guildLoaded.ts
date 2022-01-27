import { eventData } from "./mod.ts"
import { Bot, DiscordenoGuild, GatewayOpcodes } from "../../../deps.ts"
import { bot } from "../mod.ts"
import { fromGuild } from "../../cache/entities/guild.ts"

export function setGuildLoadedEvent() {
    return eventData.events.guildLoaded = async (_denobot: Bot, guild: DiscordenoGuild) => {
        eventData.log.info(`New Guild loaded with Id ${guild.id}, caching`)

        const guildEntity = fromGuild(guild)
        await bot.redisCache.set("Guild", guildEntity.id, guildEntity)

        eventData.log.info(`Guild is cached, Requesting Members`)

        for (const [id, shard] of bot.gateway.shards) {
            eventData.log.info(`Iteration of Shard ${id}`)

            const nonce = `${guild.id}-requestguildmembers-${Date.now()}`;

            bot.gateway.sendShardMessage(
                bot.gateway,
                shard.id,
                {
                    op: GatewayOpcodes.RequestGuildMembers,
                    d: {
                        guild_id: guild.id.toString(),
                        query: "",
                        presences: false,
                        limit: 0,
                        nonce,
                    },
                },
                true,
            );
        }
        return
    }
}