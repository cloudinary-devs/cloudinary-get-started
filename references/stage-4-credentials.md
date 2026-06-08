# Stage 4 — credentials and MCP activation

Ask one question per turn and wait for the answer. Never bundle multiple yes/no gates. Every wait ends with the blocking prompt footer.

Cloudinary MCP needs a cloud name, API key, and API secret before it can connect. Do not ask the user to enter credentials, create `.env`, edit files, or activate MCP until D1 and D2 are complete.

## Mandatory Stage 4 entry behavior

**ENFORCE STRICTLY:** The first Stage 4 response must ALWAYS be D1. This is non-negotiable and mandatory.

Stage 4 begins AFTER Stage 3 (SDK setup and `.env.example`) is complete. Before doing ANYTHING else in Stage 4:

1. Stop and send ONLY the D1 prompt.
2. Wait for user confirmation that they have a Cloudinary account.
3. Do not proceed to D2 (credentials request) until D1 is confirmed.
4. Do not mention credentials, `.env`, API keys, the Cloudinary Console, MCP activation, or Stage 5 until D1 has been completed.

If the user indicates they do not have an account, stop at D1 and direct them to sign up. Do not continue to D2 or Stage 5 until they confirm account ownership.

**If you have already sent D1 and the user has not confirmed, stay on D1. Do not advance to D2 or any other question until you receive explicit confirmation of account ownership.**

## Stage 4 execution rules

Stage 4 must be executed in strict order:

1. D1 — Cloudinary account
2. D2 — API keys
3. D3 — Save credentials and activate MCP

Before generating any Stage 4 response, determine which substep is currently incomplete.

* If D1 has not been completed, send only the D1 prompt exactly as written and wait.
* If D1 is complete but D2 is not complete, send only the D2 prompt exactly as written and wait.
* If D1 and D2 are complete, proceed to D3.

Do not summarize multiple substeps into a single response.

Do not ask the user to save credentials, edit files, or activate MCP until both D1 and D2 are complete.

D1 is a blocking gate.

Never infer D1 completion from prior conversation context, repository contents, credentials, MCP configuration, Cloudinary-related files, or the user's stated intent.

Proceed to D2 only after the user clearly confirms that they have a Cloudinary account or have completed signup.

Do not require exact wording. Interpret natural language confirmations reasonably.

If the user indicates they do not yet have an account, or their response is ambiguous, keep D1 open and direct them to the signup link.

## D1 — Cloudinary account

Always send this prompt first and wait for confirmation before asking about credentials. Never skip to D2 without a D1 confirmation.

Always send this prompt exactly as written. Do not prepend credential requests, explanations, or lead-in text before the account check.

**The D1 prompt is itself a complete blocking prompt. Do NOT wrap it in an additional "Reply to continue setup:" footer — that would duplicate the question.**

```text
Do you have a Cloudinary account?

If not, sign up for free here:
[Create a free Cloudinary account](https://cloudinary.com/users/register/free?utm_source=cursor&utm_medium=skill&utm_campaign=cloudinary-getting-started)

Answer with: Yes, I have an account · Yes, I just finished sign-up
```

Go to D2 only after the user confirms they have an account.

## D2 — API keys

Send this prompt and wait for confirmation before continuing:

```text
Grab your **cloud name**, **API key**, and **API secret** from the Cloudinary Console:
[Cloudinary Console — API Keys](https://console.cloudinary.com/settings/api-keys)

Reply when you have those values saved locally.

Answer with: Got them · Ready
```

**IMPORTANT:** Use the exact link above — `https://console.cloudinary.com/settings/api-keys`. Do not tell the user to go to the "Dashboard tab" or any other location. The API Keys page in Console Settings is the authoritative source for these credentials.

Do not ask the user to paste secrets into chat.

Go to D3 once the user confirms.

## D3 — Save credentials and activate MCP

Run only after Stage 3 placeholders exist in `.env.example`, D1 is satisfied, and D2 is satisfied.

Present D3 as two explicit numbered instructions with bold imperative headers. Detect the IDE from context and show only that IDE's activation steps.

### Instruction 1: Fill in your credentials

If no `.env` exists yet: tell the user to rename `.env.example` to `.env`, then open it and replace the placeholder values with their real credentials.

If `.env` already exists: tell the user to open `.env.example`, copy the Cloudinary lines into their `.env`, and replace the placeholders with their real credentials.

Always list the specific variables to fill:
- `CLOUDINARY_CLOUD_NAME` — their cloud name
- `CLOUDINARY_API_KEY` — their API key
- `CLOUDINARY_API_SECRET` — their API secret
- For React/Vite: also `VITE_CLOUDINARY_CLOUD_NAME` and any other client placeholder the app needs
- For other client frameworks: fill their client-env equivalents only when the app needs client-side Cloudinary values

### Instruction 2: Activate the MCP servers

Open with this as a bolded instruction, not prose explanation:
**"Save the file, then activate the MCP servers — they load `.env` at startup and need to start with your real credentials in place."**

Show only the steps for the detected IDE, formatted as numbered imperatives:

**Claude Code**
1. Save `.env`
2. Quit Claude Code completely — Cmd+Q on Mac, Alt+F4 on Windows
3. Restart Claude Code and reopen this project
4. Open `.mcp.json` at the project root and click **Start** next to both `cloudinary-asset-mgmt` and `cloudinary-env-config`
5. Type `/mcp` in the chat input to open the MCP panel — both servers should show **Connected**
6. Find this conversation in Claude Code's chat history to continue

**Cursor**
1. Save `.env`
2. Open the command palette: Cmd/Ctrl+Shift+P
3. Run **MCP: Restart Server** for `cloudinary-asset-mgmt`, then repeat for `cloudinary-env-config`

**VS Code**
1. Save `.env`
2. Open the command palette: Cmd/Ctrl+Shift+P
3. Run **MCP: List Servers** → select `cloudinary-asset-mgmt` → Restart, then repeat for `cloudinary-env-config`

**Windsurf**
1. Save `.env`
2. Fully close Windsurf
3. Reopen Windsurf — MCP starts fresh and picks up the new credentials

**Other IDE**
1. Save `.env`
2. Fully restart the IDE — MCP must start fresh to load the new credentials

---

End D3 with the blocking prompt footer:

```text
Reply to continue setup:

Are both cloudinary-asset-mgmt and cloudinary-env-config showing as Connected in /mcp?

Answer with: yes · no · still connecting
```

If the user reports MCP still does not connect, work through this troubleshooting sequence before stopping:

- Confirm `.env` is at the project root (not `.env.local`, `.env.development`, or a parent directory)
- Confirm the MCP config file exists and is well-formed for the detected IDE (`.mcp.json` for Claude Code, `.cursor/mcp.json` for Cursor, etc.)
- Check `npx` is available in the shell that the IDE uses: `which npx` or `npx --version`
- Perform a full restart of the IDE's MCP process, not just a reload
- Ask the user to retry and confirm connection status

If MCP still does not connect after the troubleshooting steps above, proceed to Stage 5. Stage 5 will complete the preset step and cloud name lookup using script-based fallbacks against the credentials already in `.env`.

Infer readiness from `.env` existence, user confirmation, and MCP behavior. Never read `.env` contents. Do not require running the app/server here.

At the end of Stage 4, use the stage completion format defined in SKILL.md. Before writing the completion message, read `references/stage-5-validation.md`. For the Stage 5 preview section, do not write a generic sentence — instead use the full "What this stage does" bullet list from that file verbatim, so the user sees exactly what validation covers before they confirm.

## Stage 4 completion bullet wording

When writing the Stage 4 completion bullets, always attribute credential and .env actions to the user — never to the assistant. Use language like "You confirmed…", "You retrieved…", "You filled in…". The assistant never touches credentials or `.env` directly.

Correct examples:
- D1: You confirmed you have a Cloudinary account
- D2: You retrieved your cloud name, API key, and API secret from the Cloudinary Console
- D3: You filled `.env` with real credentials and activated both MCP servers (`cloudinary-asset-mgmt` and `cloudinary-env-config` connected)

Incorrect (do not use):
- "Confirmed Cloudinary account" (ambiguous — implies the assistant confirmed it)
- "Filled .env with real credentials" (implies the assistant touched the file)
