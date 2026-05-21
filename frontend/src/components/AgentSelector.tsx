import './AgentSelector.css'

interface AgentSelectorProps {
  selectedAgent: string
  onSelectAgent: (agent: string) => void
  isConnected: boolean
}

const agents = [
  {
    id: 'welcome',
    name: '👋 Welcome Agent',
    description: 'Friendly introduction and site overview'
  },
  {
    id: 'project',
    name: '🚀 Project Agent',
    description: 'Discuss portfolio projects'
  },
  {
    id: 'career',
    name: '📈 Career Agent',
    description: 'Career achievements and experience'
  },
  {
    id: 'business',
    name: '💼 Business Advisor',
    description: 'Collaboration and consulting'
  },
  {
    id: 'research',
    name: '🔬 Research Agent',
    description: 'Insights and technical knowledge'
  }
]

const AgentSelector = ({ selectedAgent, onSelectAgent, isConnected }: AgentSelectorProps) => {
  return (
    <div className="agent-selector">
      <h2>Agents</h2>
      <div className="agents-list">
        {agents.map(agent => (
          <button
            key={agent.id}
            className={`agent-button ${selectedAgent === agent.id ? 'active' : ''}`}
            onClick={() => onSelectAgent(agent.id)}
            disabled={!isConnected}
            title={agent.description}
          >
            <span className="agent-name">{agent.name}</span>
            <span className="agent-description">{agent.description}</span>
          </button>
        ))}
      </div>

      <div className="agent-info">
        <h3>About Agents</h3>
        <p>
          Select an agent to chat with. Each agent has specialized knowledge and expertise in different areas.
        </p>
      </div>
    </div>
  )
}

export default AgentSelector
