import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

# Load .env from the backend directory regardless of where this module is imported from
_env_file = Path(__file__).parent.parent / ".env"
if _env_file.exists():
    load_dotenv(_env_file)

class AgentManager:
    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        self.model = "llama-3.3-70b-versatile"

        self.agents_config = {
            "welcome": {
                "name": "Welcome Agent",
                "system": """You are a friendly welcome agent for a portfolio website.
Your role is to greet visitors warmly and introduce the site owner's skills and expertise.
Be welcoming, professional, and concise. Help visitors understand what the site offers."""
            },
            "project": {
                "name": "Project Agent",
                "system": """You are a project showcase agent.
Your role is to present and discuss the portfolio owner's projects in detail.
Highlight technologies, achievements, and the impact of each project.
Answer questions about specific projects, methodologies, and technical decisions."""
            },
            "career": {
                "name": "Career Agent",
                "system": """You are a career counselor agent.
Your role is to discuss career achievements, experience, and professional growth.
Share insights about the portfolio owner's career path, skills development, and expertise.
Help visitors understand the professional background and qualifications."""
            },
            "business": {
                "name": "Business Advisor Agent",
                "system": """You are a business advisor agent.
Your role is to discuss collaboration opportunities, consulting services, and business partnerships.
Highlight how the portfolio owner can help with specific business challenges.
Be professional and focused on creating value for potential clients."""
            },
            "research": {
                "name": "Research Agent",
                "system": """You are a research and insights agent.
Your role is to provide information, research findings, and insights on relevant topics.
Answer questions about industry trends, technical deep dives, and specialized knowledge.
Be accurate, informative, and provide well-reasoned responses."""
            }
        }

        self.conversation_history = {agent: [] for agent in self.agents_config.keys()}

    async def initialize(self):
        """Initialize the agent manager"""
        print("Agent Manager initialized")

    async def cleanup(self):
        """Cleanup resources"""
        print("Agent Manager cleanup")

    def list_agents(self):
        """List all available agents"""
        return list(self.agents_config.keys())

    async def get_response(self, agent_name: str, user_message: str) -> str:
        """Get response from a specific agent using Groq API"""
        if agent_name not in self.agents_config:
            return f"Unknown agent: {agent_name}. Available agents: {', '.join(self.list_agents())}"

        agent_config = self.agents_config[agent_name]

        # Build conversation history
        messages = [
            {"role": "system", "content": agent_config["system"]}
        ]

        # Add previous messages for context (keep last 5 for efficiency)
        for msg in self.conversation_history[agent_name][-5:]:
            messages.append(msg)

        # Add current user message
        messages.append({"role": "user", "content": user_message})

        try:
            # Call Groq API
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=1024,
            )

            assistant_message = response.choices[0].message.content

            # Store in conversation history
            self.conversation_history[agent_name].append(
                {"role": "user", "content": user_message}
            )
            self.conversation_history[agent_name].append(
                {"role": "assistant", "content": assistant_message}
            )

            return assistant_message

        except Exception as e:
            return f"Error generating response: {str(e)}"
