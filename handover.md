# Aesthetic Typography Engine - Project Handover

> [!IMPORTANT]
> **Status:** LIVE IN PRODUCTION 
> **URL:** https://aesthetic-typography-engine.vercel.app/
> **Repository:** https://github.com/JAFAR564/aesthetic-typography-engine

## Project Overview
The Aesthetic Typography Engine is a full-stack, AI-powered text rewriter and decorator. It leverages Gemini 3.1 Flash-Lite via a Python FastAPI backend to transform mundane text into highly stylized roleplay / narrative prose. The React + Vite frontend then wraps the output in sophisticated Unicode art presets.

The project is built around the **2026 Pro-Strategy** for tight hardware resource constraints (4GB RAM) and minimal quota burnout.

## Architecture

**Monorepo Structure:**
*   **`client/`**: React + Vite + TypeScript frontend. Tailwind CSS for flat, high-contrast styling.
*   **`server/`**: Python FastAPI backend using `google-genai` modern SDK.
*   **`vercel.json` & `api/index.py`**: The bridge enabling Vercel to host the static frontend alongside serverless Python functions from a single repository.

## The Vercel Deployment

The project relies on Vercel's zero-config monorepo capabilities coupled with custom routing.

*   Vercel routes all `/api/(.*)` requests directly to `api/index.py`, which is the ASGI wrapper for our FastAPI backend.
*   All other routes `/(.*)` are directed to the statically built `client/dist` directory.
*   The `requirements.txt` sits in the project root to ensure Vercel installs dependencies properly during the Python build phase.

### How to push Updates
1. Make your changes locally.
2. Commit and push:
```bash
git add .
git commit -m "feat: your description"
git push origin master
```
3. Vercel automatically detects the push and begins a production rebuild.

## Local Development (WSL)

To run this locally, you must run the server and client in two separate terminal instances to bypass memory locks.

**Terminal 1 (Backend):**
```bash
cd server
source venv/bin/activate
uvicorn main:app --reload --port 8000
```
*(Ensure `.env` inside `server/` contains your `GEMINI_API_KEY`)*

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

## NotebookLM Documentation Hub

A comprehensive AI-powered knowledge base has been automatically generated for this repository via Google NotebookLM. It indexes the project's overarching architecture, core Vercel routing orchestration (`index.py`, `vercel.json`), FastAPI endpoint logic (`main.py`), and the custom Unicode decorators (`decorator.ts`) to make the codebase instantly queryable.

🔗 **[Aesthetic Typography Engine Docs on NotebookLM](https://notebooklm.google.com/notebook/793ea617-1255-453d-ad09-7582fbe69297)**

## Antigravity Core

As part of the deployment, I established a strict personality and workflow protocol encoded within `.antigravityrules`, `agent.md`, and `skills.md`. These files guide future AI agents operating on your codebase, ensuring they adhere to Clean Architecture, flat aesthetic design, and high-performance serverless principles.

This was an excellent execution of the 2026 blueprint. Enjoy the engine! ✦
