---
sidebar_position: 2
title: Permission Nodes
---

# Permission Nodes

All built-in nodes. In C++ they are available as constants in the `ServerAdminCorePermissions` namespace
(`ServerAdminCorePermissions::Kick`, …).

| Node | Constant | Grants |
|---|---|---|
| `*` | `All` | Everything |
| `serveradmincore.help` | `Help` | `help` |
| `serveradmincore.players` | `Players` | `players`, `status`, `staff`, admin panel player list |
| `serveradmincore.info` | `Info` | `info`, player ids in `players`, admin panel player info |
| `serveradmincore.info.ip` | `InfoIP` | Seeing IP addresses |
| `serveradmincore.kick` | `Kick` | Kicking |
| `serveradmincore.ban` | `Ban` | Permanent and timed bans, `bans` |
| `serveradmincore.ban.ip` | `BanIP` | IP bans |
| `serveradmincore.tempban` | `TempBan` | Timed bans only |
| `serveradmincore.unban` | `Unban` | Removing bans |
| `serveradmincore.mute` | `Mute` | Permanent and timed mutes, `mutes` |
| `serveradmincore.tempmute` | `TempMute` | Timed mutes only |
| `serveradmincore.unmute` | `Unmute` | Removing mutes |
| `serveradmincore.whitelist` | `Whitelist` | Managing the whitelist |
| `serveradmincore.whitelist.bypass` | `WhitelistBypass` | Joining while the whitelist is on |
| `serveradmincore.afk.bypass` | `AfkBypass` | Never kicked for being AFK |
| `serveradmincore.ping.bypass` | `PingBypass` | Never kicked for high ping |
| `serveradmincore.group.list` | `GroupList` | `groups`, `group` |
| `serveradmincore.group.set` | `GroupSet` | `setgroup`, `removegroup` |
| `serveradmincore.group.edit` | `GroupEdit` | Creating, editing and deleting groups |
| `serveradmincore.notes.view` | `NotesView` | Reading notes |
| `serveradmincore.notes.add` | `NotesAdd` | Adding notes |
| `serveradmincore.notes.remove` | `NotesRemove` | Deleting notes |
| `serveradmincore.announce` | `Announce` | `announce`, `warnall`, `msg` |
| `serveradmincore.map` | `Map` | `map`, `maps` |
| `serveradmincore.restart` | `Restart` | `restart` |
| `serveradmincore.shutdown` | `Shutdown` | `shutdown` |
| `serveradmincore.cancel` | `Cancel` | `cancel` |
| `serveradmincore.logs` | `Logs` | `logs`, admin panel logs |
| `serveradmincore.reload` | `Reload` | `reload`, `save` |

## Matching rules

- `*` matches everything.
- `prefix.*` matches `prefix` and everything below it: `serveradmincore.ban.*` matches `serveradmincore.ban.ip`.
- Matching is case insensitive.
- A node starting with `-` denies. If any denial in the player's effective permissions matches, the permission is denied,
  even if another node grants it.
- Effective permissions = the group's permissions plus all inherited groups' permissions.
