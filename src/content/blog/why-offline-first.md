---
title: "Why I Build Offline-First"
description: "The network is the one thing you can't control. Here's why I design software that assumes it will disappear — and the three rules I follow on every project."
pubDate: 2026-08-10
tags: ["architecture", "offline-first", "sync", "privacy", "reliability"]
author: "Abdullah Tayyab"
---

Most apps treat the network as a constant. They spin, they wait, they fail loudly when it's gone. I take the opposite bet: **assume the connection will drop, and make sure the work still gets done.**

This is the short version of how I think about it. The long version, with code, is in [Your App Shouldn't Need the Internet to Do Its Job](/blog/offline-first-is-not-a-feature/).

## The clinic doesn't stop for 4G

When I built Aafiyat for private clinics, the defining constraint wasn't a feature — it was a power cut. A doctor in the middle of a consultation can't pause because the router blinked. So the local database *is* the system. Sync is a courtesy, not a crutch.

That constraint is more common than developers assume. Not just power cuts — patchy mobile data, congested towers in the evening, an ISP that goes down on a schedule nobody published, a laptop that wakes up on a hotspot. In each case the question is the same: **does the work still get done?**

If the honest answer is "no, the user sees a spinner," the architecture is wrong — no matter how good the server side is.

## Offline-first is a respect problem

It's easy to frame this as a technical choice. It's really a respect choice. The person on the other side of the screen — a doctor, a patient, a field assistant — shouldn't pay for our cloud bill or our uptime graphs. Their task is what matters.

This reframing matters in practice. When the constraint is "make our infrastructure look good," you get systems that are fast on the developer's connection and useless on the user's. When the constraint is "the user finishes their task," you get different trade-offs. You'd cache more aggressively. You'd allow longer timeouts instead of failing fast. You'd let someone save a draft with no connection at all, because losing their typing is worse than a stale value.

## Three rules I follow

**1. Local state is the source of truth. Remote is a replica.**

Not the other way around. If I find myself writing `await api.get()` in a render path, that's a signal the design is backwards. The read comes from local storage; the network is an update mechanism.

**2. Sync in the background, never in the critical path.**

The moment a user action waits on a network round-trip, it's not offline-first — it's offline-tolerant. The save must complete on-device first. Sync is a background process the user may never notice. Aafiyat does this with a `sync_queue` table inside its SQLite file; the Nankana Home Care PWA does the same with an array in IndexedDB. Same idea, different runtime.

**3. Conflicts are flagged, not silently resolved.**

Two devices edited the same record while offline. You have to pick a winner — but the user should be able to see that it happened. Silent last-write-wins destroys data without anyone noticing. Where the workflow is clinical and one device is clearly authoritative, last-write-wins on `updated_at` is a reasonable, deliberate choice. But deliberate is the operative word.

> Build for the worst network day, not the demo day.

## What it actually costs

I'm not going to pretend this is free. Two data layers instead of one means sync, conflict resolution, and storage limits are day-one design problems, not later optimizations. The first version takes longer.

What it buys you: software that works when everything else breaks. That's a trade-off I've made on every project I care about, and I've never once regretted it.

## Where this leads

Offline-first is really an argument about **ownership** — who holds the data, who controls access, and what happens when the vendor's server is down or the vendor is gone. I wrote about that side of it here: [You Don't Own That Software. You're Renting It.](/blog/you-dont-own-that-software-youre-renting-it/).

Offline-first isn't harder. It's just honest about the world your software actually lives in.

---

*Abdullah Tayyab — Full-Stack Developer, Punjab, Pakistan.*
