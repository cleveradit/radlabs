---
title: "A Local LLM as an AI Agent's Brain on a PC Without a Discrete GPU"
slug: "llm-lokal-ai-agent"
client: "Personal project"
role: "Experiment designer and executor"
team: "Solo, with Claude Code as an assistant"
period: "October 2026 – present"
status: "Experiment in progress. The server works and has been tested with Codex CLI"
statusShort: "Experiment in progress · Codex CLI"
problem: "How to run a 30-billion-parameter AI coding model locally on a home PC that relies only on an iGPU (no discrete graphics card), so code never has to be sent to the cloud."
solution: "Configured a llama.cpp inference server with the Vulkan backend on CachyOS to run Qwen3-Coder-30B-A3B (GGUF Q4), set up as a systemd service secured with ufw, then connected it to Codex CLI."
domain: "Local AI infrastructure"
stack: ["llama.cpp (Vulkan)", "Qwen3-Coder-30B-A3B (GGUF Q4)", "CachyOS", "systemd", "ufw", "Codex CLI"]
summary: "Running a 30B coding model on a home PC with only an iGPU, then wiring it into an AI agent harness. The goal: an agent that works without sending code to a cloud service."
featured: false
order: 4
confidential: false
repo: null
metrics:
  - label: "Model load time"
    value: "5:55 → 11 seconds"
  - label: "Generation, short context"
    value: "24.7 tokens/s"
  - label: "Follow-up question, prompt cache"
    value: "0.5 seconds"
  - label: "RAM bandwidth"
    value: "60.6 GB/s"
---

## Summary

I wanted to know how far an AI agent could run on my own hardware. The result: one PC with a Ryzen 7 8700G and 32 GB of RAM, without a separate graphics card, now serves the Qwen3-Coder-30B-A3B model through an OpenAI-compatible API. The server starts only when needed (`llm start`), is ready in about 10 seconds, and can be used by agent harnesses on the same PC or on other PCs on the local network.

## Choosing a Model from Constraints, Not from a Leaderboard

I did not start with "which model is the smartest?". My first question was "what limits speed on this machine?". The answer is measurable: **RAM bandwidth**. A multithreaded read benchmark gave 60.6 GB/s. That number also confirms the RAM is running in dual channel, since single channel only reaches about 30 GB/s.

From that constraint, the decision became clear:

- **Dense models of 30B and up are not viable.** Every token has to read all model weights from RAM, so speed is only a few tokens per second.
- **An MoE (Mixture of Experts) model makes the most sense.** Qwen3-Coder-30B-A3B has 30 billion parameters, but only about 3.3 billion are active per token. Quality close to a large model, speed close to a small one.
- **This model is trained for agentic coding**, so its tool calling is more reliable than a general chat model's.
- **The class above it does not fit.** Models such as GLM-4.5-Air or gpt-oss-120b need more than 45 GB of RAM.

## Letting the iGPU Hold a 20 GB Model

The model plus a 64k-token context needs about 20.5 GB of graphics memory. By default, the Linux kernel only lets the iGPU borrow half the RAM (15.2 GB) through the GTT mechanism. I raised that limit to 24 GB with kernel parameters:

```
ttm.pages_limit=6291456 ttm.page_pool_size=6291456 amdgpu.gttsize=24576
```

I deliberately chose GTT over raising VRAM in the BIOS. BIOS VRAM carves RAM out permanently, whereas GTT is only an upper limit: when the LLM is off, that RAM is available to other applications again.

## A Server That Runs Only When Needed

The first version was installed as a system service that started automatically at boot. That turned out to be the wrong call. Every time the PC was switched on, the 17.7 GB model loaded immediately, and the desktop felt sluggish for the first few minutes.

The final version uses a **systemd user service with no `[Install]` section**, so it simply cannot start at boot. To control it, I made one simple command:

| Command | Function |
|---|---|
| `llm start` | Starts the server and waits until the model is ready |
| `llm stop` | Stops the server and frees about 21 GB of RAM |
| `llm status` | Status, endpoint, and iGPU memory usage |
| `llm key` | Shows the API key to configure in a harness |

Network access is limited in two layers: an API key is required (requests without a key are rejected with HTTP 401), and the firewall only opens the port to the local subnet.

## A Finding I Wasn't Looking For: a Slowing SSD

On the first attempt, the model took **5 minutes 55 seconds** to load. Changing llama.cpp's loading mode did not help; one option even pushed load time up to 7 minutes 24 seconds. So I stopped tweaking software and started measuring hardware:

| Data read | Speed |
|---|---|
| Model file, about 1 hour after download | 42–50 MB/s |
| Old data, read directly from the device | 23–32 MB/s |
| A freshly written file | 4.2 GB/s |

This NVMe SSD reads data that has "settled" about 100 times slower than fresh data. The symptom is known as *stale-data read degradation*. Its SMART status was normal, so the problem would never have shown up if I had only checked disk health. After rewriting the model file to fresh blocks, load time dropped from **5 minutes 55 seconds to 11 seconds**. The procedure is now available as `llm refresh`.

The biggest lesson of the experiment came from here: measure the lowest layer first before blaming the most visible one.

## Measured Results

**Controlled benchmark** (requests sent directly to the server):

| Test | Result |
|---|---|
| Generation speed, short context | 24.7 tokens/s |
| Generation speed, about 14.5k-token context | 16.5 tokens/s |
| Prompt processing, about 14.5k tokens | 229 tokens/s (63 seconds) |
| Follow-up question with prompt cache | 0.5 seconds |
| Tool calling | Succeeded, with valid JSON arguments |

**Real use with Codex CLI** (from the server log):

| Test | Result |
|---|---|
| Prompt processing | 660 new tokens in 10.7 seconds (61 tokens/s) |
| Generation speed | 1,054 tokens in 104 seconds (10.1 tokens/s) |

The Codex numbers are lower than the benchmark, and that is expected. The agent carries a long conversation history and project context. The longer the context, the slower each token is generated. New parts of the prompt are also processed in small chunks, and small chunks are less efficient than one large prompt.

## Connecting to Codex

Codex version 0.159 only accepts providers using the Responses API format (`wire_api = "responses"`). It turns out llama.cpp already supports that format. I registered the local server as an additional provider and created a separate command, `codex-lokal`. That way, plain `codex` keeps using the cloud model, while `codex-lokal` starts the local server (if it is not running yet) and uses it.

Codex warns that the metadata for the `qwen3-coder-30b` model is unknown, so it uses fallback settings. I have set the context window myself. How well the tool format and system instructions fit a non-OpenAI model still needs further observation.

## Lessons

1. **Start from a measurable constraint.** RAM bandwidth decides the model choice more firmly than any benchmark score.
2. **Autostart is not a neutral default.** For a process that uses 21 GB of RAM, starting only when needed makes far more sense.
3. **A symptom in the application is not necessarily a problem in the application.** Slow model loading turned out to come from the SSD, and that only became clear after measuring at the device level.
4. **A local LLM on an iGPU can serve an agent, with honest expectations.** The results are good enough for small tasks and sensitive data, but do not yet replace cloud models for long, complex work.
