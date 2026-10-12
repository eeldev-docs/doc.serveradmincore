---
sidebar_position: 2
title: Quick Start
---

# Quick Start

This page gets you from a fresh install to banning your first test player.

## 1. Make yourself owner

Owners always have every permission and can never be targeted by other players.

1. Start your server, join it and type `/whoami` in chat (or `sc players` in the server console).
2. Copy your **player id**, e.g. a SteamID64 like `76561198000000000`.
3. Open **Project Settings → Plugins → Server Core** and add the id to **Owner Ids**.

You can also pass owners on the command line, which is handy for hosted servers:

```bash
MyGameServer.exe -log -ServerCoreOwners=76561198000000000,76561198000000001
```

:::tip
In the editor you can skip this step. On a listen server the host is treated as an owner automatically
(**Listen Server Host Is Owner**).
:::

## 2. Hook up chat

Server Core adds a **ServerCore Player Component** to every player controller. Send chat through it so mutes are
enforced and messages that start with `/` are run as commands:

In Blueprint, from your chat widget:

1. **Get Owning Player** → **Get Server Core Player Component**
2. **Send Chat Message** with the text the player typed

Bind **On Chat Received** on the same component to show incoming messages, and **On Command Output** to show command
results.

## 3. Try some commands

```text
/players
/info Bob
/kick Bob Spamming
/tempban Bob 1d Griefing
/mute Bob 30m Toxic
/announce Server restart in 10 minutes!
/restart 5m Update
/cancel
```

The same commands work in the server console with the `sc` prefix instead of `/`:

```text
sc ban Bob 7d Cheating
```

## 4. Give your staff a group

```text
/setgroup Alice Admin
/setgroup Bob Moderator
```

That's it. Read on to learn about [permission groups](../features/permission-groups), the
[full command list](../reference/command-reference) and the [Blueprint API](../blueprint/blueprint-overview).
