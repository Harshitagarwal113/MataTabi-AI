import ReactMarkdown from 'react-markdown';
import ResponseCard from './ResponseCard';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-8 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[90%] md:max-w-[85%] ${isUser ? 'bg-secondary text-textMain rounded-3xl px-5 py-3' : 'bg-transparent text-textMain px-0 py-2'}`}>
        {isUser ? (
          <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {message.text}
          </div>
        ) : (
          <div className="text-[15px] leading-relaxed prose prose-invert prose-p:leading-relaxed prose-pre:bg-[#0B0F19] prose-pre:border prose-pre:border-gray-800 prose-pre:shadow-2xl prose-a:text-accent prose-a:no-underline hover:prose-a:underline max-w-none">
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        )}
        
        {/* AI Thought Process (ReAct) */}
        {!isUser && message.meta && message.meta.thought && (
          <div className="mt-5 p-4 bg-background/50 border border-secondary rounded-xl text-sm">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span>🧠</span> Internal Reasoning
            </h4>
            <p className="text-gray-400 leading-relaxed italic">{message.meta.thought}</p>
            {message.meta.action && message.meta.action.tool !== "None" && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-gray-800 rounded-lg text-accent text-xs font-mono">
                <span>Action:</span> {message.meta.action.tool}
              </div>
            )}
          </div>
        )}

        {/* Structured Output Card */}
        {!isUser && message.meta && (
          <ResponseCard meta={message.meta} />
        )}
      </div>
    </div>
  );
}
