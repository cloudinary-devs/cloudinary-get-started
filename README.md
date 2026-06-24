# Cloudinary Getting Started

An AI-assisted onboarding guide plus Cloudinary skills and MCP servers that help you integrate Cloudinary into a new or existing project. It installs AI tools (skills + MCP servers), detects your framework, configures the official Cloudinary SDK, guides you through credential setup, and validates the integration end-to-end.

## What this includes

**Cloudinary AI tools** — MCP servers and skills that make your AI coding assistant better at working with Cloudinary:

- **`cloudinary-docs`** — Answers Cloudinary questions using real, up-to-date documentation
- **`cloudinary-transformations`** — Generates valid image and video transformation URLs that follow best practices
- **`cloudinary-react`** — Provides React SDK patterns, configuration, and troubleshooting (used only if you choose React)

For the full set of Cloudinary skills, see the [main skills repo](https://github.com/cloudinary-devs/skills).

**Cloudinary MCP servers** — Connect your AI coding assistant to Cloudinary APIs:

- `cloudinary-asset-mgmt` — Query and manage assets in your Cloudinary account
- `cloudinary-env-config` — Read and manage environment variables

## Getting started

### One-time setup in your project

Run the getting-started guide in your project:

```
/cloudinary-get-started
```

Or copy the full prompt from `cloudinary-get-started-full-prompt.md` and paste it into your AI assistant's chat.

The guide walks through five stages:

1. **AI tooling** — Installs Cloudinary MCP servers and skills
2. **Framework detection** — Identifies your stack (Django, Rails, Next.js, etc.) and deployment model
3. **SDK setup** — Installs the official Cloudinary SDK for your framework and creates `.env.example`
4. **Credentials** — Connects your Cloudinary account and activates MCP servers
5. **Validation** — Verifies media delivery, measures optimization savings, and documents your setup

### After setup

Once you've completed the guide, you can:

- **Use the Cloudinary skills** — Ask your AI assistant to transform images, answer SDK questions, or write Cloudinary code. The skills fire in response to your questions.
- **Use the MCP servers** — Your AI assistant can now query your Cloudinary account, fetch your cloud name, and verify configuration without you leaving the IDE.
- **Install the VS Code extension** — If you use VS Code, the [Cloudinary VS Code extension](https://cloudinary.com/documentation/cloudinary_vscode_extension) lets you preview and manage media directly from your editor.

## Files in this repo

| File | Purpose |
|------|---------|
| `SKILL.md` | Skill definition — stage order, gates, and stage completion format |
| `cloudinary-get-started-full-prompt.md` | Full onboarding prompt (copy/paste into your AI assistant) |
| `references/` | Implementation details for each stage |
| `references/global-rules.md` | Security rules, SDK-agnostic rule, interaction patterns |
| `references/silent-explore.md` | Repo classification (stack, framework, delivery lane) |
| `references/stage-1-ai-tooling.md` | MCP server and skill installation |
| `references/stage-2-framework-check.md` | Framework and delivery lane detection |
| `references/stage-3-sdk-setup.md` | SDK installation and environment file setup |
| `references/stage-4-credentials.md` | Credential retrieval and `.env` configuration |
| `references/stage-5-validation.md` | Preset creation, URL measurement, and artifact requirements |
| `references/after-done.md` | Post-setup next steps and use-case prompts |

## What gets written to your project

When the skill runs, it creates or updates these files in your **project root**:

- `.mcp.json` — Cloudinary MCP server configuration
- `requirements.txt` / `package.json` / `Gemfile` / etc. — updated with Cloudinary SDK
- `.env.example` — placeholder credentials (safe to commit)
- `.env` — real credentials (added to `.gitignore`, never commit)
- `docs/cloudinary-environment.json` — validation results and setup details (no secrets)
- `docs/cloudinary-getting-started-preview.html` — side-by-side image preview (front-end and full-stack projects only)

## Learn more

- [Cloudinary documentation](https://cloudinary.com/documentation)
- [Cloudinary SDK for your framework](https://cloudinary.com/documentation/cloudinary_sdks)
- [Cloudinary MCP servers](https://cloudinary.com/documentation/cloudinary_llm_mcp)
