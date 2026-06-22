# Stage 5 — verify setup automatically

**What this stage does:**

**All lanes:**
- **Create upload preset** — create the `getting_started` unsigned upload preset via Admin API
- **Confirm media delivery** — generate original and transformed image URLs and confirm they resolve correctly
- **Measure optimization savings** — fetch both URLs and record real size, format, and dimensions to show how much Cloudinary's optimization reduces file size
- **Document the setup** — write `docs/cloudinary-environment.json` with all verification details, no secrets stored

**Back-end API-only and full-stack lanes only:**
- **Verify this app's Cloudinary configuration** — call the Admin API config endpoint to confirm the product environment is reachable and read `folder_mode`

**Front-end and full-stack lanes only:**
- **Preview the results** — build `docs/cloudinary-getting-started-preview.html` showing the original and transformed images side by side

*Front-end only lanes skip the Admin API verification entirely.*

Prerequisite: enforce the Stage 5 gate. Credentials are now available in `.env`.

**Delivery lane check:** Use the `delivery_lane` state tracked from silent explore. Only attempt Admin API verification for `back-end API-only` or `full-stack` lanes. For `front-end only` lanes, skip Admin API calls entirely and set `admin_api.skipped_reason: front_end_only_lane` in the environment JSON.

### Preset creation and Admin API calls

Preset creation and all Admin API calls use the credentials in `.env`. Load them via the same shell-wrap pattern (`set -a && . .env && set +a`). Never read or display their values.

**Preset creation via Admin API:**

```bash
set -a && . /path/to/project/.env && set +a && \
curl -s -X POST "https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload_presets" \
  -u "${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}" \
  --data-urlencode "name=getting_started" \
  --data-urlencode "unsigned=true" \
  --data-urlencode "tags=Getting Started"
```

Record `"preset_source": "admin_api_script"` in `docs/cloudinary-environment.json`.

**Cloud name:** `CLOUDINARY_CLOUD_NAME` is already in `.env`. Load it with the shell-wrap and use it to construct the preview URLs. Do not ask the user.

Measurements, Admin API checks, and artifact creation never require MCP and must always run regardless of IDE or agent state. For Admin API config checks, always use the detected project's Cloudinary SDK first (loading credentials from `.env` via the SDK's config method). If the SDK call fails or the SDK is not available, fall back to curl-based scripts only as a last resort.

### Execute Stage 5

1. Create unsigned upload preset `getting_started` tagged `Getting Started` via Admin API script.
2. Execute Stage 5 according to the recorded delivery lane (fetch asset, measure, generate URLs, create docs).

### Artifact requirements

**REQUIRED FIRST STEP — always try `samples/coffee` before any other asset lookup:**

Fetch `https://res.cloudinary.com/<cloud>/image/upload/samples/coffee` (replace `<cloud>` with the actual cloud name) and check the HTTP status code.

- **200 response → use `samples/coffee` everywhere in Stage 5.** Do not search MCP or the Admin API for an alternative. Set `selection_source: "samples/coffee"` in `docs/cloudinary-environment.json`.
- **Non-200 response → do NOT use `samples/coffee`.** Follow the fallback sequence below. Never use a URL that returned a non-200 response anywhere in Stage 5 artifacts.

Do not skip the `samples/coffee` fetch and go straight to MCP search. This is a required step, not an optional one.

**Fallback sequence (only when `samples/coffee` returns non-200):**

  **MANDATORY: Do not proceed with a broken or placeholder image URL. You must find a real deliverable asset before continuing.**

  1. Use the Admin API (`GET https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image?max_results=1`) with credentials loaded via shell-wrap to retrieve a real image asset from the user's cloud. Parse the first result's `public_id`.
  2. If the Admin API returns no results (empty cloud), tell the user their cloud has no uploaded images yet and ask them to upload at least one image before validation can complete. End with BLOCKING_FOOTER. Wait for confirmation before continuing.
  3. Use the selected public ID consistently for all preview URLs, validation artifacts, generated documentation, measurements, chat output, and preview HTML.
  4. Never use a URL that returned a non-200 response anywhere in Stage 5 artifacts.

  Record the selected `public_id`, original URL, transformed URL, selection source (`samples/coffee` or `admin_api_list`), and reason in `docs/cloudinary-environment.json`.

- Apply this exact transformed URL chain between `/upload/` and the selected public ID: `b_gen_fill,c_pad,w_1000,h_1000,y_-100/l_text:Arial_72_bold:Adapt%20everywhere,co_white/e_shadow:50/fl_layer_apply,g_south_west,x_80,y_140/l_text:Arial_34:Dynamic%20media%20built%20in%20real%20time,co_rgb:f5f5f5/e_shadow:35/fl_layer_apply,g_south_west,x_84,y_90/f_auto,q_auto`.
- Keep the original URL, transformed URL, and transformation text identical in chat, `docs/cloudinary-environment.json`, and preview HTML.
- Always create or update `docs/cloudinary-environment.json` when Stage 5 runs. Include `schema_version: 1`, non-secret `cloud_name`, upload preset name (`getting_started`), `preview` values, and real `measurements`. Never write secrets.
- For back-end API-only and full-stack lanes, check Admin API config with `settings=true` using the detected project's Cloudinary SDK (not MCP). Load credentials from `.env` via the SDK's config method. The response shape is `{ "settings": { "folder_mode": "dynamic" | "fixed" }, ... }` — read `folder_mode` from `response.settings.folder_mode`, not the top-level response object. Persist `admin_api.reachable` and `admin_api.folder_mode` as `dynamic`, `fixed`, or `null` with a short error. Docs: https://cloudinary.com/documentation/admin_api#get_product_environment_config_details.

  **Correct Admin API endpoint:** `GET https://api.cloudinary.com/v1_1/{cloud_name}/config?settings=true` authenticated with `-u API_KEY:API_SECRET`. Do NOT use `/admin/settings`, `/admin/account_info`, or any other path — those return 404.

  curl fallback (only when SDK is unavailable):
  ```bash
  curl -s "https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/config?settings=true" \
    -u "${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}"
  ```
  Parse `response.settings.folder_mode` from the JSON result.
- For front-end-only lanes, skip Admin API config. Omit `admin_api` or set `admin_api.skipped_reason: front_end_only_lane`, and mention the skip in validation.
- Measure both preview URLs with a local script in a suitable project language. Use this Chrome-like `Accept` header: `image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8`. Record real bytes, content type, and dimensions when available. Never fabricate measurements. **Important:** The original image format (e.g., JPEG) will differ from the transformed format (e.g., WebP) because the transformation chain includes `f_auto`, which automatically selects the optimal format. Record both formats separately in measurements.
- For front-end-only and full-stack lanes, create or update `docs/cloudinary-getting-started-preview.html`. It must use the same two URL literals, fetch both URLs with the same `Accept` header, use `createImageBitmap` for browser stats when possible, show savings, and include a `#stage-5-integration-snippet` section. API-only lanes skip this file.
- Never add the standalone preview to framework route code. It belongs only in `docs/`.
- **Comments in generated files:** Every file created or significantly changed in Stage 5 must include short, useful inline comments explaining what each section does and why. Apply this to `docs/cloudinary-getting-started-preview.html` (explain each section: image display, measurement fetch, SDK snippet, stats), `docs/cloudinary-environment.json` (top-level comment block describing what the file contains and where to find docs), and any validation scripts. Focus on the non-obvious — why a particular URL pattern is used, what the Accept header achieves, what folder_mode means. Do not comment every line.
- For server lanes, the chat snippet and `#stage-5-integration-snippet` must generate the delivery URL through the detected stack's Cloudinary SDK when available. Do not use a pasted static URL as the only server integration.
- For front-end-only lanes, follow the framework-appropriate Cloudinary docs. A plain `<img src>` is acceptable when it matches the app. React-specific helpers are only for React-classified projects.
- Optional validation scripts may wrap measurements and Admin checks. Name them according to the project ecosystem; do not assume npm unless the repo is npm-based.
- In chat for front-end/full-stack lanes, echo the canonical transformed URL. Also echo `folder_mode` when Admin config ran.

### Verification response format

For full success, use this exact structure — no repetition, no sections repeated elsewhere:

**Stage 5 complete:**

- Confirmed `samples/coffee` returns 200 — used as the preview asset (or: used Admin API to find asset `<public_id>`)
- Created `getting_started` unsigned upload preset via Admin API
- Admin API config reachable — `folder_mode: <value>` (omit for front-end-only lanes)
- Measured original and transformed URLs: `<original size/format/dimensions>` → `<transformed size/format/dimensions>` — `<% savings>`
- Created `docs/cloudinary-environment.json`
- Created `docs/cloudinary-getting-started-preview.html` (omit for back-end API-only lanes)

Your **<Stack>** app is configured with Cloudinary and ready to deliver optimized media.

**Original image:**
```
<plain URL>
```

**Transformed image:**
```
<plain URL>
```

**<Stack> SDK snippet:**
```
<minimal code block that generates the delivery URL through the SDK>
```

**Preview:** Open `docs/cloudinary-getting-started-preview.html` in a browser. You'll see the original image next to the optimized version — the transformed image is smaller and faster while keeping quality. This is Cloudinary's delivery optimization in action. (Omit for API-only lanes.)

**Environment docs:** Open `docs/cloudinary-environment.json` for all verification details — no secrets stored.

---

Let me know when you're done reviewing your configuration and I'll suggest some next steps.

**Suggested reply:** Done

---

**Shortcut rule:** If Stage 5 did not run this round, show only the Done gate above. Still close with STAGE_COMPLETION_FORMAT (all five stages checked off).
