---
title: "Cerdas Amat"
slug: "cerdas-amat"
client: "Personal project"
role: "Sole developer (game design, backend, frontend, 3D, DevOps)"
team: "Solo"
period: "October 2026 – present"
status: "Live, publicly available"
problem: "Practicing 1–9 × 1–9 multiplication alone is boring, while realtime head-to-head games usually need an always-on server, player accounts, and a monthly bill."
solution: "Built a multiplication tug-of-war game whose entire logic runs in one Cloudflare Durable Object per room over WebSocket Hibernation, keeping both phones in sync while staying on the free plan."
domain: "Educational game"
stack: ["Svelte 5", "TypeScript", "Three.js", "Cloudflare Workers", "Durable Objects", "WebSocket Hibernation", "Valibot", "PWA", "Playwright"]
summary: "Building a realtime multiplication duel for two players on their own phones, with an authoritative server on Cloudflare Durable Objects and 3D voxel characters, with no accounts, no database, and staying on the free plan."
cover: "/images/cerdas-amat/01-arena.png"
featured: false
order: 5
confidential: false
repo: "https://github.com/cleveradit/cerdas-amat"
liveUrl: "https://cerdas-amat.radlabs.my.id"
liveLabel: "Play Cerdas Amat ↗"
metrics:
  - label: "Average fps, simulated low-end phone"
    value: "59.4 fps"
  - label: "Unit and Durable Object tests"
    value: "90"
  - label: "End-to-end tests"
    value: "17"
  - label: "Initial JS (gzip)"
    value: "30.1 kB"
---

## Summary

Cerdas Amat is a web game for two players, each on their own device. Both race to answer 1–9 × 1–9 multiplication questions. Every correct answer pulls the rope one step toward the player who answered, and a player who leads by 5 correct answers wins immediately by KO. A match can also end when time runs out (30, 60, 90, or 120 seconds, chosen by the host), by forfeit, or by surrender.

![The arena on two phones: Fox and Panda pull the rope, with the same score and rope position on both screens](/images/cerdas-amat/01-arena.png)

Players need no account. The host creates a room, shares the 5-character code or a link through the Share button, and Player 2 joins. There are five voxel-style animal characters (cat, bear, fox, panda, and frog), each with five poses rendered in realtime. The app can be installed on a phone's home screen as a PWA.

![The character select screen, the lobby with the room code, and the result screen after a KO](/images/cerdas-amat/02-karakter-lobby-hasil.png)

## An authoritative server in a Durable Object

Each room is one Durable Object named directly after its code (`idFromName(code)`), so no room lookup table is needed. Only the Durable Object may change the score, rope position, phase, and timer. Clients send input and draw the state they receive.

The flow of one answer:

1. The client checks the answer against the local question. Wrong answers are never sent to the server.
2. A correct answer immediately shows the next question on screen, then the client sends `answer { q, value }`.
3. The server checks the phase, question number, and value. If it passes, the score goes up and a `tug` message is sent to both players.
4. Both clients move the rope from the `score` in the `tug` message, not from their own count, so the rope position is always the same on both phones.

The Durable Object processes messages one at a time. Two answers arriving almost simultaneously at a lead of 4 still have a definite order: the first one ends the match, and the second is rejected because the phase is already `result`.

Every deadline is handled by one alarm per Durable Object: end of countdown, end of time, pause limit, heartbeat check, lobby seat limit, result screen limit, and deletion of empty rooms. The alarm is always set to the nearest deadline, and its handler processes every deadline that has passed.

## Unstable phone connections

The game is designed for phones on mobile networks, so dropped connections are treated as normal events:

| Event | Behavior |
| --- | --- |
| Disconnected in the lobby | The seat is held for 60 seconds; a 128-bit seat token in localStorage reclaims that seat |
| Host switches to WhatsApp to share the code | The client tries to reconnect as soon as the page is visible again (`visibilitychange`) |
| Disconnected during play | The match pauses for 10 seconds and the remaining time is saved; at most 3 pauses per player |
| Not back within 10 seconds | The opponent wins by forfeit |
| Both players disconnected | The match is void with no winner |
| Host leaves the lobby | Player 2 becomes host with the same room code |

The client retries after 0.5, 1, and 2 seconds, then every 4 seconds. The timer on both phones stays the same even when device clocks differ, because the remaining time is computed from the server's `endsAt` plus the clock offset from the `sync` message.

## Staying on Cloudflare's free plan

The whole system runs on Cloudflare's free plan. If the quota runs out, there is no bill; operations simply fail until the reset at 07.00 WIB. The main limit is Durable Object active duration, not message count, and the estimated capacity is about 600–700 matches per day. Savings applied:

- **WebSocket Hibernation API:** rooms idling in the lobby do not count toward duration.
- **Wrong answers are not sent** to the server because they do not affect the score.
- **Pings are answered by `setWebSocketAutoResponse`** without waking the Durable Object. A player with no ping for 12 seconds is considered disconnected.
- **Storage writes at most once per second** during play. Each connection's seat identity is stored through `serializeAttachment`, so it uses no write quota.
- **162 questions are sent at once** in two chained decks of 81 questions, and a new deck is added before the questions run out, so the next question appears without waiting on the network.

If the quota still runs out, players see the message "Server sedang penuh, coba lagi setelah pukul 07.00 WIB" (server is full, try again after 07.00 WIB), not a technical error.

## Security without accounts

- **Message validation:** every message is defined once in the `shared` package along with a Valibot schema used by both client and server. Messages over 1 KB or invalid ones are rejected, and the connection is closed after 5 invalid messages.
- **Phase and seat checks:** every action is checked against the phase and the sender's seat; for example, only the host can change the duration or start.
- **Per-IP rate limits:** at most 20 new rooms and 30 wrong codes per minute. The limits are deliberately loose because a school or a mobile network often shares an IP, while 28.6 million code combinations make guessing ineffective.
- **Origin check** before the WebSocket upgrade.
- **Name filter** for Indonesian and English that normalizes digits used in place of letters (`4→a`, `0→o`, and so on).
- **No permanent data:** names and characters live only in room storage, and a room is deleted after being empty for 5 minutes.

## Voxel characters on low-end phones

The five characters were moved from an approved HTML preview into code data, one file per animal. Each body part is rendered as one `InstancedMesh` with pivots at the neck, shoulders, and hips, and every animation is computed in code.

Technical decisions for weak devices:

- **One shared `WebGLRenderer`** for the character select, arena, and result screens. Its canvas is moved to whichever screen is visible, because mobile browsers limit the number of WebGL contexts.
- **Three.js is imported dynamically** after the menu appears, so the first screen does not wait for the 3D modules. The initial bundle is about 30 kB of JS (gzip).
- **`devicePixelRatio` is capped at 2.** Without WebGL, the game still runs with a 2D rope.
- **Color calibration to the preview:** the preview uses Three.js r128, while r155 removed the legacy lighting mode. Color management is turned off and light intensity is multiplied by π, so all five avatars look identical to the preview, with a difference of 0 per color channel.

The automated performance test (`pnpm perf`) simulates a low-end phone: a 360×740 screen, DPR 2, and CPU slowed down 6×. The result averaged 59.4 fps, with a lowest second of 54 fps, well above the 30 fps pass threshold.

## Layered testing

| Layer | Tool | Coverage |
| --- | --- | --- |
| Unit | Vitest | `makeDeck` (10,000 chained decks: 81 unique questions per deck, no consecutive swapped pairs such as 3 × 4 then 4 × 3, safe joins between decks), KO/time/draw result rules, name filter, room code |
| Durable Object | `@cloudflare/vitest-plugin` | Create/join/full, host handover, pause and forfeit, 3-pause limit, simultaneous answers, end of time, rate limit |
| End-to-end | Playwright, 2 browser contexts | Full match to KO, time-out and draw, disconnect then resume, forfeit, visuals, security, audio, PWA |

In total there are 90 unit and Durable Object tests (shared 28, client 13, worker 49) and 17 end-to-end tests. Timers in the Durable Object tests are advanced by moving deadlines back through `runInDurableObject` and firing the alarm manually, so production code keeps using `Date.now()` with no injected clock.

## Workflow and release

This project was built with [A Documented Workflow for AI Agents](/en/penelitian/workflow-template/) (P-02). Before any code, the GDD and technical PRD were written first, including a table of 22 final product decisions. Development was split into 6 sequential phases, each with one pass condition. The server and game rules were built before the visuals, so the hardest part was tested first.

Every piece of work was written as an implementation ticket approved before execution. TICKET-001 through TICKET-004 cover phases 1 through 4, phase 5 was split into TICKET-005 (security and the Share button) and TICKET-006 (audio and PWA), and TICKET-007 renamed the product to Cerdas Amat.

One Worker serves the client assets, `POST /api/rooms`, and `GET /ws/:code` on the Custom Domain `cerdas-amat.radlabs.my.id`. Every pull request runs lint, typecheck, unit tests, Durable Object tests, build, and end-to-end tests, then deploys to a preview environment with a smoke test. Merging to `main` repeats the same steps and deploys to production through GitHub Actions.

The next phase is testing on real devices (Android Chrome, iPhone Safari, and PWA installation) and monitoring the daily quota during the first week of release.
