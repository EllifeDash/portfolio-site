---
title: "Aafiyat — Offline-First Patient Management"
summary: "A desktop patient-management system for private clinics in Pakistan — consultations, prescriptions, billing, and scheduling that keep running with no internet at all."
role: "Solo Full-Stack Developer"
status: "released"
stack: ["Node.js", "Express", "SQLite", "Supabase", "Electron", "Tailwind CSS"]
order: 1
---

## Problem

Private clinics across Pakistan run on paper and memory. Most have unreliable or no
internet, no budget for cloud subscriptions, and strict patient-privacy expectations.
They needed software that works the moment the doctor opens the laptop — no login
spinner, no "connection lost" mid-consultation.

## My approach

I designed Aafiyat as an **offline-first desktop app**. Local SQLite is the source of
truth; the doctor never waits on a network. A thin Supabase layer handles optional
backup and multi-device sync *when* connectivity exists, but the core workflow never
blocks on it.

## Workflow

1. **Model the clinic, not the database.** I started from the consultation itself —
   chief complaint → history → SOAP note → prescription → billing — and let the data
   model follow that, not the other way around.
2. **Electron shell + Express API.** A local Express server talks to SQLite; the
   Electron window is just a fast SPA. No server to deploy, no ports to manage.
3. **SOAP-first notes.** Structured templates keep notes consistent and billable,
   while free-text fields preserve the doctor's judgment.
4. **Graceful sync.** Supabase sync runs in the background; conflicts are flagged, not
   silently overwritten.

## Outcome

Aafiyat gives a small clinic a complete record system that survives power cuts and
patchy 4G. Prescriptions, billing, and appointment history live in one place, and the
doctor owns their data locally.

> The real feature isn't the UI — it's that the software is *there* when the network isn't.
