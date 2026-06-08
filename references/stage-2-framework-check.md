# Stage 2 — repo/framework check

Run only after Stage 1 is resolved.

- Empty repo: ask which framework/stack the user wants. Do not assume React or Python. Wait for an explicit answer and end with the blocking prompt footer. React-classified (per `references/silent-explore.md`) only after they clearly choose React or a React starter.
- Code-no-cloudinary: name the inferred stack, affirm real app structure, say Cloudinary is not set up in this codebase yet, and ask whether to proceed. End with the blocking prompt footer. Use answer cues like `proceed · wrong stack guess · quit`.
- Code-with-cloudinary: do not ask the user to choose a feature area. Confirm they want to continue with Cloudinary setup/configuration and validation for this repo, then proceed toward Stage 3/4/5 in order. End with the blocking prompt footer whenever waiting.
- After React is detected or explicitly chosen, ensure `cloudinary-react` is installed via the skills pack before Stage 3 if it was not installed earlier.

Do not include credential or MCP handoff in Stage 2.

At the end of Stage 2, use the stage completion format defined in SKILL.md.
