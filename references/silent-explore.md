# Silent explore

Silent explore is mandatory before repo classification. Inspect workspace files; do not infer from chat tone.

**Required checks — run these to verify existence:**
- Dependency manifests: `package.json`, `requirements.txt`, `pyproject.toml`, `Pipfile`, `Gemfile`, `composer.json`, `pom.xml`, `build.gradle`, `.csproj`, `go.mod`, or equivalent.
- Entrypoints and framework signals: routes, templates, app bootstrap files, server files, static front-end files, build config, and imports.
- Cloudinary in code: Cloudinary dependency plus application usage such as SDK config, upload calls, URL generation, transformation builders, or templates/components referencing Cloudinary URLs.
- React: `package.json`, React dependencies, JS/TS imports, JSX/TSX usage, or explicit user selection.
- AI staging: `.claude/skills/` (Claude Code), `.agents/skills/`, or other IDE-specific skill locations for Cloudinary pack folders.

Record these classifications:
1. Repo shape: `empty`, `code-no-cloudinary`, or `code-with-cloudinary`
2. Stack: explicit framework/language, such as Django, Rails, Laravel, Next.js, Node/Express, Vue, Angular, Go, Java/Spring, .NET, PHP, Python/Flask, or another detected stack
3. React detection: `react-detected` or `react-not-detected`
4. Delivery lane: `front-end only`, `back-end API-only`, or `full-stack`

Classification rules:
- `code-with-cloudinary` requires Cloudinary in dependencies and application code. A README mention alone does not count.
- React detection is independent of backend framework. A backend project without React in repo is `react-not-detected`.
- React-classified means either React was detected during explore or the user explicitly chose React in Stage 2 or equivalent.
- If earlier classification was wrong, rerun file checks and correct the record before Stage 2 messaging.

Delivery lane rules:

| Lane | When to use | Preview HTML in Stage 5 |
| --- | --- | --- |
| `front-end only` | Browser-only app | Yes |
| `back-end API-only` | Server/API without user-facing HTML preview | No |
| `full-stack` | App has server + UI/templates | Yes |

All lanes need cloud name, API key, and API secret in local `.env` for MCP. Front-end bundles may expose only cloud name and upload preset client-side.

### Framework-specific classification guidance

Server-rendered frameworks are not automatically back-end API-only. Classify them as `full-stack` when the repository contains user-facing pages, templates, views, or server-rendered UI. Classify as `back-end API-only` only when the application primarily exposes APIs without user-facing views, templates, or pages.