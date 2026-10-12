---
sidebar_position: 6
title: Server Commands
---

# Server Commands

Server Core comes with 40+ admin commands. They can be run from three places:

| From | How | Permissions |
|---|---|---|
| **Chat** | Type the prefix (default `/`): `/kick Bob spam` | The player's permissions |
| **Server console** | Type in the dedicated server window: `kick Bob spam` | All permissions |
| **Editor console** | `sc kick Bob spam` or `ServerCore kick Bob spam` | All permissions |
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

Unreal's dedicated server log window is normally output only. Server Core adds input to it, so you can type commands
straight into the server window and press Enter:

```text
players
ban Bob 7d Cheating
restart 5m Update
stat net
```

- **Windows:** start the server with `-log` to get the console window.
- **Linux:** start the server in a terminal (or `screen`/`tmux`, or `docker run -it`). Commands are read from stdin.
- Lines that are ServerCore commands run as ServerCore commands. Anything else runs as a normal Unreal console command.
- Console commands run as a system caller with every permission.
- Turn it off with **Enable Console Input** in the settings or `-NoServerCoreConsole` on the command line.

From the **editor console**, or from tools that send Unreal console commands (RCON plugins, hosting panels), use the
`sc` prefix: `sc players`, `sc ban Bob 7d Cheating`.

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
