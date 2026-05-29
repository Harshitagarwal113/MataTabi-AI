import DomainBadge from './DomainBadge';

export default function ResponseCard({ meta }) {
  if (!meta) return null;

  return (
    <div className="mt-5 bg-[#0B0F19] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-[#151C2C] px-5 py-3 border-b border-gray-800 flex flex-wrap gap-2 justify-between items-center">
        <DomainBadge domain={meta.domain} />
        {meta.confidence_score !== undefined && (
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 bg-emerald-900/20 px-2 py-1 rounded-md border border-emerald-900/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Confidence: {(meta.confidence_score * 100).toFixed(0)}%
          </span>
        )}
      </div>
      
      <div className="p-5">
        {/* Commands */}
        {meta.commands && meta.commands.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="text-accent text-sm">⌨</span> Executable Commands
            </h4>
            <div className="bg-[#050810] text-blue-300 p-4 rounded-xl font-mono text-[13px] overflow-x-auto border border-blue-900/30 shadow-inner">
              {meta.commands.map((cmd, i) => (
                <div key={i} className="whitespace-pre-wrap leading-relaxed">{cmd}</div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {meta.references && meta.references.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="text-primary text-sm">🔗</span> External References
            </h4>
            <ul className="space-y-2 text-sm bg-secondary/30 p-4 rounded-xl border border-card">
              {meta.references.map((ref, i) => {
                const isUrl = ref.startsWith('http');
                const href = isUrl ? ref : `https://learn.microsoft.com/en-us/search/?terms=${encodeURIComponent(ref)}`;
                return (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-500 mt-0.5">↳</span>
                    <a href={href} target="_blank" rel="noreferrer" className="text-accent hover:text-blue-300 hover:underline break-all transition-colors">
                      {ref}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
