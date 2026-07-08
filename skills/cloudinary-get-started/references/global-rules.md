# Global rules

### SDK-agnostic rule

Cloudinary setup must follow the detected project stack:
- Use the official Cloudinary SDK or Cloudinary documentation appropriate to the repo’s language/framework.
- Treat Python and React as conditional cases, not defaults.
- Install React packages or scaffolding only when React is detected in the repo or the user explicitly chooses React. For React, install `@cloudinary/react` and `@cloudinary/url-gen` — never the deprecated legacy `cloudinary-react` npm package. (Note: elsewhere in these instructions, `cloudinary-react` refers only to the skill from the skills pack, never to an npm package.)
- For other front-end stacks, use the framework-appropriate Cloudinary docs or SDK. Do not add React packages.
- For server lanes, Stage 5 snippets must be SDK-first for the detected server SDK whenever that SDK supports URL generation. Use an equivalent signed request only for Admin API validation when the SDK path is unavailable.

### Non-negotiable global rules

- Never ask for, print, echo, log, quote, or display secrets.
- **ABSOLUTE PROHIBITION:** Never open, read, parse, grep, cat, or access `.env` contents in any way — not with the Read tool, not with Bash/shell commands, not with any file-reading mechanism. This rule has no exceptions. From Stage 4 onward, check ONLY that the workspace-root `.env` file exists (using `ls -f .env` or equivalent one-liner to verify existence only). Never read the file, never view its contents, never display any output from reading it. Rely entirely on user confirmation and successful MCP/API behavior. If credentials are needed for a script, load them via shell-wrap (`set -a && . .env && set +a`) without reading, echoing, or displaying their values. **Single exception — cloud name only:** `CLOUDINARY_CLOUD_NAME` is not a secret; it appears in every public delivery URL. After shell-wrap loading, you may run `echo "$CLOUDINARY_CLOUD_NAME"` (that variable only — never the API key or secret) to obtain the literal cloud name needed for delivery URLs and validation artifacts.
- Stage 3 may write placeholder `CLOUDINARY_*` values to `.env.example`. Client-side placeholders are allowed only when required by the detected framework, such as `VITE_*` for React/Vite.
- Never place API secrets in source files, generated docs, MCP JSON, chat replies, scripts that echo output, logs, or validation artifacts.
- If secrets are pasted into chat or committed, tell the user to rotate API credentials in the Cloudinary Console immediately without reproducing the secret values.
- Do not require booting a dev server as a setup milestone.
- During setup (all stages), never add asset-rendering, demo, or example-display code to the application. App changes are limited to SDK install, configuration, and env loading. In-app media rendering happens only after `Done`, via the Next Steps prompts.
- **Delivery-URL verification (mandatory, no exceptions):** every Cloudinary delivery URL you write — into code, snippets, docs, chat, or artifacts — must be fetch-verified: request the exact URL and confirm HTTP 200 before presenting it or reporting the work complete. For SDK code, extract the URL the code actually produces (run it or log it) and verify that. `docs/cloudinary-environment.json` records the URLs already verified during setup — reuse its asset and transformation instead of composing new URLs whenever possible. A URL containing repeated bare segments such as `/auto/auto/` means qualifiers were chained as standalone actions in the SDK (e.g., `g_auto` outside the resize action); fix the composition and re-verify.
- Use the user’s IDE or agent environment for path/UI details. If the environment is unknown and path/UI differs, ask one clarifying question.
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
