---
sidebar_position: 11
title: Admin Logs
---

# Admin Logs

Every admin action is logged: who did what, to whom, when and why.

## Where logs go

| Destination | Details |
|---|---|
| **Memory** | The last **Max Log Entries In Memory** entries (default 2000), used by `/logs` and **Get Admin Logs** |
| **Output log** | Category `LogServerAdminCore` |
| **Files** | `<DataDirectory>/Logs/AdminLog-YYYY-MM-DD.jsonl`, one JSON object per line (**Write Log Files**) |

On startup, today's and yesterday's log files are loaded back into memory, so `/logs` survives restarts.

## Command

```text
/logs
/logs 50
/logs Bob
/logs 100 Bob
```

```text
  2026-10-12 19:01 Kick by Alice -> Bob: Spamming
  2026-10-12 19:04 NoteAdd by Alice -> Bob: Warned for team killing
  2026-10-12 19:20 TempBan by Alice -> Bob: Duration 1d. Reason: Griefing
```

Permission: `serveradmincore.logs`

## Logged actions

`Kick`, `Ban`, `TempBan`, `Unban`, `Mute`, `TempMute`, `Unmute`, `WhitelistAdd`, `WhitelistRemove`, `WhitelistToggle`,
`GroupAssign`, `GroupEdit`, `GroupDelete`, `NoteAdd`, `NoteRemove`, `Announcement`, `ChangeMap`, `Restart`, `Shutdown`,
`CancelServerAction`, `Command`, `PlayerJoin`, `PlayerLeave`, `LoginRejected`, `DataReload`, `Custom`, `AfkKick`, `PingKick`.

Joins and leaves can be turned off with **Log Joins And Leaves**. Turn on **Log All Commands** to also log every command
line that is run.

## Logging your own events

Use **Write Admin Log** with the action **Custom** to log your own game events, for example anti-cheat detections or
reports:

**Write Admin Log** (Caller: *Make System Caller "AntiCheat"*, Action: Custom, Target Id, Target Name, Details: *"Speed
hack detected"*)

## Sending logs to Discord or a web service

Bind **On Admin Log** and forward the entry to a webhook with your HTTP plugin of choice.

## Log file format

Each line is one `FServerAdminCoreLogEntry` serialized as JSON, for example:

```json
{"timestampUtc":"2026.10.12-19.01.33","action":"Kick","actorId":"7656119...","actorName":"Alice","targetId":"7656119...","targetName":"Bob","details":"Spamming"}
```
