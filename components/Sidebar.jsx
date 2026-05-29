export default function Sidebar({ isOpen, onNewChat, onDeleteChat, sessions, currentSessionId, onSelectSession }) {
  const domains = [
    "Architecture", "Registry", "Networking", "Security", 
    "PowerShell", "Active Directory", "Troubleshooting"
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-[280px] bg-[#09090b] transform transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col border-r border-gray-800/60 shadow-2xl md:shadow-none`}>
      <div className="p-6 border-b border-gray-800/60 shrink-0">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-3xl bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">⊞</span> 
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent tracking-tight">MataTabi</span>
        </h2>
        
        <div className="flex flex-col gap-2">
          <button 
            onClick={onNewChat} 
            className="w-full py-2.5 px-4 bg-primary text-white rounded-xl font-medium hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="text-lg leading-none">+</span> New Chat
          </button>
          
          <button 
            onClick={onDeleteChat} 
            className="w-full py-2 px-4 text-gray-500 rounded-xl font-medium hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 text-sm flex items-center justify-center gap-2 group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">🗑</span> Delete Current Chat
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
        <div className="mb-8">
          <h3 className="text-[10px] font-bold text-gray-500 mb-3 uppercase tracking-widest pl-2">Recent Chats</h3>
          {sessions.length === 0 ? (
            <p className="text-sm text-gray-600 italic pl-2">No recent chats.</p>
          ) : (
            <ul className="space-y-1">
              {sessions.map((s) => (
                <li 
                  key={s.id} 
                  onClick={() => onSelectSession(s.id)}
                  className={`text-sm py-2 px-3 rounded-lg cursor-pointer truncate transition-all duration-200 flex items-center gap-2 ${
                    s.id === currentSessionId 
                      ? 'bg-gradient-to-r from-primary/10 to-transparent text-white border-l-2 border-primary font-medium' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50 border-l-2 border-transparent'
                  }`}
                >
                  <span className={`text-xs ${s.id === currentSessionId ? 'text-primary' : 'text-gray-600'}`}>💬</span>
                  <span className="truncate">{s.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-gray-500 mb-3 uppercase tracking-widest pl-2">Knowledge Domains</h3>
          <ul className="space-y-1">
            {domains.map((d, i) => (
              <li key={i} className="text-[13px] py-1.5 px-3 text-gray-500 cursor-default flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
