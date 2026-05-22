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
- **Containerization**: Docker & Docker Compose (optional)

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

## Quick Setup

### Local development (recommended)

**Terminal 1 — Backend**
```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt

# Set API key (one of these):
# Windows PowerShell: $env:GROQ_API_KEY="your_key"
# macOS/Linux: export GROQ_API_KEY="your_key"
# Or create backend/.env: GROQ_API_KEY=your_key

python main.py
# Backend at http://localhost:8000
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm install
npm run dev
# Frontend at http://localhost:3000
```

### Docker Compose (all-in-one)

```bash
# Set your Groq API key
# Windows: $env:GROQ_API_KEY="your_key"
# macOS/Linux: export GROQ_API_KEY="your_key"

docker-compose up
# Frontend at http://localhost:3000
# Backend at http://localhost:8000
```

See **SETUP.md** for detailed troubleshooting and Windows-specific instructions.

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
