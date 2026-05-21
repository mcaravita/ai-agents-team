# AI Agents Team for Portfolio Website (Next.js)

Un progetto full-stack per costruire un sito portfolio con un team di AI agents intelligenti. Frontend in **Next.js 14 (App Router) + Tailwind CSS**, backend in **Python/FastAPI** con integrazione **Groq + LLaMA 3**.

## Features

- **WelcomeAgent**: Accoglie i visitatori e fornisce un'introduzione
- **ProjectAgent**: Parla dei tuoi progetti e portfolio
- **CareerAgent**: Discussioni sulla carriera e esperienza
- **BusinessAdvisor**: Consulenza per affari e collaborazioni
- **ResearchAgent**: Ricerca e analisi di temi specifici

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Python + FastAPI
- **AI Framework**: Groq SDK (LLaMA 3 / Mixtral, free tier)
- **API layer**: Next.js API routes come proxy verso il backend Python

## Architettura

```
Browser ─► Next.js (porta 3000)
            ├─ Pages / Components (React Server + Client)
            └─ /api/* (proxy routes)
                    └─► Python FastAPI (porta 8000)
                            └─► Groq API (LLaMA 3)
```

Il browser non chiama mai direttamente il backend Python: tutte le richieste
passano per `/api/chat`, `/api/agents`, `/api/health` che inoltrano al backend.
Questo permette di nascondere l'URL del backend e di aggiungere middleware,
caching o rate limiting lato Next.js.

## Prerequisites

- Node.js 20+
- Python 3.10+
- Groq API Key (gratuito da https://console.groq.com)

## Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
export GROQ_API_KEY=your_key_here
python main.py
```

### Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.local.example .env.local  # imposta BACKEND_URL se serve
npm run dev
```

Apri http://localhost:3000

## Project Structure

```
ai-agents-team/
├── backend/
│   ├── agents/agent_manager.py
│   ├── main.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── globals.css
    │   │   └── api/
    │   │       ├── chat/route.ts
    │   │       ├── agents/route.ts
    │   │       └── health/route.ts
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── ChatInterface.tsx
    │   │   └── AgentSelector.tsx
    │   └── lib/api.ts
    ├── tailwind.config.ts
    ├── next.config.mjs
    └── package.json
```

## Environment variables

| Variable      | Where        | Default                  | Description                       |
| ------------- | ------------ | ------------------------ | --------------------------------- |
| `GROQ_API_KEY`| backend      | —                        | API key Groq (obbligatoria)       |
| `BACKEND_URL` | frontend     | `http://localhost:8000`  | URL del backend Python (server)   |

## License

MIT
