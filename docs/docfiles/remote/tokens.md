---
sidebar_position: 3
title: API Tokens
---

# API Tokens

The REST API and the WebSocket stream use API tokens. A token belongs to a [permission group](../features/permission-groups) and can only do what that group may do.

## Commands

```text
token create <name> <group> [duration]
token list
token revoke <id>
```

```text
token create discord-bot Moderator 90d
token list
token revoke 084ea0ed
```

Permission: `serveradmincore.token`

- The token looks like `sac_<id>_<secret>` and is **shown once**. Store it somewhere safe.
- The server only stores a SHA-256 hash, in `ApiTokens.json` in the [data directory](../reference/data-files).
- `duration` is optional and uses the same format as [bans](../features/bans#durations), for example `30d`. Without it the token does not expire.
- You can only create a token for a group with the same or a lower priority than your own.
- `token revoke` accepts the id from `token list`. At least 4 characters are needed and they must match exactly one token.
- Creating and revoking tokens is written to the admin log.

## Use a token

Send it as a Bearer token. Too many failed attempts from one address are blocked for a while.

```text
Authorization: Bearer sac_<id>_<secret>
```

:::tip
Give every program its own token, with a group that only has the permissions it needs. If a token has been shared by mistake, revoke it and create a new one.
:::

## IP addresses

IP addresses are removed from all REST and WebSocket output unless the token's group has `serveradmincore.info.ip`.
