---
sidebar_position: 5
title: Admins, Moderators and Permission Groups
---

# Admins, Moderators and Permission Groups

Every player belongs to exactly one **group**. A group has a **priority** and a list of **permission nodes**, and can
inherit from other groups.

## Default groups

These are created the first time the server starts:

| Group | Priority | Permissions | Inherits |
|---|---|---|---|
| **Owner** | 1000 | `*` | |
| **Admin** | 100 | `serveradmincore.*`, `-serveradmincore.group.edit` | Moderator |
| **Moderator** | 50 | info, kick, tempban, mute, tempmute, unmute, notes.view, notes.add, announce, logs, whitelist.bypass, afk.bypass, group.list | Default |
| **Default** | 0 | help, players | |

Players without an assigned group are in **Default**.

## Owners

Players listed in **Owner Ids** (or passed with `-ServerAdminCoreOwners=`) always have every permission, report the group
*Owner*, and can't be targeted by anyone. Use this for yourself and your co-owners.

## Assigning groups

```text
/setgroup Alice Admin
/setgroup Bob Moderator
/removegroup Bob
/staff
```

In Blueprint: **Set Player Group** (Caller, Player Id, Group Name). An empty group name resets to Default.

## Permission nodes

| Pattern | Meaning |
|---|---|
| `serveradmincore.kick` | One permission |
| `serveradmincore.*` | Everything starting with `serveradmincore.` |
| `*` | Everything |
| `-serveradmincore.shutdown` | Deny. A denial always wins over a grant. |

All built-in nodes are listed in the [Permission Nodes](../reference/permission-nodes) reference.

### Your own permissions

Permission nodes are just strings, so you can use them for your own game features:

```text
/creategroup VIP 10 Default
/groupperm VIP add mygame.vip.kit
/groupperm VIP add mygame.chat.color
/setgroup Bob VIP
```

Check them anywhere on the server with **Has Permission** (Player Id, Permission), or on the client with
**Has Permission** on the [Player Component](../blueprint/player-component) to show or hide UI.

## Priority and immunity

With **Enforce Immunity** on (default):

- A player can only kick, ban, mute or change the group of players with a **lower** priority.
- A player can only hand out groups **below** their own priority.
- A player can only create, edit or delete groups below their own priority.
- Owners can target everyone except other owners.
- System callers (server console, game code) ignore priority.

So a Moderator (50) can't ban an Admin (100), and an Admin can't promote someone to Admin or Owner.

## Managing groups

| Command | Description |
|---|---|
| `/groups` | List groups |
| `/group <name>` | Show a group's permissions |
| `/creategroup <name> <priority> [inherits]` | Create a group |
| `/deletegroup <name>` | Delete a group, members move to Default |
| `/groupperm <group> <add\|remove> <permission>` | Edit permissions |

In Blueprint: **Save Group** (Caller, Group) creates or replaces a group, **Delete Group**, **Get Groups**, **Get Group**.

Groups also have a **Display Name**, **Chat Tag** (e.g. `[ADMIN]`) and **Color** for your UI.

:::note
Groups are stored in `Groups.json`. Changing **Default Groups** in Project Settings after the first start has no effect.
Delete `Groups.json` to recreate the defaults.
:::
