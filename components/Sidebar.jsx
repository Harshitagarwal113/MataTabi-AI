export default function Sidebar({ isOpen, onNewChat, onDeleteChat, sessions, currentSessionId, onSelectSession }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-[260px] bg-sidebar transform transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
      <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
        <div className="mb-6 px-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="MataTabi Logo" className="w-7 h-7 rounded-full object-cover bg-white" />
            <span className="font-semibold text-textMain text-sm tracking-wide">MataTabi-AI</span>
          </div>
          <button 
            onClick={onNewChat}
            className="text-textMuted hover:text-textMain transition-colors p-1.5 rounded-lg hover:bg-secondary/50"
            title="New Chat"
          >
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
        </div>

        <div className="mb-2 px-2 flex items-center justify-between group">
          <button className="text-[13px] font-semibold text-textMuted flex items-center gap-1 hover:bg-secondary/50 py-1 px-2 rounded-lg transition-colors">
            Recents
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-textMuted opacity-0 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
        </div>
        
        {sessions.length === 0 ? (
          <p className="text-sm text-textMuted px-4 mt-2">No recent chats.</p>
        ) : (
          <ul className="space-y-0.5 mt-1">
            {sessions.map((s) => (
              <li 
                key={s.id} 
                onClick={() => onSelectSession(s.id)}
                className={`text-sm py-2 px-3 rounded-lg cursor-pointer flex items-center justify-between group transition-colors ${
                  s.id === currentSessionId 
                    ? 'bg-secondary text-textMain font-medium' 
                    : 'text-textMain hover:bg-secondary'
                }`}
              >
                <span className="truncate pr-2">{s.title}</span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-textMuted hover:text-textMain" onClick={(e) => { e.stopPropagation(); onDeleteChat(); }} title="Delete Chat">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
