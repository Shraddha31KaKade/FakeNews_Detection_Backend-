import { AlertTriangle, CheckCircle, Info, ShieldCheck, Zap } from 'lucide-react';
import ConfidenceMeter from './ConfidenceMeter';

const PredictionCard = ({ prediction, confidence, finalDecision, proofExplanation, modelUsed }) => {
  // We use finalDecision as the primary source of truth for the UI
  const isFake = finalDecision === 'FAKE';
  const isUncertain = finalDecision === 'UNCERTAIN';
  
  const getDecisionStyles = (decision) => {
    switch (decision) {
      case 'FAKE': return 'bg-red-600 text-white border-red-700 shadow-red-200';
      case 'REAL': return 'bg-emerald-600 text-white border-emerald-700 shadow-emerald-200';
      case 'UNCERTAIN': return 'bg-amber-500 text-white border-amber-600 shadow-amber-200';
      default: return 'bg-blue-600 text-white border-blue-700';
    }
  };

  const getCardBg = () => {
    if (isFake) return 'bg-red-50 border-red-100';
    if (isUncertain) return 'bg-amber-50 border-amber-100';
    return 'bg-emerald-50 border-emerald-100';
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl p-8 shadow-xl border-2 transition-all duration-500 ${getCardBg()}`}>
      {/* Decorative background accent */}
      <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 ${isFake ? 'bg-red-600' : (isUncertain ? 'bg-amber-600' : 'bg-emerald-600')}`}></div>

      <div className="flex flex-col items-center text-center gap-6 mb-8 relative z-10">
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-blue-500" /> ANALYSIS VERDICT
          </h3>
          <div className={`px-12 py-4 rounded-3xl font-black text-4xl shadow-2xl border-b-8 transform hover:scale-105 transition-transform flex items-center gap-4 ${getDecisionStyles(finalDecision)}`}>
            {isUncertain && <Info size={36} />}
            {isFake && <AlertTriangle size={36} />}
            {!isFake && !isUncertain && <CheckCircle size={36} />}
            {finalDecision}
          </div>
          <p className="text-sm font-bold text-gray-500 mt-2">
            {isFake ? "Misinformation Detected" : (isUncertain ? "Further Verification Needed" : "Verified News Content")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100/50">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
              <Zap size={12} className="text-amber-500" /> AI Confidence
            </h4>
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{modelUsed || "Hybrid Model v1.0"}</span>
          </div>
          <ConfidenceMeter score={confidence} />
        </div>

        <div className={`rounded-2xl p-6 border-l-4 shadow-sm bg-white/60 ${isFake ? 'border-red-500' : (isUncertain ? 'border-amber-500' : 'border-emerald-500')}`}>
          <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
             EXPLAINABLE AI PROOF
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            {proofExplanation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
