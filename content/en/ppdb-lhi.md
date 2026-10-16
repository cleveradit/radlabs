---
title: "Student Admission System (SPMB)"
slug: "ppdb-lhi"
client: "Sekolah Islam Terpadu LHI"
role: "Application analyst & developer, continuing an application already in use"
team: "SIT LHI IT team (2 people)"
period: "February 2026 – August 2026"
status: "Live, used by every school unit in the foundation, maintained to this day"
statusShort: "Live, used by 5 school units"
problem: "A foundation with five school units needed structured management of academic years, admission quotas, and inter-unit data access separation, along with an official communication channel integrated with parents and guardians."
solution: "Designed and implemented a multi-unit academic year and quota management layer using Laravel & Filament, inter-unit data isolation boundaries, Redis queues, Docker deployment, and automated notifications via email and the WhatsApp Business Cloud API."
domain: "Education technology"
stack:
  ["Laravel", "Filament", "Livewire", "Tailwind CSS", "Redis", "Docker", "WhatsApp Cloud API"]
summary: "Built the academic year and quota management layer, an official notification channel to guardians, and inter-unit data boundaries for an admission system serving five school units."
cover: "/images/ppdb/01-landing.png"
featured: true
order: 1
confidential: true
repo: null            # null = private repository
metrics:
  - label: "School units served"
    value: "5 units / 4 levels"
  - label: "Automated tests"
    value: "501"
  - label: "Automated notification moments"
    value: "7"
  - label: "Wizard design iterations"
    value: "3"
---

## Summary

Sekolah Islam Terpadu LHI is an education foundation with five school units across four levels (preschool, primary, junior high, senior high). The foundation already had an old admission website, but its limitations made the admins' work hard. The most painful one was this: **admins could not track which entry year an applicant had reserved.** The old system only recorded when someone registered, not which academic year they had booked a seat for (an advance reservation, *inden*).

I joined to continue developing the replacement application. On top of the existing foundation, I built a management layer that had not been available before:

- **Academic year and admission quota management** per school, programme, and admission track, including a single guided flow for opening a new academic year.
- **An official notification channel to guardians** via email and WhatsApp Business, complete with delivery history and read status.
- **Tiered access rights and inter-unit data isolation**, so each school unit only sees and changes its own data.

The application now runs admissions (SPMB) for every unit in the foundation.

![Online admission page: the parent/guardian side](/images/ppdb/01-landing.png)

![Step-by-step admission form, accessible from a phone](/images/ppdb/02-form-pendaftaran.png)

## Context & problem

Each unit has its own characteristics. Junior and senior high, for example, have their own programmes (such as Boarding) and admission tracks (Regular, Advance Reservation, Scholarship, Transfer). One application serves all these units, with each school's data kept separate from the others.

**The problem with the old application**, the reason this one was built:

- **Reservation years were not tracked.** Admins only saw when someone registered, not which academic year the seat was booked for. Quota planning and communication with parents became difficult.

**What had not yet been tackled when I joined**, the work I then took on:

- **No quota engine.** The number of accepted students was not limited by anything, and opening the next academic year required admins to set many things manually across several separate menus.
- **No notification channel.** Every status change (payment verified, interview scheduled, selection result) had to be passed on by admins one by one, with no record of whether the message actually arrived.
- **Inter-unit boundaries were not firm.** One admin panel was shared by every unit, while the data each unit was allowed to see should have differed.

## My role

I did not build this application from scratch. When I joined in February 2026, the initial foundation had already been built by a teammate. I continued it and developed it significantly.

| Already in place when I joined | What I built & developed |
|---|---|
| Basic online admission form | Quota & seat engine (accept/withdraw) + guided academic year opening flow |
| Public pages (admission, payment info, registration proof) | End-to-end official WhatsApp Business integration (Meta Cloud API) |
| Model-level separation of data between schools | Tiered access rights & hardened inter-unit isolation in the admin panel |
| Basic automated release process (CI/CD) | Background email notifications + delivery history |
| | Overhaul of the form engine, the interview flow, and various flow fixes |

In short: the foundation and basic admission flow already existed; **I built the management layer for admins, the communication channel to guardians, and the safeguards on inter-unit boundaries.**

Some features in this application were built by a teammate and are not my contribution, among them visitor analytics, maintenance mode, and the official links on the landing page. Those features are not covered in this case study.

![Admin dashboard: summary of the active academic year](/images/ppdb/03-dashboard-admin.png)

![Applicant data management for admins](/images/ppdb/04-daftar-pendaftaran.png)

## How requirements were found

There was no written SOP and no formal requirements document. I took meetings with management as the starting point, then checked directly with the admission admins at each unit, because what was said in meetings was not always what happened in the field.

From there I deliberately separated two kinds of work:

- **Rules already practised in the field, which I formalised into the system.** When a seat counts as taken, the scholarship track drawing from Regular seats, the 30% Advance Reservation and 70% Regular split, and per-unit bank accounts. All of these were already practised by admins. My job was to dig them out, align understanding, and make them consistent in the application.
- **What I proposed myself.** The academic year and quota model with its opening flow, and an official notification channel via email and WhatsApp Business.

For notifications, the original request was to send a WhatsApp message right after the form was submitted. I proposed an alternative: every official WhatsApp message has a cost, and many applicants drop out before paying. The outcome of the discussion with the Public Relations team: a submitted registration is confirmed by email only, and WhatsApp is used from the payment stage onwards.

There was also an operational reason: the old way of sending bulk messages through manual WhatsApp links had once got the admin's sender account blocked. An official channel closes off that risk.

## Academic year opening flow

Once academic year and quota features were added, a new challenge appeared: opening the next year required admins to set quotas, the academic year, and the merging of leftover reservation seats one by one across several separate menus. Admins felt overwhelmed.

The solution I designed: a single three-step guided flow.

1. The admin chooses the academic year to activate.
2. The admin only fills in quotas for the newest year not yet set; the rest is calculated by the system automatically.
3. The system completes everything at once in a single transaction: preparing the next academic year, creating new quotas, merging leftover reservation seats into the regular track, activating the academic year, and aligning the admission deadline across every unit.

In one run, this flow touches **three academic years at once**: the year being activated (its leftover reservations are merged), the following year (shown as a summary, already set in the previous transition), and the third year (whose quota the admin fills in now).

What made this work was not just the feature but its simplicity. It took three design attempts before the flow truly felt concise. The early versions still asked admins to fill in data the system already had.

![Step 1: choose the academic year to activate; the system marks the year that will be created automatically](/images/ppdb/05-wizard-langkah-1.png)

![Step 2: the admin only fills in the total quota; the Advance Reservation (30%) and Regular (70%) split is calculated automatically per school](/images/ppdb/06-wizard-langkah-2.png)

![Step 3: a full summary (year change, new quotas, merging leftover reservations) before execution](/images/ppdb/07-wizard-langkah-3.png)

## Official notifications via WhatsApp Business

Email alone was not enough: in a school setting, parents are far more responsive on WhatsApp. But sending from an admin's personal number leaves no trail and cannot be relied on.

I built a full integration with Meta's official WhatsApp Business Cloud API, from sending to template management, all from inside the application.

**Sending.** Seven key moments trigger an automatic message: registration submitted (email only), payment verified, interview scheduled, interview passed/not passed, re-registration, and final acceptance (email and WhatsApp). Messages are sent in the background through a queue, alongside email and independent of it; one channel failing does not bring down the other.

**History & read status.** Every message is recorded along with its journey: `pending` → `sent` → `delivered` → `read`, or `failed`. The `delivered` and `read` statuses come from Meta's webhook, so admins can tell whether a message was actually read, not merely sent.

**Template management without opening Meta Business Manager.** This was the most time-consuming part. Meta requires every automated message to use a template that has passed their review first. Instead of forcing admins to learn Meta's interface, templates are drafted, submitted, edited, and deleted directly from the panel, including templates whose attachment is a PDF document.

One simple rule keeps the page from ever being ambiguous: a **Draft** is a template that does not exist at Meta, a **Template** is one that does.

This rule gives synchronisation a clear answer for its hard cases. A template that disappears from Meta is not deleted but **demoted back to a draft** with its content intact, because the event and variable mapping is local data with no counterpart at Meta and cannot be restored by the next sync. But its status is deliberately not switched back on automatically, so a notification never comes back to life silently without the admin knowing.

![WhatsApp templates drafted and submitted to Meta directly from the panel, without opening Meta Business Manager](/images/ppdb/08-whatsapp-template.png)

![Delivery history: sent, delivered, and read statuses pulled from Meta's webhook](/images/ppdb/09-whatsapp-log.png)

## Inter-unit access rights and a silent regression in production

Five units share one admin panel, so the boundary of who may see what has to be firm. I flattened the role hierarchy into four (unit admin, treasurer, foundation admin, super admin) and hardened data isolation down to the query level. A unit admin only sees their own unit's applicants, quotas, and settings, including when trying to open another unit's URL directly.

The part I learned most from came later, from a bug report in production: after an admin added one new permission to the unit admin role, **every action button in the admission table suddenly disappeared** for that role.

The investigation ended at a library behaviour not visible from the application code. When a role is saved through the panel, the library syncs its permissions based only on the checkboxes shown on screen. Valid permissions with no checkbox (because they came from screens that do not generate checkboxes automatically) were silently revoked every time the Save button was pressed. No error, no warning. The symptom only showed up much later.

The fix rests on one principle: **every permission that has ever been granted must have a checkbox in the panel.** I surfaced fifteen permissions that had never been rendered, and, importantly, without renaming a single permission, so the fix needed zero data migration and carried zero risk to roles already running in production.

Two things that could not be inferred from reading the code, and only came to light through this investigation, I recorded as logged decisions so they would not repeat:

- A model with complete authorisation rules but no screen of its own never generates permissions, even though its rules exist and work.
- The name normalisation function the library uses is safe for some permission names but breaks others. Those two groups therefore need two different mechanisms to reach the screen.

![Roles & Permissions page: every permission that has ever been granted now has its own checkbox](/images/ppdb/10-peran-hak-akses.png)

## Quota engine, acceptance, and the scholarship track

Quota is the heart of this system: it decides who may register, when a track closes, and how many students are finally accepted. Three rules keep it consistent.

**Seats are taken on acceptance, not on registration.** An applicant who may not be accepted should not lock a seat. Quota only moves at two points: when a student is accepted (decreases) and when a student withdraws (returns). Form submission, interview scheduling, and interview results do not touch it at all.

**Closed by default.** An admission track only opens if its quota has actually been set up, is still active, and still has seats left. Missing data is not read as "open" but as "closed", so no registration ever slips into a track that has not been configured.

**Acceptance is guarded at the point of execution.** If the quota is already full when acceptance is processed, the whole process is cancelled and the applicant's status does not change, rather than accepting first and fixing it later.

**The Scholarship track** called for a different model, and this was an interesting business decision. A scholarship recipient is not an extra seat; they still occupy a desk in the same class. So Scholarship was not given its own quota but modelled as a cap inside the Regular quota: its seats come from the Regular pool, while the scholarship allocation is capped separately. The consequence admins need to understand: accepting five scholarship applicants means that unit's Regular seats drop by five, not that seats are added. Modelled as a separate pool, total acceptances would exceed the classes' real capacity.

![Quotas per unit, programme, track, and academic year: Regular, Advance Reservation, and Scholarship](/images/ppdb/11-kuota-pendaftaran.png)

## Other scope

Beyond the four stories above, here is other work I handled.

| Area | Content |
|---|---|
| Self-service status check | Guardians follow their application's progress through a tokenised link, with no account needed. Shown as a timeline, not just a status label |
| Interview flow | Scheduling, recording results, and rescheduling directly from the applicant detail page |
| Per-unit payment accounts | Registration fees go into each unit's own account, set by that unit. A unit that has not filled in its account shows a warning forbidding transfers, rather than silently using the wrong fallback account |
| Statement letter document | The foundation's statement letter is uploaded once, then automatically attached to emails and WhatsApp messages at the relevant moments |
| Email history | Every email sent is recorded with its status, and can be resent from the panel |
| Admin panel as a phone app | The panel can be installed on a phone's home screen (PWA), useful for unit admins working in the field |
| Dashboard, navigation, and theme | Panel consolidation, menu grouping, summary widgets, and a visual theme aligned with the public pages |
| Form engine overhaul | Admission field definitions moved from the database into structured configuration, making differences between levels and programmes far easier to trace |
| Infrastructure | Redis for queues and cache, queue workers as a self-restarting service, and consistent configuration across environments |

![Self-service status check through a tokenised link, shown as a timeline](/images/ppdb/12-cek-status.png)

![Payment information shows the account belonging to the unit the applicant registered with](/images/ppdb/13-informasi-pembayaran.png)

## Technical decisions

| Challenge | Decision | Benefit |
|---|---|---|
| When does a quota seat count as taken? | Quota decreases when a student is **accepted**, not on registration | Seats are not locked by applicants who may not be accepted |
| Acceptances could exceed the quota unnoticed | Acceptance is refused when the quota is full, and the seat is freed again if a student withdraws | Accepted numbers always match capacity |
| Registration could open while quota was not yet set | Registration is **closed by default**; it only opens when its quota is set up and still has seats | Prevents unwanted acceptances |
| Sending email & WhatsApp slowed down registration | Both are sent in the background through a queue, without holding up the user, and independently of each other | Registration feels fast; one channel failing does not bring down the other |
| A WhatsApp template disappears from Meta: delete or keep? | **Demoted to draft**, content intact, but its status is not switched on automatically | Event & variable mappings are not lost, and notifications never come back to life silently |
| Payment accounts moved from the foundation to each unit: is a fallback needed? | **No fallback.** A unit that has not filled it in shows a warning forbidding transfers | A wrong transfer into another unit's account passes reconciliation because the amount matches; an empty page gets reported immediately. Configuration failures are made loud, not silent |

I also made a habit of documenting the reasoning behind every technical decision, not just its outcome, so the system is easy to maintain and carry forward.

## Quality & reliability

- **Automatically tested.** 501 automated tests keep key functions from silently breaking when new features are added.
- **Automated, staged, and versioned releases.** Changes flow through a test environment before production, are applied through an automated process, and each release has its own version number and release notes.
- **Honest release notes.** Each release note lists the manual post-release steps and open debts, including things not yet verified. This section has saved us most often in the following release.
- **Tiered access rights.** Each role can only access the parts it is responsible for, and each unit only sees its own data.
- **Audit trail.** Important changes and admin sign-ins are recorded, and the records cannot be edited from the panel.
- **Maintained documentation.** Every shipped feature has its own document, and technical decisions that cannot be inferred from reading the code are recorded separately with their reasoning.

## Results & lessons

- Delivered core capabilities that did not exist before: tracking reservation years, managing academic years and quotas, and an official notification channel to guardians.
- Simplified the yearly process that burdened admins most into a single guided flow.
- Enforced inter-unit data boundaries, so one panel can be shared by five units without them seeing each other's data.
- The application now runs admissions (SPMB) for every school unit under the foundation.

**First lesson: admin comfort matters as much as end-user comfort.** A technically correct feature still fails if its flow overwhelms admins; it took three iterations before the academic year opening flow truly felt concise.

**Second lesson: silent failures are far more expensive than loud ones.** Permissions disappearing without any message only came to light after admins lost their working buttons in production. Since then, whenever I face a choice between "silently use a fallback value" and "stop and explain what is missing", I choose the second.

**Third lesson: the first request is rarely the real need.** Meetings give direction, but the admins in the field know the problem. Validating directly with users repeatedly changed my design before a single line of code was written.

---

*This case study does not include source code, passwords, site addresses, or real personal data. All screenshots use dummy data. The repository is private.*
