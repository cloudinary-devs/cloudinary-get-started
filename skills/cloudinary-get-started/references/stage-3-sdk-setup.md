# Stage 3 — detected-stack SDK setup

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

**Source of correct install and import instructions — do not work from memory:**
- Before installing packages or writing any SDK code, read the installed Cloudinary skill that matches the detected stack (for Claude Code: `.claude/skills/cloudinary-react/SKILL.md` for React-classified projects) and follow its install and import instructions exactly, including package names and versions.
- For stacks without a matching installed skill, fetch the official Cloudinary documentation page for the detected framework/SDK (quickstart or SDK reference) and follow its install and import instructions. Never guess package names, versions, or import paths.
- Include an import for every Cloudinary feature the generated code uses. With `@cloudinary/url-gen`, each action/qualifier is a separate tree-shakable import (e.g., `@cloudinary/url-gen/actions/resize`) — a missing import is a broken build, not a style issue.
- After writing Stage 3 code, verify it builds or parses cleanly with the imports present (e.g., run the project's typecheck/build or a syntax check). Do not report Stage 3 complete if the verification fails.

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
