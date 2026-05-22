# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

Two-process app split across `backend/` (Python/FastAPI) and `frontend/` (Next.js 14, App Router).
The browser never talks to FastAPI directly. Next.js API routes under
`frontend/src/app/api/{chat,agents,health}/route.ts` are server-side proxies that
forward to `${BACKEND_URL}/{chat,agents,health}` (default `http://localhost:8000`).
This is a hard boundary: client components call `/api/*` only (see
`frontend/src/lib/api.ts`); changes to backend routes must be mirrored in the
matching Next.js route handler.

The backend is a thin FastAPI shell (`backend/main.py`) over `AgentManager`
(`backend/agents/agent_manager.py`). All five agents (`welcome`, `project`,
`career`, `business`, `research`) are defined in a single `agents_config` dict
in `AgentManager.__init__` — each entry is just a name + system prompt, and
all share one Groq client (`llama-3.3-70b-versatile`). Per-agent conversation
history is kept in-memory on the `AgentManager` instance (`conversation_history`,
last 5 messages replayed per call), so it resets on every backend restart and
is not multi-user safe. Adding a new agent = adding one dict entry; no other
wiring is needed because `/agents` and `/chat` dispatch by key.

## Commands

Backend (from `backend/`, venv activated):
- Install: `pip install -r requirements.txt`
- Run dev server: `python main.py` (uvicorn on `0.0.0.0:8000`)
- Requires `GROQ_API_KEY` in env or `backend/.env`

Frontend (from `frontend/`):
- Install: `npm install`
- Dev: `npm run dev` (port 3000)
- Build: `npm run build` && `npm run start`
- Lint: `npm run lint` (Next.js ESLint)
- Needs `BACKEND_URL` in `frontend/.env.local` (defaults to `http://localhost:8000`)

Full stack via Docker: `docker-compose up` from repo root (frontend talks to
`http://backend:8000` inside the compose network).

There is no test suite in this repo.

## Conventions

- README and most user-facing copy are in Italian; agent system prompts and code
  identifiers are in English. Match the surrounding language when editing.
- `BACKEND_URL` is read at module load in each `route.ts`; restart `next dev`
  after changing `.env.local`.
- WebSocket endpoint `/ws/chat` exists on the backend (`backend/main.py`) but
  is not currently proxied or used by the frontend — the UI uses POST `/api/chat`.
