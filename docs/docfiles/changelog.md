---
title: Changelog
sidebar_position: 99
---

# Changelog

## Unreleased

- AFK kick: kicks idle players after a configurable time, with a warning first and an optional minimum player count
- High ping kick: kicks players whose ping stays above a limit for a grace period
- New permissions `serveradmincore.afk.bypass` and `serveradmincore.ping.bypass`
- New admin log actions `AfkKick` and `PingKick`
- New Blueprint/C++ API: Report Player Activity, Get Player Idle Seconds, On Auto Kick Warning

## 1.0.0

Initial release for Unreal Engine 5.8.

- Kick, ban, temp ban, IP ban and unban with login enforcement
- Mute, temp mute and unmute for text and voice chat
- Whitelist with staff bypass
- Permission groups with priority, inheritance, wildcards and denials
- 38 built-in server commands from chat, the server console and Blueprint
- Commands typed directly into the dedicated server console window (Windows and Linux)
- Restart modes: relaunch process, exit process (for supervisors) and reload map
- Full listen server support
- Custom commands from Blueprint and C++
- Instant, scheduled and welcome announcements
- Change map, restart and shutdown with countdowns
- Player list, player info, player notes
- Admin logs in memory, output log and daily files
- Player component for chat, commands and in-game admin panels
- Pluggable storage backend (JSON by default)
