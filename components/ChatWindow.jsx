import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingAnimation from './TypingAnimation';


export default function ChatWindow({ messages, isLoading, onSuggest }) {
  const endRef = useRef(null);

  useEffect(() => {
    // Only scroll if we are loading (user just sent a message)
    if (isLoading) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading]);

  // Initial scroll to bottom when opening a chat
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      // Small timeout to ensure rendering is complete before initial scroll
      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 50);
    }
  }, [messages.length === 0]); // only run when messages become populated (e.g., initial load)

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8 scroll-smooth relative z-0">
      <div className="max-w-4xl mx-auto">
        {messages.map((msg, i) => (
          <div key={i}>
            <MessageBubble message={msg} />
          </div>
        ))}
        {isLoading && <TypingAnimation />}
        <div ref={endRef} className="h-4" />
      </div>
    </div>
  );
}
