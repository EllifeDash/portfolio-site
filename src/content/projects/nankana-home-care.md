---
title: "Nankana Home Care — A Three-Tier Healthcare Ecosystem"
summary: "A brochure site, an offline-first PWA for field medical assistants, and a secure admin portal — three tools, one healthcare network, built for a rural district with patchy signal."
role: "Full-Stack Developer"
status: "live"
stack: ["Vanilla JS", "Supabase", "PWA", "GitHub Pages", "n8n"]
liveUrl: "https://ellifedash.github.io/nankana-home-care/"
order: 2
---

## Problem

Home healthcare in a rural district means coordinators, medical assistants in the
field, and patients' families — all needing different things from the same service. No
single website could serve a brochure viewer, a field worker with no signal, and an
admin managing assignments, all at once.

## My approach

I split the system into **three tiers**, each with the right level of technology:

- **Public site** — a quiet, fast brochure on GitHub Pages for families to learn and
  book.
- **MediAssist Pro (PWA)** — an offline-first app for medical assistants to record
  visits in the field, syncing when they regain signal.
- **Admin portal** — secure, with magic-link onboarding for coordinators.

## Workflow

1. **Map the three audiences before writing a line of code.** Each got its own surface, built for how it would actually be used.
2. **n8n for automation** — booking notifications and assistant assignment run as
   workflows, not bespoke backend code.
3. **PWA for the field** — service workers and local storage keep MediAssist usable
   offline; Supabase replicates when online.
4. **Zero-friction admin access** — magic links remove password friction for
   non-technical coordinators.

## Outcome

A complete, low-cost healthcare stack that meets each user where they are — a family
with a browser, an assistant with a phone and no bars, and a coordinator who just needs
it to work.
