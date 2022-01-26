import { REST_AUTHORIZATION_KEY } from "../../config.ts";
import { BASE_URL } from "../../deps.ts";
import { rest } from "../utils/rest.ts"

export async function handleRequest(conn: Deno.Conn) {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn);
  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  for await (const requestEvent of httpConn) {
    if (
      !REST_AUTHORIZATION_KEY ||
      REST_AUTHORIZATION_KEY !== requestEvent.request.headers.get("AUTHORIZATION")
    ) {
      return requestEvent.respondWith(
        new Response(JSON.stringify({ error: "Invalid authorization key." }), {
          status: 401,
        })
      );
    }

    const json = (await requestEvent.request.json());
    console.log("REST", json)
    // IMPLEMENT ANY ERROR HANDLING HERE IF YOU WOULD LIKE BY WRAPPING THIS IN A CATCH

    // MAKE THE REQUEST TO DISCORD
    const result = await rest.runMethod(
      rest,
      // USE THE SAME METHOD THAT CAME IN. IF DELETE CAME IN WE SEND DELETE OUT
      requestEvent.request.method as RequestMethod,
      // OVERWRITE THE CUSTOM URL WITH DISCORDS BASE URL
      `${BASE_URL}/v${rest.version}${requestEvent.request.url.substring(
        rest.customUrl.length
      )}`,
      json
    );

    // RETURN DISCORDS RESPONSE BACK TO THE PROCESS MAKING THE REQUEST
    if (result) {
      requestEvent.respondWith(
        new Response(JSON.stringify(result), {
          status: 200,
        })
      );
    } else {
      requestEvent.respondWith(
        new Response(undefined, {
          status: 204,
        })
      );
    }
  }
}

type RequestMethod = "get" | "post" | "put" | "delete" | "patch";