export interface Model {
    uniqueModelId: ModelId;
}

export type ModelId = string | [string, string]

export function entityIdIsString(modelId: ModelId): modelId is string {
    return (modelId as string) !== undefined;
}