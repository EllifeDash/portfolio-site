---
title: Desktop Applications
blurb: Offline-first desktop apps with data written to disk — not a server you hope stays up.
group: main
order: 4
stack: [Electron, SQLite, Local-first]
highlights:
  - Runs completely offline on the machine itself
  - Data stored in a local SQLite database you can back up
  - Quiet cloud sync in the background when you're online
  - Single install for Windows, no browser needed
  - Same codebase can power a matching web app later
---

Some work happens on a computer, not in a browser — billing in a clinic on a load-shedding day, stock handling in a shop, record work in an office with slow or unstable internet. For that, a desktop app that doesn't depend on a server is the honest answer.

## How it's built

**Electron** packages a real application with a real desktop install — no browser tab, no "is the server up?" worry. The app runs on the machine itself.

**SQLite** lives right on the hard drive. Every record, every change, every day's work is stored locally and owned by you. Back it up by copying one file, or run a scheduled backup automatically.

**Sync is a background feature, not a requirement.** When an internet connection is present, changes quietly mirror to the cloud. When it's not, the app simply keeps working. The software never blocks your work waiting on a network.

## Where it fits

- **Clinics & pharmacies** — billing and record systems that cannot stop for anything
- **Shops & warehouses** — inventory and POS on the shop floor
- **Back-office teams** — record systems on older computers with spotty internet
- **Standalone tools** — utilities and internal apps that just need to work

## What you get

- A single installable application, no browser dependency
- Data on your disk, under your control, easy to back up
- Optional cloud sync for reporting and continuity
- The same build can later generate a companion web app with no rewrite

**Timeline:** 3–6 weeks for most desktop apps.