---
sidebar_position: 3
title: Custom Storage
---

# Custom Storage

By default Server Core stores data as JSON files. To keep data in a database, a REST API or anything else, for example to
**share bans between several servers**, write your own storage class.

## 1. Subclass UServerCoreStorage

```cpp title="MyServerCoreStorage.h"
#pragma once

#include "ServerCoreStorage.h"
#include "MyServerCoreStorage.generated.h"

UCLASS()
class UMyServerCoreStorage : public UServerCoreStorage
{
    GENERATED_BODY()

public:
    virtual bool LoadDatabase(FServerCoreDatabase& OutDatabase) override;
    virtual bool SaveDatabase(const FServerCoreDatabase& Database, EServerCoreDataCategory Categories) override;
    virtual void AppendLogEntry(const FServerCoreLogEntry& Entry) override;
    virtual void LoadRecentLogEntries(int32 MaxEntries, TArray<FServerCoreLogEntry>& OutEntries) override;
};
```

| Function | Called | Notes |
|---|---|---|
| `InitializeStorage(DataDirectory)` | Once, before loading | Optional override. Open connections here. |
| `LoadDatabase` | On start and on `/reload` | Fill only what you have, leave other fields untouched |
| `SaveDatabase` | Shortly after every change, and on shutdown | `Categories` tells you what changed (`Bans`, `Mutes`, `Whitelist`, `Groups`, `Players`, `Notes`) |
| `AppendLogEntry` | For every admin log entry | Optional |
| `LoadRecentLogEntries` | On start | Optional, oldest first |

:::warning
`LoadDatabase` and `SaveDatabase` are called on the game thread. If your backend is slow, keep a local cache and sync in
the background, or saves will cause hitches.
:::

## 2. Select it

**Project Settings → Plugins → Server Core → Storage Class** → `MyServerCoreStorage`.

## Sharing bans between servers

A simple pattern is to store bans, mutes, groups and the whitelist in a shared database, and keep players and notes
local. Call `Reload Data` (or the `/reload` command) on your servers after another server changes data, or poll on a timer.

## Extending the JSON storage

You can also subclass `UServerCoreJsonStorage` and only override parts of it, for example `AppendLogEntry` to also send
logs to a web service.
