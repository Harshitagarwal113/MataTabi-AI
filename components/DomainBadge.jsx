export default function DomainBadge({ domain }) {
  if (!domain) return null;
  
  const colors = {
    'Networking': 'bg-blue-900/40 text-blue-400 border-blue-500/30',
    'Security': 'bg-red-900/40 text-red-400 border-red-500/30',
    'Registry': 'bg-purple-900/40 text-purple-400 border-purple-500/30',
    'PowerShell': 'bg-indigo-900/40 text-indigo-300 border-indigo-500/30',
    'Active Directory': 'bg-teal-900/40 text-teal-400 border-teal-500/30',
    'Windows Server': 'bg-gray-800/40 text-gray-300 border-gray-500/30',
    'Troubleshooting': 'bg-orange-900/40 text-orange-400 border-orange-500/30',
    'default': 'bg-primary/20 text-accent border-primary/30'
  };

  const activeColor = colors[domain] || colors['default'];

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${activeColor} uppercase tracking-wider`}>
      {domain}
    </span>
  );
}
