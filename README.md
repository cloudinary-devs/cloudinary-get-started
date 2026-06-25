# Cloudinary Getting Started

An installer CLI for an AI-assisted onboarding skill that guides you through integrating Cloudinary into a new or existing project.

## Install

Install the CLI globally or in your project:

```
npx skills add cloudinary-devs/cloudinary-get-started
```

This installs the skill to `.claude/skills/cloudinary-get-started` by default.

To install to a different IDE's skill folder:

```
npx skills add cloudinary-devs/cloudinary-get-started --target cursor
npx skills add cloudinary-devs/cloudinary-get-started --target agents
```

## Use

Once installed, run the onboarding guide in any project:

```
/cloudinary-get-started
```

The skill walks through seven steps:

1. **Silent explore** — Detect your project structure, framework, and stack (automatically)
2. **Stage 1: AI tooling** — Install Cloudinary MCP servers (required) and optionally the related skills
3. **Stage 2: Framework detection** — Identify your stack (Django, Rails, Next.js, etc.) and deployment model (front-end, back-end, or full-stack)
4. **Stage 3: SDK setup** — Install the official Cloudinary SDK for your framework and create `.env.example`
5. **Stage 4: Credentials** — Retrieve your Cloudinary account credentials and save them to `.env`
6. **Stage 5: Validation** — Verify media delivery, measure optimization savings, and document your setup
7. **What's next** — Get personalized next steps, install the VS Code extension, and access use-case-specific prompts

## What's included

**Cloudinary MCP servers:**
- `cloudinary-asset-mgmt` — Query and manage assets in your Cloudinary account
- `cloudinary-env-config` — Read and manage environment variables

**Related skills** (optional, install separately):
- **`cloudinary-docs`** — Answers Cloudinary questions using real, up-to-date documentation
- **`cloudinary-transformations`** — Generates valid image and video transformation URLs that follow best practices
- **`cloudinary-react`** — Provides React SDK patterns, configuration, and troubleshooting (used only if you choose React)

See the [main skills repo](https://github.com/cloudinary-devs/skills) to install the related skills.

## Files in this repo

| File | Purpose |
|------|---------|
| `bin/index.js` | Installer CLI — copies the skill into your project's IDE folder |
| `skill/SKILL.md` | Skill definition — stage order, gates, and stage completion format |
| `skill/cloudinary-get-started-full-prompt.md` | Full onboarding prompt (copy/paste into your AI assistant) |
| `skill/references/` | Implementation details for each stage |

## What gets written to your project

When the skill runs, it creates or updates these files in your **project root**:

- **MCP server config** — location depends on your IDE/agent, for example:
  - Claude Code: `.mcp.json`
  - Cursor: `.cursor/mcp.json`
  - VS Code: `.vscode/mcp.json`
- **SDK configuration** — updated in your app's entry point (e.g., `app.py`, `server.js`, `app/config.rb`) with Cloudinary imports and config
- **Dependency manifest** — `requirements.txt` / `package.json` / `Gemfile` / `go.mod` / etc. — updated with Cloudinary SDK
- `.env.example` — placeholder credentials (safe to commit)
- `.env` — created if it doesn't exist, or updated only with your permission if it already exists; contains real credentials (added to `.gitignore`, never commit)
- `docs/cloudinary-environment.json` — validation results and setup details (no secrets)
- `docs/cloudinary-getting-started-preview.html` — side-by-side image preview (front-end and full-stack projects only)

## Learn more

- [Cloudinary documentation](https://cloudinary.com/documentation)
- [Cloudinary SDK for your framework](https://cloudinary.com/documentation/cloudinary_sdks)
- [Cloudinary MCP servers](https://cloudinary.com/documentation/cloudinary_llm_mcp)
