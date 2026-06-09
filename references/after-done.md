# What's next after setup

After the user says `Done`, give them up to four specific next steps. Keep them short, practical, and use-case focused. Include copy/paste prompts where helpful.

Always start with a "run your app" step — tell the user the command to start their detected framework's dev server. This is step 0: validation proves Cloudinary works; running the app lets the user see the integration end-to-end from their browser.

Use the delivery lane tracked during setup to pick the remaining steps. Replace `[framework]` in copy/paste prompts with the detected framework name, such as Flask, Django, Rails, or Next.js.

## Next steps by delivery lane

### Front-end only and full-stack lanes

**Run your app**
Install dependencies and start the dev server so you can see the integration working end-to-end in your browser.

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

**Optimize and deliver your product or marketing assets through Cloudinary**
Generated transformed and optimized delivery URLs from assets in your product environment and display them in a gallery in your app.

Copy/paste the prompt: `Show me how to generate optimized delivery URLs from assets in my Cloudinary product environment and display them in my [framework] app`

**Transform and deliver video content**
Generate optimized video URLs with format conversion, trimming, or overlays — the same transformation pipeline that works for images also works for video.

Copy/paste the prompt: `Show me how to deliver and transform video assets retrieved from my product environment in my [framework] app using Cloudinary`

**Let users upload photos or files to your app**
Add an upload flow to enable user-generated content, including profile photos, listings, attachments, and more.

Copy/paste the prompt: `I want users to upload images in my [framework] app`

**Automate image variants and tagging at upload time**
Use upload presets or eager transformations to automatically tag, resize, optimize, or watermark assets the moment they're uploaded.

Copy/paste the prompt: `How do I apply transformations and tags automatically when assets are uploaded in my [framework] app?`

### Back-end API-only lanes

**Run your app**
Install dependencies and start the server so you can confirm it responds before moving on to building endpoints.

Use the exact same commands as shown in the front-end/full-stack lane above — output them word-for-word with no paraphrasing or alternatives.

**Deliver your product or marketing assets through Cloudinary**
Upload images to your product environment and use the SDK to generate delivery URLs in your API responses.

Copy/paste the prompt: `Show me how to upload assets to my Cloudinary product environment and deliver them via my [framework] API`

**Generate signed delivery URLs for protected assets**
Create signed URLs on the server so protected assets can be delivered without exposing secrets or signing logic to clients.

Copy/paste the prompt: `Add a server-side endpoint in my [framework] API that generates signed Cloudinary delivery URLs without exposing secrets to clients`

**Accept uploads from clients in your app**
Add an upload endpoint that allows you to receive files from callers, such as images, documents, attachments, and more.

Copy/paste the prompt: `How do I accept and store image uploads server-side in my [framework] API?`

**Build an admin workflow for finding and managing assets**
Use tags and metadata to make assets easier to find, filter, and manage at scale.

Copy/paste the prompt: `How do I tag and search uploaded assets in Cloudinary?`

## Rules

* **Output the startup commands exactly as written in the framework sections above.** Do not abbreviate, paraphrase, improvise, or substitute alternative commands. If Python/Flask is detected, output the full `python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt` followed by `python3 app.py` — never skip steps or show `pip install` alone.
* Always start with the "run your app" step and show the correct start command for the detected framework.
* Use the detected delivery lane to choose the remaining steps. Pick the most relevant three from the lane's list — not all of them.
* Full-stack uses the front-end/full-stack set.
* Back-end API-only uses the back-end API-only set.
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
