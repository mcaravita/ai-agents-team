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
   
   **Option A: Using `.env` file (recommended)**
   ```bash
   cp .env.example .env
   # Edit .env with your text editor and add your Groq API key
   # GROQ_API_KEY=your_actual_key_here
   ```
   
   **Option B: Windows — Set environment variable**
   ```powershell
   $env:GROQ_API_KEY="your_actual_key_here"
   ```
   
   **Option C: Linux/macOS — Set environment variable**
   ```bash
   export GROQ_API_KEY="your_actual_key_here"
   ```

4. **Run Backend**
   ```bash
   python main.py
   ```
   Server runs at `http://localhost:8000`
   
   You should see: `Uvicorn running on http://0.0.0.0:8000`

## Setup Frontend (Next.js)

1. **Install Dependencies** (new terminal/PowerShell)
   ```bash
   cd frontend
   npm install
   ```
   
   This may take a few minutes. Wait for it to complete.

2. **Configure Environment**
   
   **Option A: Using `.env.local` file (recommended)**
   ```bash
   # Copy the example file
   cp .env.local.example .env.local
   # Or on Windows PowerShell:
   # Copy-Item .env.local.example .env.local
   
   # Default BACKEND_URL is already set to http://localhost:8000
   # No changes needed unless your backend is on a different port
   ```
   
   **Option B: Manually create `.env.local`**
   Create a file named `.env.local` in the `frontend/` directory with:
   ```
   BACKEND_URL=http://localhost:8000
   ```

3. **Run Frontend**
   ```bash
   npm run dev
   ```
   App runs at `http://localhost:3000`
   
   You should see: `Ready in XXXms`

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

### Prerequisites
- Docker Desktop installed (includes Docker and Docker Compose)
- Groq API Key

### Start with Docker Compose

**Windows (PowerShell):**
```powershell
$env:GROQ_API_KEY="your_actual_key_here"
docker-compose up
```

**macOS/Linux:**
```bash
export GROQ_API_KEY="your_actual_key_here"
docker-compose up
```

Or create a `.env` file in the project root:
```
GROQ_API_KEY=your_actual_key_here
```

Then:
```bash
docker-compose up
```

### Access

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Backend health: http://localhost:8000/health

In Docker, `BACKEND_URL` is set to `http://backend:8000` automatically.

### Stop

Press `Ctrl+C` or in another terminal:
```bash
docker-compose down
```

## Production Build

```bash
cd frontend
npm run build
npm run start
```

## Troubleshooting

### Backend issues

**Error: `groq.GroqError: The api_key client option must be set...`**
- You haven't set the `GROQ_API_KEY` environment variable or `.env` file
- **Windows**: Create `.env` in the `backend/` folder with `GROQ_API_KEY=your_key`
- **Windows PowerShell**: Run `$env:GROQ_API_KEY="your_key"` before `python main.py`
- **macOS/Linux**: Run `export GROQ_API_KEY="your_key"` before `python main.py`

**Error: `ModuleNotFoundError: No module named 'groq'`**
- You didn't run `pip install -r requirements.txt`
- Make sure you activated the virtual environment first

**Backend starts but frontend shows "Connection Error"**
- Backend is running on the wrong port (should be `:8000`)
- Check: http://localhost:8000/health in your browser
- Should show: `{"status":"healthy","service":"AI Agents Team API"}`

### Frontend issues

**Error: `.env.local.example` not found**
- File is committed to git but not in your working directory
- Run `git pull` to get it, or create `.env.local` manually with:
  ```
  BACKEND_URL=http://localhost:8000
  ```

**"Connection Error" on home page (port 3000)**
- Backend not running. Start it first: `python main.py` in `backend/`
- Check http://localhost:8000/health works before opening http://localhost:3000
- Wrong `BACKEND_URL` in `frontend/.env.local`

**`/api/chat` returns 502**
- Backend Python crashed or is offline
- Check the backend terminal for errors
- API routes try to forward to `BACKEND_URL` which defaults to `http://localhost:8000`

**`npm run dev` fails or hangs**
- Make sure you ran `npm install` (not `npm ci`)
- Delete `node_modules/` and `.next/` folders, then `npm install` again
- Check Node.js version: `node --version` (must be 20+)

**TypeScript / build errors**
- Run `npm run build` to see detailed errors
- Delete `.next/` folder and try again

### Environment variable issues

**Windows PowerShell: `export: The term 'export' is not recognized`**
- You're on Windows. Use `$env:VAR_NAME="value"` instead of `export`
- Better: create `.env` files instead (easier to manage)

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
