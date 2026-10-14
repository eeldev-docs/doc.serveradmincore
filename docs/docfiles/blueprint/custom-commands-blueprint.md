---
sidebar_position: 4
title: Custom Commands
---

# Custom Commands (Blueprint)

Register your own commands. They get permission checks, aliases and usage help, show up in `/help`, and work from chat,
the server console and **Execute Command**.

## Registering a command

Register commands on the server, for example in your Game Mode's **Begin Play**:

1. **Get Server Admin Core**
2. **Register Command**
   - **Info**: make a `ServerAdminCore Command Info`
     - **Name**: `heal`
     - **Aliases**: `h`
     - **Permission**: `mygame.heal`
     - **Usage**: `<player>`
     - **Description**: `Heals a player to full health.`
     - **Min Args**: `1`
   - **Handler**: **Create Event** → a function with the signature *(Caller, Args) → String*

The handler receives:

| Input | Description |
|---|---|
| **Caller** | Who ran the command. Use it for further permission checks or logging. |
| **Args** | The arguments without the command name. Quoted text is one argument. |

Return a string. It is sent back to whoever ran the command (multiple lines are fine).

```text
Function HandleHeal (Caller, Args) → String
 ├─ Get Server Admin Core → Find Player (Args[0], Include Offline = false)
 │    ├─ false → return Error
 │    └─ true  → Get Player Controller (Player Id) → Get Pawn → heal
 └─ return "Healed " + Player Name
```

:::note
Commands registered with the same name as an existing command replace it. You can use this to override a built-in
command. Remove a command with **Unregister Command**.
:::

## Permissions

Give the permission to a group:

```text
/groupperm Moderator add mygame.heal
```

An empty **Permission** means everyone can run the command.
