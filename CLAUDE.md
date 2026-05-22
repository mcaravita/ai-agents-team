# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

Two-tier app with a strict proxy boundary: **browser → Next.js → FastAPI → Groq**. The browser never talks to FastAPI directly.

- `frontend/` — Next.js 14 (App Router) + TypeScript + Tailwind. Routes under `src/app/api/*` (`chat`, `agents`, `health`) are thin server-side proxies that forward to the Python backend using `process.env.BACKEND_URL` (default `http://localhost:8000`). Client code in `src/lib/api.ts` and `src/components/*` only ever calls `/api/*` — never the backend directly. Keeping that boundary intact is the point of the design (hides backend URL, allows middleware/caching/rate-limiting on the Next.js side).
- `backend/main.py` — FastAPI app. Exposes `GET /health`, `GET /agents`, `POST /chat`, and `WS /ws/chat`. Uses a `lifespan` context that initializes a single module-level `AgentManager` instance.
- `backend/agents/agent_manager.py` — Owns all agent definitions (`welcome`, `project`, `career`, `business`, `research`) as system prompts in `self.agents_config`, plus a per-agent `conversation_history` dict. `get_response` calls Groq's chat completions API with the last 5 history messages for context. **Conversation history is in-process memory** — it is shared across all clients and lost on restart. The model is hardcoded as `llama-3.3-70b-versatile`.

To add a new agent, add an entry to `agents_config` in `agent_manager.py`; `list_agents()` and the frontend `AgentSelector` pick it up automatically via `GET /agents`.

The frontend↔backend route mapping is 1:1 by path: `/api/chat` → `/chat`, `/api/agents` → `/agents`, `/api/health` → `/health`. The websocket endpoint (`/ws/chat`) is defined on the backend but not currently proxied or used by the frontend.

## Commands

Backend (from `backend/`, with venv activated and `GROQ_API_KEY` set in env or `backend/.env`):
```bash
pip install -r requirements.txt
python main.py              # uvicorn on 0.0.0.0:8000
```

Frontend (from `frontend/`):
```bash
npm install
npm run dev                 # next dev on :3000
npm run build && npm run start
npm run lint
```

Full stack via Docker (from repo root, requires `GROQ_API_KEY` exported or in root `.env`):
```bash
docker-compose up           # backend:8000, frontend:3000, BACKEND_URL auto-wired to http://backend:8000
```

There is no test suite configured in either project.

## Environment variables

- `GROQ_API_KEY` (backend, required) — loaded from process env or `backend/.env` via `python-dotenv`. Without it, Groq client construction fails at startup.
- `BACKEND_URL` (frontend, server-side only) — used by `src/app/api/*/route.ts`. Defaults to `http://localhost:8000` locally; set to `http://backend:8000` in docker-compose.

## Conventions

- README and many code comments are in Italian; agent system prompts and user-facing UI strings are in English. Match the surrounding language when editing.
- Frontend API proxies wrap backend failures as `502` with `{ error: "Failed to reach backend: ..." }`; preserve this shape so `src/lib/api.ts` error handling keeps working.
