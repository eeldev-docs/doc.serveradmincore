---
sidebar_position: 12
title: AFK and High Ping Kick
---

# AFK and High Ping Kick

Kicks idle players and players whose ping stays too high. Both are **off by default**. Turn them on in
[Auto Kick settings](../reference/settings-reference#auto-kick). The checks run on the server once per second, and the listen
server host is never kicked.

## AFK kick

Enable **Afk Kick Enabled**. A player counts as active when:

- their pawn (or spectator pawn) moves or turns,
- they send a chat message or a command through ServerAdminCore,
- your game calls **Report Player Activity** for them.

A new pawn (respawn or possession) does not count as activity by itself. A pawn that is moved by physics or a moving
platform does.

After **Afk Kick Seconds** (default 600) without activity the player is kicked. **Afk Warning Seconds** (default 60)
before that, they get the **Afk Warning Message** and **On Auto Kick Warning** fires. Any activity cancels the warning.

**Afk Min Players** only kicks idle players while at least that many players are online, so idle players are only removed
when the server is busy. When the count is reached, idle players are still warned before they are kicked.

:::tip
If activity in your game is not pawn movement (menus, turn based games, vehicles with their own input), call
**Report Player Activity** on the server from your own input handling.
:::

## High ping kick

Enable **High Ping Kick Enabled**. The ping is read from the player state (`GetPingInMilliseconds`), which the engine
already averages.

- When the ping goes above **Max Ping Ms** (default 250), the player gets the **High Ping Warning Message** and
  **On Auto Kick Warning** fires.
- If it stays above for **High Ping Grace Seconds** (default 30), the player is kicked. One sample at or below the limit
  resets the timer.
- The ping is not checked for **Ping Check Delay After Join** seconds (default 30) after joining or a map change, while it
  settles.

## Exemptions

| Node | Exempts from |
|---|---|
| `serveradmincore.afk.bypass` | AFK kick |
| `serveradmincore.ping.bypass` | High ping kick |

Owners and the Admin group (`serveradmincore.*`) have both. The default Moderator group has `serveradmincore.afk.bypass`.
Default groups are only created when no `Groups.json` exists, so on an existing server add the nodes to your groups:

```text
/groupperm Moderator add serveradmincore.afk.bypass
```

## Messages

| Setting | Placeholders |
|---|---|
| **Afk Warning Message** | `{Time}` |
| **Afk Kick Message** | `{Time}` |
| **High Ping Warning Message** | `{Ping}`, `{MaxPing}`, `{Time}` |
| **High Ping Kick Message** | `{Ping}`, `{MaxPing}` |

An empty warning message sends nothing, but **On Auto Kick Warning** still fires, so you can show your own UI.

## Logs and events

- Kicks are written to the [Admin Log](admin-logs) as `AfkKick` or `PingKick`, by the system caller `AutoKick`.
- **On Player Kicked** fires for every automatic kick.
- **On Auto Kick Warning** (Player Id, Player Name, Reason, Seconds Left) fires before a kick. Reason is `Afk` or `High Ping`.

## Blueprint

| Node | Description |
|---|---|
| **Report Player Activity** (Player Id) | Marks the player as active. Server only. |
| **Get Player Idle Seconds** (Player Id) | Seconds since the player was last active, or -1 when the player is not online. |

## C++

```cpp
UServerAdminCoreSubsystem* ServerAdminCore = UServerAdminCoreSubsystem::Get(this);
ServerAdminCore->ReportPlayerActivity(UServerAdminCoreBlueprintLibrary::GetPlayerId(PlayerController));
```

## Example config

```ini
[/Script/ServerAdminCore.ServerAdminCoreSettings]
bAfkKickEnabled=True
AfkKickSeconds=900
AfkWarningSeconds=60
AfkMinPlayers=20
bHighPingKickEnabled=True
MaxPingMs=300
HighPingGraceSeconds=45
```
