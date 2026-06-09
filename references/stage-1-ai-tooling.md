# Stage 1 — AI tooling

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

## Cloudinary MCP server definitions

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

## IDE config patterns

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

## If AI is incomplete

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

When Stage 1 is complete, use the stage completion format defined in SKILL.md.
