import { AlertTriangle, CheckCircle } from 'lucide-react';
import ConfidenceMeter from './ConfidenceMeter';

const PredictionCard = ({ prediction, confidence }) => {
  const isFake = prediction === 'FAKE';

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 shadow-sm border ${isFake ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
      {/* Decorative background circle */}
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 ${isFake ? 'bg-red-600' : 'bg-green-600'}`}></div>

      <div className="flex items-start justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Prediction Result</h3>
          <div className="flex items-center gap-3">
            {isFake ? (
              <AlertTriangle className="text-red-600 h-8 w-8" />
            ) : (
              <CheckCircle className="text-green-600 h-8 w-8" />
            )}
            <h2 className={`text-4xl font-black ${isFake ? 'text-red-700' : 'text-green-700'}`}>
              {prediction} NEWS
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative z-10">
        <ConfidenceMeter score={confidence} />
        <p className="mt-4 text-sm text-gray-600">
          {isFake 
            ? "Our AI detected linguistic patterns and keywords commonly found in fabricated or misleading articles." 
            : "This article appears to follow standard journalistic patterns and is likely authentic."}
        </p>
      </div>
    </div>
  );
};

export default PredictionCard;
