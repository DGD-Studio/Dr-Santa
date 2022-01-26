import { dotEnvConfig, GatewayIntents } from "./deps.ts"

const env = dotEnvConfig({ export: true })

export const GATEWAY_INTENTS: (keyof typeof GatewayIntents)[] = [
    "GuildMembers",
    "Guilds"
]

if (!env.BOT_TOKEN) {
    throw new Error("Discord token is missing");
}

export const BOT_TOKEN = env.BOT_TOKEN;

export const MAX_SHARDS = env.MAX_SHARDS ? parseInt(env.MAX_SHARDS, 10) : 0;
export const FIRST_SHARD_ID = env.FIRST_SHARD_ID ? parseInt(env.FIRST_SHARD_ID, 10) : 0;
export const LAST_SHARD_ID = env.LAST_SHARD_ID ? parseInt(env.LAST_SHARD_ID, 10) : 0;
// Default to 10
export const SHARDS_PER_CLUSTER = env.SHARDS_PER_CLUSTER ? parseInt(env.SHARDS_PER_CLUSTER, 10) : 10;
export const MAX_CLUSTERS = parseInt(env.MAX_CLUSTERS!, 10);
if (!MAX_CLUSTERS) {
    throw new Error(
        "Please for the love of god, tell me how many clusters your machine can handle!",
    );
}

export const URL_GATEWAY_PROXY_WILL_FORWARD_TO = env
    .URL_GATEWAY_PROXY_WILL_FORWARD_TO!;
if (!URL_GATEWAY_PROXY_WILL_FORWARD_TO) {
    throw new Error(
        "Don't you think you need to give a URL where you want your gateway proxy to send events to?",
    );
}

export const REST_HANDLER_URL = env
    .REST_HANDLER_URL!;
if (!REST_HANDLER_URL) {
    throw new Error(
        "Don't you think you need to give a URL where you want your requests sent to?",
    );
}

export const REST_AUTHORIZATION_KEY = env.REST_AUTHORIZATION_KEY!;
if (!REST_AUTHORIZATION_KEY) {
    throw new Error(
        "Do you want to be hacked? Add a secret authorization key to make sure requests are only made by you.",
    );
}

export const BOT_ID = BigInt(atob(env.BOT_TOKEN.split(".")[0]));
if (!BOT_ID) {
    throw new Error("Please enter the BOT ID you want to run this with.");
}

export const REST_PORT = env.REST_PORT ? parseInt(env.REST_PORT, 10) : 5000;

export const DEVELOPMENT = env.DEVELOPMENT ?? true;
export const DEV_GUILD_ID = env.DEV_GUILD_ID ? BigInt(env.DEV_GUILD_ID) : 0n;