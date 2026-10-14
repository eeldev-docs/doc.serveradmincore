---
sidebar_position: 6
title: Server Commands
---

# Server Commands

Server Admin Core comes with 38 built-in admin commands. They can be run from three places:

| From | How | Permissions |
|---|---|---|
| **Chat** | Type the prefix (default `/`): `/kick Bob spam` | The player's permissions |
| **Server console** | Type in the dedicated server window: `kick Bob spam` | All permissions |
| **Editor console** | `sac kick Bob spam` or `ServerAdminCore kick Bob spam` | All permissions |
| **Blueprint / C++** | **Execute Command** (Caller, Command Line) | The caller's permissions |

The full list is in the [Command Reference](../reference/command-reference).

## Targeting players

Commands that take a `<player>` accept:

| Input | Example | Matches |
|---|---|---|
| Name | `Bob` | Exact name, or a unique part of a name (`bo` → `Bobby`) |
| Quoted name | `"Some Name"` | Names with spaces |
| Index | `#3` | Player number 3 in `/players` |
| Player id | `76561198000000000` | Online players, plus offline players that joined before for commands that work on offline players (not `kick` and `msg`) |
| `id:` prefix | `id:76561198000000000` | Only this exact id. `ban`, `ipban`, `tempban`, `unmute`, `whitelist add`, `setgroup`, `removegroup`, `note`, `notes` and `logs` also accept players that have never joined |

If a partial name matches several players, the command lists them and asks you to be more specific.

## The server console

Unreal's dedicated server log window is normally output only. Server Admin Core adds input to it, so you can type commands
straight into the server window and press Enter:

```text
players
ban Bob 7d Cheating
restart 5m Update
stat net
```

- **Windows:** start the server with `-log` to get the console window.
- **Linux:** start the server in a terminal, in `screen`/`tmux`, or with `docker run -it` (attach with `docker attach`).
  Commands are read from stdin. While the server runs as a background job (`./Server.sh &`) input is paused until you
  bring it back with `fg`. Under systemd or `nohup` there is no terminal, so console input is simply off. Use `screen`
  or `tmux` if you want to type commands into a server running as a service.
- Lines that are ServerAdminCore commands run as ServerAdminCore commands. Anything else runs as a normal Unreal console command.
- Console commands run as a system caller with every permission.
- Turn it off with **Enable Console Input** in the settings or `-NoServerAdminCoreConsole` on the command line.

From the **editor console**, or from tools that send Unreal console commands (RCON plugins, hosting panels), use the
`sac` prefix: `sac players`, `sac ban Bob 7d Cheating`.

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
