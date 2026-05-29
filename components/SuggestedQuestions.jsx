export default function SuggestedQuestions({ onSuggest }) {
  const questions = [
    "What is Active Directory?",
    "How do I repair Windows Update?",
    "Explain the Windows Registry.",
    "Generate a PowerShell script to list local users."
  ];

  return (
    <div className="w-full">
      <h3 className="text-xs font-bold text-gray-500 mb-5 uppercase tracking-widest text-left pl-1">Suggested Starting Points</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((q, i) => (
          <button 
            key={i} 
            onClick={() => onSuggest(q)}
            className="group relative overflow-hidden text-left p-5 bg-secondary/30 border border-gray-800 rounded-2xl hover:border-primary/50 hover:bg-secondary hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300"
          >
            <div className="flex justify-between items-center text-gray-400 group-hover:text-white transition-colors">
              <span className="text-sm font-medium">{q}</span>
              <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all text-primary">→</span>
            </div>
            {/* Subtle highlight bar on hover */}
            <div className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500"></div>
          </button>
        ))}
      </div>
    </div>
  );
}
