import { ExternalLink, CheckCircle2, XCircle, Globe } from 'lucide-react';

const VerificationPanel = ({ verification }) => {
  if (!verification) return null;

  const { matched, sources } = verification;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-full">
      <div className="flex items-center gap-4 mb-8">
        {matched ? (
          <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600 shadow-inner">
            <CheckCircle2 size={28} />
          </div>
        ) : (
          <div className="bg-gray-100 p-3 rounded-2xl text-gray-500 shadow-inner">
            <XCircle size={28} />
          </div>
        )}
        <div>
          <h3 className="text-xl font-black text-gray-800 tracking-tight">External Verification</h3>
          <p className="text-sm text-gray-500 font-medium">
            {matched ? 'Cross-referenced with media portals' : 'No matching reports found in current news cycle'}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <Globe size={12} /> VERIFIED MEDIA PORTALS
        </h4>
        
        {sources && sources.length > 0 ? (
          <div className="grid gap-4">
            {sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl border border-gray-100 bg-gray-50/30 hover:bg-blue-50/50 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-blue-600 text-[10px] font-black text-white rounded uppercase tracking-wider">
                    {source.source || source.source_name || "News Source"}
                  </span>
                  <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <h5 className="text-sm font-bold text-gray-700 group-hover:text-blue-900 leading-snug">
                  {source.title}
                </h5>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-sm text-gray-400 italic font-medium">No external sources found to confirm these claims.</p>
          </div>
        )}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="bg-blue-50/50 rounded-xl p-4">
          <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
            <strong>Transparency Note:</strong> Our system verifies content against a live database of {matched ? 'trusted news organizations' : 'verified publishers'}. Lack of matching sources is a strong indicator of potential misinformation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPanel;
