---
title: "Why I Build Software That Works When the World Doesn't"
description: "After 5+ years running mission-critical systems, I learned that reliable software must degrade gracefully, write locally first, and assume the network will vanish. Here's how it shapes Aafiyat and every project I build."
pubDate: 2026-09-08
tags: ["offline-first", "reliability", "mern", "electron", "pwa", "pakistan"]
author: "Abdullah Tayyab"
readingTime: "8 min read"
image: "https://abdullahtayyab.dev/assets/avatar_web_developer.png"
---
# Why I Build Software That Works When the World Doesn't

**TL;DR:** Five years running mission-critical systems where failure has a human cost taught me: software that fails users at the wrong moment isn't software — it's a liability. Everything I build now is shaped by that standard.

Most developers learn about data integrity from textbooks. I learned it from the front line.

For over five years, I have operated the internal systems that keep a busy public department running — services with strict deadlines, worked by operators who can't stop when something breaks. My day-to-day is operating the systems that process cases, track deadlines, and keep records accurate. When these systems go down or produce corrupt records, real people wait longer for what they need. That is not an abstract consequence.

The core system I operate daily is built on SLA timers. Every case has a deadline. Every missed deadline has a human cost. I have watched what happens when the software misbehaves — when network drops cause data loss, when form submissions silently fail, when records are altered to game the system. The problems are rarely dramatic. They are quiet failures: a missed alert, a duplicate record, a timestamp that does not match. But quiet failures compound.

That is where my obsession with reliability comes from. Not from a design philosophy I read about — from work I have actually done.

---

## The Parallel Track: Teaching Myself to Build

Alongside my day job, I started building. Not because I wanted to "pivot" — I still work in IT operations and take that responsibility seriously — but because I could see the gap between the software people in my region needed and what was available to them.

I completed a BSc in Computer Science through Virtual University of Pakistan while working full-time. Self-taught the MERN stack. Took Harvard's CS50. Learned React, Node.js, Express, and SQLite by building things that needed to exist — not tutorial projects, but tools that actual clinics and actual users would run.

The process was slow. That was fine. I was not in a hurry to ship something half-built.

---

## Why "Offline-First" Is Not a Feature — It Is a Commitment

Pakistan has improving internet infrastructure, but load-shedding is real, connectivity in smaller cities is inconsistent, and the users I build for cannot afford to have their work interrupted by a spinner that never resolves.

When I started building Aafiyat — a clinic management system for private practices — the first question was not "what framework should I use?" It was: "What happens when the doctor's office loses power at 3 PM on a Tuesday?"

The answer shaped the entire architecture. Aafiyat runs on Electron with SQLite as its local database. Consultations, prescriptions, billing, and patient records are all written to disk first. When the connection returns, it syncs to Supabase. The clinic never stalls because the internet did.

This is what I call building for the actual environment, not the ideal one. Most software is designed assuming stable connectivity and modern hardware. In my city — and in most of Pakistan's smaller cities — that assumption is wrong. My job is to not make it.

---

## What I Am Building Now

**Aafiyat** is a desktop-first, offline-capable patient management system for private clinics. SOAP consultation records, prescription generation, billing, appointment scheduling — all of it designed to run without depending on a cloud connection. It is live and in use.

**Nankana Home Care** is a three-tier platform I built for a local home care service. It includes a public-facing booking site, an offline-first PWA that allows medical assistants to record patient data in Urdu without internet, and a secure admin portal for staff management. It is in production at [nankana-home-care](https://ellifedash.github.io/nankana-home-care/).

**CMS Extension** is a Chrome extension I built for internal use at work. It sits on top of the internal case-management system I operate daily and adds SLA deadline tracking, suspicious record-change detection, and desktop alerts for overdue cases. It has zero external dependencies and runs entirely in the browser. This one does not have a public repo, but it is the most direct expression of what I believe software should do: solve a real problem, stay out of the way, and never crash.

These are not portfolio pieces designed to impress interviewers. They are tools built for people I know, in a city I live in, for problems I have watched go unsolved.

---

## The Philosophy, Plainly Stated

I do not use the word "resilient" as marketing. I use it as a specification.

Software should degrade gracefully. It should write to local storage before trying the network. It should tell users what went wrong in plain language. It should not require a stable connection to do its core job. And it should not break because someone closed a laptop lid at the wrong moment.

I build this way because the systems I operate every day were not built this way, and I have seen what that costs. I am not interested in building the same category of problem.

---

## What I Am Looking For

If you are a clinic, a local business, or a small organization in Pakistan that needs software — particularly a POS system, a management platform, or a patient record system — I build for exactly your environment. Offline-first, fast, and designed to run on the hardware you already have.

If you are a hiring manager or a developer team looking for someone who understands public-sector operations, data integrity under pressure, and full-stack MERN development: my background is unusual, and I think that is worth a conversation.

---

## Further Reading

- [Why I Build Offline-First](/blog/why-offline-first) — the technical rules I follow
- [What Operating Mission-Critical Systems Taught Me](/blog/what-operations-taught-me) — the origin story

---

See what I am working on right now: [abdullahtayyab.dev/now](https://abdullahtayyab.dev/now)

Connect on LinkedIn: [linkedin.com/in/abdullah-tayyab-dev](https://www.linkedin.com/in/abdullah-tayyab-dev/)

Or just reach out directly: contact@abdullahtayyab.dev

---

*Abdullah Tayyab is a Full-Stack Developer based in Punjab, Pakistan. He specializes in MERN stack development, Electron.js desktop applications, and offline-first PWA architecture.*