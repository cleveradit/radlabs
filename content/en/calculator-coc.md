---
title: "Calculator CoC"
slug: "calculator-coc"
client: "Personal project"
role: "Sole developer"
team: "Solo"
period: "June 2026 – September 2026"
status: "Live — publicly available"
problem: "Clash of Clans players struggle to calculate precisely which combination of Equipment levels (Fireball, Giant Arrow, Rocket Backpack) and Earthquake Spells is needed to destroy a building with a given HP."
solution: "Built a damage simulation calculator with React, TypeScript, and Vite that calculates and recommends the most efficient attack combination based on the target building's HP."
domain: "Gaming tool"
stack: ["React", "TypeScript", "Vite", "GitHub Pages"]
summary: "A Clash of Clans damage calculator that combines Fireball, Giant Arrow, Rocket Backpack, and Earthquake to find attack combinations based on the target building's HP."
cover: "/images/calculator-coc/01-calculator.png"
featured: false
order: 3
confidential: false
repo: "https://github.com/cleveradit/calculator-coc"
liveUrl: "https://coc.radlabs.my.id"
liveLabel: "Open Calculator CoC ↗"
metrics: []
---

## Summary

Calculator CoC is a damage combination calculator for Clash of Clans. The user enters the target building's HP, picks the available attacks and their levels, and the app works out whether that combination is enough to destroy the building.

The calculator supports Fireball, Giant Arrow, Rocket Backpack, and Earthquake. Results update instantly as selections change, complete with a damage breakdown, a success status, and a minimum combination recommendation.

![Calculator CoC showing a Fireball, Giant Arrow, and Earthquake combination for a 5,800 HP target](/images/calculator-coc/01-calculator.png)

## Calculation model

Fireball, Giant Arrow, and Rocket Backpack deal fixed damage by level. Their values are stored as separate data per attack type, so balance updates can be applied without touching the calculator's core logic.

Earthquake needs a different approach because its damage is a percentage of the building's maximum HP and drops with each subsequent use. The calculator applies a *diminishing returns* pattern: the first use deals the full percentage, the second a third of it, the third a fifth, and so on.

After summing all fixed damage, the app looks for the smallest number of Earthquakes that covers the target's remaining HP. If fixed damage is already enough, Earthquake is marked as not needed. If the chosen combination still falls short, the result is shown as a failure.

## Usage flow

The user starts from a single building HP input. Each attack card can be switched on or off, while the level buttons adjust damage according to the available level data.

The result panel then shows:

- whether the building can be destroyed;
- total damage compared with the target's HP;
- each attack's contribution;
- the minimum number of Earthquakes required;
- a recommended combination and the overkill damage.

All calculation runs in the browser. No account, user data storage, or backend service is required.

## Data maintenance

Damage data lives in separate files for Fireball, Giant Arrow, Rocket Backpack, and Earthquake. This structure keeps number changes from game updates localised. The development history records a Rocket Backpack damage update in August 2026 that needed no change to the interface flow or any other formula.

## Release

The app is built as a static site with React, TypeScript, and Vite. Build and deploy run through GitHub Actions, and the result is published on GitHub Pages at [coc.radlabs.my.id](https://coc.radlabs.my.id).
