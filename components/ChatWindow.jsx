import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingAnimation from './TypingAnimation';
import EmptyState from './EmptyState';

export default function ChatWindow({ messages, isLoading, onSuggest }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto bg-background p-4 relative z-0">
        <EmptyState onSuggest={onSuggest} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8 scroll-smooth relative z-0">
      <div className="max-w-4xl mx-auto">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        {isLoading && <TypingAnimation />}
        <div ref={endRef} className="h-4" />
      </div>
    </div>
  );
}
