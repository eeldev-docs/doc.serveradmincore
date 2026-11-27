---
sidebar_position: 5
title: WebSocket Events
---

# WebSocket Events

A live event stream at `ws://127.0.0.1:27022/api/v1/events`. It is enabled by default but needs the [REST API](rest-api) to be enabled, and uses the same [tokens](tokens).

## Authenticate

The first message must be:

```json
{ "type": "auth", "token": "sac_..." }
```

A client can also send the token in an `Authorization: Bearer` header when it connects. After a successful login the server replies with `auth.ok`.

## Messages from the client

| Type | Description |
|---|---|
| `auth` | Log in with a token. Must be first. |
| `subscribe` | Choose which events to receive. |
| `command` | Run a command as the token's group. |
| `ping` | Keep the connection alive. |

## Events

Each event is only sent to connections whose group has the matching permission.

| Event | Permission |
|---|---|
| `player.joined`, `player.left`, `player.kicked`, `player.group_changed` | `serveradmincore.players` |
| `sanction.muted`, `sanction.unmuted` | `serveradmincore.players` |
| `sanction.banned`, `sanction.unbanned` | `serveradmincore.ban` |
| `chat` | `serveradmincore.players` |
| `whitelist.changed` | `serveradmincore.players` |
| `pending_action.changed` | `serveradmincore.players` |
| `autokick.warning`, `autokick.cancelled` | `serveradmincore.players` |
| `adminlog`, `command.executed` | `serveradmincore.logs` |

IP addresses are removed from every event unless the group has `serveradmincore.info.ip`.

## Try it in a browser console

```js
const ws = new WebSocket("ws://127.0.0.1:27022/api/v1/events");
ws.onopen = () => ws.send(JSON.stringify({ type: "auth", token: "sac_..." }));
ws.onmessage = (e) => console.log(e.data);
```
