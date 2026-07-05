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
