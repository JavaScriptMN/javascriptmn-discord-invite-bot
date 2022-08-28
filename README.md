# JavaScriptMN Discord Invite Bot

Cloudflare worker to create a new Discord channel invite.

## Environment Variables

| Variable             | Use                                                      |
| -------------------- | -------------------------------------------------------- |
| `DISCORD_BOT_TOKEN`  | The Discord bot token                                    |
| `DISCORD_CHANNEL_ID` | The Channel ID of the text channel to invite the user to |

We use the channel ID so that an invited user starts at a specific channel in a server.
This channel is ideally your welcome/rules channel to help with on-boarding.
The channel ID is a unique ID across all Discord servers.

The bot must already have joined the sever and must have the `CREATE_INSTANT_INVITE` permission.
See more info about the Create Channel Invite on the [Discord developer docs](https://discord.com/developers/docs/resources/channel#create-channel-invite).
