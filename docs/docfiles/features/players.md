---
sidebar_position: 9
title: Player List and Player Info
---

# Player List and Player Info

Server Admin Core remembers every player that joins: names, play time, join count, group and last IP address.

## Player list

```text
/players
```

```text
3 player(s) online:
  #1 Alice [Admin] 24ms, 1h 12m
  #2 Bob [Default] 61ms, 14m (muted)
  #3 Charlie [Moderator] 38ms, 3m
```

Use the `#index` in other commands: `/kick #2`.
Players with `serveradmincore.info` also see player ids.

## Player info

```text
/info Bob
```

```text
Bob (76561198000000000)
Group: Default (priority 0)
Online for 14m, ping 61ms (#2)
First seen 2026-09-01 18:22 UTC, 37 joins, total play time 2d 4h 10m
Known names: Bob, B0b, xXBobXx
IP: 203.0.113.42
MUTED: Bob (76561198000000000) - 16m left - by Alice - Spam
2 note(s), use "notes Bob" to read them.
```

The IP address is only shown to players with `serveradmincore.info.ip` (Admins and Owners by default).

## Blueprint

| Node | Description |
|---|---|
| **Get Online Players** | Online players sorted by join time |
| **Get Player Info** (Player Id) → Info | Online or offline |
| **Get Player Record** (Player Id) → Record | The stored record |
| **Find Player** (Query, Include Offline) → Player Id, Player Name, Error | Same matching as commands |
| **Get Player Controller** (Player Id) | |
| **Is Player Online** (Player Id) | |
| **Get Online Player Count** | |

### FServerAdminCorePlayerInfo

| Field | Description |
|---|---|
| Player Id, Player Name | |
| Group Name, Group Priority | |
| Is Online, Session Index | Index matches `#index` in commands |
| Ping Ms | |
| IP Address | Stripped before it is sent to clients without `serveradmincore.info.ip` |
| Joined Utc, Session Seconds | Current session |
| First Seen Utc, Last Seen Utc | |
| Total Play Seconds | Including the current session |
| Join Count, Known Names | |
| Is Banned, Is Muted, Is Whitelisted | |
| Note Count | |
| Player Controller | Server only |

Events: **On Player Joined** and **On Player Left**.
