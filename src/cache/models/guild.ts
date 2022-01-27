import { Model, ModelId } from "./base.ts"
import {
    DiscordenoGuild,
} from "../../../deps.ts"


export interface GuildModel extends Model {
    applicationId?: string;
    banner?: string;
    description?: string;
    emojiIds: string[];
    icon?: string;
    iconHash?: string;
    id: string;
    joinedAt?: string;
    large?: boolean;
    maxMembers?: number;
    memberCount?: number;
    name: string,
    ownerId: string;
    permissions?: string;
    preferredLocale: string;
    roleIds: string[];
    threadIds: string[];
    unavailable?: boolean;
    uniqueModelId: ModelId;
}

export function fromGuild(guild: DiscordenoGuild): GuildModel {
    return {
        applicationId: guild.applicationId?.toString(),
        banner: guild.banner?.toString(),
        description: guild.description,
        emojiIds: guild.emojis.map(emoji => emoji.id?.toString()),
        icon: guild.icon?.toString(),
        iconHash: guild.iconHash,
        id: guild.id.toString(),
        joinedAt: guild.joinedAt,
        large: guild.large,
        maxMembers: guild.maxMembers,
        memberCount: guild.memberCount,
        name: guild.name,
        ownerId: guild.ownerId.toString(),
        permissions: guild.permissions.toString(),
        preferredLocale: guild.preferredLocale,
        roleIds: guild.roles.map(role => role.id?.toString()),
        threadIds: guild.threads?.map(thread => thread.id),
        uniqueModelId: guild.id.toString(),
    } as GuildModel;
}