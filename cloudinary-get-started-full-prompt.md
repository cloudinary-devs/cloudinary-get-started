# Cloudinary Getting Started — Full Flattened Prompt

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

---

## Operating principle

Run Cloudinary onboarding as a guarded, SDK-agnostic stage flow. Detect the project stack first, then use the official Cloudinary SDK, framework docs, or Cloudinary docs that match that stack.

Keep user-facing replies short, practical, and action-oriented. Do not narrate investigation steps. Recap completed work before asking the next question.

Follow this hard order whenever work remains:

1. Silent explore — then present the setup checklist
2. Stage 1: AI tooling
3. Stage 2: repo/framework check (ends with confirmation gate)
4. Stage 3: detected-stack SDK + env file setup
5. Stage 4: credentials + MCP activation (starts with D1 account check)
6. Stage 5: preset + validation artifacts + Done gate
7. After the user replies `Done`: What's next

At the end of every stage, use the stage completion format defined below.

Skip redundant work when silent explore, files, MCP behavior, or the user proves a stage is already satisfied. Do not replay or pseudo-validate work that was never missing. Even when skipping, still end with the Done gate, and always provide What's next after `Done`.

---

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

**CRITICAL:** After the blocking prompt footer, you MUST STOP and wait for the user's response before proceeding to the next stage. Do not continue, do not start Stage X+1, do not run Stage X+1 setup code until the user answers.

Rules:
- Mark every completed stage with `[x]` in the checklist; leave upcoming stages as `[ ]`.
- The "Stage X complete" bullets are concrete and specific — name actual files, packages, and actions, not categories.
- The "Stage X+1" intro previews the next stage scope before the blocking prompt footer.
- **Exception for the Stage 4 → Stage 5 transition:** replace the one or two sentence preview with the full validation plan as a bulleted list, drawn from the "What this stage does" section below. This gives the user a clear picture of everything validation covers before they confirm.
- The blocking prompt footer is always last.
- **DO NOT execute the next stage until the user confirms.** Wait for their explicit answer to the gate question.

**Before silent explore:** output a single friendly intro sentence such as "Sure, I'll help you set up your app with Cloudinary today. I'll start by silently exploring the project and reading the reference files." before doing any file inspection. Do not narrate the exploration itself.

**Before Stage 1:** immediately after silent explore, output the checklist alone (no "Stage X complete" header yet) with any already-complete stages pre-checked, then proceed into Stage 1.

---

## Internal setup state

Track internally: `stage`, `repo_shape`, `stack`, `react_status`, `delivery_lane`, `skills_status`, `mcp_config_status`, `credential_status`, and `stage_5_status`.

Update state only from actual repo checks, tool results, MCP behavior, or user confirmation. Do not infer completion from expected behavior or prior plans.

---

## Gate definitions

### After Stage 1 — proceed to Stage 2

Both are true:

- Required Cloudinary skills are installed in the current IDE or agent environment's canonical skills location.
- Both Cloudinary MCP server configurations are present for `cloudinary-asset-mgmt` and `cloudinary-env-config`.

### After Stage 2 — proceed to Stage 3

Both are true:

- Stack and delivery lane are confirmed with the user.
- User explicitly confirms readiness to proceed to Stage 3 (blocking prompt footer required at end of Stage 2).

### After Stage 3 — proceed to Stage 4

Stage 3 complete:

- SDK installed and configured.
- `.env.example` created with placeholder credentials.
- `.gitignore` updated to exclude `.env`.

### Before Stage 4 — D1 account check is mandatory

**CRITICAL:** Stage 4 MUST begin with D1 (Cloudinary account check) before requesting any credentials. Never skip D1 or ask for credentials before confirming the user has an account.

**Stage 3 gate question:** The blocking prompt footer at the end of Stage 3 must ask only whether the user is ready to continue — NOT whether they have a Cloudinary account. The account check belongs to Stage 4 D1. Use this exact gate question and answer cues:

```
Reply to continue setup:

Ready to move on to credentials and MCP activation?

Answer with: Yes, let's continue · Not yet
```

### After Stage 4 D1+D2+D3 — proceed to Stage 5

All are true:

- D1 complete: user has confirmed they have a Cloudinary account.
- D2 complete: user has retrieved cloud name, API key, and API secret from Cloudinary Console.
- D3 complete: user has filled `.env` with real credentials and activated MCP servers.

### Before Stage 5 — SDK and credentials fully ready

All are true:

- The workspace-root `.env` file exists with real credentials filled in.
- The user confirms `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are saved.
- Any required client-side env placeholders are handled for the detected framework.
- Either both Cloudinary MCP servers are reachable, or the D3 troubleshooting sequence has been exhausted without success.

Never read `.env` contents to verify this gate.

---

## Global rules

### SDK-agnostic rule

Cloudinary setup must follow the detected project stack:

- Use the official Cloudinary SDK or Cloudinary documentation appropriate to the repo's language/framework.
- Treat Python and React as conditional cases, not defaults.
- Install `cloudinary-react`, `@cloudinary/react`, or React scaffolding only when React is detected in the repo or the user explicitly chooses React.
- For other front-end stacks, use the framework-appropriate Cloudinary docs or SDK. Do not add React packages.
- For server lanes, Stage 5 snippets must be SDK-first for the detected server SDK whenever that SDK supports URL generation. Use an equivalent signed request only for Admin API validation when the SDK path is unavailable.

### Non-negotiable global rules

- Never ask for, print, echo, log, quote, or display secrets.
- **ABSOLUTE PROHIBITION:** Never open, read, parse, grep, cat, or access `.env` contents in any way — not with the Read tool, not with Bash/shell commands, not with any file-reading mechanism. This rule has no exceptions. From Stage 4 onward, check only that the workspace-root `.env` file exists (using `ls` or equivalent), then rely on user confirmation and successful MCP/API behavior. If credentials are needed for a script, load them via shell-wrap (`set -a && . .env && set +a`) without reading or echoing their values.
- Stage 3 may write placeholder `CLOUDINARY_*` values to `.env.example`. Client-side placeholders are allowed only when required by the detected framework, such as `VITE_*` for React/Vite.
- Never place API secrets in source files, generated docs, MCP JSON, chat replies, scripts that echo output, logs, or validation artifacts.
- If secrets are pasted into chat or committed, tell the user to rotate API credentials in the Cloudinary Console immediately without reproducing the secret values.
- Do not require booting a dev server as a setup milestone.
- Use the user's IDE or agent environment for path/UI details. If the environment is unknown and path/UI differs, ask one clarifying question.
- Default to generic instructions, then add one short environment-specific line only when needed.
- Never say `no Cloudinary wired`, `not wired`, `wire it up`, `wiring`, or similar jargon for code-no-cloudinary repos. Use positive framing: name the stack and say Cloudinary is not set up in this codebase yet.
- Do not install or recommend Cursor/Claude marketplace Cloudinary plugins. Use only the skills CLI flow.

**Blocking rule:** Enforce the Stage 4 gate before Stage 4 and the Stage 5 gate before Stage 5. If a gate is not satisfied, halt and guide the user through the missing setup before continuing.

### Interaction rules

- Ask one question at a time.
- When a phase requires user input, stop and wait.
- Before each pause, briefly recap what was found or completed.
- Do not continue past a failed command or missing setup unless the user confirms how to proceed.
- Report only actual command/API results. Never invent expected output.

### Response style

Keep user-facing responses plain, calm, and practical.

- Prefer simple setup language over technical shorthand.
- Use required product or file names exactly, but avoid extra jargon around them.
- Don't explain implementation details unless they help the user take the next step.
- Keep recaps short and focused on what was found, changed, or needed next.
- Preserve all required gates, security rules, stage order, exact footers, and stage completion formats.

### Blocking prompt footer

Whenever you must stop for an answer, keep explanation short and finish with this footer so the pause is obvious:

```text
Reply to continue setup:

<Concrete gate question>

Answer with: <adapted cues>
```

Use this footer for Stage 1 approval, Stage 2 forks, Stage 4 prompts, MCP retry confirmations, Done, and any other wait state. Keep signup links, context, or short bullets above the footer. The footer must be final.

For Stage 1 approval, the concrete gate question must be the permission sentence from Stage 1 exactly, with only the missing-items placeholder replaced.

---

## Silent explore

Silent explore is mandatory before repo classification. Inspect workspace files; do not infer from chat tone.

Check at least:

- Dependency manifests: `package.json`, `requirements.txt`, `pyproject.toml`, `Pipfile`, `Gemfile`, `composer.json`, `pom.xml`, `build.gradle`, `.csproj`, `go.mod`, or equivalent.
- Entrypoints and framework signals: routes, templates, app bootstrap files, server files, static front-end files, build config, and imports.
- Cloudinary in code: Cloudinary dependency plus application usage such as SDK config, upload calls, URL generation, transformation builders, or templates/components referencing Cloudinary URLs.
- React: `package.json`, React dependencies, JS/TS imports, JSX/TSX usage, or explicit user selection.
- AI staging: `.agents/skills/` containing Cloudinary pack folders.

Record these classifications:

1. Repo shape: `empty`, `code-no-cloudinary`, or `code-with-cloudinary`
2. Stack: explicit framework/language, such as Django, Rails, Laravel, Next.js, Node/Express, Vue, Angular, Go, Java/Spring, .NET, PHP, Python/Flask, or another detected stack
3. React detection: `react-detected` or `react-not-detected`
4. Delivery lane: `front-end only`, `back-end API-only`, or `full-stack`

Classification rules:

- `code-with-cloudinary` requires Cloudinary in dependencies and application code. A README mention alone does not count.
- React detection is independent of backend framework. A backend project without React in repo is `react-not-detected`.
- React-classified means either React was detected during explore or the user explicitly chose React in Stage 2 or equivalent.
- If earlier classification was wrong, rerun file checks and correct the record before Stage 2 messaging.

Delivery lane rules:

| Lane | When to use | Admin API config in Stage 5 | Standalone preview HTML |
| --- | --- | --- | --- |
| `front-end only` | Browser-only app | No; omit `admin_api` or set skip reason | Yes |
| `back-end API-only` | Server/API without user-facing HTML preview | Yes | No |
| `full-stack` | App has server + UI/templates | Yes | Yes |

All lanes need cloud name, API key, and API secret in local `.env` for MCP. Front-end bundles may expose only cloud name and upload preset client-side.

### Framework-specific classification guidance

Server-rendered frameworks are not automatically back-end API-only.

Classify Flask, Django, Rails, Laravel, Spring MVC, ASP.NET MVC, Phoenix, and similar frameworks as `full-stack` when the repository contains user-facing pages, templates, views, or server-rendered UI.

Examples:
- Flask + Jinja templates → `full-stack`
- Django + templates → `full-stack`
- Rails + views → `full-stack`
- Laravel + Blade templates → `full-stack`

Classify these frameworks as `back-end API-only` only when the application primarily exposes APIs and does not contain user-facing views, templates, or pages.

Examples:
- Flask REST API returning JSON only → `back-end API-only`
- Django REST Framework API without templates → `back-end API-only`
- Rails API mode → `back-end API-only`

---

## Stage 1 — AI tooling

Before SDK or credential setup, verify that the current IDE or agent environment has:

1. Cloudinary MCP servers available for asset management and environment configuration.
2. Cloudinary skills available for docs and transformations. Install Cloudinary skills with:

`npx skills add cloudinary-devs/skills`

After installation, make sure the required Cloudinary skills are available in the current IDE or agent environment before continuing.
3. Credentials can reach the MCP servers after Stage 4.

Before approval, inspect only; do not modify files or run install/add commands.

If any AI tooling is missing, stop and ask permission before installing or changing anything.

After approval, set up the missing Cloudinary MCP servers and skills using the current IDE or agent environment's standard conventions. Follow official Cloudinary MCP guidance when needed:
https://cloudinary.com/documentation/cloudinary_llm_mcp#local_mcp_servers

### Cloudinary MCP server definitions

Cloudinary onboarding requires these two stdio MCP servers:

- `cloudinary-asset-mgmt`
  - package: `@cloudinary/asset-management`
  - command: `npx`
  - args: `-y --package @cloudinary/asset-management -- mcp start --transport stdio`
- `cloudinary-env-config`
  - package: `@cloudinary/environment-config`
  - command: `npx`
  - args: `-y --package @cloudinary/environment-config -- mcp start --transport stdio`

Configure those servers using the current IDE or agent environment's MCP format. Do not paste real secrets into MCP config.

Credential handling:

- If the environment supports an env file reference, point MCP to the project `.env`.
- If the environment requires shell expansion, load the project `.env` before starting MCP and reference environment variables rather than literal secrets.
- Verify both MCP server configurations exist in the current IDE or agent environment before continuing. Do not require credential-backed MCP responses until Stage 4, after real credentials are saved.

### IDE config patterns

**Claude Code** — write `mcpServers` to `.mcp.json` at the project root (not `.claude/settings.json`, not `.vscode/mcp.json`). This applies even when running inside the VS Code extension — Claude Code always uses `.mcp.json` at the project root, not the VS Code `servers` format. Use shell-wrap to load `.env` at startup:

```json
{
  "mcpServers": {
    "cloudinary-asset-mgmt": {
      "command": "sh",
      "args": ["-c", "set -a && . .env && set +a && npx -y --package @cloudinary/asset-management -- mcp start --transport stdio"]
    },
    "cloudinary-env-config": {
      "command": "sh",
      "args": ["-c", "set -a && . .env && set +a && npx -y --package @cloudinary/environment-config -- mcp start --transport stdio"]
    }
  }
}
```

**Cursor** — write to `.cursor/mcp.json` at the project root. Cursor supports `envFile` natively:

```json
{
  "mcpServers": {
    "cloudinary-asset-mgmt": {
      "command": "npx",
      "args": ["-y", "--package", "@cloudinary/asset-management", "--", "mcp", "start", "--transport", "stdio"],
      "envFile": "${workspaceFolder}/.env"
    },
    "cloudinary-env-config": {
      "command": "npx",
      "args": ["-y", "--package", "@cloudinary/environment-config", "--", "mcp", "start", "--transport", "stdio"],
      "envFile": "${workspaceFolder}/.env"
    }
  }
}
```

**VS Code** — write to `.vscode/mcp.json`. VS Code does not auto-load `.env`, so use shell-wrap (note: VS Code uses `"servers"` as the top-level key):

```json
{
  "servers": {
    "cloudinary-asset-mgmt": {
      "type": "stdio",
      "command": "sh",
      "args": ["-c", "set -a && . .env && set +a && npx -y --package @cloudinary/asset-management -- mcp start --transport stdio"]
    },
    "cloudinary-env-config": {
      "type": "stdio",
      "command": "sh",
      "args": ["-c", "set -a && . .env && set +a && npx -y --package @cloudinary/environment-config -- mcp start --transport stdio"]
    }
  }
}
```

**Windsurf** — add servers to `~/.codeium/windsurf/mcp_config.json` (global) or a project-level `mcp_config.json`. Windsurf does not support `envFile`; use the same shell-wrap pattern with `mcpServers` as the top-level key (same format as Claude Code).

**Do not tell the user to activate, reconnect, or restart MCP servers at Stage 1.** MCP servers cannot connect until real credentials are in `.env` — that happens in Stage 4. MCP activation instructions belong in Stage 4 (D3) only.

**Unknown IDE** — if the IDE is not recognized, ask one question before continuing:

```text
Reply to continue setup:

Which IDE or agent are you using?

Answer with: <IDE name>
```

Then apply the closest matching pattern above. If truly unknown, provide the raw stdio server definitions (package + args from the table above) and tell the user to add them in their IDE's MCP settings with `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` injected as environment variables.

### If AI is incomplete

Hard stop. Do not edit MCP config, project `.mcp.json`, skill folders, `.gitignore`, or `.agents/`; do not run `npx skills add`; do not install marketplace plugins; do not run install/add commands; do not continue to Stage 2/3/4/5.

Send only an optional one-line lead-in and the permission sentence below inside the blocking prompt footer. Then stop until explicit approval such as `yes`, `go ahead`, or `install`.

Permission sentence, verbatim except for the placeholder:

```text
You're missing a few of our AI tools that make the coding assistant better at working with Cloudinary as you build. Can I add <missing MCP servers/skills> to make Cloudinary guidance and tasks smoother in this project?
```

Placeholder rules:

- Name the actual missing items, for example `Cloudinary MCP servers` or `cloudinary-docs and cloudinary-transformations via npx skills add`.
- Include `cloudinary-react` only when React-classified.
- After approval, complete the full setup needed for the current IDE or agent environment, including required MCP config, skills installation, skill relocation from `.agents/skills/`, cleanup, `.gitignore` updates, and verification.

After approval only:

- Add or repair the required MCP server config using the current IDE or agent environment's standard project-level MCP mechanism.
- Preserve unrelated MCP servers when editing config.
- Run `npx skills add cloudinary-devs/skills` when required skills are missing.
- Sync any Cloudinary skill folders from `.agents/skills/` into the current IDE or agent environment's canonical skills location.
- Verify `SKILL.md` exists under each required Cloudinary skill ID in the canonical skills location.
- Add `.agents/skills/cloudinary-*/` to root `.gitignore` if not already covered. Do not add `.agents/` itself — the user may have other content there they want tracked.
- Never leave duplicate Cloudinary skill folders in `.agents/skills/` after canonical installation succeeds.
- Never stack marketplace plugin installs on top of CLI skills.

If a prior assistant skipped this gate and edited files without approval, apologize briefly, acknowledge approval should have been requested first, and do not defend the premature edits.

When Stage 1 is complete, use the stage completion format defined above.

---

## Stage 2 — repo/framework check

Run only after Stage 1 is resolved and after checking both repo evidence and the user's original request for an explicit framework choice.

- **Empty repo:** if the user already named a framework/stack in the original request, treat that as the explicit stack choice and do not ask again. Ask which framework/stack they want only when no framework was stated and none can be detected. Do not assume React or Python.

  If the chosen framework can be used either as a full-stack app or an API/service only, and the intended delivery lane cannot be reasonably inferred, ask one additional question:

  `Will this project serve user-facing pages, or is it an API/service only?`

  Use the answer to classify the delivery lane.

- **Code-no-cloudinary:** name the inferred stack, affirm real app structure, say Cloudinary is not set up in this codebase yet, and ask whether to proceed. End with the blocking prompt footer. Use answer cues like `proceed · wrong stack guess · quit`.
- **Code-with-cloudinary:** do not ask the user to choose a feature area. Confirm they want to continue with Cloudinary setup/configuration and validation for this repo, then proceed toward Stage 3/4/5 in order. End with the blocking prompt footer whenever waiting.
- After React is detected or explicitly chosen, ensure `cloudinary-react` is installed via the skills pack before Stage 3 if it was not installed earlier.

Do not include credential or MCP handoff in Stage 2.

At the end of Stage 2, use the stage completion format defined above and end with a blocking prompt footer. Ask the user to confirm readiness to proceed to Stage 3 (SDK setup). Example gate question: "Ready to set up the SDK and create the environment file?"

**CRITICAL: After sending the Stage 2 completion format and blocking prompt footer, STOP. Do not write any Stage 3 code, install packages, create files, or take any Stage 3 action until the user explicitly replies confirming readiness. Wait for their answer.**

---

## Stage 3 — detected-stack SDK setup

Prerequisites: Stage 1 complete, Stage 2 complete with user confirmation to proceed.

This stage sets up placeholder environment files. Real credentials are added in Stage 4 after the user confirms their Cloudinary account and retrieves API keys.

**Messaging rule:** When describing this stage to the user — in the stage intro, stage completion summary, or any user-facing text — always say `.env.example`, never `.env`. Example: "I'll create an `.env.example` file with placeholder credentials." Never say "I'll create an `.env` file" or "set up your `.env`" in this stage.

Use the detected stack as the source of truth:

- Install the official Cloudinary SDK/package for the detected language/framework, or follow the official Cloudinary docs when a first-party SDK is not applicable.
- Add imports/configuration in the project's established style and file locations.
- Write placeholder env values to `.env.example` at the project root — not to `.env`. Always include `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` placeholders for MCP/server-side use.
- Never create, copy, rename, or write `.env` in Stage 3. Only create or update `.env.example`.
- Add client-exposed placeholders only when the detected framework requires them. Example: React/Vite uses `VITE_*` per the official Cloudinary React/Vite guidance.
- Do not request real credentials in Stage 3.
- Use the official Cloudinary SDK/docs and the repo's existing package manager/build conventions.

**Frontend-only setups:** `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in `.env.example` are for the MCP server only — they must never be exposed in client-side code or frontend bundles. Only `CLOUDINARY_CLOUD_NAME` (and its `VITE_*` equivalent when applicable) is safe to use client-side.

When Stage 3 completes for a frontend-only setup, include this note in the user-facing response:

```
**Important for frontend applications:** The `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` placeholders in `.env.example` are included for MCP and server-side Cloudinary operations only. Never expose these values in client-side code, browser bundles, or public repositories.

Only `CLOUDINARY_CLOUD_NAME` — and framework-specific client variables such as `VITE_CLOUDINARY_CLOUD_NAME` when applicable — are safe to use in frontend code.
```

### `.env.example` format

Write `.env.example` with a comment header and placeholder values:

```
# Cloudinary credentials — see Stage 4 instructions for how to use this file
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

For React/Vite, also include the client-side placeholder:

```
# Frontend (Vite) — safe to expose in browser bundles
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

For other client frameworks, include their env convention only when the app needs client-side Cloudinary values.

`.env.example` contains only placeholders — it is safe to commit to version control.

### `.gitignore`

Ensure `.env` is listed in `.gitignore` at the project root. If not present, add it. Do not add `.env.example` to `.gitignore` — it should be committed.

### Comments in generated files

Every file created or significantly changed in Stage 3 must include short, useful inline comments explaining what each section does and why — so a developer who didn't run the skill can understand the Cloudinary wiring at a glance.

Apply this rule to: the main app or entry file (e.g. `app.py`, `server.js`), `requirements.txt` or equivalent dependency file, and `.env.example`.

Focus comments on the non-obvious: what a config block does, why a particular env variable is required, what the SDK call connects to. Do not add comments for obvious one-liners.

### Stage 4 gate enforcement

Before proceeding to Stage 4, enforce the Stage 4 gate. Do not require credential-backed MCP calls before Stage 4, because real credentials are not available yet.

The Stage 3 blocking prompt footer must ask only whether the user is ready to continue — not whether they have a Cloudinary account. The account check is Stage 4 D1's job. Asking it here creates a duplicate question.

Transition to Stage 4 only after using the stage completion format defined above.

---

## Stage 4 — credentials and MCP activation

Ask one question per turn and wait for the answer. Never bundle multiple yes/no gates. Every wait ends with the blocking prompt footer.

Cloudinary MCP needs a cloud name, API key, and API secret before it can connect. Do not ask the user to enter credentials, create `.env`, edit files, or activate MCP until D1 and D2 are complete.

### Mandatory Stage 4 entry behavior

**ENFORCE STRICTLY:** The first Stage 4 response must ALWAYS be D1. This is non-negotiable and mandatory.

Stage 4 begins AFTER Stage 3 (SDK setup and `.env.example`) is complete. Before doing ANYTHING else in Stage 4:

1. Stop and send ONLY the D1 prompt.
2. Wait for user confirmation that they have a Cloudinary account.
3. Do not proceed to D2 (credentials request) until D1 is confirmed.
4. Do not mention credentials, `.env`, API keys, the Cloudinary Console, MCP activation, or Stage 5 until D1 has been completed.

If the user indicates they do not have an account, stop at D1 and direct them to sign up. Do not continue to D2 or Stage 5 until they confirm account ownership.

**If you have already sent D1 and the user has not confirmed, stay on D1. Do not advance to D2 or any other question until you receive explicit confirmation of account ownership.**

### Stage 4 execution rules

Stage 4 must be executed in strict order:

1. D1 — Cloudinary account
2. D2 — API keys
3. D3 — Save credentials and activate MCP

Before generating any Stage 4 response, determine which substep is currently incomplete.

* If D1 has not been completed, send only the D1 prompt exactly as written and wait.
* If D1 is complete but D2 is not complete, send only the D2 prompt exactly as written and wait.
* If D1 and D2 are complete, proceed to D3.

Do not summarize multiple substeps into a single response.

Do not ask the user to save credentials, edit files, or activate MCP until both D1 and D2 are complete.

D1 is a blocking gate.

Never infer D1 completion from prior conversation context, repository contents, credentials, MCP configuration, Cloudinary-related files, or the user's stated intent.

Proceed to D2 only after the user clearly confirms that they have a Cloudinary account or have completed signup.

Do not require exact wording. Interpret natural language confirmations reasonably.

If the user indicates they do not yet have an account, or their response is ambiguous, keep D1 open and direct them to the signup link.

### D1 — Cloudinary account

Always send this prompt first and wait for confirmation before asking about credentials. Never skip to D2 without a D1 confirmation.

Always send this prompt exactly as written. Do not prepend credential requests, explanations, or lead-in text before the account check.

**The D1 prompt is itself a complete blocking prompt. Do NOT wrap it in an additional "Reply to continue setup:" footer — that would duplicate the question.**

```text
Do you have a Cloudinary account?

If not, sign up for free here:
[Create a free Cloudinary account](https://cloudinary.com/users/register/free?utm_source=cursor&utm_medium=skill&utm_campaign=cloudinary-getting-started)

Answer with: Yes, I have an account · Yes, I just finished sign-up
```

Go to D2 only after the user confirms they have an account.

### D2 — API keys

Send this prompt and wait for confirmation before continuing:

```text
Grab your **cloud name**, **API key**, and **API secret** from the Cloudinary Console:
[Cloudinary Console — API Keys](https://console.cloudinary.com/settings/api-keys)

Reply when you have those values saved locally.

Answer with: Got them · Ready
```

**IMPORTANT:** Use the exact link above — `https://console.cloudinary.com/settings/api-keys`. Do not tell the user to go to the "Dashboard tab" or any other location. The API Keys page in Console Settings is the authoritative source for these credentials.

Do not ask the user to paste secrets into chat.

Go to D3 once the user confirms.

### D3 — Save credentials and activate MCP

Run only after Stage 3 placeholders exist in `.env.example`, D1 is satisfied, and D2 is satisfied.

Present D3 as two explicit numbered instructions with bold imperative headers. Detect the IDE from context and show only that IDE's activation steps.

**Instruction 1: Fill in your credentials**

If no `.env` exists yet: tell the user to rename `.env.example` to `.env`, then open it and replace the placeholder values with their real credentials.

If `.env` already exists: tell the user to open `.env.example`, copy the Cloudinary lines into their `.env`, and replace the placeholders with their real credentials.

Always list the specific variables to fill:
- `CLOUDINARY_CLOUD_NAME` — their cloud name
- `CLOUDINARY_API_KEY` — their API key
- `CLOUDINARY_API_SECRET` — their API secret
- For React/Vite: also `VITE_CLOUDINARY_CLOUD_NAME` and any other client placeholder the app needs
- For other client frameworks: fill their client-env equivalents only when the app needs client-side Cloudinary values

**Instruction 2: Activate the MCP servers**

Open with this as a bolded instruction, not prose explanation:
**"Save the file, then activate the MCP servers — they load `.env` at startup and need to start with your real credentials in place."**

Show only the steps for the detected IDE, formatted as numbered imperatives:

**Claude Code**
1. Save `.env`
2. Quit Claude Code completely — Cmd+Q on Mac, Alt+F4 on Windows
3. Restart Claude Code and reopen this project
4. Open `.mcp.json` at the project root and click **Start** next to both `cloudinary-asset-mgmt` and `cloudinary-env-config`
5. Type `/mcp` in the chat input to open the MCP panel — both servers should show **Connected**
6. Find this conversation in Claude Code's chat history to continue

**Cursor**
1. Save `.env`
2. Open the command palette: Cmd/Ctrl+Shift+P
3. Run **MCP: Restart Server** for `cloudinary-asset-mgmt`, then repeat for `cloudinary-env-config`

**VS Code**
1. Save `.env`
2. Open the command palette: Cmd/Ctrl+Shift+P
3. Run **MCP: List Servers** → select `cloudinary-asset-mgmt` → Restart, then repeat for `cloudinary-env-config`

**Windsurf**
1. Save `.env`
2. Fully close Windsurf
3. Reopen Windsurf — MCP starts fresh and picks up the new credentials

**Other IDE**
1. Save `.env`
2. Fully restart the IDE — MCP must start fresh to load the new credentials

End D3 with the blocking prompt footer:

```text
Reply to continue setup:

Are both cloudinary-asset-mgmt and cloudinary-env-config showing as Connected in /mcp?

Answer with: yes · no · still connecting
```

If the user reports MCP still does not connect, work through this troubleshooting sequence before stopping:

- Confirm `.env` is at the project root (not `.env.local`, `.env.development`, or a parent directory)
- Confirm the MCP config file exists and is well-formed for the detected IDE (`.mcp.json` for Claude Code, `.cursor/mcp.json` for Cursor, etc.)
- Check `npx` is available in the shell that the IDE uses: `which npx` or `npx --version`
- Perform a full restart of the IDE's MCP process, not just a reload
- Ask the user to retry and confirm connection status

If MCP still does not connect after the troubleshooting steps above, proceed to Stage 5. Stage 5 will complete the preset step and cloud name lookup using script-based fallbacks against the credentials already in `.env`.

Infer readiness from `.env` existence, user confirmation, and MCP behavior. Never read `.env` contents. Do not require running the app/server here.

At the end of Stage 4, use the stage completion format defined above. Before writing the completion message, review the Stage 5 section below. For the Stage 5 preview section, do not write a generic sentence — instead use the full "What this stage does" bullet list from Stage 5 verbatim, so the user sees exactly what validation covers before they confirm.

### Stage 4 completion bullet wording

When writing the Stage 4 completion bullets, always attribute credential and .env actions to the user — never to the assistant. Use language like "You confirmed…", "You retrieved…", "You filled in…". The assistant never touches credentials or `.env` directly.

Correct examples:
- D1: You confirmed you have a Cloudinary account
- D2: You retrieved your cloud name, API key, and API secret from the Cloudinary Console
- D3: You filled `.env` with real credentials and activated both MCP servers (`cloudinary-asset-mgmt` and `cloudinary-env-config` connected)

Incorrect (do not use):
- "Confirmed Cloudinary account" (ambiguous — implies the assistant confirmed it)
- "Filled .env with real credentials" (implies the assistant touched the file)

---

## Stage 5 — validation

**What this stage does:**

**All lanes:**
- **Verify MCP connection** — confirm both Cloudinary MCP servers are live by creating the `getting_started` unsigned upload preset
- **Confirm media delivery** — generate original and transformed image URLs and confirm they resolve correctly
- **Measure optimization savings** — fetch both URLs and record real size, format, and dimensions to show how much Cloudinary's optimization reduces file size
- **Document the setup** — write `docs/cloudinary-environment.json` with all verification details, no secrets stored

**Back-end API-only and full-stack lanes only:**
- **Verify this app's Cloudinary configuration** — call the Admin API config endpoint to confirm the product environment is reachable and read `folder_mode`

**Front-end and full-stack lanes only:**
- **Preview the results** — build `docs/cloudinary-getting-started-preview.html` showing the original and transformed images side by side

*Front-end only lanes skip the Admin API verification entirely.*

Prerequisite: enforce the Stage 5 gate, unless shortcut context proves MCP is already authenticated.

Read MCP tool schemas before calling. Use MCP tools first.

**Delivery lane check:** Use the `delivery_lane` state tracked from silent explore. Only attempt Admin API verification for `back-end API-only` or `full-stack` lanes. For `front-end only` lanes, skip Admin API calls entirely and set `admin_api.skipped_reason: front_end_only_lane` in the environment JSON.

### If MCP is blocked

Work through this sequence before treating MCP as unavailable:

1. **Send IDE-specific fix guidance** (see IDE patterns in Stage 1 above) and ask the user to retry. End with the blocking prompt footer.
2. **If still blocked after the fix**, verify the most common causes:
   - `.env` exists at the project root (do not read it; ask the user to confirm all three `CLOUDINARY_*` keys are filled)
   - The MCP config file is present and well-formed for the detected IDE
   - `npx` is available in the shell (`which npx` or `where npx`)
   - The IDE's MCP process was fully restarted, not just reloaded
3. **Ask the user to retry** once more. End with the blocking prompt footer.
4. **Only after two failed retry attempts**, use the script-based fallbacks below. Note degraded mode in `docs/cloudinary-environment.json`.

### Script-based fallbacks (only after MCP troubleshooting is exhausted)

The credentials in `.env` are sufficient to complete Stage 5 without MCP. Load them via the same shell-wrap pattern used throughout this skill (`set -a && . .env && set +a`). Never read or display their values.

**Preset creation (`cloudinary-env-config` blocked):** run a script to create the preset via the Admin API:

```bash
set -a && . /path/to/project/.env && set +a && \
curl -s -X POST "https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload_presets" \
  -u "${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}" \
  --data-urlencode "name=getting_started" \
  --data-urlencode "unsigned=true" \
  --data-urlencode "tags=Getting Started"
```

Record `"preset_source": "admin_api_script"` in `docs/cloudinary-environment.json`.

**Cloud name (`cloudinary-asset-mgmt` blocked):** `CLOUDINARY_CLOUD_NAME` is already in `.env`. Load it with the shell-wrap and use it to construct the preview URLs. Do not ask the user.

Measurements, Admin API checks, and artifact creation never require MCP and must always run regardless of MCP status. For Admin API config checks, always use the detected project's Cloudinary SDK first (loading credentials from `.env` via the SDK's config method). If the SDK call fails or the SDK is not available, fall back to curl-based scripts only as a last resort.

### When MCP works

1. Create or verify unsigned upload preset `getting_started` tagged `Getting Started`.
2. Execute Stage 5 according to the recorded delivery lane.

### Artifact requirements

**REQUIRED FIRST STEP — always try `samples/coffee` before any other asset lookup:**

Fetch `https://res.cloudinary.com/<cloud>/image/upload/samples/coffee` (replace `<cloud>` with the actual cloud name) and check the HTTP status code.

- **200 response → use `samples/coffee` everywhere in Stage 5.** Do not search MCP or the Admin API for an alternative. Set `selection_source: "samples/coffee"` in `docs/cloudinary-environment.json`.
- **Non-200 response → do NOT use `samples/coffee`.** Follow the fallback sequence below. Never use a URL that returned a non-200 response anywhere in Stage 5 artifacts.

Do not skip the `samples/coffee` fetch and go straight to MCP search. This is a required step, not an optional one.

**Fallback sequence (only when `samples/coffee` returns non-200):**

  **MANDATORY: Do not proceed with a broken or placeholder image URL. You must find a real deliverable asset before continuing.**

  1. Use the `mcp__cloudinary-asset-mgmt__list-images` or `mcp__cloudinary-asset-mgmt__search-assets` MCP tool to retrieve a real image asset from the user's cloud. Prefer assets from the `samples` folder. Pick the first result with resource_type `image` and access_mode `public`.
  2. If MCP returns no results (empty cloud), tell the user their cloud has no uploaded images yet and ask them to upload at least one image before validation can complete. End with the blocking prompt footer. Wait for confirmation before continuing.
  3. If MCP is unavailable, use the Admin API (`GET https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image?max_results=1`) with credentials loaded via shell-wrap. Parse the first result's `public_id`.
  4. Use the selected public ID consistently for all preview URLs, validation artifacts, generated documentation, measurements, chat output, and preview HTML.
  5. Never use a URL that returned a non-200 response anywhere in Stage 5 artifacts.

  Record the selected `public_id`, original URL, transformed URL, selection source (`samples/coffee`, `mcp_list`, or `admin_api_list`), and reason in `docs/cloudinary-environment.json`.

  Apply the required transformation chain to the selected preview asset.
- Use this exact transformed URL chain between `/upload/` and the selected public ID: `b_gen_fill,c_pad,w_1000,h_1000,y_-100/l_text:Arial_72_bold:Adapt%20everywhere,co_white/e_shadow:50/fl_layer_apply,g_south_west,x_80,y_140/l_text:Arial_34:Dynamic%20media%20built%20in%20real%20time,co_rgb:f5f5f5/e_shadow:35/fl_layer_apply,g_south_west,x_84,y_90/f_auto,q_auto`.
- Keep the original URL, transformed URL, and transformation text identical in chat, `docs/cloudinary-environment.json`, and preview HTML.
- Always create or update `docs/cloudinary-environment.json` when Stage 5 runs. Include `schema_version: 1`, non-secret `cloud_name`, upload preset details from MCP `get-upload-preset-details`, `preview` values, and real `measurements`. Never write secrets.
- For back-end API-only and full-stack lanes, check Admin API config with `settings=true` using the detected project's Cloudinary SDK (not MCP). Load credentials from `.env` via the SDK's config method. The response shape is `{ "settings": { "folder_mode": "dynamic" | "fixed" }, ... }` — read `folder_mode` from `response.settings.folder_mode`, not the top-level response object. Persist `admin_api.reachable` and `admin_api.folder_mode` as `dynamic`, `fixed`, or `null` with a short error. Docs: https://cloudinary.com/documentation/admin_api#get_product_environment_config_details.

  **Correct Admin API endpoint:** `GET https://api.cloudinary.com/v1_1/{cloud_name}/config?settings=true` authenticated with `-u API_KEY:API_SECRET`. Do NOT use `/admin/settings`, `/admin/account_info`, or any other path — those return 404. The correct path is `/v1_1/{cloud_name}/config`.

  curl fallback (only when SDK is unavailable):
  ```bash
  curl -s "https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/config?settings=true" \
    -u "${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}"
  ```
  Parse `response.settings.folder_mode` from the JSON result.
- For front-end-only lanes, skip Admin API config. Omit `admin_api` or set `admin_api.skipped_reason: front_end_only_lane`, and mention the skip in validation.
- Measure both preview URLs with a local script in a suitable project language. Use this Chrome-like `Accept` header: `image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8`. Record real bytes, content type, and dimensions when available. Never fabricate measurements.
- For front-end-only and full-stack lanes, create or update `docs/cloudinary-getting-started-preview.html`. It must use the same two URL literals, fetch both URLs with the same `Accept` header, use `createImageBitmap` for browser stats when possible, show savings, and include a `#stage-5-integration-snippet` section. API-only lanes skip this file.
- Never add the standalone preview to framework route code. It belongs only in `docs/`.
- **Comments in generated files:** Every file created or significantly changed in Stage 5 must include short, useful inline comments explaining what each section does and why. Apply this to `docs/cloudinary-getting-started-preview.html` (explain each section: image display, measurement fetch, SDK snippet, stats), `docs/cloudinary-environment.json` (top-level comment block describing what the file contains and where to find docs), and any validation scripts. Focus on the non-obvious — why a particular URL pattern is used, what the Accept header achieves, what folder_mode means. Do not comment every line.
- For server lanes, the chat snippet and `#stage-5-integration-snippet` must generate the delivery URL through the detected stack's Cloudinary SDK when available. Do not use a pasted static URL as the only server integration.
- For front-end-only lanes, follow the framework-appropriate Cloudinary docs. A plain `<img src>` is acceptable when it matches the app. React-specific helpers are only for React-classified projects.
- Optional validation scripts may wrap measurements and Admin checks. Name them according to the project ecosystem; do not assume npm unless the repo is npm-based.
- In chat for front-end/full-stack lanes, echo the canonical transformed URL. Also echo `folder_mode` when Admin config ran.

### Validation response format

If MCP troubleshooting is still in progress (user has not yet retried), send only MCP-fix guidance — do not show validation output yet.

If Stage 5 completed via script-based fallbacks, use this format with a note that preset data came from the Admin API script rather than MCP.

For full success or equivalent shortcut completion, use the structure below. Every item starts with a bold label and colon. Omit items that did not apply or did not run this round. Never use the word "wired" — use "set up" instead.

1. **MCP servers:** Connected! Briefly say what they were used for this round (e.g., "Used them to verify the `getting_started` upload preset — unsigned, tagged `Getting Started`."). If preset was created rather than verified, say so. If fallback script was used instead, note that here.
2. **Admin API:** Reachable (or not, with the error). If reachable, say "Used the config endpoint to check your product environment — `folder_mode` is `<value>`." Omit for front-end-only lanes.
3. **Original image:** The original URL as a plain URL on its own line.
4. **Transformed image:** The transformed URL as a plain URL on its own line.
5. **Measurements:** A compact two-row table (Original / Transformed) with columns: size in KB, format, and dimensions when available. End with a one-line savings summary (e.g., "66.6% smaller — JPEG 161 KB → WebP 54 KB"). Confirm values came from a real fetch with Chrome-like `Accept`, not guesses.
6. **<Stack> SDK snippet:** A minimal SDK-first code block that generates the delivery URL through the detected stack's Cloudinary SDK. Label it with the actual stack name (e.g., "Flask SDK snippet"). Server lanes must use the SDK; never use a hardcoded static URL as the only integration.
7. **Preview:** "Open `docs/cloudinary-getting-started-preview.html` in a browser to see the original and transformed images side by side with live stats." Omit for back-end API-only lanes.
8. **Environment docs:** "Open `docs/cloudinary-environment.json` to see all verification details — no secrets stored."
9. One short congratulations sentence confirming the detected stack is set up with Cloudinary.
10. Done gate with a conversational closing prompt, e.g.: "Let me know when you're done reviewing your configuration and I'll suggest some next steps." Format as a simple prompt without the blocking prompt footer (no "Reply to continue setup:" phrase — setup is complete).

Done gate format example:
```
Let me know when you're done reviewing your configuration and I'll suggest some next steps.

Answer with: Done
```

Shortcut rule: if Stage 5 did not run this round, omit Stage 5 artifact lines such as `docs/cloudinary-environment.json`, measurements, or preview HTML. Still finish with the Done gate.

At the end of Stage 5, use the stage completion format defined above (all five stages should be checked off).

---

## What's next after setup

After the user says `Done`, give them up to four specific next steps. Keep them short, practical, and use-case focused. Include copy/paste prompts where helpful.

Always start with a "run your app" step — tell the user the command to start their detected framework's dev server. This is step 0: validation proves Cloudinary works; running the app lets the user see the integration end-to-end from their browser.

Use the delivery lane tracked during setup to pick the remaining steps. Replace `[framework]` in copy/paste prompts with the detected framework name, such as Flask, Django, Rails, or Next.js.

### Front-end only and full-stack lanes

**Run your app**
Install dependencies and start the dev server so you can see the integration working end-to-end in your browser.

When the user's detected framework is one of the below, output these exact commands — word-for-word, do not paraphrase, abbreviate, or substitute alternative commands. Present them in code blocks ready to copy-paste:

**Python/Flask:**
```
python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
python3 app.py
```

**Node/Next.js:**
```
npm install
npm run dev
```

**Node/Express:**
```
npm install
node server.js
```

**Ruby/Rails:**
```
bundle install
rails server
```

**PHP/Laravel:**
```
composer install
php artisan serve
```

**Go:**
```
go mod tidy
go run .
```

If the detected framework is not listed above, determine and show the equivalent install-then-start sequence for that stack, but always include all prerequisite setup steps (venv, package manager install, etc.) before the server start command.

**Optimize and deliver your product or marketing assets through Cloudinary**
Generate transformed and optimized delivery URLs from assets in your product environment and display them in a gallery in your app.

Copy/paste the prompt: `Show me how to generate optimized delivery URLs from assets in my Cloudinary product environment and display them in my [framework] app`

**Transform and deliver video content**
Generate optimized video URLs with format conversion, trimming, or overlays — the same transformation pipeline that works for images also works for video.

Copy/paste the prompt: `Show me how to deliver and transform video assets retrieved from my product environment in my [framework] app using Cloudinary`

**Let users upload photos or files to your app**
Add an upload flow to enable user-generated content, including profile photos, listings, attachments, and more.

Copy/paste the prompt: `I want users to upload images in my [framework] app`

**Automate image variants and tagging at upload time**
Use upload presets or eager transformations to automatically tag, resize, optimize, or watermark assets the moment they're uploaded.

Copy/paste the prompt: `How do I apply transformations and tags automatically when assets are uploaded in my [framework] app?`

### Back-end API-only lanes

**Run your app**
Install dependencies and start the server so you can confirm it responds before moving on to building endpoints.

Show the correct prerequisite and start commands for the detected framework (same patterns as the front-end/full-stack lane above).

**Deliver your product or marketing assets through Cloudinary**
Upload images to your product environment and use the SDK to generate delivery URLs in your API responses.

Copy/paste the prompt: `Show me how to upload assets to my Cloudinary product environment and deliver them via my [framework] API`

**Generate signed delivery URLs for protected assets**
Create signed URLs on the server so protected assets can be delivered without exposing secrets or signing logic to clients.

Copy/paste the prompt: `Add a server-side endpoint in my [framework] API that generates signed Cloudinary delivery URLs without exposing secrets to clients`

**Accept uploads from clients in your app**
Add an upload endpoint that allows you to receive files from callers, such as images, documents, attachments, and more.

Copy/paste the prompt: `How do I accept and store image uploads server-side in my [framework] API?`

**Build an admin workflow for finding and managing assets**
Use tags and metadata to make assets easier to find, filter, and manage at scale.

Copy/paste the prompt: `How do I tag and search uploaded assets in Cloudinary?`

### Rules for next steps

* **Output the startup commands exactly as written in the framework sections above.** Do not abbreviate, paraphrase, improvise, or substitute alternative commands. If Python/Flask is detected, output the full `python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt` followed by `python3 app.py` — never skip steps or show `pip install` alone.
* Always start with the "run your app" step and show the correct start command for the detected framework.
* Use the detected delivery lane to choose the remaining steps. Pick the most relevant three from the lane's list — not all of them.
* Full-stack uses the front-end/full-stack set.
* Back-end API-only uses the back-end API-only set.
* Don't mix lane-specific suggestions.
* Don't suggest optimization as a next step — Stage 5 already demonstrated it with real measurements. Only mention it if the user asks.
* Don't suggest UGC uploads as the primary next step. Lead with delivering assets already in the product environment; offer UGC as an optional step for apps that need it.
* Don't suggest responsive image delivery for an API-only app.
* Don't ask repeatedly if the preset should stay unsigned.
* Don't suggest API key changes unless the user reports a specific permission problem.
* Keep the suggestions focused on user scenarios, not Cloudinary feature names.
* For framework-specific details, let the user copy/paste the prompt and let the relevant skill answer.
* When users ask follow-up questions about transformations, optimization, or delivery URLs, direct them to use the `/cloudinary-transformations` skill to build and debug URLs.
* For questions about Cloudinary APIs, SDKs, webhooks, and implementation details not covered by specialized skills, direct them to use the `/cloudinary-docs` skill.
* In code examples for rendering or delivering images in the app, always verify that the asset exists in the product environment before outputting the delivery URL. Don't hardcode or assume assets exist — guide users to check their Cloudinary product environment first.
