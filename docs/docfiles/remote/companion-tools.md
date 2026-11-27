---
sidebar_position: 8
title: Companion Tools
---

# Companion Tools

Three free programs that run next to a dedicated server. They are separate downloads, not part of the plugin, and need the [Remote Control](overview) features of version 1.1.0 or later. Each is a single file for Windows and Linux with nothing to install.

**Download:** [github.com/eeldev-ue4/ServerAdminTools](https://github.com/eeldev-ue4/ServerAdminTools)

The download contains a README with the full setup, a license, third party notices and `SHA256SUMS.txt` to check the files. The programs are not code signed, so Windows SmartScreen may warn the first time you run them.

| Program | What it does |
|---|---|
| **watchdog** | Starts and supervises the server, restarts it after crashes, runs scheduled restarts with an in-game countdown and can update the server through SteamCMD. |
| **discordbot** | Posts the admin log and join and leave messages to Discord, bridges chat both ways and gives admins slash commands. |
| **panel** | A web page with the player list, live feed, admin log, bans and a console. |

## Watchdog

Copy `config.example.json` to `config.json`, set the server executable, arguments and working directory, then run `watchdog.exe` with `SERVERADMINCORE_RCON_PASSWORD` set. The password is also passed to the server it starts.

- Crash loops back off (5, 30, 120 seconds by default) and stop after `maxCrashesInRow` failures.
- Restarts from inside the game, over RCON and from the schedule are recognised through [managed mode](managed-mode).
- `schedule` restarts at fixed local times. Add `"update": true` to update through SteamCMD first, which needs the `steam` section.

```json
"schedule": [
  { "time": "04:00" },
  { "time": "12:00", "days": ["sun"], "update": true }
]
```

## Discord bot

Create an application and bot in the Discord developer portal, enable **Message Content Intent**, invite it with the `bot` and `applications.commands` scopes, and fill in `config.json` with the bot token, server id, channel ids and an [API token](tokens). Slash commands can be used by members with a role in `adminRoleIds`, and what they may do depends on the token's group.

Create a dedicated token for it, for example `token create discord-bot Moderator 90d`.

## Web panel

Run `panel.exe`, open `http://127.0.0.1:8080` and log in with an API token. It only forwards the routes the page needs. It has no TLS, so use a VPN or an HTTPS reverse proxy for access from other machines.

:::warning
Keep tokens and bot tokens secret. Revoke or reset any that have been shared by mistake.
:::
