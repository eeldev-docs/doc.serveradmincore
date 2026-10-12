---
sidebar_position: 6
title: Server Commands
---

# Server Commands

Server Core comes with 40+ admin commands. They can be run from three places:

| From | How | Permissions |
|---|---|---|
| **Chat** | Type the prefix (default `/`): `/kick Bob spam` | The player's permissions |
| **Server console** | `sc kick Bob spam` or `ServerCore kick Bob spam` | All permissions |
| **Blueprint / C++** | **Execute Command** (Caller, Command Line) | The caller's permissions |

The full list is in the [Command Reference](../reference/command-reference).

## Targeting players

Commands that take a `<player>` accept:

| Input | Example | Matches |
|---|---|---|
| Name | `Bob` | Exact name, or a unique part of a name (`bo` → `Bobby`) |
| Quoted name | `"Some Name"` | Names with spaces |
| Index | `#3` | Player number 3 in `/players` |
| Player id | `76561198000000000` | Online, or offline players that joined before |
| `id:` prefix | `id:76561198000000000` | Only this exact id. Ban, unmute, whitelist, setgroup, notes and logs also accept players that have never joined |

If a partial name matches several players, the command lists them and asks you to be more specific.

## The server console

On a dedicated server, type commands in the server console window, or send them through your hosting panel or RCON
tool as the console command `sc <command>`:

```text
sc players
sc ban Bob 7d Cheating
sc restart 5m Update
```

Console commands run as a system caller with every permission.

## Help

```text
/help
/help ban
/whoami
```

`/help` only lists the commands the player is allowed to use.

## Custom commands

Add your own commands from [Blueprint](../blueprint/custom-commands-blueprint) or [C++](../cpp/custom-commands-cpp).
They get permission checks, aliases, usage help and appear in `/help` automatically.
