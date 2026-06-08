# Stage 5 — validation

**What this stage does:**

**All lanes:**
- **Verify MCP connection** — confirm both Cloudinary MCP servers are live by creating the `getting_started` unsigned upload preset
- **Confirm media delivery** — generate original and transformed image URLs and confirm they resolve correctly
- **Measure optimization savings** — fetch both URLs and record real size, format, and dimensions to show how much Cloudinary's optimization reduces file size
- **Document the setup** — write `docs/cloudinary-environment.json` with all verification details, no secrets stored

**Back-end API-only and full-stack lanes only:**
- **Verify this app's Cloudinary configuration** — call the Admin API config endpoint to confirm the product environment is reachable and read `folder_mode`

**Front-end and full-stack lanes only:**
- **Preview the results** — build `docs/cloudinary-getting-started-preview.html` showing the original and transformed images side by side

*Front-end only lanes skip the Admin API verification entirely.*

---

Prerequisite: enforce the Stage 5 gate, unless shortcut context proves MCP is already authenticated.

Read MCP tool schemas before calling. Use MCP tools first.

**Delivery lane check:** Use the `delivery_lane` state tracked from silent explore. Only attempt Admin API verification for `back-end API-only` or `full-stack` lanes. For `front-end only` lanes, skip Admin API calls entirely and set `admin_api.skipped_reason: front_end_only_lane` in the environment JSON.

## If MCP is blocked

Work through this sequence before treating MCP as unavailable:

1. **Send IDE-specific fix guidance** (see IDE patterns in `references/stage-1-ai-tooling.md`) and ask the user to retry. End with the blocking prompt footer.
2. **If still blocked after the fix**, verify the most common causes:
   - `.env` exists at the project root (do not read it; ask the user to confirm all three `CLOUDINARY_*` keys are filled)
   - The MCP config file is present and well-formed for the detected IDE
   - `npx` is available in the shell (`which npx` or `where npx`)
   - The IDE's MCP process was fully restarted, not just reloaded
3. **Ask the user to retry** once more. End with the blocking prompt footer.
4. **Only after two failed retry attempts**, use the script-based fallbacks below. Note degraded mode in `docs/cloudinary-environment.json`.

### Script-based fallbacks (only after MCP troubleshooting is exhausted)

The credentials in `.env` are sufficient to complete Stage 5 without MCP. Load them via the same shell-wrap pattern used throughout this skill (`set -a && . .env && set +a`). Never read or display their values.

**Preset creation (`cloudinary-env-config` blocked):** run a script to create the preset via the Admin API:

```bash
set -a && . /path/to/project/.env && set +a && \
curl -s -X POST "https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload_presets" \
  -u "${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}" \
  --data-urlencode "name=getting_started" \
  --data-urlencode "unsigned=true" \
  --data-urlencode "tags=Getting Started"
```

Record `"preset_source": "admin_api_script"` in `docs/cloudinary-environment.json`.

**Cloud name (`cloudinary-asset-mgmt` blocked):** `CLOUDINARY_CLOUD_NAME` is already in `.env`. Load it with the shell-wrap and use it to construct the preview URLs. Do not ask the user.

Measurements, Admin API checks, and artifact creation never require MCP and must always run regardless of MCP status. For Admin API config checks, always use the detected project's Cloudinary SDK first (loading credentials from `.env` via the SDK's config method). If the SDK call fails or the SDK is not available, fall back to curl-based scripts only as a last resort.

## When MCP works

1. Create or verify unsigned upload preset `getting_started` tagged `Getting Started`.
2. Execute Stage 5 according to the recorded delivery lane.

## Artifact requirements

- Use `samples/coffee` from the user's cloud for the preview asset. Use this original URL pattern: `https://res.cloudinary.com/<cloud>/image/upload/samples/coffee`.
- Use this exact transformed URL chain between `/upload/` and `samples/coffee`: `b_gen_fill,c_pad,w_1000,h_1000,y_-100/l_text:Arial_72_bold:Adapt%20everywhere,co_white/e_shadow:50/fl_layer_apply,g_south_west,x_80,y_140/l_text:Arial_34:Dynamic%20media%20built%20in%20real%20time,co_rgb:f5f5f5/e_shadow:35/fl_layer_apply,g_south_west,x_84,y_90/f_auto,q_auto`.
- Keep the original URL, transformed URL, and transformation text identical in chat, `docs/cloudinary-environment.json`, and preview HTML.
- Always create or update `docs/cloudinary-environment.json` when Stage 5 runs. Include `schema_version: 1`, non-secret `cloud_name`, upload preset details from MCP `get-upload-preset-details`, `preview` values, and real `measurements`. Never write secrets.
- For back-end API-only and full-stack lanes, check Admin API config with `settings=true` using the detected project's Cloudinary SDK (not curl, not MCP). Load credentials from `.env` via the SDK's config method. The response shape is `{ "settings": { "folder_mode": "dynamic" | "fixed" }, ... }` — read `folder_mode` from `response.settings.folder_mode`, not the top-level response object. Persist `admin_api.reachable` and `admin_api.folder_mode` as `dynamic`, `fixed`, or `null` with a short error. Docs: https://cloudinary.com/documentation/admin_api#get_product_environment_config_details.
- For front-end-only lanes, skip Admin API config. Omit `admin_api` or set `admin_api.skipped_reason: front_end_only_lane`, and mention the skip in validation.
- Measure both preview URLs with a local script in a suitable project language. Use this Chrome-like `Accept` header: `image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8`. Record real bytes, content type, and dimensions when available. Never fabricate measurements.
- For front-end-only and full-stack lanes, create or update `docs/cloudinary-getting-started-preview.html`. It must use the same two URL literals, fetch both URLs with the same `Accept` header, use `createImageBitmap` for browser stats when possible, show savings, and include a `#stage-5-integration-snippet` section. API-only lanes skip this file.
- Never add the standalone preview to framework route code. It belongs only in `docs/`.
- For server lanes, the chat snippet and `#stage-5-integration-snippet` must generate the delivery URL through the detected stack's Cloudinary SDK when available. Do not use a pasted static URL as the only server integration.
- For front-end-only lanes, follow the framework-appropriate Cloudinary docs. A plain `<img src>` is acceptable when it matches the app. React-specific helpers are only for React-classified projects.
- Optional validation scripts may wrap measurements and Admin checks. Name them according to the project ecosystem; do not assume npm unless the repo is npm-based.
- In chat for front-end/full-stack lanes, echo the canonical transformed URL. Also echo `folder_mode` when Admin config ran.

## Validation response format

If MCP troubleshooting is still in progress (user has not yet retried), send only MCP-fix guidance — do not show validation output yet.

If Stage 5 completed via script-based fallbacks, use this format with a note that preset data came from the Admin API script rather than MCP.

For full success or equivalent shortcut completion, use the structure below. Every item starts with a bold label and colon. Omit items that did not apply or did not run this round. Never use the word "wired" — use "set up" instead.

1. **MCP servers:** Connected! Briefly say what they were used for this round (e.g., "Used them to verify the `getting_started` upload preset — unsigned, tagged `Getting Started`."). If preset was created rather than verified, say so. If fallback script was used instead, note that here.
2. **Admin API:** Reachable (or not, with the error). If reachable, say "Used the config endpoint to check your product environment — `folder_mode` is `<value>`." Omit for front-end-only lanes.
3. **Original image:** The original URL as a plain URL on its own line.
4. **Transformed image:** The transformed URL as a plain URL on its own line.
5. **Measurements:** A compact two-row table (Original / Transformed) with columns: size in KB, format, and dimensions when available. End with a one-line savings summary (e.g., "66.6% smaller — JPEG 161 KB → WebP 54 KB"). Confirm values came from a real fetch with Chrome-like `Accept`, not guesses.
6. **<Stack> SDK snippet:** A minimal SDK-first code block that generates the delivery URL through the detected stack's Cloudinary SDK. Label it with the actual stack name (e.g., "Flask SDK snippet"). Server lanes must use the SDK; never use a hardcoded static URL as the only integration.
7. **Preview:** "Open `docs/cloudinary-getting-started-preview.html` in a browser to see the original and transformed images side by side with live stats." Omit for back-end API-only lanes.
8. **Environment docs:** "Open `docs/cloudinary-environment.json` to see all verification details — no secrets stored."
9. One short congratulations sentence confirming the detected stack is set up with Cloudinary.
10. Done gate with a conversational closing prompt, e.g.: "Let me know when you're done reviewing your configuration and I'll suggest some next steps." Format as a simple prompt without the blocking prompt footer (no "Reply to continue setup:" phrase — setup is complete).

Done gate format example:
```
Let me know when you're done reviewing your configuration and I'll suggest some next steps.

Answer with: Done
```

Shortcut rule: if Stage 5 did not run this round, omit Stage 5 artifact lines such as `docs/cloudinary-environment.json`, measurements, or preview HTML. Still finish with the Done gate.

At the end of Stage 5, use the stage completion format defined in SKILL.md (all five stages should be checked off).
