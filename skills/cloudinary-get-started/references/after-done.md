# What's next after setup

**CRITICAL:** This reference contains the authoritative content for the final step. Show this section ONLY AFTER the user explicitly replies "Done" to the Stage 5 Done gate (the closing block of the "Verification response format" section in `stage-5-validation.md`).

After the user says `Done`, reply with the full What's next sections in this order. The numbered list below is your internal ordering checklist, NOT the reply format — never reply with a numbered summary list of one-line blurbs in place of the full sections:
1. **Install the Cloudinary VS Code extension** (if using VS Code or a VS Code-based IDE)
2. **Customize your cloud name** — ONLY if the cloud name is machine-generated (see that section's gate); otherwise this step does not exist: output nothing for it and renumber the remaining steps
3. **Run your app** — see the integration end-to-end from your browser
4. **Activate the MCP servers** — enable AI assistance in your IDE
5. **Choose a next step** — pick from the relevant use-case prompts

Use the delivery lane tracked during setup to choose which prompts to show. Replace `[framework]` in copy/paste prompts with the detected framework name, such as Flask, Django, Rails, or Next.js.

**What's safe to keep or delete:** The `docs/cloudinary-getting-started-preview.html` file was for validation — you can delete it anytime. Keep `docs/cloudinary-environment.json` for reference and `.env.example` for new developers. Never delete or commit `.env` (it contains real secrets).

### Install the Cloudinary VS Code extension (VS Code and VS Code-based IDEs)

If you're using VS Code or a VS Code-based IDE (like Cursor), the [Cloudinary VS Code extension](https://cloudinary.com/documentation/cloudinary_vscode_extension) lets you manage, preview, and deliver media directly from your editor—no context switching needed.

1. Open VS Code extensions (Cmd+Shift+X on Mac, Ctrl+Shift+X on Windows/Linux)
2. Search for "Cloudinary" and click Install

### Customize your cloud name

Decide first, before writing anything for this step:

- **Machine-generated cloud name** (an unpronounceable consonant/digit jumble such as `dqj4x8f3k` or `hb2q1r5xj`): show this step by copying the marker block below exactly.
- **Anything else** — any cloud name containing a recognizable word, personal name, or brand-like string, including hyphenated or multi-word names (e.g., `yelenik`, `new-shop`, `mycompany`, `acme`): SKIP this step. Skipping means output NOTHING for it: no "Customize your cloud name" heading, no one-line summary, no improvised alternative, and no line for it in the numbered overview — continue directly to the next section. Writing ANY cloud-name content for a non-machine-generated cloud name is an error. All-lowercase alone does not mean random. **When in doubt, skip.**

**Scope guard:** this step renames the cloud name inside the delivery URL path (`res.cloudinary.com/<cloud_name>/...`). It is NOT the custom domain / CNAME feature (`media.yourcompany.com`) — never mention custom domains or subdomains here, and never invent Console paths such as "Account → Custom Domain". The only correct location is the product environments settings page linked below.

When shown, reply with the exact text between the BEGIN and END marker lines — character-for-character, rendered as normal markdown. Do not include the marker lines themselves, do not wrap the text in a code fence, and do not shorten, reformat, merge, or reword any line:

<!-- BEGIN VERBATIM: Customize your cloud name -->
Your cloud name appears in every delivery URL. A short, brand-related cloud name is better for SEO/AEO than the auto-generated default:

1. Go to: `https://console.cloudinary.com/app/settings/product-environments`
2. Find your product environment in the list.
3. Click the **More** button (three dots ⋮) on the right side of your product environment row.
4. Select **Edit** from the menu.
5. Change the "Cloud Name" field to your new name (e.g., `mycompany`, `cdn-assets`, etc.).
6. Click **Save**.

**After you change it,** update your `.env` file:
- Change `CLOUDINARY_CLOUD_NAME=<old_name>` to `CLOUDINARY_CLOUD_NAME=<new_name>`
- If using React/Vite, also update `VITE_CLOUDINARY_CLOUD_NAME=<new_name>`
- Restart your app so the new cloud name takes effect. The delivery URLs verified during setup used the old cloud name, so they'll change.
<!-- END VERBATIM: Customize your cloud name -->

### Run your app

Install dependencies and start your dev server:

When the user's detected framework is one of the below, output these exact commands — word-for-word, do not paraphrase, abbreviate, or substitute alternative commands. Present them in code blocks ready to copy-paste:

**Python/Flask:**
```
python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
python3 app.py
```

**Node/Next.js:**
```
npm install
npm run dev
```

**Node/Express:**
```
npm install
node server.js
```

**Ruby/Rails:**
```
bundle install
rails server
```

**PHP/Laravel:**
```
composer install
php artisan serve
```

**Go:**
```
go mod tidy
go run .
```

If the detected framework is not listed above, determine and show the equivalent install-then-start sequence for that stack, but always include all prerequisite setup steps (venv, package manager install, etc.) before the server start command.

**Full-stack apps with separate client and server processes** (e.g., a Vite/React front end plus an Express API): show the start commands for BOTH processes, each clearly labeled with what it starts and its port. Showing only the server command leaves the user unable to open the app.

### Activate the MCP servers

Restart your IDE so the MCP servers load your credentials. You may see permission prompts—confirm them. If you need help, ask the AI assistant.

---

### Build your app with Cloudinary

**Optimize and deliver your product or marketing assets**

`Generate optimized delivery URLs from assets in my Cloudinary product environment and display them in my [framework] app`

**Transform and deliver video content**

`Transform, optimize, and deliver video assets retrieved from my product environment in my [framework] app using Cloudinary`

**Let users upload photos or files to your app**

`Set up users to upload images in my [framework] app using the getting_started upload preset and the Cloudinary Upload widget`

### Build your API with Cloudinary (back-end only)

**Generate transformed and optimized delivery URLs**

`Generate transformed and optimized delivery URLs from my Cloudinary assets and return them in my [framework] API responses`

**Generate signed delivery URLs for protected assets**

`Add a server-side endpoint in my [framework] API that generates signed Cloudinary delivery URLs without exposing secrets to clients`

**Upload files from your server to Cloudinary**

`Upload files from my server to Cloudinary in my [framework] API`

**Build an admin workflow for finding and managing assets**

`Tag and search uploaded assets in Cloudinary using my [framework]`

### Rules for next steps

* **Output the startup commands exactly as written in the framework sections above.** Do not abbreviate, paraphrase, improvise, or substitute alternative commands. If Python/Flask is detected, output the full `python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt` followed by `python3 app.py` — never skip steps or show `pip install` alone.
* **CRITICAL — The "Build your app/API with Cloudinary" items are copy/paste prompts, NOT code.** Copy and paste each prompt string EXACTLY as written above — verbatim (apart from the `[framework]` substitution), inside backticks for copy/paste. Do NOT generate, create, write, show, or include ANY code examples, SDK code, imports, functions, or implementation details in the What's Next section. Do NOT replace the prompt strings with tutorials or your own explanations. Never add extra sections (e.g., "Resources", example code, sample implementations) to What's Next. All code and examples are forbidden here — code is written only after the user runs one of the prompts, and then only per the matching installed `cloudinary-*` skill.
* **What to include in What's Next:** Show sections in this order: (1) Install Cloudinary VS Code extension, (2) Customize your cloud name (only if cloud name looks auto-generated), (3) Run your app, (4) Activate the MCP servers, (5) Build your app/API with Cloudinary (pick relevant prompts). Then finish with the "What's safe to keep or delete" section at the end.
* **Customize your cloud name — CONDITIONAL:** Show this section only when the cloud name looks machine-generated — an unpronounceable consonant/digit jumble like `dqj4x8f3k` or `hb2q1r5xj`. A pronounceable word, personal name, or brand-like string (e.g., `yelenik`, `new-shop`, `mycompany`) is NOT auto-generated — that includes hyphenated or multi-word names; all-lowercase alone does not mean random. When in doubt, skip — and when skipped, output NOTHING for it: no heading, no blurb, no substitute sentence, and no line in the numbered overview list. When shown, output the section EXACTLY as written above — verbatim, with all six steps and the "After you change it" bullet section. Do not summarize, paraphrase, or create a shorter version, and never substitute custom-domain/CNAME content for it.
* Always show the VS Code extension section — users in other editors will simply skip it.
* Use the detected delivery lane to choose which prompts to show. Show the "Build your app with Cloudinary" section for front-end/full-stack, or "Build your API with Cloudinary" for back-end API-only.
* For front-end/full-stack apps, show the "Optimize and deliver", "Transform and deliver video", and "Upload photos" prompts.
* For back-end API-only apps, show the "Generate transformed URLs", "Generate signed URLs", "Upload files", and "Build admin workflow" prompts.
* Don't mix lane-specific suggestions.
* Don't suggest optimization as a next step — Stage 5 already demonstrated it with real measurements. Only mention it if the user asks.
* Don't suggest UGC uploads as the primary next step. Lead with delivering assets already in the product environment; offer UGC as an optional step for apps that need it.
* Don't suggest responsive image delivery for an API-only app.
* Don't ask repeatedly if the preset should stay unsigned.
* Don't suggest API key changes unless the user reports a specific permission problem.
* Keep the suggestions focused on user scenarios, not Cloudinary feature names.
* For framework-specific details, let the user copy/paste the prompt and let the relevant skill answer.
* When the user runs one of the Build-with-Cloudinary prompts, read the matching installed `cloudinary-*` skill (e.g., `cloudinary-react` for React projects, `cloudinary-transformations` for URL building) before writing any code — never compose SDK code from memory.
* When users ask follow-up questions about transformations, optimization, or delivery URLs, direct them to use the `/cloudinary-transformations` skill to build and debug URLs.
* For questions about Cloudinary APIs, SDKs, webhooks, and implementation details not covered by specialized skills, direct them to use the `/cloudinary-docs` skill.
* In code examples for rendering or delivering images in the app, always verify that the asset exists in the product environment before outputting the delivery URL. Don't hardcode or assume assets exist — guide users to check their Cloudinary product environment first.
* **When writing app code that renders a Cloudinary asset, start from the verified URLs in `docs/cloudinary-environment.json`** — same asset, same or simpler transformation — instead of composing a new URL from memory. Before reporting the work complete, extract the exact URL the code produces (run it or log it) and fetch it: it must return HTTP 200. If the URL contains repeated bare segments like `/auto/auto/`, qualifiers were chained as standalone actions in `@cloudinary/url-gen` (correct form: `fill().gravity(autoGravity())`, producing `c_fill,g_auto,...`); fix the composition and re-verify. Never hand the user code whose generated URL was not fetch-verified.
* If the user needs help activating the MCP servers, suggest they use the AI assistant: "If you run into issues with MCP activation, ask me to help — I can walk you through the specific steps for your IDE."
