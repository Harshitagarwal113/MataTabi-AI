import { useRef, useEffect } from 'react';

export default function ChatInput({ input, setInput, onSend, isLoading }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="bg-background border-t border-card p-4 md:p-6 pb-8 relative z-20">
      <div className="max-w-4xl mx-auto relative bg-card rounded-2xl border border-secondary shadow-lg flex items-end transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask anything about Windows..."
          className="w-full bg-transparent text-textMain p-4 max-h-[200px] overflow-y-auto focus:outline-none resize-none disabled:opacity-50 placeholder-gray-500 leading-relaxed"
          rows={1}
        />
        <button 
          onClick={onSend}
          disabled={!input.trim() || isLoading}
          className="m-2 p-3 px-4 bg-primary text-white font-medium rounded-xl hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-primary transition-all flex-shrink-0 flex items-center gap-2"
        >
          <span>Send</span>
          <span className="hidden sm:inline opacity-70 text-xs text-blue-200">↵</span>
        </button>
      </div>
      <div className="max-w-4xl mx-auto mt-3 text-right flex justify-between items-center px-2">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
          Connected to Gemini API
        </span>
        <span className="text-xs text-gray-500 font-mono">{input.length} / 2000</span>
      </div>
    </div>
  );
}
