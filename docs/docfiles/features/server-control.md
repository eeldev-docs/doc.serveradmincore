---
sidebar_position: 8
title: Change Map, Restart and Shutdown
---

# Change Map, Restart and Shutdown

Map changes, restarts and shutdowns run after a countdown. Players are warned at set intervals, and the action can be
cancelled at any time.

## Commands

| Command | Description | Permission |
|---|---|---|
| `/map <map> [delay]` | Change map (default delay 10s) | `servercore.map` |
| `/maps` | List available maps and aliases | `servercore.map` |
| `/restart [delay] [reason]` | Restart (default delay 60s) | `servercore.restart` |
| `/shutdown [delay] [reason]` | Shut down (default delay 60s) | `servercore.shutdown` |
| `/cancel` | Cancel the scheduled action | `servercore.cancel` |
| `/status` | Shows the scheduled action and time left | `servercore.players` |

```text
/map Arena
/map /Game/Maps/Desert?game=TDM 30
/restart 5m Applying update
/shutdown 120 Maintenance
/cancel
```

A plain number delay is **seconds**. Durations like `5m` also work. Only one action can be scheduled at a time, and a new
one replaces the old.

## Countdown warnings

Players are warned when the time left passes each value in **Countdown Warnings** (default 600, 300, 120, 60, 30, 15, 10,
5, 4, 3, 2, 1 seconds). The texts are configurable:

| Setting | Default |
|---|---|
| Restart Warning Message | `Server restarting in {Time}. {Reason}` |
| Shutdown Warning Message | `Server shutting down in {Time}. {Reason}` |
| Map Change Warning Message | `Changing map to {Map} in {Time}.` |

Warnings are sent as **Banner** announcements, and as **Warning** in the last 10 seconds.

## Maps

`/map` accepts:

- **An alias** from **Map Aliases**, e.g. `arena` → `/Game/Maps/Arena`
- **A short map name**, e.g. `Arena`, searched in **Map Search Paths** (default `/Game`)
- **A full path**, e.g. `/Game/Maps/Arena`
- Any of these followed by **travel options**, e.g. `Arena?game=TDM`

:::note
For a packaged server, make sure your maps are cooked: add them to **Project Settings → Packaging → List of maps to include
in a packaged build**.
:::

## Restart modes

**Restart Mode** decides what a restart does:

| Mode | What happens | Use when |
|---|---|---|
| **Relaunch Process** (default) | Saves, kicks everyone, starts a new server process with the same command line and exits. The new process waits until the old one is gone, so ports are free. | You start the server yourself, from a terminal, a script or a shortcut |
| **Exit Process** | Saves, kicks everyone and exits with **Restart Exit Code** | Your server runs under a supervisor that starts it again: systemd, Docker (`restart: always`), Windows services, a hosting panel |
| **Reload Map** | Reloads the current map, the process keeps running | You only want a fresh map state |

:::note
With **Relaunch Process** on Linux, the new server keeps printing its log to the same terminal, but it runs in the
background, so typing commands into that terminal stops working after the first restart. If you want console input
across restarts, run the server under a supervisor with **Exit Process**, inside `screen` or `tmux`.
:::

Example systemd unit:

```ini title="/etc/systemd/system/mygame.service"
[Service]
ExecStart=/opt/mygame/MyGameServer.sh -log
Restart=always
RestartSec=5
```

## Shutdown

Saves all data, kicks every player with the **Shutdown Kick Message** and exits the process.

:::info
In the editor, exiting the process is skipped and a warning is logged instead, so your editor doesn't close.
:::

## Blueprint

| Node | Description |
|---|---|
| **Change Map** (Caller, Map, Delay Seconds) | |
| **Restart Server** (Caller, Delay Seconds, Reason) | |
| **Shutdown Server** (Caller, Delay Seconds, Reason) | |
| **Cancel Pending Action** (Caller) | |
| **Get Pending Action** → Action | Type, target, reason, remaining seconds |
| **Get Available Maps** | Full package names |
| **Resolve Map** (Map) → Travel URL | |

Event: **On Pending Action Changed** (Action). Use it to show a countdown in a server UI.
