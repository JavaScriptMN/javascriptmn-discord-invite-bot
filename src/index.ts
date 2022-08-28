// This isn't ESM spec, but the CloudFlare environment allows us to import HTML files
// @ts-ignore
import errorMarkup from "./error.html";

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  DISCORD_BOT_TOKEN: string;
  DISCORD_CHANNEL_ID: string;
}

async function createChannelInvite(env: Env): Promise<{ code: string }> {
  const headers = new Headers();
  headers.set("Authorization", `Bot ${env.DISCORD_BOT_TOKEN}`);
  headers.set("Content-Type", "application/json;charset=utf-8");
  headers.set("Cache-Control", "no-cache");

  const response = await fetch(
    `https://discord.com/api/v10/channels/${env.DISCORD_CHANNEL_ID}/invites`,
    {
      method: "POST",
      body: JSON.stringify({
        // 1 hour, in seconds
        max_age: 60 * 60,
        max_uses: 1,
        temporary: false,
        unique: true,
      }),
      headers,
    }
  );

  if (response.ok) {
    return await response.json();
  } else {
    console.error(response);
    throw new Error("Error fetching channel invite from Discord");
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const invite = await createChannelInvite(env);

      // temporary redirect
      return Response.redirect(`https://discord.gg/${invite.code}`, 307);
    } catch (e) {
      console.error(e);
      const headers = new Headers();
      headers.set("Content-Type", "text/html;charset-utf-8");
      headers.set("Cache-Control", "no-cache");

      return new Response(errorMarkup, {
        headers,
      });
    }
  },
};
