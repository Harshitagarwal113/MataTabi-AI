import DomainBadge from './DomainBadge';

export default function ResponseCard({ meta }) {
  if (!meta || !meta.references || meta.references.length === 0) return null;

  return (
    <div className="mt-5 bg-[#0B0F19] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-5">

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
