# Stage 1 — AI tooling

Verify that the current IDE or agent environment has Cloudinary MCP servers and skills. Before approval, inspect only; do not modify files or run install/add commands.

If any AI tooling is missing, stop and ask permission before installing or changing anything. **Do not ask framework or stack questions in this stage** — focus only on AI tooling.

After approval, set up the missing Cloudinary MCP servers and skills using the current IDE or agent environment's standard conventions. Follow official Cloudinary MCP guidance when needed:
https://cloudinary.com/documentation/cloudinary_llm_mcp#local_mcp_servers

### Cloudinary MCP server definitions

Cloudinary onboarding requires these two stdio MCP servers:
- `cloudinary-asset-mgmt` — package: `@cloudinary/asset-management`, command: `npx`, args: `-y --registry https://registry.npmjs.org --package @cloudinary/asset-management -- mcp start --transport stdio`
- `cloudinary-env-config` — package: `@cloudinary/environment-config`, command: `npx`, args: `-y --registry https://registry.npmjs.org --package @cloudinary/environment-config -- mcp start --transport stdio`

Configure those servers using the current IDE or agent environment's MCP format. Do not paste real secrets into MCP config. See `references/appendix-a-ide-mcp-templates.md` (Appendix A) for IDE-specific config templates.

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
- Include the `cloudinary-react` skill only when React-classified. (This is the skill from the skills pack — not the deprecated `cloudinary-react` npm package, which must never be installed.)
- After approval, complete the full setup needed for the current IDE or agent environment, including required MCP config, skills installation, skill relocation from `.agents/skills/`, cleanup, `.gitignore` updates, and verification.

After approval only:
- Add or repair the required MCP server config using the current IDE or agent environment's standard project-level MCP mechanism. Include `.env` reference as described in `references/appendix-a-ide-mcp-templates.md` (Appendix A).
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
