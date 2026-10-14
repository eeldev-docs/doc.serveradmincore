---
sidebar_position: 7
title: Server Announcements
---

# Server Announcements

## Instant announcements

```text
/announce Double XP weekend starts now!
/warnall Server restart in 5 minutes
/msg Bob Please stop spawn camping
```

| Command | Description | Permission |
|---|---|---|
| `/announce <message>` | Notification to everyone | `serveradmincore.announce` |
| `/warnall <message>` | Warning to everyone | `serveradmincore.announce` |
| `/msg <player> <message>` | Private server message to one player | `serveradmincore.announce` |

In Blueprint: **Announce** (Caller, Message, Type) and **Send Message To Player** (Player Id, Message).

## Announcement types

Each announcement carries a type so your UI can display it differently:

| Type | Suggested display |
|---|---|
| **Chat** | A line in the chat box |
| **Notification** | A toast in the corner |
| **Banner** | A banner across the top of the screen |
| **Warning** | A red, attention-grabbing banner |

Server Admin Core only delivers the message and type. **Your UI decides how it looks**: bind **On Announcement Received** on the
[Player Component](../blueprint/player-component).

## Scheduled announcements

Add repeating messages in **Project Settings → Server Admin Core → Announcements → Scheduled Announcements**:

| Field | Description |
|---|---|
| Enabled | Turn the announcement on or off |
| Message | The text |
| Interval Seconds | How often it repeats (minimum 10) |
| Type | Chat, Notification, Banner or Warning |

```ini
+ScheduledAnnouncements=(bEnabled=True,Message="Join our Discord: discord.gg/example",IntervalSeconds=900,Type=Chat)
+ScheduledAnnouncements=(bEnabled=True,Message="Type /help to see all commands",IntervalSeconds=1800,Type=Notification)
```

Scheduled announcements are only sent while players are online.

## Welcome message

**Welcome Message** is sent privately to every player when they join. `{Player}` is replaced with their name.

```ini
WelcomeMessage=Welcome {Player}! Type /help to see what you can do.
```
