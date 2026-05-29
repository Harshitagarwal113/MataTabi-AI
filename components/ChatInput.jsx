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
    <div className="w-full relative z-20 px-4 pb-2">
      <div className="max-w-3xl mx-auto relative bg-secondary rounded-[26px] flex items-end transition-all shadow-[0_0_15px_rgba(0,0,0,0.1)] focus-within:bg-secondary/90">
        <div className="pl-3 pb-2.5 flex-shrink-0 flex items-center justify-center">
          <button className="text-textMuted hover:text-textMain transition-colors p-1.5 rounded-full hover:bg-background/50">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
        
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask anything..."
          className="w-full bg-transparent text-textMain py-[14px] px-3 max-h-[200px] overflow-y-auto focus:outline-none resize-none disabled:opacity-50 placeholder-textMuted leading-relaxed"
          rows={1}
        />
        
        <div className="pr-3 pb-2.5 flex-shrink-0 flex items-center justify-center">
          <button 
            onClick={onSend}
            disabled={!input.trim() || isLoading}
            className={`p-1.5 rounded-full flex items-center justify-center transition-colors ${
              input.trim() && !isLoading 
                ? 'bg-textMain text-background hover:bg-gray-200' 
                : 'bg-background/50 text-textMuted cursor-not-allowed'
            }`}
          >
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-0.5" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-2 text-center px-2">
        <span className="text-[11px] text-textMuted">MataTabi-AI can make mistakes. Consider verifying important information.</span>
      </div>
    </div>
  );
}
