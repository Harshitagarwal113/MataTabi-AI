export default function Header({ toggleSidebar }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-background text-textMain md:hidden">
      <div className="flex items-center gap-3">
        <button className="text-textMuted hover:text-textMain transition-colors p-1" onClick={toggleSidebar}>
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <span className="text-lg font-semibold text-textMuted px-2 py-1.5">
          MataTabi-AI
        </span>
      </div>
    </header>
  );
}
