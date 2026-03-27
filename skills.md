# Custom Skills: Aesthetic Typography Engine

## /enhance-text [text] [tone]
- **Goal**: Rewrite input text into a specific tone via the backend edge function.
- **Tones**: Regal Arrogance, Minimalist, Chaotic, Professional, Dark Narrator, Soft Power.
- **Execution**: Calls Gemini 3.1 Flash-Lite with the specified tone rules.

## /decorate-text [text] [style]
- **Goal**: Apply Unicode decorations (borders, prefixes) to the input text.
- **Styles**: dark-vector, kaomoji, regal, chaos, minimal, custom.
- **Execution**: Frontend-only logic in `decorator.ts`.

## /session-reset
- **Goal**: Prepare for a fresh Antigravity session to clear context and save quota.
- **Execution**: Generate `handover.md` summarizing architecture, progress, and next steps.

## /deploy-cloud
- **Goal**: Push code to GitHub and trigger Vercel deployment.
- **Execution**: Uses GitHub MCP to create a repository, commit files, and push to main. Vercel automatically deploys from GitHub.
