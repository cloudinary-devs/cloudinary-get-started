---
name: cld-get-started
description: >-
  Guide Cloudinary onboarding for new or existing projects through a gated,
  stack-detected setup flow. Use when the user asks to get started with
  Cloudinary, configure Cloudinary in a repo, set up Cloudinary in an IDE or
  agent environment, validate an existing integration, configure MCP or skills,
  handle credentials safely, choose the right SDK, validate upload presets,
  test delivery URLs, document environment setup, or identify next steps.
  Detect the project stack first; never assume React, Python, Node.js, or any
  other SDK unless detected or explicitly chosen.
---

# Cloudinary Getting Started

## When to use this skill

Use this skill when helping a user set up Cloudinary in a new or existing project, or when validating an existing Cloudinary integration.

This skill is especially useful when the user asks to:

- Get started with Cloudinary or CLD
- Configure Cloudinary in a codebase
- Set up Cloudinary in an IDE or agent environment
- Install or configure the right Cloudinary SDK for the detected stack
- Set up Cloudinary MCP servers or related AI tooling
- Handle credentials, environment variables, or .env files safely
- Validate upload presets or upload behavior
- Test generated delivery URLs
- Measure, inspect, or compare delivered assets
- Document the Cloudinary setup for the project
- Decide what to do next after the initial integration

## Operating principle

Run Cloudinary onboarding as a guarded, SDK-agnostic stage flow. Detect the project stack first, then use the official Cloudinary SDK, framework docs, or Cloudinary docs that match that stack. Full SDK rule: see `references/global-rules.md`.

Keep user-facing replies short, practical, and action-oriented. Do not narrate investigation steps. Recap completed work before asking the next question.

Follow this hard order whenever work remains:

1. Silent explore — then present the setup checklist
2. Stage 1: AI tooling
3. Stage 2: repo/framework check
4. Stage 3: detected-stack SDK + env file setup
5. Stage 4: credentials + MCP activation
6. Stage 5: preset + validation artifacts + Done gate
7. After the user replies `Done`: What's next

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
- [ ] Stage 4: Credentials + MCP activation
- [ ] Stage 5: Validation

**Stage X+1 — [stage name]**
[One or two sentences describing what will happen in the next stage.]

Reply to continue setup:

[Concrete gate question]

Answer with: [adapted cues]
```

Rules:
- Mark every completed stage with `[x]` in the checklist; leave upcoming stages as `[ ]`.
- The "Stage X complete" bullets are concrete and specific — name actual files, packages, and actions, not categories.
- The "Stage X+1" intro previews the next stage scope before the blocking prompt footer.
- **Exception for the Stage 4 → Stage 5 transition:** replace the one or two sentence preview with the full validation plan as a bulleted list, drawn from the "What this stage does" section of `references/stage-5-validation.md`. This gives the user a clear picture of everything validation covers before they confirm.
- The blocking prompt footer is always last (per `references/global-rules.md`).

**Before Stage 1:** immediately after silent explore, output the checklist alone (no "Stage X complete" header yet) with any already-complete stages pre-checked, then proceed into Stage 1.

## Internal setup state

Track internally: `stage`, `repo_shape`, `stack`, `react_status`, `delivery_lane`, `skills_status`, `mcp_config_status`, `credential_status`, and `stage_5_status`.

Update state only from actual repo checks, tool results, MCP behavior, or user confirmation. Do not infer completion from expected behavior or prior plans.

## Gate definitions

Use these gates as the single source of truth for stage progression.

### Stage 4 gate — AI tooling ready

Proceed to Stage 4 only when both are true:

- Required Cloudinary skills are installed in the current IDE or agent environment's canonical skills location.
- Both Cloudinary MCP server configurations are present for `cloudinary-asset-mgmt` and `cloudinary-env-config`.

If either item is missing, stop and complete Stage 1 before continuing.

### Stage 5 gate — credentials and MCP ready

Proceed to Stage 5 only when all are true:

- The workspace-root `.env` file exists.
- The user confirms real `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` values are saved there.
- Any required client-side env placeholders are handled for the detected framework.
- Either both Cloudinary MCP servers are reachable, or the D3 troubleshooting sequence in `references/stage-4-credentials.md` has been exhausted without success.

Never read `.env` contents to verify this gate.

## Reference files

Read the appropriate reference file when entering each stage or when detailed rules are needed. All files are in `references/` relative to this skill.

| File | When to read |
| --- | --- |
| `references/global-rules.md` | Before any stage — covers SDK rule, security rules, interaction rules, and the blocking prompt footer |
| `references/silent-explore.md` | Before classification — covers what to inspect, how to classify, and delivery lane rules |
| `references/stage-1-ai-tooling.md` | When entering Stage 1 — covers MCP server definitions, IDE config patterns, permission gate, and approval steps |
| `references/stage-2-framework-check.md` | When entering Stage 2 — covers repo shape branching and React detection |
| `references/stage-3-sdk-setup.md` | When entering Stage 3 — covers SDK install, env file setup, and Stage 4 gate enforcement |
| `references/stage-4-credentials.md` | When entering Stage 4 — covers D1/D2/D3 credential and MCP activation steps |
| `references/stage-5-validation.md` | When entering Stage 5 — covers preset creation, artifact requirements, and validation response format |
| `references/after-done.md` | After the user replies `Done` — covers next-step bullets and doc links |
