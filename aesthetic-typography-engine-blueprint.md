# Aesthetic Typography Engine — AI Build Prompt

> Paste this entire document into your AI agent (Antigravity) as the execution prompt.
> The agent should build each phase in order, confirming completion before moving to the next.

---

## Project Overview

Build a full-stack AI-powered text tone enhancer called the **Aesthetic Typography Engine**.  
The tool takes raw text + a tone preset, rewrites it via the Gemini API, then wraps the output in a Unicode/symbol aesthetic chosen by the user.

**Stack:**
- Frontend: React + Vite + TypeScript + Tailwind CSS
- Backend: Python FastAPI (single serverless/edge function)
- AI: Google Gemini API (`gemini-1.5-pro`)
- Decoration: Pure JS/TS, runs in browser

---

## Folder Structure

```
aesthetic-typography-engine/
├── client/                        # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── TextInput.tsx       # Raw text textarea + tone selector
│   │   │   ├── OutputDisplay.tsx   # Renders decorated AI output + copy button
│   │   │   ├── StyleToggle.tsx     # Preset + custom decoration picker
│   │   ├── lib/
│   │   │   ├── api.ts              # POST to /enhance edge function
│   │   │   ├── decorator.ts        # Unicode decoration logic (browser-only)
│   │   │   └── toneTemplates.ts    # Tone definitions injected into prompt
│   │   └── App.tsx
│   ├── index.html
│   └── vite.config.ts
│
└── server/                        # Python FastAPI edge function
    ├── main.py                     # Single POST /enhance endpoint
    ├── requirements.txt
    └── .env                        # GEMINI_API_KEY (never commit)
```

---

## Phase 1 — Backend Edge Function

### File: `server/main.py`

Build a single FastAPI endpoint that:
1. Accepts `{ text: string, tone: string }` as JSON body
2. Reads `GEMINI_API_KEY` from environment (never from request)
3. Calls Gemini with the prompt template below
4. Returns `{ result: string }`

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["POST"], allow_headers=["*"])

class EnhanceRequest(BaseModel):
    text: str
    tone: str

TONE_RULES = {
    "Regal Arrogance": "Speak with deliberate slowness. Every word is intentional. Playful superiority with chilling seriousness underneath. Never rush.",
    "Minimalist": "Strip every word that does not earn its place. Short sentences. Cold precision. No flourish.",
    "Chaotic": "Interrupt yourself. Use em-dashes. Contradict. Energy spills everywhere — controlled, barely.",
    "Professional": "Clear. Authoritative. Warm but firm. No slang. No ambiguity.",
    "Dark Narrator": "Third-person omniscient. Slow dread. Beautiful but heavy prose. Every sentence foreshadows.",
    "Soft Power": "Polite but immovable. Kindness as a weapon. The reader complies without knowing why.",
}

PROMPT_TEMPLATE = """
You are an elite tone rewriter for text-based roleplay and content creation.

Rewrite the following text to match this tone: "{tone}"

Tone rules:
{tone_rules}

Global rules:
- Do NOT invent new events or characters.
- Do NOT puppeteer other characters.
- Return ONLY the rewritten text. No preamble, no explanation, no quotes around the output.

Text to rewrite:
{text}
""".strip()

@app.post("/enhance")
async def enhance(req: EnhanceRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text is required.")
    tone_rules = TONE_RULES.get(req.tone, "Match the requested tone as closely as possible.")
    prompt = PROMPT_TEMPLATE.format(tone=req.tone, tone_rules=tone_rules, text=req.text)
    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt)
        return { "result": response.text }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### File: `server/requirements.txt`

```
fastapi
uvicorn
google-generativeai
python-dotenv
pydantic
```

### Run locally:
```bash
cd server
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## Phase 2 — Decoration Layer

### File: `client/src/lib/decorator.ts`

This runs entirely in the browser. No API call needed.

```typescript
export type DecorationStyle =
  | "dark-vector"
  | "kaomoji"
  | "regal"
  | "chaos"
  | "minimal"
  | "custom";

export interface CustomDecoration {
  topBorder: string;
  bottomBorder: string;
  linePrefix: string;
  lineSuffix: string;
}

const PRESETS: Record<string, CustomDecoration> = {
  "dark-vector": {
    topBorder:    "╔══════════════════════════╗",
    bottomBorder: "╚══════════════════════════╝",
    linePrefix:   "║  ",
    lineSuffix:   "  ║",
  },
  kaomoji: {
    topBorder:    "꒰ ˘ ³˘ ꒱  ·  ·  ·",
    bottomBorder: "· · · ·  ꒰ᵕ̈꒱∗*゚",
    linePrefix:   "  ☆ ",
    lineSuffix:   "",
  },
  regal: {
    topBorder:    "⸻⸺  ✦  ⸺⸻",
    bottomBorder: "⸻⸺  ✦  ⸺⸻",
    linePrefix:   "    ",
    lineSuffix:   "",
  },
  chaos: {
    topBorder:    "▓▒░ !!!  ░▒▓",
    bottomBorder: "▓▒░ !!!  ░▒▓",
    linePrefix:   "⚡ ",
    lineSuffix:   " ⚡",
  },
  minimal: {
    topBorder:    "─────────────",
    bottomBorder: "─────────────",
    linePrefix:   "  ",
    lineSuffix:   "",
  },
};

export function decorate(
  text: string,
  style: DecorationStyle,
  custom?: CustomDecoration
): string {
  const preset = style === "custom" && custom ? custom : PRESETS[style] ?? PRESETS["minimal"];
  const lines = text.split("\n").map(line => `${preset.linePrefix}${line}${preset.lineSuffix}`);
  return [preset.topBorder, ...lines, preset.bottomBorder].join("\n");
}
```

---

## Phase 3 — Tone Templates (client-side reference)

### File: `client/src/lib/toneTemplates.ts`

```typescript
export const TONE_PRESETS = [
  { id: "Regal Arrogance",  label: "Regal Arrogance",  description: "Slow. Playful. Chilling."     },
  { id: "Minimalist",       label: "Minimalist",        description: "Cold precision. No flourish." },
  { id: "Chaotic",          label: "Chaotic",           description: "Interrupts itself. Spills."   },
  { id: "Professional",     label: "Professional",      description: "Clear. Authoritative. Warm."  },
  { id: "Dark Narrator",    label: "Dark Narrator",     description: "Omniscient dread."            },
  { id: "Soft Power",       label: "Soft Power",        description: "Kindness as a weapon."        },
];
```

---

## Phase 4 — API Client

### File: `client/src/lib/api.ts`

```typescript
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function enhanceText(text: string, tone: string): Promise<string> {
  const res = await fetch(`${API_URL}/enhance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, tone }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.result as string;
}
```

---

## Phase 5 — Frontend Components

### Component: `TextInput.tsx`

- Large dark textarea for raw text input
- Dropdown showing all tone presets from `toneTemplates.ts`
- "Enhance" button — disabled while loading
- Pass `onSubmit(text, tone)` up to App

### Component: `StyleToggle.tsx`

- Row of buttons: one per decoration preset (dark-vector, kaomoji, regal, chaos, minimal)
- Plus a "Custom" mode that reveals four text fields:
  - Top border, bottom border, line prefix, line suffix
- Emits selected style + optional custom config upward

### Component: `OutputDisplay.tsx`

- Renders the decorated output in a `<pre>` block (monospace, preserves whitespace)
- "Copy to clipboard" button
- Shows loading skeleton while API call is in flight
- Shows error message on failure

### App.tsx flow:

```
1. User types text + selects tone → clicks Enhance
2. App calls enhanceText(text, tone) from api.ts
3. On success: pass result through decorate(result, style, custom) from decorator.ts
4. Render decorated string in OutputDisplay
```

---

## Phase 6 — Styling (Tailwind)

Apply these design rules globally:

- Background: `bg-black` or `bg-zinc-950`
- Text: `text-white` / `text-zinc-300`
- Borders: `border border-zinc-700`
- Buttons: `bg-white text-black hover:bg-zinc-200` (primary) / `bg-zinc-800 hover:bg-zinc-700` (secondary)
- Font: `font-mono` for output display, `font-sans` for UI
- No rounded-xl excess — `rounded-md` max
- No gradients, no glow effects — flat and high contrast only

---

## Phase 7 — Environment & Deployment

### `.env` (server — never commit):
```
GEMINI_API_KEY=your_key_here
```

### `.env` (client):
```
VITE_API_URL=https://your-deployed-edge-function-url
```

### Deploy options for the FastAPI function:
- **Cloudflare Workers** (rewrite in Python Workers or use a proxy)
- **Vercel** (add `api/enhance.py` with serverless function format)
- **Railway / Render** (deploy FastAPI directly — easiest)
- **Antigravity native runtime** (preferred — use platform's built-in function hosting)

---

## Execution Order for the AI Agent

1. Scaffold folder structure
2. Build and test `server/main.py` — verify with a curl POST before touching the frontend
3. Implement `decorator.ts` and test with hardcoded text in isolation
4. Implement `toneTemplates.ts` and `api.ts`
5. Build `TextInput.tsx`, `StyleToggle.tsx`, `OutputDisplay.tsx`
6. Wire everything in `App.tsx`
7. Apply Tailwind styling pass
8. Connect frontend to running backend and do end-to-end test

---

## Acceptance Criteria

- [ ] Submitting text + tone returns a rewritten result from Gemini
- [ ] All 6 tone presets produce noticeably different output
- [ ] All 5 decoration presets render correctly in the output box
- [ ] Custom decoration fields update the output live
- [ ] Copy to clipboard works
- [ ] API key is never exposed in the browser or in source code
- [ ] Loading and error states are handled gracefully
