export interface ChatResponse {
  agent: string;
  message: string;
  error?: string;
}

export interface HealthResponse {
  status: string;
  service?: string;
}

export interface AgentsResponse {
  agents: string[];
}

export async function sendChatMessage(agent: string, message: string): Promise<ChatResponse> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agent, message }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch('/api/health');
  if (!response.ok) {
    throw new Error('Backend not healthy');
  }
  return response.json();
}

export async function listAgents(): Promise<AgentsResponse> {
  const response = await fetch('/api/agents');
  if (!response.ok) {
    throw new Error('Failed to load agents');
  }
  return response.json();
}
