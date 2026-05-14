import { usePrediction } from '../context/PredictionContext';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const History = () => {
  const { history } = usePrediction();

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Analysis History</h1>
        <p className="mt-2 text-gray-500">Review all your previously analyzed articles and predictions.</p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-gray-50 px-6 py-4 grid grid-cols-12 gap-4 hidden md:grid">
            <div className="col-span-7 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Article snippet</div>
            <div className="col-span-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Analysis Result</div>
            <div className="col-span-1 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Confidence</div>
            <div className="col-span-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Time</div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {history.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-1 md:col-span-7">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.text}</p>
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-black shadow-sm border ${
                    (item.finalDecision || item.prediction) === 'FAKE' ? 'bg-red-600 text-white border-red-700' : 
                    (item.finalDecision || item.prediction) === 'REAL' ? 'bg-emerald-600 text-white border-emerald-700' :
                    'bg-amber-500 text-white border-amber-600'
                  }`}>
                    {(item.finalDecision || item.prediction) === 'UNCERTAIN' ? <Info size={14} /> : 
                     (item.finalDecision || item.prediction) === 'FAKE' ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
                    {item.finalDecision || item.prediction}
                  </span>
                </div>

                <div className="col-span-1 md:col-span-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-blue-600">{(item.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 text-xs text-gray-500 md:text-right">
                  {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                </div>
              </div>
            ))}
            
            {history.length === 0 && (
              <div className="p-12 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-4">
                  <Info size={24} />
                </div>
                <p className="text-gray-500">No history found. Analyze some news to see them here!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
