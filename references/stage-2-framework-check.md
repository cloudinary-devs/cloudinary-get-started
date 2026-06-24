# Stage 2 — repo/framework check

Run only after Stage 1 is resolved and after checking both repo evidence and the user’s original request for an explicit framework choice.

- **Empty repo:** if the user already named a framework/stack in the original request, treat that as the explicit stack choice and do not ask again. Ask which framework/stack they want only when no framework was stated and none can be detected. Do not assume React or Python.

  If the chosen framework can be used either as a full-stack app or an API/service only, and the intended delivery lane cannot be reasonably inferred, ask one additional question. Do NOT write the question as a separate sentence before the footer — the question appears ONLY in BLOCKING_FOOTER. Use the answer to classify the delivery lane.

- **Code-no-cloudinary:** name the inferred stack, affirm real app structure, say Cloudinary is not set up in this codebase yet, and ask whether to proceed. End with BLOCKING_FOOTER. Use answer cues like `proceed · wrong stack guess · quit`.
- **Code-with-cloudinary:** do not ask the user to choose a feature area. Confirm they want to continue with Cloudinary setup/configuration and validation for this repo, then proceed toward Stage 3/4/5 in order. End with BLOCKING_FOOTER whenever waiting.
- After React is detected or explicitly chosen, ensure `cloudinary-react` is installed via the skills pack before Stage 3 if it was not installed earlier.

Do not include credential or MCP handoff in Stage 2.

At the end of Stage 2, use STAGE_COMPLETION_FORMAT with BLOCKING_FOOTER. The gate question appears ONLY in the BLOCKING_FOOTER, not before it. Example gate question: "Ready to set up the SDK and the environment file?"

**CRITICAL: After sending STAGE_COMPLETION_FORMAT and BLOCKING_FOOTER, STOP. Do not write any Stage 3 code, install packages, create files, or take any Stage 3 action until the user explicitly replies confirming readiness.**
