---
sidebar_position: 4
title: REST API
---

# REST API

JSON over HTTP on `127.0.0.1:27021`. Enable it with `bApiEnabled=True`. Every request except `health` needs a [token](tokens).

```text
curl -H "Authorization: Bearer <token>" http://127.0.0.1:27021/api/v1/players
```

| Method | Path | Permission | Description |
|---|---|---|---|
| GET | `/api/v1/health` | none | Returns `{"status":"ok"}`. |
| GET | `/api/v1/status` | `serveradmincore.players` | Online player count and the token's name and group. |
| GET | `/api/v1/players` | `serveradmincore.players` | Players that are online. |
| GET | `/api/v1/bans` | `serveradmincore.ban` | All bans. |
| GET | `/api/v1/logs?count=100` | `serveradmincore.logs` | Recent admin log entries. `count` is limited to a maximum. |
| POST | `/api/v1/command` | depends on the command | Runs a command. |

## Run a command

Body: a JSON object of at most 16 KB.

```json
{ "command": "kick Bob Spamming" }
```

Response:

```json
{
  "result": "Success",
  "success": true,
  "output": ["Kicked Bob."]
}
```

The command runs as the token's group, so it needs the permission of that command.

## Status codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 400 | Missing or invalid body |
| 401 | Missing or invalid token |
| 403 | The token's group lacks the required permission |
| 429 | Too many failed requests from this address |
| 503 | ServerAdminCore is not ready |
