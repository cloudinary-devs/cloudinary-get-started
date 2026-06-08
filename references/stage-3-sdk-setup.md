# Stage 3 — detected-stack SDK setup

Prerequisites: Stage 1 complete, framework confirmed, and the user approved proceeding from Stage 2.

Use the detected stack as the source of truth:

- Install the official Cloudinary SDK/package for the detected language/framework, or follow the official Cloudinary docs when a first-party SDK is not applicable.
- Add imports/configuration in the project's established style and file locations.
- Write placeholder env values to `.env.example` at the project root — not to `.env`. Always include `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` placeholders for MCP/server-side use.
- Add client-exposed placeholders only when the detected framework requires them. Example: React/Vite uses `VITE_*` per the official Cloudinary React/Vite guidance.
- Do not request real credentials in Stage 3.
- Use the official Cloudinary SDK/docs and the repo's existing package manager/build conventions.

**Frontend-only setups:** `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in `.env.example` are for the MCP server only — they must never be exposed in client-side code or frontend bundles. Only `CLOUDINARY_CLOUD_NAME` (and its `VITE_*` equivalent when applicable) is safe to use client-side.

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

## Stage 4 gate enforcement

Before proceeding to Stage 4, enforce the Stage 4 gate (defined in SKILL.md; blocking rule in `references/global-rules.md`). Do not require credential-backed MCP calls before Stage 4, because real credentials are not available yet.

Transition to Stage 4 only after using the stage completion format defined in SKILL.md.
