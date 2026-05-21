# AI Agents Team for Portfolio Website

Un progetto completo per costruire un sito portfolio con un team di AI agents intelligenti usando Agno, Groq e LLaMA 3.

## Features

- **WelcomeAgent**: Accoglie i visitatori e fornisce un'introduzione
- **ProjectAgent**: Parla dei tuoi progetti e portfolio
- **CareerAgent**: Discussioni sulla carriera e esperienza
- **BusinessAdvisor**: Consulenza per affari e collaborazioni
- **ResearchAgent**: Ricerca e analisi di temi specifici

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Python + FastAPI
- **AI Framework**: Agno
- **LLM**: LLaMA 3 via Groq (gratuito)
- **Real-time**: WebSocket

## Prerequisites

- Node.js 18+
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

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
ai-agents-team/
├── backend/
│   ├── agents/
│   │   ├── welcome_agent.py
│   │   ├── project_agent.py
│   │   ├── career_agent.py
│   │   ├── business_agent.py
│   │   └── research_agent.py
│   ├── main.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

## License

MIT
