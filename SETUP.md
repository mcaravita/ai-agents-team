# Quick Start Guide (Next.js version)

## Prerequisites

- Node.js 20+
- Python 3.10+
- Groq API Key (free from https://console.groq.com)

## Setup Backend

1. **Get Groq API Key**
   - Visit https://console.groq.com
   - Sign up for free
   - Generate an API key

2. **Install Dependencies**
   ```bash
   cd backend
   python -m venv venv

   # Activate virtual environment
   # On macOS/Linux:
   source venv/bin/activate
   # On Windows:
   venv\Scripts\activate

   # Install Python packages
   pip install -r requirements.txt
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your Groq API key
   # GROQ_API_KEY=your_key_here
   ```

4. **Run Backend**
   ```bash
   python main.py
   ```
   Server runs at `http://localhost:8000`

## Setup Frontend (Next.js)

1. **Install Dependencies** (new terminal)
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.local.example .env.local
   # Default: BACKEND_URL=http://localhost:8000
   ```

3. **Run Frontend**
   ```bash
   npm run dev
   ```
   App runs at `http://localhost:3000`

## How the proxy works

The browser only talks to the Next.js server. Each `/api/*` route forwards
the request server-side to the Python backend using `BACKEND_URL`:

| Frontend route   | Forwards to (backend)        |
| ---------------- | ---------------------------- |
| `GET  /api/health` | `GET  $BACKEND_URL/health`  |
| `GET  /api/agents` | `GET  $BACKEND_URL/agents`  |
| `POST /api/chat`   | `POST $BACKEND_URL/chat`    |

This means the Python backend never needs to be exposed publicly.

## Using the Application

1. **Select an Agent** from the sidebar (Welcome, Project, Career, Business, Research)
2. **Type your message** and press Enter (Shift+Enter for new line)
3. The selected agent responds via Groq's LLaMA 3 model

## Docker Setup (Optional)

```bash
GROQ_API_KEY=your_key docker-compose up

# Frontend: http://localhost:3000
# Backend:  http://localhost:8000
```

In Docker, `BACKEND_URL` is set to `http://backend:8000` automatically.

## Production Build

```bash
cd frontend
npm run build
npm run start
```

## Troubleshooting

**"Connection Error" on the home page**
- Backend Python not running. Start it with `python main.py`.
- Wrong `BACKEND_URL` in `frontend/.env.local`.

**`/api/chat` returns 502**
- Next.js server cannot reach the Python backend. Verify the URL.
- In Docker, ensure the `backend` service is up before `frontend`.

**TypeScript / build errors**
- Make sure you ran `npm install` after switching to this branch.
- Node.js 20+ is required.

## API Endpoints

Backend (Python, internal):
- `GET /health`
- `GET /agents`
- `POST /chat`
- `WS  /ws/chat`

Frontend proxy (Next.js, browser-facing):
- `GET /api/health`
- `GET /api/agents`
- `POST /api/chat`

## Next Steps

1. Customize agent prompts in `backend/agents/agent_manager.py`
2. Add more specialized agents
3. Add Tailwind components / shadcn-ui for richer UI
4. Deploy frontend on Vercel and backend on a Python host

Happy chatting!
