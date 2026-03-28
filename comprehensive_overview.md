# Aesthetic Typography Engine - Comprehensive Developer Overview

## 1. Project Architecture & Intent
The Aesthetic Typography Engine is a full-stack, serverless-ready web application designed for creative writing and roleplay. It uses AI to rewrite text into distinct narrative "tones" and wraps the output in sophisticated Unicode art presets. The architecture strictly adheres to a robust monorepo configuration (2026 Pro-Strategy).

## 2. FastAPI Backend & Gemini API Integration
**Path:** `server/main.py`
The backend is a minimalist, high-speed API built on Python FastAPI. It exposes a single POST `/api/enhance` endpoint.
- **Gemini 3.1 Flash-Lite Integration:** Uses the modern `google-genai` SDK. The AI is instructed via a strict system prompt (`PROMPT_TEMPLATE`) to avoid inventing characters or actions, strictly rewriting the text to match curated tones (e.g., "Regal Arrogance", "Minimalist", "Dark Narrator").
- **Generation Config:** Uses `max_output_tokens=800` and `temperature=0.7` for fast, creative, yet bounded responses.
- **Error Handling:** 500 errors catch AI hallucinations or empty responses. 400 errors guard against empty strings.

## 3. React + Vite Frontend Structure
The frontend is a static React Single Page Application (SPA), styled with Tailwind CSS for a high-contrast, dark-mode "developer" aesthetic.
- **`App.tsx`:** The root component managing async API state, loading booleans, and orchestrating data flow between inputs and the decorator.
- **`components/TextInput.tsx`:** Form interface capturing the raw user text input and the desired AI tone.
- **`components/StyleToggle.tsx`:** Manages the visual state, offering predefined Unicode structural presets (e.g., `dark-vector`, `kaomoji`, `regal`) alongside custom border/prefix injection inputs.
- **`components/OutputDisplay.tsx`:** Renders the AI-enhanced and decorated final string inside a `<pre>` monospace container. Features a 1-click `navigator.clipboard.writeText` utility.
- **`lib/decorator.ts`:** The pure-function utility suite that maps the AI raw text into structural Unicode templates seamlessly.
- **`lib/api.ts`:** Handles the `fetch` execution to `/api/enhance`.

## 4. Vercel Deployment & Cloud Monorepo Strategy
**Crucial Files:** `vercel.json`, `api/index.py`, `requirements.txt`
The project is orchestrated as a unified monorepo deployed to Vercel without requiring separate backend/frontend repositories.
- **`vercel.json`:** Uses `@vercel/python` to build the Python environment. It intercepts network traffic via routing: `src: "/api/(.*)"` points to the serverless function, while `src: "/(.*)"` falls back to Vite's `client/dist`.
- **The API Bridge (`api/index.py`):** Because Vercel expects the application at the entry boundary, this file modifies `sys.path` to expose the inner `server/main.py` FastAPI `app` object to Vercel's ASGI wrapper.
- **Root Requirements:** The `requirements.txt` sits at the absolute root of the GitHub repository. This is critical for Vercel's cloud builder to recognize and `pip install` the dependencies (`fastapi`, `google-genai`) before isolating the serverless function.
- **Environment Contexts:** The `GEMINI_API_KEY` is securely injected into Vercel's project dashboard, while Vite connects transparently via relative paths (`/api`) in production.

## 5. Future Extensibility
Because the AI prompt templates and Unicode decorator templates are decoupled, new AI Tones or new visual Styles can be added simply by appending to dictionaries in `main.py` and `decorator.ts` without touching the core UI components.
