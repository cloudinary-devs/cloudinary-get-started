# Stage 4 — credentials

Ask one question per turn and wait for the answer. Never bundle multiple yes/no gates. Every wait ends with BLOCKING_FOOTER.

In this stage, verify the user has a Cloudinary account, help them retrieve their API credentials, and guide them to fill `.env`. Real credentials in `.env` enable Stage 5 verification and allow MCP activation later in "What's next."

### Stage 4 execution order (strict)

D1 → D2. Never skip or reorder.

Before generating any Stage 4 response, determine which substep is currently incomplete:
- D1 not complete → send only the D1 prompt and wait.
- D1 complete, D2 not complete → send only the D2 prompt and wait.
- D1 and D2 complete → proceed to Stage 5.

Do not summarize multiple substeps into a single response. Do not mention credentials, `.env`, API keys, the Cloudinary Console, MCP activation, or Stage 5 until D1 has been confirmed.

**D1 is a blocking gate.** Never infer D1 completion from prior conversation context, repository contents, credentials, MCP configuration, Cloudinary-related files, or the user's stated intent. Proceed to D2 only after the user clearly confirms they have a Cloudinary account or have completed signup. Do not require exact wording — interpret natural language confirmations reasonably. If the user indicates they do not yet have an account or their response is ambiguous, keep D1 open and direct them to the signup link.

### D1 — Cloudinary account

**The D1 prompt is itself a complete blocking prompt. Do NOT wrap it in an additional BLOCKING_FOOTER — that would duplicate the question.**

Do you have a Cloudinary account?

If not, sign up for free here: [Create a free Cloudinary account](https://cloudinary.com/users/register_free?utm_campaign=5511-&utm_medium=employee_referral&utm_source=cloudinary&utm_content=ai-getting-started-prompt)

**Suggested reply:** Yes, I have an account · Yes, I just finished sign-up

Go to D2 only after the user confirms they have an account.

### D2 — Get credentials and fill `.env`

Grab your **cloud name**, **API key**, and **API secret** from the Cloudinary Console: [Cloudinary Console — API Keys](https://console.cloudinary.com/settings/api-keys)

**IMPORTANT:** Use the exact link above — `https://console.cloudinary.com/settings/api-keys`. Do not tell the user to go to the "Dashboard tab" or any other location.

Once they have their credentials, give instructions based on the Stage 3 `.env` setup choice:

**If we added placeholders to `.env` in Stage 3 (automated):**

Tell the user:
"Open `.env` at your project root and replace the placeholder values with your real credentials:
- `CLOUDINARY_CLOUD_NAME` = your cloud name
- `CLOUDINARY_API_KEY` = your API key
- `CLOUDINARY_API_SECRET` = your API secret
- For React/Vite: also replace `VITE_CLOUDINARY_CLOUD_NAME`

Save the file when done."

**If they said they'd do it manually in Stage 3:**

Tell the user:
"Open `.env.example` and copy the Cloudinary block into your `.env` file. Then replace the placeholder values with your real credentials:
- `CLOUDINARY_CLOUD_NAME` = your cloud name
- `CLOUDINARY_API_KEY` = your API key
- `CLOUDINARY_API_SECRET` = your API secret
- For React/Vite: also add and replace `VITE_CLOUDINARY_CLOUD_NAME`

Save the file when done."

End with BLOCKING_FOOTER:

---
**Reply to continue setup:**

Done filling in your credentials?

**Suggested reply:** yes, saved · I need help

---

Confirm that `.env` exists (using `ls -f .env` to verify existence only) and the user confirms all three `CLOUDINARY_*` keys are filled. Never read, view, display, or claim to have verified `.env` contents. Once confirmed by the user, tell them: "Great! You've confirmed that you have a Cloudinary account and that your `.env` file contains your real Cloudinary credentials, not placeholder values. For your security, I won't inspect or verify those credentials directly. Next we'll move to setup verification. The MCP servers will be activated afterward in the next steps."

**Critical — enforce strictly:**
- Never say "I can see...", "I verified...", "Your credentials show...", or "I checked that..." — these all imply reading the file
- Never use `cat`, `grep`, `head`, `tail`, or any command that displays file contents
- Never display any output from running `ls` or other file checks
- Only acknowledge the user's explicit confirmation that they saved the credentials
- The ONLY verification you do is: file exists (using `ls -f` silently) and user confirms it's filled

Infer readiness from `.env` existence check, user confirmation, and MCP behavior. Never read `.env` contents. Do not require running the app/server here.

At the end of Stage 4, use STAGE_COMPLETION_FORMAT. For the Stage 5 preview section, use the full "What this stage does" bullet list from Stage 5 verbatim — do not write a generic sentence.

### Stage 4 completion bullet wording

Always attribute credential and .env actions to the user — never to the assistant. Use language like "You confirmed…", "You retrieved…", "You filled in…".

Correct examples:
- D1: You confirmed you have a Cloudinary account
- D2: You retrieved your cloud name, API key, and API secret, and filled `.env` with real credentials

Incorrect (do not use):
- "Confirmed Cloudinary account" (ambiguous)
- "Filled .env with real credentials" (when said by assistant, implies the assistant touched the file)
