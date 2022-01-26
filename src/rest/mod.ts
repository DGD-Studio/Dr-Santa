import { handleRequest } from "./handleRequest.ts"
import { REST_PORT } from "../../config.ts";
import { logger } from "../utils/logger.ts"

const log = logger({ name: "Global Rest HAndler" })

const server = Deno.listen({ port: REST_PORT })
log.info(
    `HTTP webserver running.  Access it at:  http://localhost:${REST_PORT}/`,
);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
    // In order to not be blocking, we need to handle each connection individually
    // in its own async function.
    handleRequest(conn);
}