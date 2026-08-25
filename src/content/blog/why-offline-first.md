---
title: "Why I Build Offline-First"
description: "The network is the one thing you can't control. Here's why I design software that assumes it will disappear."
pubDate: 2026-08-10
tags: ["architecture", "offline-first", "privacy"]
author: "Abdullah Tayyab"
---

Most apps treat the network as a constant. They spin, they wait, they fail loudly when
it's gone. I take the opposite bet: **assume the connection will drop, and make sure
the work still gets done.**

## The clinic doesn't stop for 4G

When I built Aafiyat for private clinics, the defining constraint wasn't a feature — it
was a power cut. A doctor in the middle of a consultation can't pause because the
router blinked. So the local database *is* the system. Sync is a courtesy, not a
crutch.

## Offline-first is a respect problem

It's easy to frame this as a technical choice. It's really a respect choice. The person
on the other side of the screen — a doctor, a patient, a field assistant — shouldn't
pay for our cloud bill or our uptime graphs. Their task is what matters.

## Three rules I follow

1. **Local state is the source of truth.** Remote is a replica.
2. **Sync in the background, never in the critical path.**
3. **Conflicts are flagged, not silently resolved.**

> Build for the worst network day, not the demo day.

Offline-first isn't harder. It's just honest about the world your software actually
lives in.
