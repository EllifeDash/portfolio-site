---
title: "CMS Extension — Government Complaint Monitoring"
summary: "A Manifest V3 Chrome extension for real-time SLA monitoring, policy-evasion detection, and suspicious offense-change tracking on an internal Complaint Management System."
role: "Developer (Internal Tooling)"
status: "live"
stack: ["Chrome MV3", "Vanilla JS", "DataTables API"]
order: 3
---

## Problem

The internal Complaint Management System (CMS) at Punjab Police handles citizen
complaints with strict SLAs — but nothing flagged when those SLAs were quietly missed,
when policy was being evaded, or when an offense classification changed after the fact.
Manual oversight didn't scale across thousands of records.

## My approach

I built a **production-grade Chrome extension** that runs inside the CMS, reading the
live DOM and DataTables API to monitor records in real time — without touching the
underlying government system.

## Workflow

1. **Observe, don't interfere.** The extension is a passive overlay; it reads rendered
   data and the DataTables API, never mutating CMS state.
2. **SLA timers.** Each complaint is checked against its deadline; breaches are
   surfaced immediately.
3. **Policy-evasion detection.** Patterns that indicate circumvention are flagged for
   review.
4. **Offense-change tracking.** When a classification changes post-submission, the
   extension records the before/after so accountability is preserved.

## Outcome

What was invisible became auditable. Supervisors gained a live view of SLA health and
a tamper-evident trail of suspicious changes — all from a lightweight extension that
required no changes to the core government system.
