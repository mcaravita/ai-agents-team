interface HeaderProps {
  isConnected: boolean;
}

export default function Header({ isConnected }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-primary-dark to-primary px-6 py-8 text-center border-b border-surface-light">
      <h1 className="text-4xl font-bold mb-2">🤖 AI Agents Team</h1>
      <p className="text-lg opacity-90 mb-4">
        Interact with our intelligent agent team
      </p>
      <span
        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
          isConnected ? 'bg-accent text-white' : 'bg-red-500 text-white'
        }`}
      >
        {isConnected ? '✓ Connected' : '✗ Disconnected'}
      </span>
    </header>
  );
}
