# Stage 3 — detected-stack SDK setup

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

    When Stage 3 completes for a frontend-only setup, include this note in the user-facing response.

    ```
    **Important for frontend applications:** The `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` placeholders in `.env.example` are included for MCP and server-side Cloudinary operations only. Never expose these values in client-side code, browser bundles, or public repositories.

    Only `CLOUDINARY_CLOUD_NAME` — and framework-specific client variables such as `VITE_CLOUDINARY_CLOUD_NAME` when applicable — are safe to use in frontend code.
    ```

## `.env.example` format

Write `.env.example` with a comment header and placeholder values, for example:

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

## `.gitignore`

Ensure `.env` is listed in `.gitignore` at the project root. If not present, add it. Do not add `.env.example` to `.gitignore` — it should be committed.

## Comments in generated files

Every file created or significantly changed in Stage 3 must include short, useful inline comments explaining what each section does and why — so a developer who didn't run the skill can understand the Cloudinary wiring at a glance.

Apply this rule to: the main app or entry file (e.g. `app.py`, `server.js`), `requirements.txt` or equivalent dependency file, and `.env.example`.

Focus comments on the non-obvious: what a config block does, why a particular env variable is required, what the SDK call connects to. Do not add comments for obvious one-liners.

## Stage 4 gate enforcement

Before proceeding to Stage 4, enforce the Stage 4 gate (defined in SKILL.md; blocking rule in `references/global-rules.md`). Do not require credential-backed MCP calls before Stage 4, because real credentials are not available yet.

The Stage 3 blocking prompt footer must ask only whether the user is ready to continue — not whether they have a Cloudinary account. The account check is Stage 4 D1's job. Asking it here creates a duplicate question.

Transition to Stage 4 only after using the stage completion format defined in SKILL.md.
