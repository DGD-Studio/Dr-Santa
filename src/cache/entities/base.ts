export interface Entity {
    uniqueEntityId: EntityId;
}

export type EntityId = string | [string, string]

export function entityIdIsString(entityId: EntityId): entityId is string {
    return (entityId as string) !== undefined;
}