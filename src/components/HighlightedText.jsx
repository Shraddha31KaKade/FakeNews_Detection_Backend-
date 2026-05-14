import { Info } from 'lucide-react';

const HighlightedText = ({ text, importantWords }) => {
  if (!text || !importantWords || importantWords.length === 0) {
    return (
      <div className="text-gray-800 leading-relaxed bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Info size={14} /> Analyzed Content
        </h3>
        <p className="text-gray-700">{text || "No text analyzed yet."}</p>
      </div>
    );
  }

  // Create a regex to match the important words
  const words = importantWords.map(w => w.word).sort((a, b) => b.length - a.length);
  // Escaping words for regex
  const escapedWords = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'gi');

  const parts = text.split(regex);

  return (
    <div className="text-gray-800 leading-relaxed bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <Info size={14} /> Explainable AI (LIME Analysis)
        </h3>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400 opacity-50"></span>
          <span className="text-[10px] text-gray-400 font-bold uppercase">Impact Level</span>
        </div>
      </div>
      
      <p className="mb-6 text-sm text-gray-500 leading-relaxed">
        Our AI identified the following words as key indicators for its decision. The intensity of the highlight reflects the word's influence on the final result.
      </p>

      <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 relative">
        <p className="whitespace-pre-wrap text-lg leading-relaxed text-slate-800">
          {parts.map((part, index) => {
            const lowerPart = part?.toLowerCase();
            const wordInfo = importantWords.find(w => w.word.toLowerCase() === lowerPart);
            
            if (wordInfo) {
              const score = wordInfo.score;
              // Map score to color intensity
              const intensity = Math.max(0.1, Math.min(0.4, score));
              
              return (
                <span
                  key={index}
                  className="relative inline-block cursor-help group px-1 rounded transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: `rgba(239, 68, 68, ${intensity * 2})`, borderBottom: `2px solid rgba(239, 68, 68, ${intensity * 3})` }}
                >
                  <span className="font-semibold text-red-900">{part}</span>
                  
                  {/* Premium Tooltip */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-50">
                    <div className="bg-slate-900 text-white text-[10px] rounded-lg px-3 py-2 shadow-2xl border border-slate-700 w-max min-w-[120px]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-400 uppercase font-bold tracking-tighter">Impact Score</span>
                        <span className="font-black text-red-400">{Math.round(score * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-red-500 h-full" 
                          style={{ width: `${Math.min(100, score * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-slate-700"></div>
                  </span>
                </span>
              );
            }
            return <span key={index}>{part}</span>;
          })}
        </p>
      </div>
    </div>
  );
};

export default HighlightedText;
