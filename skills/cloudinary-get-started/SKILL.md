---
name: cloudinary-get-started
description: >-
  Guide Cloudinary onboarding for new or existing projects through a gated,
  stack-detected setup flow. Use when the user asks to get started with
  Cloudinary, configure Cloudinary in a repo, set up Cloudinary in an IDE or
  agent environment, validate an existing integration, configure MCP or skills,
  handle credentials safely, choose the right SDK, validate upload presets,
  test delivery URLs, document environment setup, or identify next steps.
  Detect the project stack first; never assume React, Python, Node.js, or any
  other SDK unless detected or explicitly chosen.
metadata:
  author: Cloudinary
  version: 1.0.2
---

# Cloudinary Getting Started

## When to use this skill

Use this skill to set up or validate Cloudinary in a new or existing project, including the detected-stack SDK, credentials, AI tooling, delivery validation, and next steps.

## Operating principle

Run Cloudinary onboarding as a guarded, SDK-agnostic stage flow. Detect the project stack first, then use the official Cloudinary SDK, framework docs, or Cloudinary docs that match that stack. Full SDK rule: see `references/global-rules.md`.

Keep user-facing replies short, practical, and action-oriented. Do not narrate investigation steps. Recap completed work before asking the next question.

Follow this hard order whenever work remains:

1. Silent explore — then present the setup checklist
2. Stage 1: AI tooling
3. Stage 2: repo/framework check (ends with confirmation gate)
4. Stage 3: detected-stack SDK + env file setup
5. Stage 4: credentials (starts with D1 account check)
6. Stage 5: preset + validation artifacts + **Done gate** (REQUIRED — do not skip)
7. After the user replies `Done`: What's next (includes MCP activation)

**CRITICAL:** Stage 5 MUST end with the Done gate before showing What's next. The Done gate appears in `references/stage-5-validation.md` (the closing block of the "Verification response format" section). Do not show What's next until the user explicitly replies "Done".

**CRITICAL:** Immediately before writing the What's next reply, READ `references/after-done.md` in full — even if you read it earlier in the session — and copy each section you show verbatim from that file, word-for-word. Never write next-step content from memory. In particular, "Customize your cloud name" means renaming the cloud name on the product environments settings page — it is NOT the custom domain/CNAME feature; never mention CNAME, custom domains, subdomains, or Console paths like "Settings → Account".

At the end of every stage, use the stage completion format defined below.

Skip redundant work when silent explore, files, MCP behavior, or the user proves a stage is already satisfied. Do not replay or pseudo-validate work that was never missing. Even when skipping, still end with the Done gate, and always provide What's next after `Done`.

## Stage completion format

Use this exact format at the end of every stage. No exceptions.

```
**Stage X complete:**

- [one bullet per concrete thing done: files created, packages installed, config written, etc.]

**Here's the plan:**
- [x] Stage 1: AI tooling (MCP servers + skills)
- [ ] Stage 2: Framework detection
- [ ] Stage 3: SDK setup + environment file
- [ ] Stage 4: Credentials
- [ ] Stage 5: Verify setup automatically

**Stage X+1 — [stage name]**
[One or two sentences describing what will happen in the next stage.]

---
**Reply to continue setup:**

[Concrete gate question]

**Suggested reply:** [adapted cues]

---
```

**CRITICAL:** After the blocking prompt footer, you MUST STOP and wait for the user's response before proceeding to the next stage. Do not continue, do not start Stage X+1, do not run Stage X+1 setup code until the user answers.

Rules:
- Mark completed stages `[x]` and upcoming stages `[ ]`.
- Completion bullets name concrete files, packages, and actions.
- The next-stage intro previews *what* happens; only the blocking prompt footer asks whether to proceed.
- For Stage 4 → 5, replace the intro with the complete "What this stage does" bullets from `references/stage-5-validation.md`.
- The blocking prompt footer is last (per `references/global-rules.md`). Do not start the next stage before confirmation.

**Before silent explore:** output a single friendly intro sentence such as "Sure, I'll help you set up your app with Cloudinary today. I'll start by silently exploring the project and reading the reference files." before doing any file inspection. Do not narrate the exploration itself.

**Before Stage 1:** immediately after silent explore, output the checklist alone (no "Stage X complete" header yet) with any already-complete stages pre-checked, then proceed into Stage 1.

## Internal setup state

Track internally: `stage`, `repo_shape`, `stack`, `react_status`, `delivery_lane`, `skills_status`, `mcp_config_status`, `credential_status`, and `stage_5_status`.

Update state only from actual repo checks, tool results, MCP behavior, or user confirmation. Do not infer completion from expected behavior or prior plans.

## Gate definitions

Use these gates as the single source of truth for stage progression.

### After Stage 1 — proceed to Stage 2

Proceed only when the required Cloudinary skills are in the environment's canonical skills location and both `cloudinary-asset-mgmt` and `cloudinary-env-config` are configured.

### After Stage 2 — proceed to Stage 3

Proceed only after confirming the stack and delivery lane and receiving explicit approval through Stage 2's blocking prompt footer.

### After Stage 3 — proceed to Stage 4

Proceed only after the SDK is installed and configured, `.env.example` contains placeholders, and `.gitignore` excludes `.env`.

### Before Stage 4 — D1 account check is mandatory

**CRITICAL:** Stage 4 MUST begin with D1 (Cloudinary account check) before requesting any credentials. Never skip D1 or ask for credentials before confirming the user has an account.

**Stage 3 gate question:** The blocking prompt footer at the end of Stage 3 must ask only whether the user is ready to continue — NOT whether they have a Cloudinary account. The account check belongs to Stage 4 D1. Use this exact gate question and answer cues:

```
---
**Reply to continue setup:**

Ready to fill in your Cloudinary credentials?

**Suggested reply:** Yes, let's continue

---
```

### After Stage 4 D1+D2 — proceed to Stage 5

Proceed only after the user confirms an account (D1) and confirms retrieving all three credentials and saving real values in `.env` (D2).

### Before Stage 5 — SDK and credentials fully ready

Proceed only when the workspace-root `.env` exists, the user confirms all three `CLOUDINARY_*` values are real, and required client-side variables are handled. Never read `.env` to verify this.

## Reference files

Read the appropriate reference file when entering each stage or when detailed rules are needed. All files are in `references/` relative to this skill.

| File | When to read |
| --- | --- |
| `references/global-rules.md` | Before any stage — covers SDK rule, security rules, interaction rules, and the blocking prompt footer |
| `references/silent-explore.md` | Before classification — covers what to inspect, how to classify, and delivery lane rules |
| `references/stage-1-ai-tooling.md` | When entering Stage 1 — covers MCP server definitions, IDE config patterns, permission gate, and approval steps |
| `references/stage-2-framework-check.md` | When entering Stage 2 — covers repo shape branching and React detection |
| `references/stage-3-sdk-setup.md` | When entering Stage 3 — covers SDK install, env file setup, and Stage 4 gate enforcement |
| `references/stage-4-credentials.md` | When entering Stage 4 — covers D1/D2 credential retrieval and `.env` setup |
| `references/stage-5-validation.md` | When entering Stage 5 — covers preset creation, artifact requirements, and validation response format |
| `references/after-done.md` | After the user replies `Done` — covers next-step bullets (VS Code ext, customize cloud name, run app, activate MCP, build with Cloudinary) and cleanup guidance |
