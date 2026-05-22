# Frontend - AI Agents Chat Interface (Next.js)

Modern Next.js 14 chat interface with Tailwind CSS, connecting to the Python FastAPI backend.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
# Default: BACKEND_URL=http://localhost:8000 (no changes needed for local dev)
```

Or create `.env.local` manually:
```
BACKEND_URL=http://localhost:8000
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Routes (Proxy)

Browser → Next.js → Python Backend

- `GET /api/health` — Check backend connectivity
- `GET /api/agents` — List available agents
- `POST /api/chat` — Send message to agent

All requests are proxied to `BACKEND_URL` (default: `http://localhost:8000`).

## Build for production

```bash
npm run build
npm run start
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Tailwind styles
│   └── api/
│       ├── chat/route.ts    # Proxy to /chat
│       ├── agents/route.ts  # Proxy to /agents
│       └── health/route.ts  # Proxy to /health
├── components/
│   ├── Header.tsx           # Header with status
│   ├── AgentSelector.tsx    # Agent selector sidebar
│   └── ChatInterface.tsx    # Chat UI
└── lib/
    └── api.ts              # API client helpers
```

## Tailwind CSS

Customized dark theme in `tailwind.config.ts`:
- `primary` — Button/link color (#3b82f6)
- `surface` — Card/surface color (#1e293b)
- `background` — Page background (#0f172a)
- `accent` — Status/highlight color (#10b981)

## Environment Variables

| Variable      | Default                | Description          |
| ------------- | ---------------------- | -------------------- |
| `BACKEND_URL` | `http://localhost:8000` | Python API URL (server-side) |

Note: This is a Next.js env var that's available on the server during build/runtime.
Change it for production deployments.

## Docker

```bash
docker build -t ai-agents-frontend .
docker run -e BACKEND_URL="http://backend:8000" -p 3000:3000 ai-agents-frontend
```
