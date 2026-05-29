export default function TypingAnimation() {
  return (
    <div className="flex flex-col gap-2 max-w-[80%] self-start animate-fade-in mb-6">
      <div className="bg-card px-5 py-4 rounded-2xl rounded-tl-sm border border-secondary shadow-md w-fit">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-accent rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
            <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
          </div>
          <span className="text-sm text-accent font-medium tracking-wide">Analyzing Query...</span>
        </div>
      </div>
    </div>
  );
}
