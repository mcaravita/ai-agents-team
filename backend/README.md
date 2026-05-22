# Backend - AI Agents API (Python/FastAPI)

Server FastAPI che gestisce gli agenti AI tramite Groq.

## Setup

### 1. Create virtual environment

```bash
python -m venv venv

# Activate
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Groq API Key

**Option A: `.env` file (easiest)**
```bash
cp .env.example .env
# Edit .env and add your key:
# GROQ_API_KEY=sk-proj-...
```

**Option B: Environment variable (Windows PowerShell)**
```powershell
$env:GROQ_API_KEY="sk-proj-..."
python main.py
```

**Option C: Environment variable (macOS/Linux)**
```bash
export GROQ_API_KEY="sk-proj-..."
python main.py
```

### 4. Run the server

```bash
python main.py
```

Server at `http://localhost:8000`

## API Endpoints

- `GET /health` — Health check
- `GET /agents` — List available agents
- `POST /chat` — Send message to an agent
  ```json
  {
    "agent": "welcome",
    "message": "Hello!"
  }
  ```
- `WS /ws/chat` — WebSocket for real-time chat (optional)

## Agents

1. **welcome** — Site introduction and greetings
2. **project** — Discuss portfolio projects
3. **career** — Career experience and achievements
4. **business** — Business collaboration and consulting
5. **research** — Technical insights and research

## Customization

Edit agent system prompts in `agents/agent_manager.py`:

```python
self.agents_config = {
    "welcome": {
        "name": "Welcome Agent",
        "system": "Your custom prompt here..."
    },
    # ...
}
```

## Docker

```bash
docker build -t ai-agents-backend .
docker run -e GROQ_API_KEY="your_key" -p 8000:8000 ai-agents-backend
```
