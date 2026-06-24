# What's next after setup

After the user says `Done`, give them up to four specific next steps in this order:
1. **Install the Cloudinary VS Code extension** (if using VS Code or a VS Code-based IDE)
2. **Run your app** — see the integration end-to-end from your browser
3. **Activate the MCP servers** — enable AI assistance in your IDE
4. **Choose a next step** — pick from the relevant use-case prompts

Use the delivery lane tracked during setup to choose which prompts to show. Replace `[framework]` in copy/paste prompts with the detected framework name, such as Flask, Django, Rails, or Next.js.

**What's safe to keep or delete:** The `docs/cloudinary-getting-started-preview.html` file was for validation — you can delete it anytime. Keep `docs/cloudinary-environment.json` for reference and `.env.example` for new developers. Never delete or commit `.env` (it contains real secrets).

### Install the Cloudinary VS Code extension (VS Code and VS Code-based IDEs)

If you're using VS Code or a VS Code-based IDE (like Cursor), the [Cloudinary VS Code extension](https://cloudinary.com/documentation/cloudinary_vscode_extension) lets you manage, preview, and deliver media directly from your editor—no context switching needed.

1. Open VS Code extensions (Cmd+Shift+X on Mac, Ctrl+Shift+X on Windows/Linux)
2. Search for "Cloudinary" and click Install

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
* **What to include in What's Next:** Show sections in this order: (1) Install Cloudinary VS Code extension, (2) Run your app, (3) Activate the MCP servers, (4) Build your app/API with Cloudinary (pick relevant prompts). Then finish with the "What's safe to keep or delete" section at the end.
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
* When users ask follow-up questions about transformations, optimization, or delivery URLs, direct them to use the `/cloudinary-transformations` skill to build and debug URLs.
* For questions about Cloudinary APIs, SDKs, webhooks, and implementation details not covered by specialized skills, direct them to use the `/cloudinary-docs` skill.
* In code examples for rendering or delivering images in the app, always verify that the asset exists in the product environment before outputting the delivery URL. Don't hardcode or assume assets exist — guide users to check their Cloudinary product environment first.
* If the user needs help activating the MCP servers, suggest they use the AI assistant: "If you run into issues with MCP activation, ask me to help — I can walk you through the specific steps for your IDE."
