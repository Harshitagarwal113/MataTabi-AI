import SuggestedQuestions from './SuggestedQuestions';

export default function EmptyState({ onSuggest }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] max-w-4xl mx-auto text-center px-6 animate-fade-in">
      <div className="mb-10 relative">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
        
        <span className="relative inline-block p-5 bg-gradient-to-b from-secondary to-background rounded-2xl mb-6 border border-gray-800 shadow-2xl">
          <span className="text-5xl bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">⊞</span>
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">MataTabi-</span>
          <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">AI</span>
        </h1>
        <h2 className="text-lg md:text-xl text-gray-400 font-medium tracking-wide">The Ultimate Windows OS Technical Assistant</h2>
      </div>
      
      <div className="bg-gradient-to-b from-secondary/50 to-transparent p-8 rounded-3xl border border-gray-800/60 mb-12 w-full text-left shadow-2xl backdrop-blur-sm">
        <p className="text-white font-semibold mb-6 text-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Ready to diagnose and resolve:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-sm text-gray-400">
          <li className="flex items-center gap-3"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">✓</span> Windows Architecture</li>
          <li className="flex items-center gap-3"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">✓</span> Registry Editing</li>
          <li className="flex items-center gap-3"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">✓</span> PowerShell Scripting</li>
          <li className="flex items-center gap-3"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">✓</span> Active Directory</li>
          <li className="flex items-center gap-3"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">✓</span> Networking Diagnostics</li>
          <li className="flex items-center gap-3"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">✓</span> Security & Firewalls</li>
        </ul>
      </div>

      <SuggestedQuestions onSuggest={onSuggest} />
    </div>
  );
}
