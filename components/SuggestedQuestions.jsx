export default function SuggestedQuestions({ onSuggest }) {
  const suggestions = [
    { label: "Brainstorm ideas", icon: "💡" },
    { label: "Write or edit", icon: "✏️" },
    { label: "Look something up", icon: "🔍" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 w-full">
      {suggestions.map((s, i) => (
        <button 
          key={i} 
          onClick={() => onSuggest(s.label)}
          className="flex items-center gap-2 px-4 py-2.5 bg-background border border-borderLight hover:bg-secondary rounded-full text-sm text-textMuted hover:text-textMain transition-colors"
        >
          <span className="opacity-70">{s.icon}</span>
          <span className="font-medium">{s.label}</span>
        </button>
      ))}
    </div>
  );
}
