---
sidebar_position: 1
title: Command Reference
---

# Command Reference

`<required>` and `[optional]` arguments. Commands and aliases are case insensitive. In chat, prefix commands with the
**Command Prefix** (default `/`). In the dedicated server console window, type them
without a prefix. In the editor console, prefix them with `sac` or `ServerAdminCore`.

See [Targeting players](../features/server-commands#targeting-players) for what `<player>` accepts, and
[Durations](../features/bans#durations) for `<duration>`.

## General

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `help` | `?`, `commands` | `[command]` | `serveradmincore.help` | Lists commands, or shows help for one |
| `whoami` | `perms` | | – | Your id, group and permissions |
| `status` | `server` | | `serveradmincore.players` | Map, player count, whitelist, scheduled action |

## Players

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `players` | `list`, `who` | | `serveradmincore.players` | Online players |
| `info` | `playerinfo`, `whois` | `<player>` | `serveradmincore.info` | Player details (online or offline) |
| `staff` | `admins` | | `serveradmincore.players` | Players in a non-default group |

## Kick, ban and mute

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `kick` | | `<player> [reason]` | `serveradmincore.kick` | Kick a player |
| `ban` | | `<player> [duration] [reason]` | `serveradmincore.ban` | Permanent ban, or timed with a duration |
| `ipban` | `banip` | `<player> [duration] [reason]` | `serveradmincore.ban.ip` | Ban player and last known IP |
| `tempban` | `tban` | `<player> <duration> [reason]` | `serveradmincore.tempban` | Timed ban |
| `unban` | `pardon` | `<player\|id>` | `serveradmincore.unban` | Remove a ban |
| `bans` | `banlist` | `[count]` | `serveradmincore.ban` | Recent bans (default 20) |
| `mute` | | `<player> [duration] [reason]` | `serveradmincore.mute` | Permanent mute, or timed with a duration |
| `tempmute` | `tmute` | `<player> <duration> [reason]` | `serveradmincore.tempmute` | Timed mute |
| `unmute` | | `<player>` | `serveradmincore.unmute` | Remove a mute |
| `mutes` | `mutelist` | | `serveradmincore.mute` | Muted players |

## Whitelist

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `whitelist` | `wl` | `<on\|off\|status\|list\|add\|remove> [player]` | `serveradmincore.whitelist` | Manage the whitelist |

## Groups

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `groups` | | | `serveradmincore.group.list` | List groups |
| `group` | `groupinfo` | `<group>` | `serveradmincore.group.list` | Group details |
| `setgroup` | `promote`, `rank` | `<player> <group>` | `serveradmincore.group.set` | Assign a group |
| `removegroup` | `demote` | `<player>` | `serveradmincore.group.set` | Back to the default group |
| `creategroup` | | `<name> <priority> [inherits]` | `serveradmincore.group.edit` | Create a group |
| `deletegroup` | | `<name>` | `serveradmincore.group.edit` | Delete a group |
| `groupperm` | `gperm` | `<group> <add\|remove> <permission>` | `serveradmincore.group.edit` | Edit group permissions |

## Notes

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `note` | `addnote` | `<player> <text>` | `serveradmincore.notes.add` | Add a note |
| `notes` | | `<player>` | `serveradmincore.notes.view` | Read notes |
| `delnote` | `removenote` | `<note id>` | `serveradmincore.notes.remove` | Delete a note |

## Communication

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `announce` | `broadcast`, `say` | `<message>` | `serveradmincore.announce` | Notification announcement |
| `warnall` | | `<message>` | `serveradmincore.announce` | Warning announcement |
| `msg` | `pm`, `tell` | `<player> <message>` | `serveradmincore.announce` | Private server message |

## Server control

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `map` | `changemap` | `<map> [delay]` | `serveradmincore.map` | Change map (default 10s) |
| `maps` | `maplist` | | `serveradmincore.map` | List maps and aliases |
| `restart` | `reboot` | `[delay] [reason]` | `serveradmincore.restart` | Restart (default 60s) |
| `shutdown` | `stop` | `[delay] [reason]` | `serveradmincore.shutdown` | Shut down (default 60s) |
| `cancel` | `abort` | | `serveradmincore.cancel` | Cancel map change / restart / shutdown |

## Logs and data

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `logs` | `history` | `[count] [player]` | `serveradmincore.logs` | Recent admin logs (default 20, max 200) |
| `reload` | | | `serveradmincore.reload` | Reload data from storage |
| `save` | | | `serveradmincore.reload` | Save data now |
