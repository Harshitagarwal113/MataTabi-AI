export default function Header({ toggleSidebar }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-background border-b border-card">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-textMain text-xl" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-textMain tracking-tight">MataTabi-AI</h1>
          <span className="text-xs text-primary font-medium tracking-wide uppercase">Windows Expert</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full border border-gray-800">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
          <span className="text-xs text-textMain font-medium">System Online</span>
        </div>
      </div>
    </header>
  );
}
