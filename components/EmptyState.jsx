export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center animate-fade-in text-center px-4">
      <img src="/logo.png" alt="MataTabi Logo" className="w-16 h-16 rounded-full object-cover bg-white mb-6 shadow-lg" />
      <h1 className="text-3xl font-semibold text-textMain mb-3">
        Welcome to MataTabi-AI
      </h1>
      <p className="text-textMuted text-lg max-w-lg mx-auto">
        Your dedicated Windows OS expert. I can help you troubleshoot issues, optimize performance, and answer anything about Windows!
      </p>
    </div>
  );
}
