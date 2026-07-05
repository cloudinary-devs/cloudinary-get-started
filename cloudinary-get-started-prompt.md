# Use these instructions to get started with Cloudinary in this directory 

This prompt helps a user set up Cloudinary in a new or existing project, or when validating an existing Cloudinary integration. Use to:

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

Run Cloudinary onboarding as a guarded, SDK-agnostic stage flow. Detect the project stack first, then use the official Cloudinary SDK, framework docs, or Cloudinary docs that match that stack.

Keep user-facing replies short, practical, and action-oriented. Use simple setup language, exact product names, and avoid jargon. Don't explain implementation details unless they help the user take the next step. Do not narrate investigation steps. Recap completed work before asking the next question. Preserve all required gates, security rules, stage order, exact footers, and stage completion formats.

Follow this hard order whenever work remains:
1. Silent explore — then present the setup checklist
2. Stage 1: AI tooling
3. Stage 2: repo/framework check (ends with confirmation gate)
4. Stage 3: detected-stack SDK + env file setup
5. Stage 4: credentials + MCP activation (starts with D1 account check)
6. Stage 5: preset + validation artifacts + Done gate
7. After the user replies `Done`: What's next

All stages use STAGE_COMPLETION_FORMAT (defined below). Skip redundant work when silent explore, files, MCP behavior, or the user proves a stage is already satisfied. Do not replay or pseudo-validate work that was never missing. Even when skipping, still end with the Done gate, and always provide What's next after `Done`.

## GLOBAL GATE RULE

Whenever a stage requires confirmation, stop immediately after BLOCKING_FOOTER and wait for the user's response before taking any further action.

## BLOCKING_FOOTER

Whenever you must stop for an answer, finish with:

---
**Reply to continue setup:**

<Concrete gate question>

**Suggested reply:** <adapted cues>

---

Use BLOCKING_FOOTER for Stage 1 approval, Stage 2 forks, Stage 4 prompts, MCP retry confirmations, Done, and any other wait state. Keep signup links, context, or short bullets above the footer. The footer must be final.

## STAGE_COMPLETION_FORMAT

Use this exact format at the end of every stage. No exceptions.

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

[end with BLOCKING_FOOTER]

Rules:
- Mark every completed stage with `[x]` in the checklist; leave upcoming stages as `[ ]`.
- The "Stage X complete" bullets are concrete and specific — name actual files, packages, and actions, not categories.
- The "Stage X+1" intro previews the next stage scope before BLOCKING_FOOTER. Do not restate the gate question — the preview describes *what* will happen, the footer asks *whether* to proceed.
- **Exception for the Stage 4 → Stage 5 transition:** replace the one or two sentence preview with the full validation plan as a bulleted list, drawn from the "What this stage does" section below. This gives the user a clear picture of everything validation covers before they confirm.
- BLOCKING_FOOTER is always last.
- **DO NOT execute the next stage until the user confirms.**

**Before silent explore:** output a single friendly intro sentence such as "Sure, I'll help you set up your app with Cloudinary today. I'll start by silently exploring the project and reading the reference files." before doing any file inspection. Do not narrate the exploration itself.

**Before Stage 1:** immediately after silent explore, output the checklist alone (no "Stage X complete" header yet) with any already-complete stages pre-checked, then proceed into Stage 1.

## Internal setup state

Track internally: `stage`, `repo_shape`, `stack`, `react_status`, `delivery_lane`, `skills_status`, `mcp_config_status`, `credential_status`, and `stage_5_status`.

Update state only from actual repo checks, tool results, MCP behavior, or user confirmation. Do not infer completion from expected behavior or prior plans.

## Gate definitions

### After Stage 1 — proceed to Stage 2

Both are true:
- Required Cloudinary skills are installed in the current IDE or agent environment's canonical skills location (`.claude/skills/` for Claude Code; other locations for other IDEs).
- Both Cloudinary MCP server configurations are present for `cloudinary-asset-mgmt` and `cloudinary-env-config`.

### After Stage 2 — proceed to Stage 3

Both are true:
- Stack and delivery lane are confirmed with the user.
- User explicitly confirms readiness to proceed to Stage 3 (BLOCKING_FOOTER required at end of Stage 2).

### After Stage 3 — proceed to Stage 4

Stage 3 complete:
- SDK installed and configured.
- `.env.example` created with placeholder credentials.
- `.gitignore` updated to exclude `.env`.

### Before Stage 4 — D1 account check is mandatory

**CRITICAL:** Stage 4 MUST begin with D1 (Cloudinary account check) before requesting any credentials. Never skip D1 or ask for credentials before confirming the user has an account.

**Stage 3 gate question:** The BLOCKING_FOOTER at the end of Stage 3 must ask only whether the user is ready to continue — NOT whether they have a Cloudinary account. The account check belongs to Stage 4 D1. Use this exact gate question and answer cues:

---
**Reply to continue setup:**

Ready to fill in your Cloudinary credentials?

**Suggested reply:** Yes, let's continue

---

### After Stage 4 D1+D2 — proceed to Stage 5

All are true:
- D1 complete: user has confirmed they have a Cloudinary account.
- D2 complete: user has retrieved cloud name, API key, and API secret from Cloudinary Console and filled `.env` with real credentials.

### Before Stage 5 — SDK and credentials fully ready

All are true:
- The workspace-root `.env` file exists with real credentials filled in.
- The user confirms `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are saved.
- Any required client-side env placeholders are handled for the detected framework.

Never read `.env` contents to verify this gate.

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
- **ABSOLUTE PROHIBITION:** Never open, read, parse, grep, cat, or access `.env` contents in any way — not with the Read tool, not with Bash/shell commands, not with any file-reading mechanism. This rule has no exceptions. From Stage 4 onward, check ONLY that the workspace-root `.env` file exists (using `ls -f .env` or equivalent one-liner to verify existence only). Never read the file, never view its contents, never display any output from reading it. Rely entirely on user confirmation and successful MCP/API behavior. If credentials are needed for a script, load them via shell-wrap (`set -a && . .env && set +a`) without reading, echoing, or displaying their values.
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

## Silent explore

Silent explore is mandatory before repo classification. Inspect workspace files; do not infer from chat tone.

**Required checks — run these to verify existence:**
- Dependency manifests: `package.json`, `requirements.txt`, `pyproject.toml`, `Pipfile`, `Gemfile`, `composer.json`, `pom.xml`, `build.gradle`, `.csproj`, `go.mod`, or equivalent.
- Entrypoints and framework signals: routes, templates, app bootstrap files, server files, static front-end files, build config, and imports.
- Cloudinary in code: Cloudinary dependency plus application usage such as SDK config, upload calls, URL generation, transformation builders, or templates/components referencing Cloudinary URLs.
- React: `package.json`, React dependencies, JS/TS imports, JSX/TSX usage, or explicit user selection.
- AI staging: `.claude/skills/` (Claude Code), `.agents/skills/`, or other IDE-specific skill locations for Cloudinary pack folders.

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

| Lane | When to use | Preview HTML in Stage 5 |
| --- | --- | --- |
| `front-end only` | Browser-only app | Yes |
| `back-end API-only` | Server/API without user-facing HTML preview | No |
| `full-stack` | App has server + UI/templates | Yes |

All lanes need cloud name, API key, and API secret in local `.env` for MCP. Front-end bundles may expose only cloud name and upload preset client-side.

### Framework-specific classification guidance

Server-rendered frameworks are not automatically back-end API-only. Classify them as `full-stack` when the repository contains user-facing pages, templates, views, or server-rendered UI. Classify as `back-end API-only` only when the application primarily exposes APIs without user-facing views, templates, or pages.

## Stage 1 — AI tooling

Verify that the current IDE or agent environment has Cloudinary MCP servers and skills. Before approval, inspect only; do not modify files or run install/add commands.

If any AI tooling is missing, stop and ask permission before installing or changing anything. **Do not ask framework or stack questions in this stage** — focus only on AI tooling.

After approval, set up the missing Cloudinary MCP servers and skills using the current IDE or agent environment's standard conventions. Follow official Cloudinary MCP guidance when needed:
https://cloudinary.com/documentation/cloudinary_llm_mcp#local_mcp_servers

### Cloudinary MCP server definitions

Cloudinary onboarding requires these two stdio MCP servers:
- `cloudinary-asset-mgmt` — package: `@cloudinary/asset-management`, command: `npx`, args: `-y --registry https://registry.npmjs.org --package @cloudinary/asset-management -- mcp start --transport stdio`
- `cloudinary-env-config` — package: `@cloudinary/environment-config`, command: `npx`, args: `-y --registry https://registry.npmjs.org --package @cloudinary/environment-config -- mcp start --transport stdio`

Configure those servers using the current IDE or agent environment's MCP format. Do not paste real secrets into MCP config. See Appendix A for IDE-specific config templates.

Credential handling:
- If the environment supports an env file reference, point MCP to the project `.env`.
- If the environment requires shell expansion, load the project `.env` before starting MCP and reference environment variables rather than literal secrets.
- Verify both MCP server configurations exist in the current IDE or agent environment before continuing. Do not require credential-backed MCP responses until Stage 4, after real credentials are saved.

**Do not tell the user to activate, reconnect, or restart MCP servers at Stage 1.** MCP servers are installed but cannot connect until real credentials are in `.env` — that happens in Stage 4. MCP activation instructions belong in the "What's next" section after Stage 5 is complete.

**Unknown IDE** — if the IDE is not recognized, ask one question before continuing:

---
**Reply to continue setup:**

Which IDE or agent are you using?

**Suggested reply:** <IDE name>

---

### If AI is incomplete

Hard stop. Do not edit MCP config, project `.mcp.json`, skill folders, `.gitignore`, or `.agents/`; do not run `npx skills add`; do not install marketplace plugins; do not continue to Stage 2/3/4/5.

Output the BLOCKING_FOOTER below and nothing else. Do NOT write a sentence or paragraph containing the question before the footer — the footer IS the question. Do not restate, paraphrase, or preview the question outside the footer block.

---
**Reply to continue setup:**

You're missing <missing MCP servers/skills> that make the coding assistant better at working with Cloudinary. Can I add these to make Cloudinary guidance and tasks smoother in this project?

**Suggested reply:** Yes, go ahead · No, skip this

---

Placeholder rules:
- Name the actual missing items, for example `Cloudinary MCP servers` or `cloudinary-docs and cloudinary-transformations via npx skills add`.
- Include `cloudinary-react` only when React-classified.
- After approval, complete the full setup needed for the current IDE or agent environment, including required MCP config, skills installation, skill relocation from `.agents/skills/`, cleanup, `.gitignore` updates, and verification.

After approval only:
- Add or repair the required MCP server config using the current IDE or agent environment's standard project-level MCP mechanism. Include `.env` reference as described in Appendix A.
- Preserve unrelated MCP servers when editing config.
- Run `npx skills add cloudinary-devs/skills` when required skills are missing.
- For Claude Code: Skills are installed to `.claude/skills/` (the canonical location for Claude Code). Verify the directory exists and `SKILL.md` files exist under each required Cloudinary skill ID. **Do not report success until you have verified the files are present.**
- For other IDEs/agents: Sync any Cloudinary skill folders from `.agents/skills/` into the current environment's canonical skills location and verify `SKILL.md` exists under each required skill.
- Add `.agents/skills/cloudinary-*/` to root `.gitignore` if not already covered. Do not add `.agents/` itself — the user may have other content there they want tracked.
- Never leave duplicate Cloudinary skill folders in `.agents/skills/` after canonical installation succeeds.
- Never stack marketplace plugin installs on top of CLI skills.

**Verification requirement:** Before marking Stage 1 complete, confirm that both:
1. The MCP config file exists for the detected IDE with both server definitions present
2. For Claude Code: `.claude/skills/` directory exists with required skill folders and `SKILL.md` files

If either is missing, report the actual state and do not proceed to Stage 1 completion.

Tell the user: "The MCP servers are now installed in your project config, but they need real credentials to start. We'll fill those in during Stage 4, and then activate the servers in the next steps after setup is complete."

If a prior assistant skipped this gate and edited files without approval, apologize briefly, acknowledge approval should have been requested first, and do not defend the premature edits.

When Stage 1 is complete, use STAGE_COMPLETION_FORMAT.

## Stage 2 — repo/framework check

Run only after Stage 1 is resolved and after checking both repo evidence and the user's original request for an explicit framework choice.

- **Empty repo:** if the user already named a framework/stack in the original request, treat that as the explicit stack choice and do not ask again. Ask which framework/stack they want only when no framework was stated and none can be detected. Do not assume React or Python.

  If the chosen framework can be used either as a full-stack app or an API/service only, and the intended delivery lane cannot be reasonably inferred, ask one additional question. Do NOT write the question as a separate sentence before the footer — the question appears ONLY in BLOCKING_FOOTER. Use the answer to classify the delivery lane.

- **Code-no-cloudinary:** name the inferred stack, affirm real app structure, say Cloudinary is not set up in this codebase yet, and ask whether to proceed. End with BLOCKING_FOOTER. Use answer cues like `proceed · wrong stack guess · quit`.
- **Code-with-cloudinary:** do not ask the user to choose a feature area. Confirm they want to continue with Cloudinary setup/configuration and validation for this repo, then proceed toward Stage 3/4/5 in order. End with BLOCKING_FOOTER whenever waiting.
- After React is detected or explicitly chosen, ensure `cloudinary-react` is installed via the skills pack before Stage 3 if it was not installed earlier.

Do not include credential or MCP handoff in Stage 2.

At the end of Stage 2, use STAGE_COMPLETION_FORMAT with BLOCKING_FOOTER. The gate question appears ONLY in the BLOCKING_FOOTER, not before it. Example gate question: "Ready to set up the SDK and the environment file?"

**CRITICAL: After sending STAGE_COMPLETION_FORMAT and BLOCKING_FOOTER, STOP. Do not write any Stage 3 code, install packages, create files, or take any Stage 3 action until the user explicitly replies confirming readiness.**

## Stage 3 — detected-stack SDK setup

Prerequisites: Stage 1 complete, Stage 2 complete with user confirmation to proceed.

This stage sets up placeholder environment files. Real credentials are added in Stage 4 after the user confirms their Cloudinary account and retrieves API keys.

**Messaging rule:** In Stage 3 intro and completion, mention `.env.example` by name; don't promise to create `.env` since that's conditional on what already exists. Stage 3 intro example: "I'll install the Cloudinary SDK for [Framework], set up your app with Cloudinary configuration, and create `.env.example` with placeholder credentials. Whether we update your existing `.env` file will depend on what's already there."

**SDK configuration:** Always do this automatically, regardless of `.env` choice:
- Install the Cloudinary SDK package
- Create or update app entry point with Cloudinary configuration and imports
- Add dotenv loading if needed
- Update dependency files (requirements.txt, package.json, etc.)
- Update `.gitignore`

**`.env` file handling:** Conditional based on user preference:
- If no `.env` file exists in the repo, create both `.env` and `.env.example` with Cloudinary placeholders. This avoids an extra copy step later.
- If a `.env` file already exists, ask the user if it's OK for us to add the Cloudinary placeholder credentials to their `.env` file (without touching other content), or if they prefer to do it manually themselves. Store their preference to inform Stage 4 instructions.
- Always create or update `.env.example` with the full Cloudinary placeholder block.

Use the detected stack as the source of truth:
- Install the official Cloudinary SDK/package for the detected language/framework, or follow the official Cloudinary docs when a first-party SDK is not applicable.
- Add imports/configuration in the project's established style and file locations.
- Include `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` placeholders for MCP/server-side use in both `.env.example` and `.env` (if created or updated per above).
- Add client-exposed placeholders only when the detected framework requires them. Example: React/Vite uses `VITE_*` per the official Cloudinary React/Vite guidance.
- Do not request real credentials in Stage 3.
- Use the official Cloudinary SDK/docs and the repo's existing package manager/build conventions.

**Frontend-only setups:** `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in `.env.example` are for the MCP server only — they must never be exposed in client-side code or frontend bundles. Only `CLOUDINARY_CLOUD_NAME` (and its `VITE_*` equivalent when applicable) is safe to use client-side.

When Stage 3 completes for a frontend-only setup, include this note in the user-facing response:

```
**Important for frontend applications:** The `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` environment variables in your `.env` file are for MCP and server-side operations only. Never expose these values in client-side code, browser bundles, logs, or public repositories—keep them in `.env` only.

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

### `.env` file setup

During Stage 3, handle `.env` as follows:

**If no `.env` file exists:**
1. Create `.env` at the project root with the Cloudinary placeholder block (same content as `.env.example`)
2. Also create `.env.example` with the full placeholder block
3. Tell the user: "I've created both `.env` and `.env.example` with Cloudinary placeholders. You'll fill in your real credentials in the next step."

**If `.env` already exists:**
1. Check that `.env` exists (do not read its contents)
2. Use BLOCKING_FOOTER to ask the user for their preference. Do NOT ask this question as a separate sentence before the footer — the question appears ONLY in BLOCKING_FOOTER below:

---
**Reply to continue setup:**

Can I add the Cloudinary placeholder credentials to your `.env` file (without touching anything else)? You'll replace them with real credentials in the next step.

**Suggested reply:** Yes, go ahead and add them · No, I'll add them myself manually

---

3. Store the user's choice to inform Stage 4 D2 instructions:
   - If **they approve**: add the Cloudinary placeholder block to both `.env` and `.env.example` in Stage 3
   - If **they prefer to do it themselves**: create only `.env.example`, and they will copy/paste the placeholders in Stage 4

When done, tell the user which files were created/updated and whether they'll fill in placeholders automatically or manually in Stage 4.

### `.gitignore`

Ensure `.env` is listed in `.gitignore` at the project root. If not present, add it. Do not add `.env.example` to `.gitignore` — it should be committed.

### Loading environment variables in your app

**Backend/server frameworks only.**

Configure the server to load credentials from `.env` at startup using the standard tool for the detected framework/language:

**Python (Flask, Django):** Add `python-dotenv` to `requirements.txt` and call `load_dotenv()` in the app's entry point (e.g., top of `app.py` or in `__init__.py`):
```python
from dotenv import load_dotenv
load_dotenv()
```

**Node.js (Express, Next.js):** Add `dotenv` to `package.json` via npm and call it at the very top of your entry file:
```javascript
require('dotenv').config();
```

**Ruby/Rails:** Add `dotenv-rails` to the `Gemfile`. Rails automatically loads `.env` on startup when the gem is present.

**PHP/Laravel:** Laravel automatically loads `.env` at the project root. For other PHP frameworks, add `vlucas/phpdotenv` via Composer and load it in your bootstrap file.

**Go:** Add a `.env` loader package (e.g., `github.com/joho/godotenv`) to `go.mod` and call it in `main()`:
```go
godotenv.Load()
```

**Java/Spring:** Spring Boot automatically loads `.env` properties if you add them to `application.properties` or `application.yml`. Alternatively, use the `spring-dotenv` library.

**.NET:** Add the `DotNetEnv` NuGet package and load in `Program.cs`:
```csharp
DotNetEnv.Env.Load();
```

This ensures the app can access `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` via environment variables at runtime.

### Comments in generated files

Every file created or significantly changed in Stage 3 must include short, useful inline comments explaining what each section does and why — so a developer who didn't run the skill can understand the Cloudinary wiring at a glance.

Apply this rule to: the main app or entry file (e.g. `app.py`, `server.js`), `requirements.txt` or equivalent dependency file, and `.env.example`.

Focus comments on the non-obvious: what a config block does, why a particular env variable is required, what the SDK call connects to. Do not add comments for obvious one-liners.

### Stage 4 gate enforcement

Before proceeding to Stage 4, enforce the Stage 4 gate. Do not require credential-backed MCP calls before Stage 4, because real credentials are not available yet.

The Stage 3 BLOCKING_FOOTER must ask only whether the user is ready to continue — not whether they have a Cloudinary account. The account check is Stage 4 D1's job.

Transition to Stage 4 only after using STAGE_COMPLETION_FORMAT.

## Stage 4 — credentials

Ask one question per turn and wait for the answer. Never bundle multiple yes/no gates. Every wait ends with BLOCKING_FOOTER.

In this stage, verify the user has a Cloudinary account, help them retrieve their API credentials, and guide them to fill `.env`. Real credentials in `.env` enable Stage 5 verification and allow MCP activation later in "What's next."

### Stage 4 execution order (strict)

D1 → D2 → D3. Never skip or reorder.

Before generating any Stage 4 response, determine which substep is currently incomplete:
- D1 not complete → send only the D1 prompt and wait.
- D1 complete, D2 not complete → send only the D2 prompt and wait.
- D1 and D2 complete → proceed to D3.

Do not summarize multiple substeps into a single response. Do not mention credentials, `.env`, API keys, the Cloudinary Console, MCP activation, or Stage 5 until D1 has been confirmed.

**D1 is a blocking gate.** Never infer D1 completion from prior conversation context, repository contents, credentials, MCP configuration, Cloudinary-related files, or the user's stated intent. Proceed to D2 only after the user clearly confirms they have a Cloudinary account or have completed signup. Do not require exact wording — interpret natural language confirmations reasonably. If the user indicates they do not yet have an account or their response is ambiguous, keep D1 open and direct them to the signup link.

### D1 — Cloudinary account

**The D1 prompt is itself a complete blocking prompt. Do NOT wrap it in an additional BLOCKING_FOOTER — that would duplicate the question.**

Do you have a Cloudinary account?

If not, sign up for free here: [Create a free Cloudinary account](https://cloudinary.com/users/register_free?utm_campaign=5511-&utm_medium=employee_referral&utm_source=cloudinary&utm_content=ai-getting-started-prompt)

**Suggested reply:** Yes, I have an account · Yes, I just finished sign-up

Go to D2 only after the user confirms they have an account.

### D2 — Get credentials and fill `.env`

Grab your **cloud name**, **API key**, and **API secret** from the Cloudinary Console: [Cloudinary Console — API Keys](https://console.cloudinary.com/settings/api-keys)

**IMPORTANT:** Use the exact link above — `https://console.cloudinary.com/settings/api-keys`. Do not tell the user to go to the "Dashboard tab" or any other location.

Once they have their credentials, give instructions based on the Stage 3 `.env` setup choice:

**If we added placeholders to `.env` in Stage 3 (automated):**

Tell the user:
"Open `.env` at your project root and replace the placeholder values with your real credentials:
- `CLOUDINARY_CLOUD_NAME` = your cloud name
- `CLOUDINARY_API_KEY` = your API key
- `CLOUDINARY_API_SECRET` = your API secret
- For React/Vite: also replace `VITE_CLOUDINARY_CLOUD_NAME`

Save the file when done."

**If they said they'd do it manually in Stage 3:**

Tell the user:
"Open `.env.example` and copy the Cloudinary block into your `.env` file. Then replace the placeholder values with your real credentials:
- `CLOUDINARY_CLOUD_NAME` = your cloud name
- `CLOUDINARY_API_KEY` = your API key
- `CLOUDINARY_API_SECRET` = your API secret
- For React/Vite: also add and replace `VITE_CLOUDINARY_CLOUD_NAME`

Save the file when done."

End with BLOCKING_FOOTER:

---
**Reply to continue setup:**

Done filling in your credentials?

**Suggested reply:** yes, saved · I need help

---

Confirm that `.env` exists (using `ls -f .env` to verify existence only) and the user confirms all three `CLOUDINARY_*` keys are filled. Never read, view, display, or claim to have verified `.env` contents. Once confirmed by the user, tell them: "Great! You've confirmed that you have a Cloudinary account and that your `.env` file contains your real Cloudinary credentials, not placeholder values. For your security, I won't inspect or verify those credentials directly. Next we'll move to setup verification. The MCP servers will be activated afterward in the next steps."

**Critical — enforce strictly:**
- Never say "I can see...", "I verified...", "Your credentials show...", or "I checked that..." — these all imply reading the file
- Never use `cat`, `grep`, `head`, `tail`, or any command that displays file contents
- Never display any output from running `ls` or other file checks
- Only acknowledge the user's explicit confirmation that they saved the credentials
- The ONLY verification you do is: file exists (using `ls -f` silently) and user confirms it's filled

Infer readiness from `.env` existence check, user confirmation, and MCP behavior. Never read `.env` contents. Do not require running the app/server here.

At the end of Stage 4, use STAGE_COMPLETION_FORMAT. For the Stage 5 preview section, use the full "What this stage does" bullet list from Stage 5 verbatim — do not write a generic sentence.

### Stage 4 completion bullet wording

Always attribute credential and .env actions to the user — never to the assistant. Use language like "You confirmed…", "You retrieved…", "You filled in…".

Correct examples:
- D1: You confirmed you have a Cloudinary account
- D2: You retrieved your cloud name, API key, and API secret, and filled `.env` with real credentials

Incorrect (do not use):
- "Confirmed Cloudinary account" (ambiguous)
- "Filled .env with real credentials" (when said by assistant, implies the assistant touched the file)

## Stage 5 — verify setup automatically

**What this stage does:**

**All lanes:**
- **Verify this app's Cloudinary configuration** — create the `getting_started` unsigned upload preset via Admin API (this confirms credentials work and the product environment is reachable)
- **Confirm media delivery** — generate original and transformed image URLs and confirm they resolve correctly
- **Measure optimization savings** — fetch both URLs and record real size, format, and dimensions to show how much Cloudinary's optimization reduces file size
- **Document the setup** — write `docs/cloudinary-environment.json` with all verification details, no secrets stored

**Front-end and full-stack lanes only:**
- **Preview the results** — build `docs/cloudinary-getting-started-preview.html` showing the original and transformed images side by side

*Back-end API-only lanes skip the preview HTML.*

Prerequisite: enforce the Stage 5 gate. Credentials are now available in `.env`.

### Preset creation and Admin API calls

Preset creation and all Admin API calls use the credentials in `.env`. Load them via the same shell-wrap pattern (`set -a && . .env && set +a`). Never read or display their values.

**Preset creation via Admin API:**

```bash
set -a && . /path/to/project/.env && set +a && \
curl -s -X POST "https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload_presets" \
  -u "${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}" \
  --data-urlencode "name=getting_started" \
  --data-urlencode "unsigned=true" \
  --data-urlencode "tags=Getting Started"
```

Record `"preset_source": "admin_api_script"` in `docs/cloudinary-environment.json`.

**Cloud name:** `CLOUDINARY_CLOUD_NAME` is already in `.env`. Load it with the shell-wrap and use it to construct the preview URLs. Do not ask the user.

Measurements and artifact creation never require MCP and must always run regardless of IDE or agent state. For preset creation (the Admin API call), use the provided curl script that loads credentials from `.env` via shell-wrap.

### Execute Stage 5

1. Create unsigned upload preset `getting_started` tagged `Getting Started` via Admin API script.
2. Execute Stage 5 according to the recorded delivery lane (fetch asset, measure, generate URLs, create docs).

### Artifact requirements

**REQUIRED FIRST STEP — always try `samples/coffee` before any other asset lookup:**

Fetch `https://res.cloudinary.com/<cloud>/image/upload/samples/coffee` (replace `<cloud>` with the actual cloud name) and check the HTTP status code.

- **200 response → use `samples/coffee` everywhere in Stage 5.** Do not search MCP or the Admin API for an alternative. Set `selection_source: "samples/coffee"` in `docs/cloudinary-environment.json`.
- **Non-200 response → do NOT use `samples/coffee`.** Follow the fallback sequence below. Never use a URL that returned a non-200 response anywhere in Stage 5 artifacts.

Do not skip the `samples/coffee` fetch and go straight to MCP search. This is a required step, not an optional one.

**Fallback sequence (only when `samples/coffee` returns non-200):**

  **MANDATORY: Do not proceed with a broken or placeholder image URL. You must find a real deliverable asset before continuing.**

  1. Use the Admin API (`GET https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image?max_results=1`) with credentials loaded via shell-wrap to retrieve a real image asset from the user's cloud. Parse the first result's `public_id`.
  2. If the Admin API returns no results (empty cloud), tell the user their cloud has no uploaded images yet and ask them to upload at least one image before validation can complete. End with BLOCKING_FOOTER. Wait for confirmation before continuing.
  3. Use the selected public ID consistently for all preview URLs, validation artifacts, generated documentation, measurements, chat output, and preview HTML.
  4. Never use a URL that returned a non-200 response anywhere in Stage 5 artifacts.

  Record the selected `public_id`, original URL, transformed URL, selection source (`samples/coffee` or `admin_api_list`), and reason in `docs/cloudinary-environment.json`.

- Apply this exact transformed URL chain between `/upload/` and the selected public ID: `b_gen_fill,c_pad,w_1000,h_1000,y_-100/l_text:Arial_72_bold:Adapt%20everywhere,co_white/e_shadow:50/fl_layer_apply,g_south_west,x_80,y_140/l_text:Arial_34:Dynamic%20media%20built%20in%20real%20time,co_rgb:f5f5f5/e_shadow:35/fl_layer_apply,g_south_west,x_84,y_90/f_auto,q_auto`.
- Keep the original URL, transformed URL, and transformation text identical in chat, `docs/cloudinary-environment.json`, and preview HTML.
- Always create or update `docs/cloudinary-environment.json` when Stage 5 runs. Include `schema_version: 1`, non-secret `cloud_name`, upload preset name (`getting_started`), `preview` values, and real `measurements`. Never write secrets.
- Measure both preview URLs with a local script in a suitable project language. Use this Chrome-like `Accept` header: `image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8`. Record real bytes, content type, and dimensions when available. Never fabricate measurements. **Important:** The original image format (e.g., JPEG) will differ from the transformed format (e.g., WebP) because the transformation chain includes `f_auto`, which automatically selects the optimal format. Record both formats separately in measurements.
- For front-end and full-stack lanes, create or update `docs/cloudinary-getting-started-preview.html`. It must use the same two URL literals, fetch both URLs with the same `Accept` header, use `createImageBitmap` for browser stats when possible, show savings, and include a `#stage-5-integration-snippet` section. Back-end API-only lanes skip this file.
- Never add the standalone preview to framework route code. It belongs only in `docs/`.
- **Comments in generated files:** Every file created or significantly changed in Stage 5 must include short, useful inline comments explaining what each section does and why. Apply this to `docs/cloudinary-getting-started-preview.html` (explain each section: image display, measurement fetch, SDK snippet, stats), `docs/cloudinary-environment.json` (top-level comment block describing what the file contains and where to find docs), and any validation scripts. Focus on the non-obvious — why a particular URL pattern is used, what the Accept header achieves. Do not comment every line.
- For server lanes, the chat snippet and `#stage-5-integration-snippet` must generate the delivery URL through the detected stack's Cloudinary SDK when available. Do not use a pasted static URL as the only server integration.
- For front-end-only lanes, follow the framework-appropriate Cloudinary docs. A plain `<img src>` is acceptable when it matches the app. React-specific helpers are only for React-classified projects.
- Optional validation scripts may wrap measurements and Admin checks. Name them according to the project ecosystem; do not assume npm unless the repo is npm-based.
- In chat for front-end/full-stack lanes, echo the canonical transformed URL.

### Verification response format

For full success, use this exact structure — no repetition, no sections repeated elsewhere:

**Stage 5 complete:**

- Confirmed `samples/coffee` returns 200 — used as the preview asset (or: used Admin API to find asset `<public_id>`)
- Created `getting_started` unsigned upload preset via Admin API (verified credentials and product environment are reachable)
- Measured original and transformed URLs: `<original size/format/dimensions>` → `<transformed size/format/dimensions>` — `<% savings>`
- Created `docs/cloudinary-environment.json`
- Created `docs/cloudinary-getting-started-preview.html` (front-end and full-stack only)

Your **<Stack>** app is configured with Cloudinary and ready to deliver optimized media.

**Original image:**
```
<plain URL>
```

**Transformed image:**
```
<plain URL>
```

**<Stack> SDK snippet:**
```
<minimal code block that generates the delivery URL through the SDK>
```

**Preview:** Open `docs/cloudinary-getting-started-preview.html` in a browser. You'll see the original image next to the optimized version — the transformed image is smaller and faster while keeping quality. This is Cloudinary's delivery optimization in action. (Omit for API-only lanes.)

**Environment docs:** Open `docs/cloudinary-environment.json` for all verification details — no secrets stored.

---

Let me know when you're done reviewing your configuration and I'll suggest some next steps.

**Suggested reply:** Done

---

**Shortcut rule:** If Stage 5 did not run this round, show only the Done gate above. Still close with STAGE_COMPLETION_FORMAT (all five stages checked off).

## What's next after setup

**Important:** Use `references/after-done.md` for detailed instructions on this section. The details below are a summary only.

After the user says `Done` (the Done gate appears at the end of Stage 5), give them up to four specific next steps in this order:
1. **Install the Cloudinary VS Code extension** (if using VS Code)
2. **Run your app** — see the integration end-to-end from your browser
3. **Activate the MCP servers** — enable AI assistance in your IDE
4. **Choose a next step** — pick from the relevant use-case prompts

Use the delivery lane tracked during setup to choose which prompts to show. Replace `[framework]` in copy/paste prompts with the detected framework name, such as Flask, Django, Rails, or Next.js.

**What's safe to keep or delete:** The `docs/cloudinary-getting-started-preview.html` file was for validation — you can delete it anytime. Keep `docs/cloudinary-environment.json` for reference and `.env.example` for new developers. Never delete or commit `.env` (it contains real secrets).

### Install the Cloudinary VS Code extension

If you're using VS Code or a VS Code-based IDE (like Cursor), the [Cloudinary VS Code extension](https://cloudinary.com/documentation/cloudinary_vscode_extension) lets you manage, preview, and deliver media directly from your editor—no context switching needed.

1. Open VS Code extensions (Cmd+Shift+X on Mac, Ctrl+Shift+X on Windows/Linux)
2. Search for "Cloudinary" and click Install

### Run your app

Install dependencies and start your dev server:

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

### Activate the MCP servers

Restart your IDE so the MCP servers load your credentials. You may see permission prompts—confirm them. If you need help, ask the AI assistant.

---

### Build your app with Cloudinary

**Optimize and deliver your product or marketing assets**

`Generate optimized delivery URLs from assets in my Cloudinary product environment and display them in my [framework] app`

**Transform and deliver video content**

`Transform, optimize, and deliver video assets retrieved from my product environment in my [framework] app using Cloudinary`

**Let users upload photos or files to your app**

`Set up users to upload images in my [framework] app using the getting_started upload preset and the Cloudinary Upload widget`

### Build your API with Cloudinary (back-end only)

**Generate transformed and optimized delivery URLs**

`Generate transformed and optimized delivery URLs from my Cloudinary assets and return them in my [framework] API responses`

**Generate signed delivery URLs for protected assets**

`Add a server-side endpoint in my [framework] API that generates signed Cloudinary delivery URLs without exposing secrets to clients`

**Upload files from your server to Cloudinary**

`Upload files from my server to Cloudinary in my [framework] API`

**Build an admin workflow for finding and managing assets**

`Tag and search uploaded assets in Cloudinary using my [framework]`

### Rules for next steps

* **Output the startup commands exactly as written in the framework sections above.** Do not abbreviate, paraphrase, improvise, or substitute alternative commands. If Python/Flask is detected, output the full `python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt` followed by `python3 app.py` — never skip steps or show `pip install` alone.
* **What to include in What's Next:** Show sections in this order: (1) Install Cloudinary VS Code extension, (2) Run your app, (3) Activate the MCP servers, (4) Build your app/API with Cloudinary (pick relevant prompts). Then finish with the "What's safe to keep or delete" section at the end.
* Always show the VS Code extension section — users in other editors will simply skip it.
* Use the detected delivery lane to choose which prompts to show. Show the "Build your app with Cloudinary" section for front-end/full-stack, or "Build your API with Cloudinary" for back-end API-only.
* For front-end/full-stack apps, show the "Optimize and deliver", "Transform and deliver video", and "Upload photos" prompts.
* For back-end API-only apps, show the "Generate transformed URLs", "Generate signed URLs", "Upload files", and "Build admin workflow" prompts.
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
* If the user needs help activating the MCP servers, suggest they use the AI assistant: "If you run into issues with MCP activation, ask me to help — I can walk you through the specific steps for your IDE."

## Appendix A: IDE MCP Config Templates

Load only the template for the detected IDE.

**Claude Code** — write `mcpServers` to `.mcp.json` at the project root (not `.claude/settings.json`, not `.vscode/mcp.json`). This applies even when running inside the VS Code extension — Claude Code always uses `.mcp.json` at the project root, not the VS Code `servers` format. Use shell-wrap to load `.env` at startup:

```json
{
  "mcpServers": {
    "cloudinary-asset-mgmt": {
      "command": "sh",
      "args": ["-c", "set -a && . .env && set +a && npx -y --registry https://registry.npmjs.org --package @cloudinary/asset-management -- mcp start --transport stdio"]
    },
    "cloudinary-env-config": {
      "command": "sh",
      "args": ["-c", "set -a && . .env && set +a && npx -y --registry https://registry.npmjs.org --package @cloudinary/environment-config -- mcp start --transport stdio"]
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
      "args": ["-y", "--registry", "https://registry.npmjs.org", "--package", "@cloudinary/asset-management", "--", "mcp", "start", "--transport", "stdio"],
      "envFile": "${workspaceFolder}/.env"
    },
    "cloudinary-env-config": {
      "command": "npx",
      "args": ["-y", "--registry", "https://registry.npmjs.org", "--package", "@cloudinary/environment-config", "--", "mcp", "start", "--transport", "stdio"],
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
      "args": ["-c", "set -a && . .env && set +a && npx -y --registry https://registry.npmjs.org --package @cloudinary/asset-management -- mcp start --transport stdio"]
    },
    "cloudinary-env-config": {
      "type": "stdio",
      "command": "sh",
      "args": ["-c", "set -a && . .env && set +a && npx -y --registry https://registry.npmjs.org --package @cloudinary/environment-config -- mcp start --transport stdio"]
    }
  }
}
```

**Windsurf** — add servers to `~/.codeium/windsurf/mcp_config.json` (global) or a project-level `mcp_config.json`. Windsurf does not support `envFile`; use the same shell-wrap pattern with `mcpServers` as the top-level key (same format as Claude Code, including `--registry https://registry.npmjs.org`).

Other IDEs or agents — if the detected IDE isn't listed above, use that IDE or agent environment's standard project-level MCP configuration pattern. If the IDE supports .env references, point to the project .env; otherwise use shell-wrap or environment variable references.