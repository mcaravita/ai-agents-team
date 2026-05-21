# Quick Start Guide

## Prerequisites

- Node.js 18+
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
   # Copy .env.example to .env
   cp .env.example .env
   
   # Edit .env and add your Groq API key
   # GROQ_API_KEY=your_key_here
   ```

4. **Run Backend**
   ```bash
   python main.py
   ```
   Server runs at `http://localhost:8000`

## Setup Frontend

1. **Install Dependencies** (new terminal/window)
   ```bash
   cd frontend
   npm install
   ```

2. **Run Frontend**
   ```bash
   npm run dev
   ```
   App runs at `http://localhost:5173`

## Using the Application

1. **Select an Agent**
   - Click on any agent in the sidebar
   - Each agent has specialized knowledge:
     - **Welcome**: Site introduction
     - **Project**: Portfolio discussion
     - **Career**: Experience & achievements
     - **Business**: Collaboration opportunities
     - **Research**: Technical insights

2. **Chat**
   - Type your message
   - Press Enter or click Send
   - Shift+Enter for new lines

## Docker Setup (Optional)

```bash
# Build and run with Docker Compose
docker-compose up

# Frontend: http://localhost:5173
# Backend: http://localhost:8000
```

## Troubleshooting

**"Cannot connect to API server"**
- Make sure backend is running: `python main.py`
- Check backend is at `http://localhost:8000`
- Verify Groq API key is set in `.env`

**"Invalid Groq API Key"**
- Get a free key from https://console.groq.com
- Add to `.env` file: `GROQ_API_KEY=your_key`

**Frontend shows blank page**
- Check frontend is running: `npm run dev`
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)

## Project Structure

```
ai-agents-team/
├── backend/
│   ├── agents/
│   │   └── agent_manager.py       # AI agents orchestration
│   ├── main.py                    # FastAPI server
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.tsx  # Chat UI
│   │   │   └── AgentSelector.tsx  # Agent selector
│   │   ├── App.tsx                # Main app
│   │   └── main.tsx               # Entry point
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## API Endpoints

- `GET /health` - Health check
- `GET /agents` - List available agents
- `POST /chat` - Send message to agent
- `WS /ws/chat` - WebSocket chat connection

## Next Steps

1. Customize agent prompts in `backend/agents/agent_manager.py`
2. Add more specialized agents
3. Integrate with your portfolio website
4. Deploy to production

## Support

For issues or questions, check the main README.md

Happy chatting! 🤖
