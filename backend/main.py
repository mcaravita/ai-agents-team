#!/usr/bin/env python3

import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from agents.agent_manager import AgentManager
import json

manager = AgentManager()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await manager.initialize()
    yield
    await manager.cleanup()

app = FastAPI(title="AI Agents Team API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "AI Agents Team API"}

@app.get("/agents")
async def list_agents():
    return {"agents": manager.list_agents()}

@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)

            agent_name = message.get("agent", "welcome")
            user_message = message.get("message", "")

            response = await manager.get_response(agent_name, user_message)

            await websocket.send_text(json.dumps({
                "agent": agent_name,
                "message": response
            }))
    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print(f"Error: {e}")
        await websocket.send_text(json.dumps({
            "error": str(e)
        }))

@app.post("/chat")
async def chat(request: dict):
    agent_name = request.get("agent", "welcome")
    message = request.get("message", "")

    response = await manager.get_response(agent_name, message)

    return {
        "agent": agent_name,
        "message": response
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
