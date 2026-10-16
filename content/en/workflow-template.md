---
title: "A Documented Workflow for AI Agents"
slug: "workflow-template"
client: "Personal project, open to the public"
role: "Workflow designer"
team: "Solo"
period: "February 2026 – present"
status: "Used across many of my projects"
statusShort: "Used across many projects"
problem: "AI coding agents often modify many code files straight away without an agreed plan, and frequently lose architectural context when a working session changes."
solution: "Designed a documented workflow framework that requires the AI agent to write its implementation plan as a Markdown ticket and wait for human approval before touching code, with project context committed to Git."
domain: "Developer tooling"
stack: ["Markdown", "Claude Code", "GitHub"]
summary: "A workflow that forbids AI agents from touching code until their plan is written as a ticket and approved by a human, with project context committed to git."
featured: false
order: 2
confidential: false
repo: "https://github.com/cleveradit/ai-workflow-template"
metrics: []
---

## Summary

Every AI agent I used shared the same habit: whatever went into the prompt got acted on straight away. That included sentences that were plainly questions (ending in a question mark, without a single instruction in them), which still got answered by changing code.

I designed a workflow to close off that habit. Its core rule fits in one sentence: **the agent may only touch code once its plan is written as a ticket and I have approved that ticket.** Everything else is structure that makes the rule enforceable, not merely encouraged.

This workflow is now the starting point of every project I work on.

## The problem: questions answered by writing code

Agents do not tell "please do this" apart from "what do you think if we did this". Both arrive as instructions. While I was still weighing an approach, the code had already changed.

The cost is paid twice. First, the wrong result has to be torn out and redone. Second, the rework itself burns tokens. An already long context gets read again from the start to undo work I never asked for.

What made it tiring was not any single mistake but the need to supervise constantly. Every sentence I typed could become a command, so every sentence had to be thought through twice before sending.

A second problem came from a different direction. I move between computers, while the agent's local memory is not committed. Context built on one machine (agreed decisions, the reasoning behind a design, work left half-finished) was not available on the next. The same discussions repeated, and sometimes decisions changed without anyone noticing.

## The approval gate

The solution moves the approval point forward: before the code changes, not after.

Every piece of work goes through a plan ticket with four statuses, and the status decides what the agent may do:

| Status | Meaning | May execute? |
|---|---|---|
| `DRAFT` | Decisions not yet locked | No |
| `REVIEW` | Decisions locked, waiting for my corrections | No |
| `READY` | I have approved it in writing | Yes |
| `DONE` | Implementation and verification complete | Already done |

What makes this work is one constraint on `READY`: **the agent may not set that status on its own judgement.** The agent raises the ticket to `REVIEW` and stops. Only my written approval in the conversation moves it to `READY`.

The effect is more than preventing wrong code. The debate moves from the code to the ticket, and correcting one paragraph of a plan is far cheaper than tearing out a change that has already spread across many files.

## Four stops

The workflow has four stops, each for a different kind of information. Most documentation messes happen because all four get piled into one place.

| What comes up | Its stop | Its form |
|---|---|---|
| An idea or bug that may or may not be worked on | Backlog | Status `READY` or `BLOCKED` with the reason it is blocked. Removed from the backlog once it becomes a ticket |
| Work that will be executed | Plan ticket | A complete plan I must approve first |
| A feature that has shipped | Feature doc | A summary, a catalogue as a table, and gotchas not visible from the code |
| The reasoning behind a decision | Decision log | Four fixed fields: the decision, the reason, the impact, the related ticket |

This separation also answers a question that used to hang unresolved: where does something I mention in passing go? If it may not be worked on, it is an idea and goes in the backlog. If it has been decided, it is a ticket. If it is already running, it is a feature doc. If what needs remembering is the reasoning, it is a decision entry.

## Rules that bind the agent

Three rules keep this workflow from sliding back into old habits.

**Context must be committed, not kept in the agent's local memory.** Everything that needs to survive between sessions (decisions, ticket status, analysis results, progress from the last session) is written to files that go into git. The agent's local memory may not be treated as the source of truth, because it is not committed and therefore does not exist on the next computer. This is what lets work continue from another machine: I open the project, the agent reads the files, and the context is whole again without me retelling it.

**Technical contracts in a ticket may not be ambiguous.** A ticket names file paths, function signatures, return value shapes, and integration points exactly. The template has two explicit prohibitions: writing "or related files" is forbidden, and widening the scope without fresh approval is forbidden. Loose wording is the most common loophole for an agent to do something it was not asked to do while still feeling compliant with the ticket.

A ticket must also include an acceptance test matrix with at least one edge case and one failure case. The success scenario is always easy to write; it is those two cases that decide the outcome.

**Decisions are only recorded if they meet the criteria.** A decision belongs in the decision log if it is a technical trap that cannot be inferred from reading the code, a business trade-off whose consequences are not visible, or a correction to an assumption that turned out wrong. Code tidying, small visual changes, and anything already written in the project mandate are not recorded. Superseded entries are deleted, not left to pile up.

These criteria exist to protect the log itself. A log that records everything stops being read, and a log that is no longer read might as well not exist.

## The shape of the workflow

Everything is plain Markdown files, with no extra tooling and no dependency on any particular language or framework.

| File | Its role |
|---|---|
| Main context file | The entry point the agent reads at every new session; pulls in the project mandate and links to work in progress |
| Mandate & rules | Tech stack, architectural boundaries, technical rules, and how to run the project locally. These four parts are refilled per project; the workflow part stays the same |
| Backlog | Ideas and bugs that are not yet tickets |
| Plan index | The execution order of active tickets and their dependencies |
| Ticket template | Eight fixed sections, from the business decision to a list of what is explicitly out of scope |
| Session notes | Active ticket, progress, blockers, and next steps |
| Feature index | The list of feature docs and their writing conventions |
| Decision log | Technical decisions and trade-offs that cannot be read from the code |

Finished tickets are not deleted. They move to an archive folder and their entry is removed from the index, so the index only lists work that is actually running. New ticket numbers are checked against the archive first so they never collide with old tickets.

The mandate is deliberately split into two layers. The top four parts (tech stack, architectural boundaries, technical rules, and development environment) differ per project and are filled in at initiation. The workflow part is not refilled: it is the part that must be the same everywhere, because if every project had its own version of the rules, none of them would truly bind.
