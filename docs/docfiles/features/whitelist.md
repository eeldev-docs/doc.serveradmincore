---
sidebar_position: 4
title: Whitelist
---

# Whitelist

When the whitelist is on, only whitelisted players can join. Turn it on for private servers, closed tests or events.

## Command

```text
/whitelist <on|off|status|list|add|remove> [player]
```

```text
/whitelist on
/whitelist add Bob
/whitelist add id:76561198000000000
/whitelist remove Bob
/whitelist list
/whitelist off
```

Permission: `serveradmincore.whitelist`

## Staff bypass

Players with `serveradmincore.whitelist.bypass` can always join. Moderators have it by default, and owners can always join.

## Default state

**Whitelist Enabled By Default** in the settings decides the state the very first time the server runs. After that, the
state is saved in `Whitelist.json` and survives restarts.

## Blueprint

| Node | Description |
|---|---|
| **Set Whitelist Enabled** (Caller, Enabled) | |
| **Is Whitelist Enabled** | |
| **Add To Whitelist** (Caller, Player Id, Player Name) | Player Name is optional |
| **Remove From Whitelist** (Caller, Player Id) | |
| **Is Player Whitelisted** (Player Id) | |
| **Get Whitelist** | All entries, sorted by name |

Event: **On Whitelist Changed** (Enabled)
