# cloudinary-get-started

This is a **Claude Code skill** and **prompt**, not a standalone application. It cannot be installed, built, or run directly.

## What this is

A guided onboarding skill that helps developers integrate Cloudinary into a new or existing project. When invoked inside Claude Code, it walks through five stages:

1. AI tooling — sets up Cloudinary MCP servers and skills
2. Framework detection — identifies your stack and delivery lane
3. SDK setup — installs the Cloudinary SDK and creates `.env.example`
4. Credentials — connects your Cloudinary account and activates MCP
5. Validation — verifies delivery, measures optimization savings, and writes setup docs

## How to invoke it

### Option 1: Paste the full prompt

1. In your IDE, open or `cd` into the project where you want to configure Cloudinary.

2. Copy the text from `cloudinary-get-started-full-prompt.md` and paste it into the terminal.

### Option 2: Use the skill

Install the skill in your IDE, then invoke it with:

```
/cloudinary-get-started
```

You can also ask Claude to “get started with Cloudinary” in your project.

## Files in this directory

| File | Purpose |
|------|---------|
| `SKILL.md` | Main skill definition — stage order, gates, and completion format |
| `references/global-rules.md` | Security rules, SDK-agnostic rule, interaction rules |
| `references/silent-explore.md` | Repo classification logic (stack, delivery lane, React detection) |
| `references/stage-1-ai-tooling.md` | MCP server definitions and IDE config patterns |
| `references/stage-2-framework-check.md` | Framework detection and delivery lane confirmation |
| `references/stage-3-sdk-setup.md` | SDK install, `.env.example` setup, `.gitignore` rules |
| `references/stage-4-credentials.md` | Credential retrieval and MCP activation steps |
| `references/stage-5-validation.md` | Preset verification, URL measurement, artifact requirements |
| `references/after-done.md` | Next-step suggestions shown after setup completes |
| `cloudinary-get-started-full-prompt.md` | Allows you to access the skill as a prompt.

## What gets written to your project

When the skill runs, it writes files to the **project root** (not here):

- `.mcp.json` — Cloudinary MCP server config for Claude Code
- `requirements.txt` / `package.json` / etc. — updated with Cloudinary SDK
- `.env.example` — placeholder credentials (safe to commit)
- `.gitignore` — updated to exclude `.env`
- `docs/cloudinary-environment.json` — validation results, no secrets
- `docs/cloudinary-getting-started-preview.html` — side-by-side image preview (full-stack and front-end lanes only)
