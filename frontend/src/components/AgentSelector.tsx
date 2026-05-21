'use client';

interface AgentSelectorProps {
  selectedAgent: string;
  onSelectAgent: (agent: string) => void;
  isConnected: boolean;
}

const agents = [
  {
    id: 'welcome',
    name: '👋 Welcome Agent',
    description: 'Friendly introduction and site overview',
  },
  {
    id: 'project',
    name: '🚀 Project Agent',
    description: 'Discuss portfolio projects',
  },
  {
    id: 'career',
    name: '📈 Career Agent',
    description: 'Career achievements and experience',
  },
  {
    id: 'business',
    name: '💼 Business Advisor',
    description: 'Collaboration and consulting',
  },
  {
    id: 'research',
    name: '🔬 Research Agent',
    description: 'Insights and technical knowledge',
  },
];

export default function AgentSelector({
  selectedAgent,
  onSelectAgent,
  isConnected,
}: AgentSelectorProps) {
  return (
    <aside className="w-full md:w-72 bg-surface border-r border-surface-light overflow-y-auto p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Agents</h2>

      <div className="flex flex-col gap-3 mb-8">
        {agents.map((agent) => {
          const isActive = selectedAgent === agent.id;
          return (
            <button
              key={agent.id}
              onClick={() => onSelectAgent(agent.id)}
              disabled={!isConnected}
              title={agent.description}
              className={`flex flex-col gap-1 p-4 rounded-lg border-2 text-left transition-colors ${
                isActive
                  ? 'bg-primary border-primary text-white'
                  : 'bg-surface-light border-transparent hover:bg-primary/10 hover:border-primary'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="font-semibold text-sm">{agent.name}</span>
              <span
                className={`text-xs ${
                  isActive ? 'text-white/70' : 'text-slate-300'
                }`}
              >
                {agent.description}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-surface-light text-sm text-slate-300">
        <h3 className="text-base font-semibold mb-2 text-slate-100">
          About Agents
        </h3>
        <p className="leading-relaxed">
          Select an agent to chat with. Each agent has specialized knowledge and
          expertise in different areas.
        </p>
      </div>
    </aside>
  );
}
