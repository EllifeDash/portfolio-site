---
title: Progressive Web Apps
blurb: Installable apps that keep working on one bar of signal — or none.
group: main
order: 2
stack: [Service Worker, IndexedDB, Background Sync, PWA]
highlights:
  - Installs to the home screen like a native app
  - Works fully offline — no network, no problem
  - Saves data locally, syncs when the connection returns
  - No app stores, no approval queues, one update for everyone
  - A fraction of the cost of a native app
---

A Progressive Web App is a website that behaves like an app. Visitors can install it to their home screen, open it full-screen, and keep using it even in a complete dead zone.

## The core promise

**It works when the network doesn't.** Data is saved to the device first, and a background sync mechanism pushes it to the server the moment a connection comes back. Nobody loses an order, a note, or a queue position because the signal dropped.

## How it works

- **Service worker** — pre-loads the app shell and content into a local cache, so the app opens instantly and offline
- **IndexedDB** — a full structured database in the browser, holding records saved while offline
- **Background sync** — queued work (saved forms, uploaded photos) goes out automatically when connectivity returns
- **Installable** — a tap on "Add to Home Screen", no app store approval, and updates flow to everyone at once

## Where it fits

- **Field work** — inspections, deliveries, surveys, visits where coverage is patchy
- **Clinics & shops** — staff move around the building; devices lose Wi-Fi; work shouldn't stop
- **News & reference content** — offline reading on slow commutes
- **Garment / retail teams** using phones as the main device

## Why it beats a native app for most jobs

Native apps make sense sometimes. But for a single organization serving its own people, a PWA costs a fraction, reaches every phone instantly, needs no store listing, and can be updated in seconds. It *is* a real progressive web app though — installable, offline-capable, and built for a phone-first country.

**Timeline:** 3–6 weeks for most PWAs.