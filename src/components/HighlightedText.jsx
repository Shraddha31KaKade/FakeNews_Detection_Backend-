const HighlightedText = ({ text, importantWords }) => {
  if (!text || !importantWords || importantWords.length === 0) {
    return (
      <div className="text-gray-800 leading-relaxed bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Analyzed Text</h3>
        <p>{text}</p>
      </div>
    );
  }

  // Create a regex to match the important words
  // Sort by length descending so longer words match first
  const words = importantWords.map(w => w.word).sort((a, b) => b.length - a.length);
  const regex = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');

  const parts = text.split(regex);

  return (
    <div className="text-gray-800 leading-relaxed bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Linguistic Analysis (Explainable AI)</h3>
      <p className="mb-4 text-sm text-gray-500">
        Highlighted words significantly contributed to the AI's prediction. Hover over a word to see its impact score.
      </p>
      <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
        <p className="whitespace-pre-wrap">
          {parts.map((part, index) => {
            const lowerPart = part?.toLowerCase();
            const wordInfo = importantWords.find(w => w.word.toLowerCase() === lowerPart);
            
            if (wordInfo) {
              const intensity = Math.max(0.15, Math.min(1, wordInfo.score * 2.5));
              const isDark = intensity > 0.5;
              return (
                <span
                  key={index}
                  className="relative inline-block cursor-help group rounded px-1 mx-[1px] font-medium transition-colors"
                  style={{ backgroundColor: `rgba(239, 68, 68, ${intensity})`, color: isDark ? 'white' : '#7f1d1d' }}
                >
                  {part}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max bg-gray-900 text-white text-xs rounded px-2 py-1 shadow-lg z-10">
                    Impact: {Math.round(wordInfo.score * 100)}%
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
