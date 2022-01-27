import { Model } from "./base.ts"
import {
    GuildMemberWithUser,
} from "../../../deps.ts"

export interface MemberModel extends Model {
    avatar: string | undefined | null;
    communicationDisabledUntil: number;
    deaf?: boolean;
    joinedAt: string;
    mute?: boolean;
    nick?: string;
    pending?: boolean;
    permissions?: string;
    premiumSince?: string;
    userId?: string;
}

export function fromMember(member: GuildMemberWithUser): MemberModel {
    return {
        avatar: member.avatar?.toString(),
        communicationDisabledUntil: member.communicationDisabledUntil,
        deaf: member.deaf,
        joinedAt: member.joinedAt,
        mute: member.mute,
        nick: member.nick,
        pending: member.pending,
        permissions: member.permissions?.toString(),
        premiumSince: member.premiumSince?.toString(),
        userId: member.user.id,
    } as MemberModel;
}