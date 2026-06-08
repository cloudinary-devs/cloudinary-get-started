# Stage 4 — credentials and MCP activation

Ask one question per turn and wait for the answer. Never bundle multiple yes/no gates. Every wait ends with the blocking prompt footer.

All lanes need `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in local `.env` for MCP. Client-side env vars alone are not enough for MCP unless a custom MCP server env is configured, which this skill does not do. React-classified projects also need the relevant client-side values, such as `VITE_CLOUDINARY_CLOUD_NAME` for React/Vite; other frameworks use their own client-env conventions only when needed.

## D1 — Cloudinary account

Always send this prompt first and wait for confirmation before asking about credentials. Never skip to D2 without a D1 confirmation.

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
