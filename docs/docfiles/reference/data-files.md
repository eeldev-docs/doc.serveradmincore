---
sidebar_position: 5
title: Data Files
---

# Data Files

With the default JSON storage, data is stored in `<Project>/Saved/ServerCore`. On a packaged server that is
`<ServerFolder>/<ProjectName>/Saved/ServerCore`.

Change the location with **Data Directory** in the settings, or per server with:

```bash
MyGameServer -log -ServerCoreDataDir=/srv/mygame/servercore
```

Relative paths are relative to the project folder.

| File | Content |
|---|---|
| `Bans.json` | Bans |
| `Mutes.json` | Mutes |
| `Whitelist.json` | Whitelist state and entries |
| `Groups.json` | Permission groups |
| `Players.json` | Every player that has joined: names, group, play time, last IP |
| `Notes.json` | Staff notes |
| `Logs/AdminLog-YYYY-MM-DD.jsonl` | Admin logs, one JSON object per line, one file per day (UTC) |

## Format

Every file has the same envelope:

```json
{
  "Version": 1,
  "SavedUtc": "2026-10-12T19:04:11.000Z",
  "Data": { }
}
```

`Data` is the matching field of `FServerCoreDatabase`, serialized with Unreal's JSON object converter.

## Editing files by hand

You can edit the files while the server is **stopped**. To edit while it is running, edit the file and run `/reload`
(unsaved runtime changes are lost).

## Safety

- Files are written to a `.tmp` file first and then moved into place, so a crash never leaves a half-written file.
- If a file can't be parsed, it is copied to `<File>.corrupt-<timestamp>` and an error is logged, so nothing is lost.

## Backups

Back up the whole `ServerCore` folder. It is small and plain text.
