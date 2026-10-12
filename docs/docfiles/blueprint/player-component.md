---
sidebar_position: 2
title: Player Component
---

# Player Component

**ServerCore Player Component** (`UServerCorePlayerComponent`) is the bridge between a player and Server Core. The server
adds it to every player controller automatically (**Auto Add Player Component**). You can also add it to your player
controller Blueprint yourself, or use your own subclass with **Player Component Class**.

Get it with **Get Server Core Player Component** (Player Controller), or on the client with
**Get Server Core → Get Local Player Component**.

## Chat

| Function | Description |
|---|---|
| **Send Chat Message** (Message) | Sends chat. Messages with the command prefix run as commands. Muted players are blocked. |
| **Is Muted** | Replicated mute state |

| Event | Description |
|---|---|
| **On Chat Received** (Sender Name, Sender Id, Sender Group, Message) | A chat message from any player |
| **On Server Message** (Message) | A private message from the server ("You are muted", welcome message, `/msg`) |
| **On Announcement Received** (Message, Type) | An announcement |

### Building a chat box

1. In your chat widget's **On Text Committed**: **Get Owning Player → Get Server Core Player Component → Send Chat
   Message**.
2. In **Construct**: bind **On Chat Received**, **On Server Message**, **On Announcement Received** and
   **On Command Output**, and add a line to your chat log in each.
3. Use **Sender Group** with **Get Group** on the server, or your own lookup, to color names or add a `[ADMIN]` tag.

## Commands

| Function / Event | Description |
|---|---|
| **Execute Command** (Command Line) | Runs a command. The prefix is optional. |
| **On Command Output** (Lines, Result) | The output of the command |

## Permissions on the client

The component replicates the player's group and permissions to the **owning client only**:

| Function | Description |
|---|---|
| **Has Permission** (Permission) | Wildcard aware check |
| **Get Group Name**, **Get Group Priority**, **Get Permissions** | |
| **On Permissions Changed** | Fires when the group, permissions or mute state change |

Use these to show an admin button only to staff. The server always checks permissions again, so a modified client can't
do anything it isn't allowed to.

## Admin panel requests

See [Building an Admin Panel](admin-panel).
