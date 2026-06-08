# Global rules

## SDK-agnostic rule

Cloudinary setup must follow the detected project stack:

- Use the official Cloudinary SDK or Cloudinary documentation appropriate to the repo's language/framework.
- Treat Python and React as conditional cases, not defaults.
- Install `cloudinary-react`, `@cloudinary/react`, or React scaffolding only when React is detected in the repo or the user explicitly chooses React. React classification is defined in `references/silent-explore.md`.
- For other front-end stacks, use the framework-appropriate Cloudinary docs or SDK. Do not add React packages.
- For server lanes, Stage 5 snippets must be SDK-first for the detected server SDK whenever that SDK supports URL generation. Use an equivalent signed request only for Admin API validation when the SDK path is unavailable.

## Non-negotiable global rules

- Never ask for, print, echo, log, quote, or display secrets.
- Never open, read, parse, grep, or quote `.env` contents. From Stage 4 onward, check only that the workspace-root `.env` file exists, then rely on user confirmation and successful MCP/API behavior.
- Stage 3 may write placeholder `CLOUDINARY_*` values to `.env.example`. Client-side placeholders are allowed only when required by the detected framework, such as `VITE_*` for React/Vite.
- Never place API secrets in source files, generated docs, MCP JSON, chat replies, scripts that echo output, logs, or validation artifacts.
- If secrets are pasted into chat or committed, tell the user to rotate API credentials in the Cloudinary Console immediately without reproducing the secret values.
- Do not require booting a dev server as a setup milestone.
- Use the user's IDE or agent environment for path/UI details. If the environment is unknown and path/UI differs, ask one clarifying question.
- Default to generic instructions, then add one short environment-specific line only when needed.
- Never say `no Cloudinary wired`, `not wired`, `wire it up`, `wiring`, or similar jargon for code-no-cloudinary repos. Use positive framing: name the stack and say Cloudinary is not set up in this codebase yet.
- Do not install or recommend Cursor/Claude marketplace Cloudinary plugins. Use only the skills CLI flow.

**Blocking rule:** Enforce the Stage 4 gate before Stage 4 and the Stage 5 gate before Stage 5. If a gate is not satisfied, halt and guide the user through the missing setup before continuing.

## Interaction rules

- Ask one question at a time.
- When a phase requires user input, stop and wait.
- Before each pause, briefly recap what was found or completed.
- Do not continue past a failed command or missing setup unless the user confirms how to proceed.
- Report only actual command/API results. Never invent expected output.

## Blocking prompt footer

Whenever you must stop for an answer, keep explanation short and finish with this footer so the pause is obvious:

```text
Reply to continue setup:

<Concrete gate question>

Answer with: <adapted cues>
```

Use this footer for Stage 1 approval, Stage 2 forks, Stage 4 prompts, MCP retry confirmations, Done, and any other wait state. Keep signup links, context, or short bullets above the footer. The footer must be final.

For Stage 1 approval, the concrete gate question must be the permission sentence from Stage 1 exactly, with only the missing-items placeholder replaced.
